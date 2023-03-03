import * as S from './styled'
import { filter } from '../../state/clients'
import { Filters } from '../../enums/filter'
import { useRef } from 'react'
import { useSetRecoilState } from 'recoil'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'

export function Sidebar() {

  const selectorRef = useRef<HTMLSelectElement>(null);
  const setFilters = useSetRecoilState(filter);

  const diseases: string[] = [
    'resistencia_insulina_leve',
    'resistencia_Insulina_Moderada',
    'resistencia_Insulina_Severo',
    'diabetico',
    'risco_amputação_leve',
    'risco_moderado',
    'risco_severo',
    'doente_metabolico_severo',
    'doente_metabolico_severo',
    'doente_metabolico_severo',
    'hipertenso_leve',
    'hipertenso_moderado',
    'hipertenso_severo',
    'risco_pico_hipertensivo',
    'risco_infarto_e_AVC',
    'risco_evento_cardiaco_grave',
    'sobrepeso',
    'obesidade_1',
    'obesidade_2',
    'obesidade_3',
    'stress_elevado',
    'stress_severo',
    'sindrome_vagal',
    'TDAH',
    'depressão_leve_ou_moderada',
    'depressão_severa'
  ]

  return (
    <S.Root>
      <S.Trigger>
        <S.Value placeholder="Selecione alguma doença..." />
        <S.SelectIcon>
          <ChevronDownIcon />
        </S.SelectIcon>
      </S.Trigger>

      <S.Portal>
        <S.Content>
          <S.ScrollUpButton>
            <ChevronUpIcon />
          </S.ScrollUpButton>

          <S.Viewport>
            <S.Group>
              <S.Label>Doenças</S.Label>
              {
                diseases.map(props => {
                  return (
                    <S.Item value={props}>{props.replace('_', ' ').normalize()}</S.Item>
                  )
                })
              }
            </S.Group>
          </S.Viewport>
        </S.Content>
      </S.Portal>
    </S.Root>
  )
}


    // <S.Nav>
    //   <S.Label htmlFor='condition'>Selecione o filtro</S.Label>
    //   <S.ConditionFilter ref={selectorRef} id='condition'>
    //     <S.CondititionSelector value="diabetes">
    //       Diabetes
    //     </S.CondititionSelector>
    //     <S.CondititionSelector value="adhd">
    //       Hipertensão
    //     </S.CondititionSelector>
    //   </S.ConditionFilter>
    // </S.Nav>