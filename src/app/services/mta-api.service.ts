
import fetch, { Response } from 'node-fetch';


export class MTAApiService {
    constructor( private apiKey: string){}

    async get( endpoint: string ): Promise<Response> {

        return fetch ( endpoint, {
            method: 'GET',
            headers: {
                'x-api-key': this.apiKey
            }
        })
    }
}
