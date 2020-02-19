import { Request, Response } from 'express'

import * as fs from 'fs'

import * as axios from 'axios'

import * as jwt from 'jsonwebtoken'


export class TokenController {

    private readonly RSA_PUBLIC_KEY = fs.readFileSync('./.keys/public.key')
    private readonly RSA_PRIVATE_KEY = fs.readFileSync('./.keys/private.key')

    private readonly userName = 'madgunner'
    private readonly password = 'megatron'

    public signJwt(request: Request, response: Response): Response | string {

        const { userName, password } = request.body 

        if (userName === this.userName && password === this.password) {
            let expiry = new Date()
            expiry.setDate(expiry.getDate() + 7)

            const payload = {
                _id: "5d2f818f81808747b77a8d17",
                username: this.userName,
                exp: Math.floor(expiry.getTime() / 1000)
            }

            const access_token = jwt.sign(payload, this.RSA_PRIVATE_KEY, { algorithm: 'RS256' })

            return access_token

        } else {
            return response.status(400).json({ message: 'your username or password is incorrect' })
        }

    }

    public verifyToken(request: Request, response: Response): Response | string | object {

        let token = request.headers.authorization

        if (!token) {
            return response.status(400).json({ message: 'A valid token is required to access this resource' })
        }

        if (token.startsWith('Bearer ')) {

            token = token.slice(7, token.length).trimLeft()

            const payload = jwt.verify(token, this.RSA_PUBLIC_KEY)

            console.log(payload)
            return payload
        }
        else {
            return response.status(400).json({ message: 'The token is not a valid Bearer token' })
        }
        
    }

}