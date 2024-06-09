# STEPS TO RUN REPO

- git clone https://github.com/MananKansara09/relatime-polling-system-backend.git
- run mongoDB on system or on docker container
- npm i
- create one .env.development.local file
- set this kind of specific tokens in tha .env.development.local
```
NODE_ENV=development
PORT=5001
DB_HOST=localhost
DB_PORT=27017
DB_DATABASE=poll
SECRET_KEY=sjdfkhfsjkdhfkjsd
LOG_FORMAT=dev
LOG_DIR=../public
ORIGIN=*
MONGO_URI=mongodb://localhost:27017/
```
