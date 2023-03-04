import { Filters } from "../enums/filter";
import { Colors } from "../enums/colors";

type getColorByCondition = (condition: string) => string

export const getColorByCondition : getColorByCondition = (condition: string) => {
    let referenceColor : string = "black"

    switch (condition){
        case Filters.LIGHT_RESISTENCE_INSULINE:
            referenceColor = Colors.SILVER
        break;
        case Filters.MEDIUM_RESISTENCE_INSULINE:
            referenceColor = Colors.LIGHT_GRAY
        break;
        case Filters.SEVERE_RESISTENCE_INSULINE:
            referenceColor = Colors.DARK_GRAY
        break;
        case Filters.DIABETES:
            referenceColor = Colors.PASTEL_BLUE
        break;
        case Filters.LIGHT_AMPUTATION_RISK:
            referenceColor = Colors.PASTEL_BLUE
        break;
        case Filters.MEDIUM_AMPUTATION_RISK:
            referenceColor = Colors.PASTEL_BLUE
        break;
        case Filters.SEVERE_AMPUTATION_RISK:
            referenceColor = Colors.PASTEL_BLUE
        break;
        case Filters.SEVERE_METABOLIC_SICKNESS:
            referenceColor = Colors.PASTEL_BLUE
        break;
        case Filters.LIGHT_HYPERTENSION:
            referenceColor = Colors.BEIGE
        break;
        case Filters.MEDIUM_HYPERTENSION:
            referenceColor = Colors.PASTEL_RED
        break;
        case Filters.SEVERE_HYPERTENSION:
            referenceColor = Colors.DARK_RED
        break;
        case Filters.HEART_ATTACK_STROKE_RISK:
            referenceColor = Colors.BLACK
        break;
        case Filters.SERIOUS_CARDIO_EVENT_RISK:
            referenceColor = Colors.BLACK
        break;
        case Filters.OVERWEIGHT:
            referenceColor = Colors.LIGHT_BLUE
        break;
        case Filters.OBESETY_LEVEL_ONE:
            referenceColor = Colors.DARK_PASTEL_BLUE
        break;
        case Filters.OBESETY_LEVEL_TWO:
            referenceColor = Colors.LAKE_BLUE
        break;
        case Filters.OBESETY_LEVEL_THREE:
            referenceColor = Colors.DARK_BLUE
        break;
        case Filters.ELEVATED_STRESS:
            referenceColor = Colors.LILAC
        break;
        case Filters.SEVERE_STRESS:
            referenceColor = Colors.PINK
        break;
        case Filters.VAGAL_SYNDROME:
            referenceColor = Colors.VIOLET
        break;
        case Filters.ADHD:
            referenceColor = Colors.YELLOW
        break;
        case Filters.LIGHT_MEDIUM_DEPRESSION:
            referenceColor = Colors.DARK_PURPLE
        break;
        case Filters.SEVERE_DEPRESSION:
            referenceColor = Colors.DARK_PURPLE
        break;
    }

    return referenceColor
}