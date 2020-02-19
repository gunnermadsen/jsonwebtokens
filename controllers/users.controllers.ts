import { Request, Response } from "express";

import * as axios from 'axios'

export class UsersController {

    public static async getUsers(request: Request, response: Response): Promise<axios.AxiosResponse<any>> {

        try {
            // const result = await axios.default.get(`https://reqres.in/api/users/${request.params.id}`) //${request.params.userid}
            const result = await axios.default.get(`https://reqres.in/api/users?page=${request.query.id}`) //${request.params.userid}

            return result.data

        } catch (error) {
            throw new Error(error)
        }
    }
    
}