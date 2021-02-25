import { ReadStream } from "fs";
import { lineToEndpoint } from "../constants/api.constants";
import { Line } from "../models/lines.model";
import { Arrivals, Station } from "../models/station.model";
import { FeedMessage } from "../proto/gtfs-realtime";
import { MTAApiService } from "./mta-api.service";




export class StationsService {
    mtaEndpointMap: Map<Line, string>

    constructor( private mtaApiService: MTAApiService ) {
        this.mtaEndpointMap = lineToEndpoint
    }

    // Returns list of timestamps of next arriving trains in ascending order
    // TODO: create function to get data for multiple lines while using single api call 
    // StationId should be the gtfsStopId
    async getNextArrivals(line: Line, stopId: string, direction: string): Promise<number[]> {
        const stopIdWithDir = stopId + direction

        const feedMessagePromise = this.getRealtimeLineData(line)

        const allStopUpdates = feedMessagePromise.then((feedMessage) => {
            return feedMessage.entity.map((feedEntity) => {
                if (feedEntity.tripUpdate) return feedEntity.tripUpdate.stopTimeUpdate
                return []
            }).reduce( (acc, cv) => acc.concat(cv))
        })
        
        const stationStopUpdates = allStopUpdates.then((allStopUpdates) => {
            return allStopUpdates.filter((stopUpdate) => {
                return stopUpdate.stopId === stopIdWithDir
            })
        })

        const ret = stationStopUpdates.then((stationStopUpdates) => {
            return stationStopUpdates.map((stopUpdate) => stopUpdate.arrival.time)
        })

        return ret
        
    }

    // Makes call to MTA API and decodes response into FeedMessage
    // Returns a rejected promise if response status code is not 200
    async getRealtimeLineData(line: Line): Promise<FeedMessage> {
        const endpoint = this.mtaEndpointMap.get(line)
        if (endpoint) {
            const respPromise = this.mtaApiService.get(endpoint)
            return respPromise.then((resp) => {
                if (resp.status !== 200) {
                   throw new Error("Response code != 200")
                }
                return resp.arrayBuffer()
            }).then((buff) => {
                const uint8Array = new Uint8Array(buff)
                return FeedMessage.decode(uint8Array)
            }).catch(error => {
                return Promise.reject(error)
            })
        }
        return Promise.reject(new Error("Subway line not found"))
    }
}