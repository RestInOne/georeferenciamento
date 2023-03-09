import { ICondition } from "./condition"

export interface IExam {
    id: string
    conditions: ICondition[]
    patient_id: string
    doctor_id: string
    date: string
}