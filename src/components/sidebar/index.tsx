import React, { useState } from 'react';
import * as S from './styled'
import { filter } from '../../state/clients'
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
  const [selectedValues, setSelectedValues] = useState([]);

  const setFilters = useSetRecoilState(filter);

  const conditions: string[] = [
    'todos5',
    'resistencia_insulina_leve',
    'resistência_Insulina_Moderada',
    'resistência_Insulina_Severo5',
    'diabético',
    'risco_amputação_leve',
    'risco_moderado',
    'risco_severo5',
    'doente_metabólico_severo5',
    'hipertenso_leve',
    'hipertenso_moderado',
    'hipertenso_severo',
    'risco_pico_hipertensivo',
    'risco_infarto_e_AVC',
    'risco_evento_cardíaco_grave5',
    'sobrepeso',
    'obesidade_1',
    'obesidade_2',
    'obesidade_35',
    'stress_elevado',
    'stress_severo5',
    'síndrome_vagal5',
    'TDAH5',
    'depressão_leve_ou_moderada',
    'depressão_severa'
  ]

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>, condition: string) => {
    const isChecked = event.target.checked;

    let newSelectedValues = [];

    if(isChecked) {
      if(!selectedValues.includes(condition)) {
        newSelectedValues = [...selectedValues, condition.replace('5', '')]
      } 
    } else {
      newSelectedValues = selectedValues.filter(selectedValue => selectedValue !== condition)
    }

    setSelectedValues(newSelectedValues);
  }

  return (
    <S.Wrapper>
      <S.ButtonOpenOrCloseSidebar isOpen={isOpened} onClick={() => setIsOpened(old => !old)}>
        {isOpened ? (<S.ArrowLeft />) : (<S.ArrowRight />)}
      </S.ButtonOpenOrCloseSidebar>

      <S.WrapperConditions openOrCloseSide={isOpened}>
        <S.LabelTitle>Selecione uma Condição:</S.LabelTitle>
        <S.ScrollRoot>
          <S.ScrollView>
            <S.Container>
              {
                conditions.map((condition, index, conditionArray) => {

                  return (
                    <>
                      <S.Flex>
                        <S.Checkbox type="checkbox" name={condition} onChange={(event) => handleChecked(event, condition)} />
                        <S.Label>{capitalizeWord(condition.replace(/_/g, ' ').replace('5', ''))}</S.Label>
                      </S.Flex>
                      {conditionArray[index].endsWith("5") ? (<S.Separator />) : (<></>)}
                    </>
                  )
                })
              }
            </S.Container>
          </S.ScrollView>
          <S.ScrollBar orientation='vertical'>
            <S.ScrollThumb />
          </S.ScrollBar>
        </S.ScrollRoot>
      </S.WrapperConditions>
    </S.Wrapper>
  )
}