# BD Postgres

1.  Crear dockers PostgresSQL y PgAdmin , fichero docker-compose.yml ( > docker compose up)
2.  Instalar cliente Postgres ( > apt install postgresql-client-common) 
3.  Acceder a BD (> psql postgres://ateneumaquia:apmaquia14@0.0.0.0:5432/ateneu)
4.  Copiar base datos desde la carpeta "prisma" ( > docker exec postgres_container psql -U ateneumaquia ateneu -f ateneu.sql)


# Pruebas
1. Diagrama de la base de datos (DiagramAteneuDB.png)
2. Prueba endpoints Thunder Client (thunder-collection_ateneu-api.json), bodies listos para probar.

    
