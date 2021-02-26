import { Route } from "./route.model"


export class Arrival {
    constructor(
        public route: Route,
        public time: number
    ){}
}