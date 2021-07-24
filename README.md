# Hemsida
Vissa saker är enklare att göra om allt ligger i samma repo. Jag orkar inte hålla koll på Docs-repot och synka det med Backend-repot, så här finns nu en branch där de är synkade. Poof. Egentligen är det för att jag vill köra tester på backendet m.h.a. OpenAPI.

## Användning
Ladda ner Docker, samt Remote-containers-tillägget för VS Code. Öppna sedan denna mapp, välj "Open in Container". Väl inne startar du respektive tjänst som vanligt, dvs:
 - Frontend: Kör `npm start` i mappen `/app/client/`
 - Backend: Kör `./.devcontainer/start.sh` i mappen `/app/server/`
 - Docs: Kör `npm run start-all` i mappen `/app/docs/api-server/`
