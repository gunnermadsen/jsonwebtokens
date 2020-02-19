# JSON Web Token Demo

## This application both signs and verifies JSON Web Tokens using an RSA Key pair and exposes two endpoints

### /verify
### /token


# Getting started:
## To Start the development server without webpack hot module replacement, run: 
### 'nodemon build/server.js'

## To start with webpack development server, run: 
### 'npm run wp:build'



# Endpoints 
## To generate a token, open postman and send a POST request to http://localhost:8000/token with the request body set to:

{
    "userName": "madgunner",
    "password": "megatron"
}


## To verify a token, a body is not needed, but the authorization header needs to be set to the token. From there, send an HTTP POST Request to http://localhost:8000/verify 

