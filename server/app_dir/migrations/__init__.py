"""
The migrations folder of an app contains the migrations of the database.

A migration is a file on the structure 'NNNN_<some_name>.py' which sorted according to 'NNNN' will define a
series of changes to the database structure. If the changes are run in that exact order again the same
database structure will be achieved. These migration files and the separation between structural changes are
dependant on when you update the Models and run ```python scripts/manage.py makemigrations```.
"""