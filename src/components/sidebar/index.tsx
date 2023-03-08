import React, { useState } from 'react';
import * as S from './styled'
import { filter } from '../../atom/clients'
import { useRecoilState, useSetRecoilState } from 'recoil'

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
  const [filters, setFilters] = useRecoilState(filter);
  const [conditions, setConditions] = useState([
    {
      name: 'todos5',
      checked: true,
    },
    {
      name: 'resistencia_insulina_leve',
      checked: false,
    },
    {
      name: 'resistência_Insulina_Moderada',
      checked: false,
    },
    {
      name: 'resistência_Insulina_Severo5',
      checked: false,
    },
    {
      name: 'diabético',
      checked: false,
    },
    {
      name: 'risco_amputação_leve',
      checked: false,
    },
    {
      name: 'risco_moderado',
      checked: false,
    },
    {
      name: 'risco_severo5',
      checked: false,
    },
    {
      name: 'doente_metabólico_severo5',
      checked: false,
    },
    {
      name: 'hipertenso_leve',
      checked: false,
    },
    {
      name: 'hipertenso_moderado',
      checked: false,
    },
    {
      name: 'hipertenso_severo',
      checked: false,
    },
    {
      name: 'risco_pico_hipertensivo',
      checked: false,
    },
    {
      name: 'risco_infarto_e_AVC',
      checked: false,
    },
    {
      name: 'risco_evento_cardíaco_grave5',
      checked: false,
    },
    {
      name: 'sobrepeso',
      checked: false,
    },
    {
      name: 'obesidade_1',
      checked: false,
    },
    {
      name: 'obesidade_2',
      checked: false,
    },
    {
      name: 'obesidade_35',
      checked: false,
    },
    {
      name: 'stress_elevado',
      checked: false,
    },
    {
      name: 'stress_severo5',
      checked: false,
    },
    {
      name: 'síndrome_vagal5',
      checked: false,
    },
    {
      name: 'TDAH5',
      checked: false,
    },
    {
      name: 'depressão_leve_ou_moderada',
      checked: false,
    },
    {
      name: 'depressão_severa',
      checked: false,
    }
  ])

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>, condition: typeof conditions[0]) => {
    const isChecked = event.target.checked;
    condition.checked = isChecked;
    const all = conditions.filter(value => value.name === 'todos');
    const allNameAndChecked = all.at(0);

    if(condition.checked) {
      
      if(condition.name !== allNameAndChecked.name && condition.checked) {
        allNameAndChecked.checked = false
      }

      let newConditions = conditions.slice(1)

      if (condition.name === allNameAndChecked.name){
        newConditions.forEach((condition) => condition.checked = false)
        allNameAndChecked.checked = true
      }

      setConditions([{
        name: allNameAndChecked.name,
        checked: allNameAndChecked.checked
      }, ...newConditions])

    } else {
      const conditionsFalse = conditions.filter(value => value.name === condition.name && condition.checked === false)
      const justCondition = conditionsFalse.at(0)

      let newConditionsChange = conditions.slice(1)
      
      const everyConditionsCheckedFalse = newConditionsChange.every(value => value.checked === false)

      if(condition.name !== allNameAndChecked.name && everyConditionsCheckedFalse) {
        allNameAndChecked.checked = true
      }

      newConditionsChange.forEach(condition => condition.name === justCondition.name ? condition.checked = justCondition.checked : condition.checked)

      setConditions([{
        name: allNameAndChecked.name,
        checked: allNameAndChecked.checked
      },...newConditionsChange])
    }
    
    setFilters(conditions.filter(c => c.checked === true).map(({name, checked}) => {
      // console.log(name)
      return {name: name}
    }))
  }
  
  return (
    <>
      <S.Wrapper>
        <S.ButtonOpenOrCloseSidebar isOpen={isOpened} onClick={() => setIsOpened(old => !old)}>
          {isOpened ? (<S.ArrowLeft />) : (
          <>
            <S.ArrowRight />
            <S.LabelFilter>Abrir o Filtro</S.LabelFilter>
          </>
          )}
        </S.ButtonOpenOrCloseSidebar>
      </S.Wrapper>

      <S.Wrapper>
        <S.WrapperConditions openOrCloseSide={isOpened}>
          <S.LabelTitle>Selecione uma Condição:</S.LabelTitle>
          <S.ScrollRoot>
            <S.ScrollView>
              <S.Container>
                {
                  conditions.map((condition, index, conditionArray) => {
                    condition.name = condition.name.replace('5', '')

                    return (
                      <React.Fragment key={index}>
                        <S.Flex>
                          <S.Checkbox type="checkbox" name={condition.name} checked={condition.checked} onChange={(event) => handleChecked(event, condition)} />
                          <S.Label>{capitalizeWord(condition.name.replace(/_/g, ' '))}</S.Label>
                        </S.Flex>
                        {conditionArray[index].name.endsWith("5") ? (<S.Separator />) : (<></>)}
                      </React.Fragment>
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
    </>
  )
}