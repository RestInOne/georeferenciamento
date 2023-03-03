import axios from "axios";
import { IGeolocation } from "../interfaces/geolocation";

const key = "acf1bdd7a84f4dd0beb226de9072d1f9"

type geolocationGateway = (street: string, number: number, city: string) => Promise<IGeolocation>

export const getGeolocation : geolocationGateway = async (streetName: string, addressNumber: number, cityname: string) => {
    let number = addressNumber+''
    let street = streetName.replace(/ /g, '%20')
    let city = cityname.replace(/ /g, '%20')

    const geolocation : IGeolocation = {
        lon: 0,
        lat: 0
    }

        const response = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${number}%20${street}%20${city}&apiKey=${key}`)

        geolocation.lon = response.data.features[0].properties.lon
        geolocation.lat = response.data.features[0].properties.lat    

      return geolocation
}