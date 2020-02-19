import express, { Request, Response, Application } from 'express'
import * as path from 'path'
import * as bodyParser from 'body-parser'
import { Readable, Transform } from 'stream'
import * as fs from 'fs'
import * as fsExtra from 'fs-extra'
import * as uuid from 'uuid'
import cors from 'cors'


import { UsersController } from './controllers/users.controllers'
import { TokenController } from './controllers/token.controller'

declare const module: any

class Server {

    private readonly PORT = 8000

    private app: any

    private tokenController: TokenController = new TokenController()

    constructor() {
        this.app = express()
        this.setMiddleware()
        this.configureRoutes()
        this.listen()
    }

    private setMiddleware(): void {
        this.app.set('view engine', 'pug')
        this.app.set('views', path.join(__dirname, 'server', 'views'))

        this.app.use(cors())
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(bodyParser.json())

    }

    private configureRoutes(): void {
        this.app.get('/', (request: Request, response: Response) => {
            const template = path.join(__dirname, 'server', 'views', 'index.html')
            response.sendFile(template)
        })

        this.app.post('/token', (request: Request, response: Response) => {
            const token = this.tokenController.signJwt(request, response)

            return response.status(200).json({ access_token: token })
        })

        this.app.post('/verify', (request: Request, response: Response) => {
            const payload = this.tokenController.verifyToken(request, response)

            return response.status(200).json(payload)
        })

        
    }

    private listen(): void {
        this.app.listen(this.PORT, () => console.log(`Express app running on port ${this.PORT}`))

        if (module.hot) {
            module.hot.accept()
            module.hot.dispose(() => this.app.close())
        }
    }
}


new Server()