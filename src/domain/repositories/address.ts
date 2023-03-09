import { IGeolocation, IAddress } from "..";

export type getGeolocationRepository = (address: Partial<IAddress>) => Promise<IGeolocation>