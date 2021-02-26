import { lineToEndpoint } from "../constants/api.constants";
import { Arrival } from "../models/arrival.model";
import { Line } from "../models/lines.model";
import { FeedMessage, TripUpdate_StopTimeUpdate } from "../proto/gtfs-realtime";
import { MTAApiService } from "./mta-api.service";
import { RouteService } from "./route.service";




export class ArrivalsService {
    mtaEndpointMap: Map<Line, string>

    constructor( private mtaApiService: MTAApiService, private routeService: RouteService ) {
        this.mtaEndpointMap = lineToEndpoint
    }


    // Returns list of timestamps of next arriving trains in ascending order
    // TODO: create function to get data for multiple lines while using single api call 
    // StationId should be the gtfsStopId
    async getNextArrivals(line: Line, stopId: string, direction: string): Promise<Arrival[]> {
        const stopIdWithDir = stopId + direction

        const feedMessagePromise = this.getRealtimeLineData(line)

        // need to also return the trip routeId

        const ret = feedMessagePromise.then((feedMessage) => {
            return feedMessage.entity.map((feedMessage) => {
                if (feedMessage.tripUpdate) {
                    const routeId = feedMessage.tripUpdate.trip.routeId
                    return feedMessage.tripUpdate.stopTimeUpdate.map((x) => <[string, TripUpdate_StopTimeUpdate]>[routeId, x])
                }
                return []
            }).reduce( (acc, cv) => acc.concat(cv))
            // Filter for where stopId === desired stop
        }).then((allStopUpdates) => {
            return allStopUpdates.filter((stopUpdate) => {
                return stopUpdate[1].stopId === stopIdWithDir
            })
            // Grab the arrival times for the stop
        }).then((stationStopUpdates) => {
            return stationStopUpdates.map((stopUpdate) => <[string, number]>[stopUpdate[0], stopUpdate[1].arrival.time])
            // Convert to Arrival
        }).then((stopUpdates) => {
            return Promise.all(stopUpdates.map( async (stopUpdate) => {
                const routeId = stopUpdate[0]
                const arrivalTime = stopUpdate[1]
                const route = await this.routeService.get(routeId)
                return new Arrival(route, arrivalTime)
            }))
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