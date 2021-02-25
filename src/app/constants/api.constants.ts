import { Line } from "../models/lines.model";


export const mtaAPIKey = "pFuBYmPrcl3uu601f9dGF9rjQlQ8w0Wh1vYUEZqC"

export const lineToEndpoint: Map<Line, string> = new Map([
    [Line._1,"https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs"],
    [Line._3,"https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs"],
    [Line._2,"https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs"],
    [Line._4,"https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs"],
    [Line._5,"https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs"],
    [Line._6,"https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs"],
    [Line._7,"https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-7"],
    [Line.A,"https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace"],
    [Line.B,"https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-bdfm"],
    [Line.C,"https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace"],
    [Line.D,"https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-bdfm"],
    [Line.E,"https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace"],
    [Line.F,"https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-bdfm"],
    [Line.G,"https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-g"],
    [Line.J,"https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-jz"],
    [Line.L,"https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-l"],
    [Line.M,"https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-bdfm"],
    [Line.N,"https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-nqrw"],
    [Line.Q,"https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-nqrw"],
    [Line.R,"https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-nqrw"],
    [Line.W,"https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-nqrw"],
    [Line.Z,"https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-jz"],
    [Line.SIR,"https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-si"]
])