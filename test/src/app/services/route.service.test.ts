import { RouteService } from "../../../../src/app/services/route.service"


describe('Route Service', () => {
    it('should load csv', async () => {
        const p = __dirname
        const stationService = new RouteService(p + "/../../../../mta-assets/routes.csv")
        const res = await stationService.get('1')
        console.log(res)
    })
})