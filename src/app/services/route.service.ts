import { Route } from "../models/route.model";
import csv = require('csv-parser')
import fs = require('fs');


const ROUTE_CSV = __dirname + '/../../../mta-assets/routes.csv'

export class RouteService {

    routeMap: Promise<Map<string, Route>>

    constructor(fileName: string = ROUTE_CSV){
        this.routeMap = this.loadRows(fileName)
    }

    private rowsToRoutes(rows: any[]) {
        const routes = rows.map((row) => {
            return new Route(
                row.route_id,
                row.route_short_name,
                row.route_long_name,
                row.route_desc,
                row.route_color,
                row.route_text_color
            )
        })
        return routes
    }

    private loadRows(fileName: string): Promise<Map<string, Route>> {
        
        return new Promise((resolve, reject) => {
            const rows = []

            fs.createReadStream(fileName)
            .pipe(csv())
            .on('data', (data) => {
                rows.push(data);
            })
            .on('end', () => {
                const routes = this.rowsToRoutes(rows)
                const routeMap = new Map(routes.map((route) => <[string, Route]>[route.id, route]))
                resolve(routeMap)
              })
            .on('error', error => reject(error))
        })
    }


    get(routeId: string): Promise<Route> {
        return this.routeMap.then((rm) => rm.get(routeId))
    }
}