import { NumberSymbol } from "@angular/common";
import { Line } from "./lines.model";


export type Arrivals = Array<Date>

export const DIRECTION = {
    N: 'N',
    S: 'S'
}

export class Station {
    stationId: number
    gtfsStopId: string
    line: string
    stopName: string
    routes: Array<Line>
    latitude: number
    longitude: number
    northDirLabel: string
    southDirLabel: string

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