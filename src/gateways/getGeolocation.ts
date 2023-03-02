import axios from "axios";
import { IGeolocation } from "../interfaces/geolocation";

export default async function getGeolocationByAddress(streetName: string, addressNumber: number){
    let number = addressNumber+''
    let street = streetName.replace(/''/g, '+')
    const geolocation = await axios.post('https://geocode.maps.co/search?q=' + street + '+' + number).then((res) => {
        let geolocation : IGeolocation =  {
            lat : +res.data[1].lat,
            lon : +res.data[1].lon
        }
         return geolocation
    })
    return geolocation
}