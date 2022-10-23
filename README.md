## Description
Buffering records in в ClickHouse

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev

```

## Docker

```bash
# build
$ docker-compose up --build

# start
$ docker-compose up -d

```
## Methods and data

```
# create record
post http://127.0.0.1:3001/create

# json object
{
    "id": String,
    "full_name": "String",
    "description": "String",
    "tableName": "Text"
}

# cURL example
curl --location --request POST 'http://127.0.0.1:3001/create' \
--header 'accept: */*' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 12,
    "full_name": "Petrov Dmitriy Ivanovich",
    "description": "Nunc odio sapien, aliquet quis vehicula a, dapibus nec ex. Donec luctus elementum ligula sit amet sodales. Donec consectetur gravida sodales. Nullam sit amet turpis vel felis aliquam eleifend id tempor augue. Integer velit libero, tincidunt at eleifend eu, pellentesque ut diam. Aliquam auctor est ac eros molestie,",
    "tableName": "table1"
}'
```
## Stay in touch
- Author - [Alex Alferov](https://kamilmysliwiec.com)
