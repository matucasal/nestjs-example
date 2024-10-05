
## Installation

```bash
$ npm install
```

## Setup the environment

Create a .env file in the root of the project with the following content:

```bash
COUNTRIES_API_URL=https://api.jsonbin.io/v3/b/5f69afbe65b18913fc510ce8
NODE_ENV=development
SIMPLE_ARRAY=1,2,3
```

## Running the app

The app run by default in port 3000

```bash
# watch mode
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test
```

## Test the project with Swagger

Run the app and go to

http://localhost:3000/swagger

There you can test the API with Swagger UI.

## Endpoints

GET /countries?order=asc&filter=and

POST /reverse/:string

POST /append?end=fin&start=inicio


## Run the project with Docker

Use the docker compose file

```bash
docker compose up
```

Or build the image and run the container

```bash
docker build -t nest-app .

docker run -p 3000:3000 nest-app
```


