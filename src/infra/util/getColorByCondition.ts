import { Colors } from "../enums/colors";
import { ConditionName } from "../../domain";

type getColorByCondition = (condition: string) => string

export const getColorByCondition : getColorByCondition = (condition: string) => {
    let referenceColor : string = "black"

    switch (condition){
        case ConditionName.LIGHT_RESISTENCE_INSULINE:
            return Colors.SILVER
        case ConditionName.MEDIUM_RESISTENCE_INSULINE:
            return Colors.LIGHT_GRAY
        case ConditionName.SEVERE_RESISTENCE_INSULINE:
            return Colors.DARK_GRAY
        case ConditionName.DIABETES:
            return Colors.PASTEL_BLUE
        case ConditionName.LIGHT_AMPUTATION_RISK:
            return Colors.PASTEL_BLUE        
        case ConditionName.MEDIUM_AMPUTATION_RISK:
            return Colors.PASTEL_BLUE
        case ConditionName.SEVERE_AMPUTATION_RISK:
            return Colors.PASTEL_BLUE
        case ConditionName.SEVERE_METABOLIC_SICKNESS:
            return Colors.PASTEL_BLUE        
        case ConditionName.LIGHT_HYPERTENSION:
            return Colors.BEIGE
        case ConditionName.MEDIUM_HYPERTENSION:
            return Colors.PASTEL_RED
        case ConditionName.SEVERE_HYPERTENSION:
            return Colors.DARK_RED
        case ConditionName.HEART_ATTACK_STROKE_RISK:
            return Colors.BLACK
        case ConditionName.SERIOUS_CARDIO_EVENT_RISK:
            return Colors.BLACK
        case ConditionName.OVERWEIGHT:
            return Colors.LIGHT_BLUE
        case ConditionName.OBESETY_LEVEL_ONE:
            return Colors.DARK_PASTEL_BLUE
        case ConditionName.OBESETY_LEVEL_TWO:
            return Colors.LAKE_BLUE
        case ConditionName.OBESETY_LEVEL_THREE:
            return Colors.DARK_BLUE
        case ConditionName.ELEVATED_STRESS:
            return Colors.LILAC
        case ConditionName.SEVERE_STRESS:
            return Colors.PINK
        case ConditionName.VAGAL_SYNDROME:
            return Colors.VIOLET
        case ConditionName.ADHD:
            return Colors.YELLOW
        case ConditionName.LIGHT_MEDIUM_DEPRESSION:
            return Colors.DARK_PURPLE
        case ConditionName.SEVERE_DEPRESSION:
            return Colors.DARK_PURPLE
        default:
            return
    }

    return referenceColor
}
