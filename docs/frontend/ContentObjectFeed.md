# ContentObjectBlockFeed

Ett ContentObjectBlockFeed är den standard på ContentObjects som vi använder på sidor som ska kunna byggas upp av 
godtyckligt många stycken, bilder, rubriker, etc. Det är alltså helt enkelt en uppsättning TypeScript-typer som vi 
har implementerat både rendering och redigering av. Vi kallar dessa objekt för block och de kan placeras i 
godtycklig ordning. 

Nedan följer både en beskrivning av den standard vi använder oss av och strukturen i koden för att hantera dessa 
block.

## Blocks

- **HeadingBlock** - Renders a text, without HTML rendering, into a heading specified by a size attribute.
- **RichTextBlock** - Renders a text, with HTML rendering, into one or more paragraphs.
- **ImageBlock** - Renders an image with size and adjustments from attributes.

## Hur funkar det?
