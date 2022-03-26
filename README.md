# Next.js OpenJira App

For run local need the database
``
docker-compose up -d
``

* -d, means _detached
* MongoDb URL Local:
``
  mongodb://localhost:27017/entriesdb  
``
##Configure environment variables
Rename __.env.template__ to __.env__

##FIll the database with test information
``
http://localhost.com/api/seed
``