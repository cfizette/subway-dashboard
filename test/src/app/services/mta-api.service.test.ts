import { lineToEndpoint, mtaAPIKey } from "../../../../src/app/constants/api.constants"
import { Line } from "../../../../src/app/models/lines.model"
import { MTAApiService } from "../../../../src/app/services/mta-api.service"
import { StationsService } from "../../../../src/app/services/stations.service"



describe('MTA Service', () => {
    it('should do something', () => {
        const mtaSvc = new MTAApiService(mtaAPIKey)
        const res = mtaSvc.get(lineToEndpoint.get(Line._1))
        res.then( r => {
            r
        })
    })
})


describe('Station Service', () => {
    it('should do something', () => {
        const mtaSvc = new MTAApiService(mtaAPIKey)
        const stationService = new StationsService(mtaSvc)
        const res = stationService.getNextArrivals(Line._1)
        res.then( r => {
            console.log(r)
        })
    })
})