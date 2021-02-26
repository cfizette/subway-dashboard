import { Route } from "../models/route.model";


export class RouteService {


    get(routeId: string): Route {
        return new Route('','','','','','')
    }
}