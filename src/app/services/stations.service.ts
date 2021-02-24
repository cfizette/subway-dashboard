import { ReadStream } from "fs";
import { lineToEndpoint } from "../constants/api.constants";
import { Line } from "../models/lines.model";
import { Arrivals } from "../models/station.model";
import { FeedMessage } from "../proto/gtfs-realtime";
import { MTAApiService } from "./mta-api.service";




export class StationsService {
    mtaEndpointMap: Map<Line, string>

    constructor( private mtaApiService: MTAApiService ) {
        this.mtaEndpointMap = lineToEndpoint
    }

    async getNextArrivals(line: Line) {
        const endpoint = this.mtaEndpointMap.get(line)
        if (endpoint) {
            const respPromise = this.mtaApiService.get(endpoint)
            respPromise.then((resp) => {
                if (resp.status !== 200) {
                    // TODO: handle error
                }
                resp.arrayBuffer().then((a) => {
                    const uint8Array = new Uint8Array(a)
                    const foo = FeedMessage.decode(uint8Array)
                    console.log(foo)
                })
            })
            
        }
    }
}