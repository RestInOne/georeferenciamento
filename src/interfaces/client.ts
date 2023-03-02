import { ICondition } from "./condition"

export interface IClient {
    id: string
    name: string
    cpf: string
    bornYear: Date
    age: number
    condition: ICondition
}