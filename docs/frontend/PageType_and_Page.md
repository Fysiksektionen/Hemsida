# PageType och Page
Denna del av dokumentationen handlar om att visa en specifik sida, specifikt sidor som har en dynamisk URL. Denna 
dokumentation bygger på att du har läst den lite övergripande och generella tanken kring ContentObjects som 
presenteras i [Om projektet](../Om%20projektet.md).

## PageType
På hemsidan kommer det finnas en massa olika sidor som ser väldigt olika ut, därför kommer olika sidor behöva laddas 
med olika komponenter, som klarar att visa just denna sidas information. Dessa olika typer av sidor representeras av 
olika pageTypes.

### Definition
En pageType är en sträng som 1-1 paras ihop med en ansvarig komponent. Denna mappning och definitionen av nya 
pageTypes sker _endast_ på frontenden. Definitionen sker här:
[PageTypeMap](../../client/src/pages/PageTypeMap.ts).

_(NOTE: Egentligen behöver förhållandet mellan pageType och komponent vara 1-1, det får bara inte vara så att en 
pageType kan mappas till flera komponenter, det omvända funkar men avråds.)_

### När behövs en ny pageType?
Detta är en viktig fråga och inte helt trivial att besvara, men nedan följer två principer:

- En pageType ska återspegla en unik _layout_. Det handlar om position av informationen och små variationer i styling.
- Om `page.content_*` behöver vara på olika struktur så ska det vara två olika pageTypes.
- Om samma content-struktur ska rendreras på helt olika sätt ska det vara två olika PageTypes.

Dessa punkter är något vaga, men principerna är korrekta. När faller saker i gråzoner? Nedan listas 
några gråzonssituationer och hur det går att resonera kring dem


<hr>

**Situation:** säg att du har två sidor som du vill skapa. Du definierar deras respektive content och inser att de har 
samma struktur. Dock så vill du att de ska visas på väldigt olika sätt. Du skulle kunna lägga information om hur du 
rendrerar den informationen i `attributes` eller så kan du ha olika page types. 
  
**Svar:** Olika pageTypes. 

_Anledning:_ Attributes finns till för väldigt små förändringar av rendreringen. Ex. H1 
eller H2?, vilken färg ska knappen ha?, etc. Inte stora layoutförändringar.

<hr>

**Situation:** Du vill bygga en sida där användaren har frihet att lägga till antingen en bild eller ett stycke text 
på en plats. I övrigt är innehållet samma på sidan.

**Svar:** En pageType.

_Anledning:_ Det går ju utmärkt att definiera en typ där ett visst objekt är antingen ContentText eller ContentImage 
och eftersom de ska ligga på samma plats så är det rimligt att det är samma pageType, då den återspeglar en viss layout.


## Page

### Definition
En Page är en komponent som ansvarar för att visa en specifik pageType. Alla Page-komponenter är funktioner på 
någon av följande former

```typescript jsx
type PageComponent = React.FunctionComponent<ContentObject>;

const SomePage: PageComponent = (props: ContentObject) => {
    const content = props as SomePageCT;
    
    return (
        <div>some response dependent on content</div>
    );
}

function SomeOtherPage(props: ContentObject) {
    const content = props as SomeOtherPageCT;
    
    return (
        <div>some response dependent on content</div>
    );
}
```

### Att bygga en Page
Att bygga en ny page kan bäst sammanfattas i följande steg:

1. Identifiera vilken information på sidan som ska vara dynamisk och bygg ett ContentTree utefter den strukturen.
1. Bygg upp sidans struktur enligt den design du utgår ifrån. Använd gärna flera underkomponenter. Skicka alltid med 
   den relevanta biten av content-trädet till subkomponenter och bygg inte subkomponenter som sparar content som ett 
   state.
1. Bestäm hur sidan ska redigeras. Våra sidor redigeras genom att försättas i `EditorialMode`. Dubbelkolla att din
   CT-struktur är rimlig utefter hur du vill redigera sidan. Byt ut de ställen där du rendrerar object som ska junna 
   redigeras till en ContentObjectRenderer. Ibland måste du skapa nya COR's och COE's för att få till det beteende 
   du önskar.
1. Se till att funktionalitet som länkar, special-funktionalitet, etc. är avstängda när sidan försätts i 
   `EditorialMode`.

