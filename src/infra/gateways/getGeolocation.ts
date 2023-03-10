import axios from "axios";
import { IAddress, IGeolocation } from "../../domain";
import { getGeolocationRepository } from "../../domain/repositories/address";
import HttpClient from "../http/HttpClient";

const key = "acf1bdd7a84f4dd0beb226de9072d1f9"

export default class getGeolocation implements getGeolocationRepository {
    constructor(
        readonly httpClient: HttpClient,
    ) {}

    async get(address: Partial<IAddress>): Promise<IGeolocation> {
        let number = address.number+''
        let street = address.street.replace(/ /g, '%20')
        let city = address.city.replace(/ /g, '%20')
        let state = ''
        if(address.state){
            state = address.state.replace(/ /g, '%20')
        }
    
        const geolocation : IGeolocation = {
        lon: 0,
        lat: 0
        }
    
        const response = await this.httpClient.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${number}%20${street}%20${city}%20${state}&apiKey=${key}`)
            
        geolocation.lon = response.features[0].properties.lon
        geolocation.lat = response.features[0].properties.lat
    
        return geolocation
    }
}