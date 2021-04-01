# ContentObjectRenderer och ContentObjectEditor

## ContentObjectRenderer
En ContentObjectRenderer (_COR_) är en komponent som ansvarar för att rendrera ett ContentObject eller ett
ContentTree på önskvärt sätt. Utöver det så ansvarar en COR för att detta CT går att redigera när sidan försätts i
`EditorialMode`. Notera dock att själva redigeringsfunktionaliteten _inte_ ska ligga i en COR, utan denna ska se
till att en ContentObjectEditor (_COE_) används på önskvärt sätt i `EditorialMode`.

### Definition
En COR är en React-komponent som tar in (minst) ett CT (eller såklart bara ett CO). Uppgiften för en COR är tvådelad. 

#### Om `EditorialMode==false`
I detta fall befinner vi oss på ett ställe där den enda uppgiften är att visa informationen. Detta kan vara genom 
att visa en bild eller en text. Ibland handlar det om mer avancerade strukturer. Det är helt okej för en COR att 
använda sub-komponenter för detta, men det är vanligt att enkla CORs bara har layouten direkt i sig (ex. `TextCOR`). 

#### Om `EditorialMode==true`
Här är uppgiften följande: Möjliggör för användaren att använda en tillhörande COE för att redigera innehållet. 
Vilken COE som ska användas här ska hårdkodas i COR:en. Detta kan göras genom att ha en COE som är en popup, som 
visas när någon klickar på COR:en (se ex. `TextCOR` och `TextModalCOE`).


### När i content-trädet av en sida ska man använda en COR?
Frågan handlar alltså om när det är dags att implementera en COR och inte bara fler komponenter djupare och djupare. 
Extremfallet hade varit att vi definierar 4 typer av CORs (Text, Image, Page och Image) och att alla sidor redigeras 
genom att klicka på den lilla bis som ska redigeras. Men det hade inte varit så smidigt. Istället vill vi ibland 
klumpa ihop redigering av delar av content-trädet. Ett exempel på detta är redigeringen av 
de orangea boxarna på framsidan.

Svaret på frågan blir alltså att du ska använda en COR när du vill klumpa ihop redigeringen av resterande del av 
content-trädet. Ibland kommer det bara handla om ett enstaka CO och ibland kommer det vara väldigt stora strukturer.


### Exempel
Det enklaste exemplet på en COR är sannolikt `TextCOR`:

```typescript jsx
type TextCORProps = {
    textCO: ContentText,
    preText?: string,
    postText?: string
}

/**
 * Renders a ContentText and allows for changing the text using a popup when in EditorialModeContext.
 * @param props: The ContentText object and pre and post strings added to the CO's text.
 */
export default function TextCOR(props: TextCORProps) {
    const [showModal, setShowModal] = useState(false);

    const preText = props.preText !== undefined ? props.preText : '';
    const postText = props.postText !== undefined ? props.postText : '';

    return (
        <EditorialModeContext.Consumer>
            {editing =>
                <div>
                    <TextModalCOE content={props.textCO} show={showModal} setShow={setShowModal} />
                    <span onClick={editing ? () => setShowModal(true) : () => {}}>{preText + props.textCO.text + postText}</span>
                </div>
            }
        </EditorialModeContext.Consumer>
    );
}
```

Värt att notera:
- COR:en har **inte** något internt state som sparar vad som ska visas, utran visar alltid det som kommer vi props. 
  Detta är viktigt för att saker ska uppdateras korrekt.
- Beroende på EditorialMode så går det att på upp en COE om man klickar på texten som visas.
- Extra funktionalitet så som preText och postText går att lägga till på en COR för att göra att den går att använda 
  i fler än ett sammanhang.


## ContentObjectEditor
En ContentObjectEditor (_COE_) är en komponent som på tar in ett CT och på något sätt tillåter redigering av objektets 
innehåll. Varje COR har en COE associerad till sig och aktiverar COE:n när den behövs i `EditorialMode`.

### Exempel på editor-typer
Här följer exempel på hur editors kan funka.

- En editor kan vara en popup som dyker upp när man (i `EditorialMode`) klickar på den komponent vars innehåll ska 
  redigeras. I popupen finns någon typ av formulär eller väljare eller så som tillåter den att ändra innehållet. 
  När det sparas stängs popupen.
- En editor kan vara in-place och när man klickar på komponenten vars innehåll ska ändras så blir informationen till 
  ett formulär in-place som går att ändra och spara.
- En editor kan definiera ett eget interface där saker kan flyttas runt och redigeras direkt på sidan, tänk editorn 
  i wordpress just nu.
  
### Definition
En COE är en React-komponent som (minst) tar in ett CT som ska kunna redigeras. Varje COE kan endast redigera en 
specifik typ av CT. Varje COE ska ha en update-funktion som, när den kallas på via någon form av submit-action 
(antingen automatiskt eller via ene knapp) ska uppdatera det övergripande content-state:et via dispatch-metoden i 
`ContentObjectTreeContext`.

### Exempel
Ett enkelt exempel är `TextModalCOE`

```typescript jsx
type TextEditorModalProps = {
    show: boolean,
    setShow: (state: boolean) => void,
    content: ContentText
}

/**
 * Modal editor of single ContentText.
 * @param show: Boolean to show/hide the modal.
 * @param setShow: Hook to alter the show variable.
 * @param content: The current ContentText with information to be edited.
 */
export default function TextModalCOE({ show, setShow, content }: TextEditorModalProps) {
    // Internal state during edit
    const [text, setInternalText] = useState(content.text);

    // Use context to get the dispatcher function
    const CTDispatcher = useContext(ContentObjectTreeContext);

    // Create new ContentText That copies the previous object and changes text. Send to disptcher
    function updateTextHook(text: string) {
        const newText = { ...content, text: text };
        CTDispatcher({ id: content.id, value: newText });
    }

    // Update content of tree and close modal on submit.
    function onSubmit(event: FormEvent) {
        updateTextHook(text);
        setShow(false);
        event.preventDefault();
        event.stopPropagation();
    }

    return (
        <Modal
            show={show}
            onHide={() => { setShow(false); }}
            size="xl"
            aria-labelledby="text-editor"
            centered
            animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title id="text-editor">Pick an image!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Form onSubmit={onSubmit}>
                        <Form.Group controlId="rootUrl" as={Col} md={4}>
                            <Form.Label>Text field</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                defaultValue={text}
                                onChange={(event: ChangeEvent<any>) => {
                                    setInternalText(event.target.value);
                                }}
                            />
                        </Form.Group>
                        <Button type={'submit'} variant={'success'}>
                            Spara
                        </Button>
                    </Form>
                </Container>
            </Modal.Body>
        </Modal>
    );
}
```

Denna ligger alltså i en COR och när COR:en klickas på öppnas denna Modal. Då kan objektet redigeras. När formuläret 
submitas så uppdateras den del av content-trädet som vi redigerar just nu, via dispatch-metoden från 
`ContentObjectTreeContext`.
