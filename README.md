# Tournament Manager 2.0 API
This repository contains code for server side of the project.
## To Run the Application

When developing locally, you can start the app by running:

```
npm start
```

## Node and NPM install 

### for macOS

````
$ brew update
$ brew install node
````
To verify if it is working
````
$node --version
$npm --version
````
### for Windows
visit [nodejs.org](https://nodejs.org/en/) to download the installer for your operating system

## MongoDB install

### for macOS

````
$ brew update
$ brew tap mongodb/brew
$ brew install mongodb-community@4.2
````
To verify if it is working, type the following. this will list the currently running Mongo processes
````
$ ps -ef | grep mongod
````
### for Windows
Visit [MongoDb installation center](https://docs.mongodb.com/manual/installation/) to download the installer for your operating system

Once installation is complete, run the following commands

````
$ cd C:\
$ md "\data\db"
````

# FAQ
## Add new fields
- model file
- schema file
- mutation file
- query file
- Front End (see corresponding FAQ)

## How to verify backend via GraphQL playground
- http://localhost:4000/api
- right bottom add header, e.g. `{"authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOGI5MTQ3ZGIzOTA2NTEwNmFmZGUxYiIsImlhdCI6MTU4NjIwNDk5OX0.nq6ryEJW0cv0luhWo8_s9vnvIDGjk1oqIatm7qfJ8Mo"
                                 }`
- `authorization` can be obtained from frontend's post header

## Monitor mongo db
- get the config of mongod parameter (e.g `mongod --config /usr/local/etc/mongod.conf`)
- get the log path from config file, e.g. `/usr/local/var/log/mongodb/mongo.log`
- `tail -100f /usr/local/var/log/mongodb/mongo.log`

## newNote on playground
- main box
    - `
      mutation newNote ($input: TournamentInput!){
        newNote( note:$input) {
          title
          content
          rule
        }
      }`
- variable
    - `
  {
    "input": {
    "title": "Bigtitle!",
    "content": "Great content!",
    "rule": "Strange rule"
  	}
  }
`
# ref
## gql syntax
https://www.apollographql.com/docs/apollo-server/api/apollo-server/#gql
