import { lineToEndpoint, mtaAPIKey } from "../../../../src/app/constants/api.constants"
import { Line } from "../../../../src/app/models/lines.model"
import { MTAApiService } from "../../../../src/app/services/mta-api.service"
import { ArrivalsService, StationsService } from "../../../../src/app/services/arrivals.service"



describe('MTA Service', () => {
    it('should do something', () => {
        const mtaSvc = new MTAApiService(mtaAPIKey)
        const res = mtaSvc.get(lineToEndpoint.get(Line._1))
        res.then( r => {
            r
        })
    })
})


describe('Arrivals Service', () => {
    it('should do something', async () => {
        const mtaSvc = new MTAApiService(mtaAPIKey)
        const stationService = new ArrivalsService(mtaSvc)
        const res = await stationService.getNextArrivals(Line._1, '103', 'N')
        console.log(res)
    })
})