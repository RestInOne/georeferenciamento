export interface ICondition {
    name: ConditionName
}

export enum ConditionName {
    LIGHT_RESISTENCE_INSULINE = 'resistencia_insulina_leve',
    MEDIUM_RESISTENCE_INSULINE = 'resistência_Insulina_Moderada',
    SEVERE_RESISTENCE_INSULINE = 'resistência_Insulina_Severo5',
    DIABETES = 'diabético',
    LIGHT_AMPUTATION_RISK = 'risco_amputação_leve',
    MEDIUM_AMPUTATION_RISK = 'risco_moderado',
    SEVERE_AMPUTATION_RISK = 'risco_severo',
    SEVERE_METABOLIC_SICKNESS = 'doente_metabólico_severo5',
    LIGHT_HYPERTENSION = 'hipertenso_leve',
    MEDIUM_HYPERTENSION = 'hipertenso_moderado',
    SEVERE_HYPERTENSION = 'hipertenso_severo',
    HYPERTENSION_PEAK_RISK = 'risco_pico_hipertensivo',
    HEART_ATTACK_STROKE_RISK = 'risco_infarto_e_AVC',
    SERIOUS_CARDIO_EVENT_RISK = 'risco_evento_cardíaco_grave5',
    OVERWEIGHT = 'sobrepeso',
    OBESETY_LEVEL_ONE = 'obesidade_1',
    OBESETY_LEVEL_TWO = 'obesidade_2',
    OBESETY_LEVEL_THREE = 'obesidade_35',
    ELEVATED_STRESS = 'stress_elevado',
    SEVERE_STRESS = 'stress_severo',
    VAGAL_SYNDROME = 'síndrome_vagal5',
    ADHD = 'TDAH',
    LIGHT_MEDIUM_DEPRESSION = 'depressão_leve_ou_moderada',
    SEVERE_DEPRESSION = 'depressão_severa'
}
