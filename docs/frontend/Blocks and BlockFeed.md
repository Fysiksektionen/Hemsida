# Blocks and BlockFeed

Block och BlockFeed är den standard på ContentObjects som vi använder på sidor som ska kunna byggas upp av 
godtyckligt många stycken, bilder, rubriker, etc. Det är alltså helt enkelt en uppsättning TypeScript-typer som vi 
har implementerat både rendering och redigering av. Vi kallar dessa objekt för block och de kan placeras i 
godtycklig ordning. En serie av Blocks kallar vi ett BlockFeed.

Nedan följer både en beskrivning av den standard vi använder oss av och strukturen i koden för att hantera dessa 
block.

## Blocks

- **HeadingBlock** - Renders a text, without HTML rendering, into a heading specified by a size attribute.
- **RichTextBlock** - Renders a text, with HTML rendering, into one or more paragraphs.
- **ImageBlock** - Renders an image with size and adjustments from attributes.

## Representation i ContentObjects
Alla block representeras av ett ContentObject. Alla block har en blockType som finns i attributes. Denna blockType 
bestämmer hur blocket ska rendreras. Dessa typdefinitioner finns i 
[blocks.ts](../../client/src/types/content_objects/blocks.ts).

BlockFeed är helt enkelt en ContentList med items som är Blocks.

## CORs och COEs
### BlockFeed
För att integrera ett BlockFeed på en sida, använd en BlockFeed-object i Content-trädet och använd sen en 
BlockFeedCOR. Denna kommer möjliggöra redigering av blocken samt att kunna lägga till fler block dynamiskt.

### Blocks
Det finns CORs och COEs för alla block också. Dessa går utmärkt att använda utan att lägga det inuti ett BlockFeed. 
Detta passar väl till redigering av små texter eller rubriker.
