TODO in order to get this app up and running on heroku:

1. (local development) Create nodemon.json env variable file in root directory, 
using the template:

{
  "env": {
    "DB_USER": "",
    "DB_PASSWORD": "",
    "DB_NAME": "",
    "JWT_KEY": ""
  }
}

2 (heroku) Add the same variables in heroku project (project settings->Config Vars)

2. (heroku) Change package.json start script to execute "node app"
