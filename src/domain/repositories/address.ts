import { IGeolocation, IAddress } from "..";

export interface getGeolocationRepository { 
    get: (address: Partial<IAddress>) => Promise<IGeolocation>; 
}