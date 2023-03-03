import React, { useState } from 'react';
import * as S from './styled'
import { filter } from '../../state/clients'
import { Filters } from '../../enums/filter'
import { useRef } from 'react'
import { useSetRecoilState } from 'recoil'


function capitalizeWord(str: string) {
  const words = str.split(' ');

  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
  }

  return words.join(' ');
}

export function Sidebar() {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const selectorRef = useRef<HTMLSelectElement>(null);
  const setFilters = useSetRecoilState(filter);

  const conditions: string[] = [
    'todos5',
    'resistencia_insulina_leve',
    'resistencia_Insulina_Moderada',
    'resistencia_Insulina_Severo5',
    'diabetico',
    'risco_amputação_leve',
    'risco_moderado',
    'risco_severo5',
    'doente_metabolico_severo5',
    'hipertenso_leve',
    'hipertenso_moderado',
    'hipertenso_severo',
    'risco_pico_hipertensivo',
    'risco_infarto_e_AVC',
    'risco_evento_cardiaco_grave5',
    'sobrepeso',
    'obesidade_1',
    'obesidade_2',
    'obesidade_35',
    'stress_elevado',
    'stress_severo5',
    'sindrome_vagal5',
    'TDAH5',
    'depressão_leve_ou_moderada',
    'depressão_severa'
  ]

  return (
    <S.Wrapper>
      <S.ButtonOpenOrCloseSidebar onClick={() => setIsOpened(old => !old)}>
        <S.ArrowLeft />
      </S.ButtonOpenOrCloseSidebar>
      <S.WrapperConditions openOrCloseSide={isOpened}>
        <S.LabelTitle>Selecione uma Condição:</S.LabelTitle>
        <S.Container>
          {
            conditions.map((condition, index, conditionArray) => {
              return (
                <>
                  <S.Flex>
                    <S.CheckBoxRoot id={condition}>
                      <S.CheckBoxIndicator>
                        <S.IconCheck />
                      </S.CheckBoxIndicator>
                    </S.CheckBoxRoot>
                    <S.Label>{capitalizeWord(condition.replace(/_/g, ' ').replace('5', ''))}</S.Label>
                  </S.Flex>
                  {conditionArray[index].endsWith("5") ? (<S.Separator />) : (<></>)}
                </>
              )
            })
          }
        </S.Container>
      </S.WrapperConditions>
    </S.Wrapper>
  )
}