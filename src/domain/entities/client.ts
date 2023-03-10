import { ICondition } from "./condition"
import { IAddress } from './address'
import { IGeolocation } from "./geolocation"
import { IExam } from "./exam"


export interface IClient {
    id: string
    name: string
    address: IAddress
    cpf: string
    exam: IExam
    age: number
    geolocation: IGeolocation
}