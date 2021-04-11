# CTReducer
CTReducer (ContentTreeReducer) är en [reducer](https://reactjs.org/docs/hooks-reference.html#usereducer) som 
innehåller ett state av typen ContentObject och en dispatch-metod som kan ändra detta state.

### Hur används det?
Använd reducern genom att kalla på funktionen `useCTReducer`. Denna funktion använder en default dispatcher samt 
tillåter dig att lägga till funktionalitet till den dispatcher som är default. 

Funktionen kommer returnera ett state och en dispatcher. Denna dispatcher är default dispatchern wrappad med dina 
pre- och post-hooks om de är definierade. Detta state bör vara det state som passas nedåt i kedjan av komponenter 
för att visas. Den dispatcher som levereras bör vara den dispatcher som läggs i en ContentTreeContext.

Nedan följer lite tips och regler för användning av `useCTReducer`.

- Använd möjligheten till pre- och post-hooks för att spara, validera, etc. datan.
- Försök alltid behålla så mycket av existerande ContentObjects som möjligt vid uppdatering. Ex, id.
- Om id på root-objektet i trädet som skickas in i `useCTReducer` ändras kommer statet att ändras till det nya 
  trädet. Anledningen är att när man byter språk (redigeringsspråk) på sidan måste innehållet ändras och samma state 
  kan inte finnas kvar. Därför är det viktigt att state på olika språk som ska sparas görs via en pre- eller post-hook.
  
### Exempel
Ett bra exempel på hur `useCTReducer` kan användas ges i 
[PageEditor.tsx](../../client/src/components/admin/pages/PageEditor.tsx). Där framgår även sambandet med 
ContentTreeContext.

För att se hur denna dispatcher används när den kallas på kan man kolla på 
[TextModalCOE.tsx](../../client/src/components/content_object_editors/TextModalCOE.tsx) (enkelt exempel) eller
[InfoBoxModalCOE.tsx](../../client/src/components/content_object_editors/InfoBoxModalCOE.tsx) (något större exempel).

