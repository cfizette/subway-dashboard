import { NumberSymbol } from "@angular/common";
import { Line } from "./lines.model";
import { Route } from "./route.model";




export const DIRECTION = {
    N: 'N',
    S: 'S'
}

export class Station {

    constructor(
        public stationId: number,
        public gtfsStopId: string,
        public line: string,
        public stopName: string,
        public routes: Array<Line>,
        public latitude: number,
        public longitude: number,
        public northDirLabel: string,
        public southDirLabel: string
    ){}
}