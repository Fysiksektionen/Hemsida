# ContentObjects och ContentTrees
Denna dokumentation bygger på att du har läst den lite övergripande och generella tanken kring ContentObjects som 
presenteras i [Om projektet](../Om%20projektet.md).

## ContentObjects

### Definition
Det finns sex typer av ContentObjects (_CO's_). Nedan följer typdefinitioner för dessa:

```typescript jsx
type ContentObjectDBType = 'text' | 'image' | 'menu' | 'page' | 'dict' | 'list'

type ContentObjectBase = {
    id: number,
    detailUrl: string,
    dbType: ContentObjectDBType,
    attributes: object
}

type ContentText = ContentObjectBase & {
    dbType: 'text',
    text: string
}

type ContentImage = ContentObjectBase & {
    dbType: 'image',
    image: Image
}

type ContentMenu = ContentObjectBase & {
    dbType: 'menu',
    menu: Menu
}

type ContentPage = ContentObjectBase & {
    dbType: 'page',
    page: MinimalPage
}

type ContentDict = ContentObjectBase & {
    dbType: 'dict',
    items: NodeJS.Dict<ContentObject>
}

type ContentList = ContentObjectBase & {
    dbType: 'list',
    items: ContentObject[]
}

type ContentObject = ContentText | ContentImage | ContentMenu | ContentPage | ContentDict | ContentList
```

Dessa definitioner, som ligger i [src/types/api_object_types.ts](../../client/src/types/api_object_types.ts), 
möjliggör att vi kan jobba med responsen som vi får från servern och bygga upp typdefinitioner för mer komplexa 
strukturer än ett enstaka CO.

### Användningsprinciper
För att vi ska kunna jobba med dessa objekt på ett smidigt och effektivt sätt finns några principer vi följer:

- Samtliga CO's ska ha ett unikt id. Servern garanterar att alla CO's som returneras har det, men om vi redigerar 
  eller skapar nya CO's ska dessa få ett nytt, unikt id. Alla id som kommer från servern är strikt positiva heltal. 
  Objekt som är nya och inte ännu lagrats i serven ska få unika strikt *negativa* heltal. På så sätt går det att 
  veta om ett objekt finns representerat i databasen.
- Vi försöker att byta ut informationen i CO's utan att skapa nya i onödan. Detta kommer göra att processen att 
  spara objekten i databasen går fortare och det hjälper oss även att uppfylla punkten ovan.
  

## ContentTrees
Tack vare hur TypeScript funkar kan vi bygga upp mer komplexa strukturer av våra enkla CO's. Dessa kallar vi för 
ContentTrees (_CT's_). Ett CO är det minsta möjliga CT.

### Definition
Tills vidare definieras våra CT's i [src/types/content_object_trees.ts](../../client/src/types/content_object_trees.ts),
men det kan komma att ändras när projektet blir större. Nedan följer ett exempel på ett litet CT som definierar det 
innehåll som behövs för att visa vår Frontpage som den ser ut i skrivande stund.

```typescript jsx
type OrangeInfoBoxCT = ContentDict & {
    attributes: {
        color: string
    },
    items: {
        title: ContentText,
        text: ContentText,
        button: ContentText & {
            attributes: {
                link: string
            }
        }
    }
}

type FrontPageCT = ContentDict & {
    items: {
        orangeBoxes: ContentList & {
            items: OrangeInfoBoxContentTree[]
        },
        sponsorLogo: ContentImage
    }
}
```

