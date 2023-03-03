import * as S from './styled'
import { filter } from '../../state/clients'
import { Filters } from '../../enums/filter'
import { useRef } from 'react'
import { useSetRecoilState } from 'recoil'
import { ChevronDownIcon } from '@radix-ui/react-icons'

export function Sidebar() {

  const selectorRef = useRef<HTMLSelectElement>(null);
  const setFilters = useSetRecoilState(filter);


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