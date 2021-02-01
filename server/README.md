# Hemsidan - Server

Server-sidan av Fysiksektionens hemsida är byggd i python med web frameworket Django. Vi arbeter med Django och Django REST Framework för att bygga ett API för det som fontend i form av React, React Native eller annan frontend ska kunna kommunicera med.

## Ladda ner och kör servern lokalt
För att ladda ner och köra servern lokalt behöver du sätta upp en del grejer. Följ stegen nedan för den miljö du programmerar i. Ett tips är att använda IDEn PyCharm. Vi får betal-varianten från KTH och den är väldigt väl anpassad för att jobba med Django. Nedan följer hur du sätter upp servern med och utan PyCharm. Om du inte ska redigera så mycket utan endast vill kunna starta servern kanske det är mer värt att inte köra på PyCharm.

### Unix-baserade system (Utan PyCharm)
1. Klona repot med ```git clone git@github.com:Fysiksektionen/Hemsida.git```.

1. Installera och sätt upp databasen i mysql genom att köra (notera att det går att ändra ''fdev'' och ''password'' till vad du vill):
    1. ```sudo apt update```
    1. ```sudo apt install mariadb-server```
    1. ```sudo mysql_secure_installation``` (följ instruktioner för att sätta upp ett lösenord för root).
    1. ```sudo mysql```
    1. ```CREATE USER 'fdev'@'localhost' IDENTIFIED BY 'password';```
    1. ```CREATE DATABASE hemsidan_db CHARACTER SET utf8mb4;```
    1. ```GRANT ALL PRIVILEGES ON hemsidan_db.* TO 'fdev'@'localhost';```
    1. ```FLUSH PRIVILEGES;```
    1. ```exit;```

1. Försäkra dig om att du har en ganska ny version av python3 (>3.5) och att du har pip installerat för den pythoninstallationen. (Notera att ```pip``` ibland är koplat till python2.7 och att du ska använda ```pip3```. Det är viktigt att du använder en python3 installation!). Kör ```sudo apt-get install -y python3-venv```. Navigera in i 'server'-mappen och kör ```python3 -m venv venv/```.

1. Kör ```echo 'export PYTHONPATH="$PYTHONPATH:$VIRTUAL_ENV/.."' >> venv/bin/activate```. Sedan ```source venv/bin/activate``` (Det aktiverar din virtual enviroment, något du måste göra varje gång du vill starta servern!)

1. Installera alla python-paket genom att använda ```pip install -r requirements/development.txt```. (Notera att det _ska_ vara ```pip``` här.)

1. Kopiera filen server/project_settings/settings/local_template.py till server/project_settings/settings/local.py och fyll i informationen baserat på användarnamn och dylikt som du använder under steg 1 och 2.
   
1. Nu är vi redo att sätta upp det sista i Django. Kör följande från server-mappen
    1. ```python scripts/manage.py collectstatic```
    2. ```python scripts/manage.py makemigrations```
    3. ```python scripts/manage.py migrate```
    4. ```python scripts/manage.py createsuperuser``` (Följ instruktionerna. Här får du välja själv vilka inloggningsdetaljer du ska ha. 'admin' är ett passand användarnamn.)

1. Nu är du klar! Starta servern i development-mode genom att köra: ```python scripts/manage.py runserver 127.0.0.1:8000```. Du kan nu anropa servern via ip-adressen 127.0.0.1:8000. Servern görs i development-läge.

### Unix-baserade system (med PyCharm)
1. Genomför steg 1. och 2. från "Unix-baserade system" ovan.

1. Öppna 'server'-mappen med PyCharm. För att skapa en egen vitual enviroment; gå till _File -> Settings -> Project: server -> Python interpreter -> \[kugghjulet\] -> Add -> \[Använd standard-inställningarna för Virtualenv Enviroment och tryck ok\]_.

1. Börja med att installera alla pythonpaket som behövs. Det gör du genom att i nedre högra hörnet välja en python-interpreter som du nu skapat. Sedan öppnar du terminalen i PyCharm (det bör då stå _(venv)_ innan prompten). Kör ```pip install -r requirements/development.txt```.

1. Kopiera filen server/project_settings/settings/local_template.py till server/project_settings/settings/local.py och fyll i informationen baserat på användarnamn och dylikt som du använder under steg 1 och 2.

1. Nu ska vi sätta upp Django i PyCharm. Gå till _File -> Settings -> Languages & Frameworks -> Django. Checka i 'Enable Django Support'. Ställ sedan in följande:
   - Django project root: Välj 'server'-mappen
   - Settings: välj "project_settings/settings/development.py"
   - Manage script: välj "scripts/manage.py"
   
1. När du sparat inställningarna borde du kunna verifiera att saker funkar genom att faktiskt se saker på knappen "Show structure".

1. Sätt upp run-kommandot genom att trycka på "Add configuration" i över högra hörnet. Lägg till en 'Django server' configuration. Viktigt är att du väljer rätt interpreter och att du lägger till "DJANGO_SETTINGS_MODULE=project_settings.settings.development" under Enviroment variables (variablerna skiljs med semikolon).

1. Nu ska vi bygga databasen. Välj _Tools -> Run manage.py Task_. Du får en prompt. Kör följande 
    1. ```collectstatic```
    1. ```makemigrations```
    1. ```migrate```
    1. ```createsuperuser``` (Följ instruktionerna. Här får du välja själv vilka inloggningsdetaljer du ska ha. 'admin' är ett passande användarnamn.)

1. Nu är du klar! Starta servern i development-mode genom att trycka på play-knappen.

### Windows (med PyCharm)
1. Öppna PyCharm och välj "Get from VCS". Logga in med Github och ladda ned projektet.

1. Ladda ned MariaDB (open source MySQL-databas) från [downloads.mariadb.org/mariadb/](downloads.mariadb.org/mariadb/). Följ installeringen.

1. Öppna det nya programmet "MySQL Client". Du bör få en terminal med prompten MariaDB [(None)]> när du angivit lösenord. Skriv samma kommandon som listas som punkterna 5-9 under punkt 2 i "Unix-baserade system (utan PyCharm)".

1. Följ instruktion 2 - 7 i "Unix-baserade system (med PyCharm)".
