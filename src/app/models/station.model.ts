import { Line } from "./lines.model";


export type Arrivals = Array<Date>

export class Station {
    constructor(
        stationId: number,
        gtfsStopId: string,
        line: string,
        stopName: string,
        routes: Array<Line>,
        latitude: number,
        longitude: number,
        northDirLabel: string,
        southDirLabel: string
    ){}
}