import { ICondition } from "./condition"
import { IAddress } from './address'
import { IGeolocation } from "./geolocation"

export interface IClient {
    id: string
    name: string
    cpf: string
    bornYear: number
    age: number
    condition: ICondition[]
    address: IAddress
    geolocation: IGeolocation
}