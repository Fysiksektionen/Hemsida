# EditorialModeContext och ContentTreeContext

För att kunna redigera och uppdatera ContentObject och ContentTrees så behövs någon struktur där ett flertalet 
komponenter i trädet av React-komponenter kommer åt, och kan ändra ett gemensamt state.

Ett sätt att göra det är att genom varje komponent passa hooks som gör att sub-komponenten kan redigera något i 
parent-komponenten. Detta gör dock att det blir ganska jobbigt att skapa många komponenter då det blir mycket att 
bara skicka vidare funktioner, etc till child-komponenter. 

Detta löses genom att använda contexts. Vi har två contexts som är viktiga när det kommer till rendrering och 
redigering av ContentTrees.

## EditorialModeContext
För att alla komponenter ska ha möjlighet att veta om de befinner sig i redigeringsläge eller ej finns en context 
som säger just detta. Det används för att enablea/disablea funktionalitet för redigering, men även saker som länkar, 
popups och annat liknande som kanske inte är önskvärt i redigeringsläge. 

### Definition
Detta context har ett state som består av en boolean. Definitionen följer nedan.

```typescript jsx
const EditorialModeContext = React.createContext<boolean>(
    false // Default
);
```

### Var och hur används det?
#### Providers
Eftersom default för detta context är `false` så behövs inga providers till den gren av `App.tsx` som rendrerar en 
sida i normalfallet. Istället används en provider i 
[PageEditor.tsx](../../client/src/components/admin/pages/PageEditor.tsx),
[HeaderEditor.tsx](../../client/src/components/admin/settings/HeaderEditor.tsx) och i
[FooterEditor.tsx](../../client/src/components/admin/settings/FooterEditor.tsx).

#### Consumers
Consumers av EditorialModeContext får självklart användas var som helst där de behövs, men vanligast är att de 
används inuti en COR (oftast som en JSX-wrapper). En consumer behövs i alla komponenter som ska förändra sitt 
beteende beroende på om den befinner sig i redigeringsläge eller ej. Det kan alltså gälla saker som inte alls har 
med COs att göra alls (ex. olika länkar eller effekter).


## ContentTreeContext
Denna context möjliggör för vilken komponent som helst inom detta context att anropa en dispatcher-metod när 
komponenten vill göra en innehållsförändring i trädet. Används uteslutande tillsammans med [CTReducer](CTReducer.md).

### Definition
Detta context har ett state som består av en dispatcher-funktion. Denna funktion tar in ett id och ett ContentObject.
Dess uppgift är att byta ut den del av trädet som har ett root-objekt med id=id med det nya ContentObject som angavs.
Som en säkerhet så definieras default beteendet som en "gör inget"-metod.

```typescript jsx
type ContentObjectTreeDispatchAction = {
    id: number,
    value: ContentObject
};

/**
 * Context delivering a dispatch method to change context object.
 */
export const ContentTreeContext = React.createContext<React.Dispatch<ContentObjectTreeDispatchAction>>(
    () => {}
);
```

### Var och hur används det?
#### Providers
Providers till denna context används kring komponenter som ansvarar för att redigera content-träd. Den används då 
genom att skicka med en dispatcher-funktion med önskat beteende. I normalfallet kommer denna dispatcher-funktion att 
ha hämtats direkt från metoden `useCTReducer`. Se mer om det under [CTReducer](CTReducer.md).

#### Consumers
Consumers av denna context är komponenter som behöver kunna förändra delar av content-trädet. I normalfallet är 
detta ContentObjectEditors. För att veta mer om hur dispatchern fungerar, kolla in [CTReducer](CTReducer.md).
