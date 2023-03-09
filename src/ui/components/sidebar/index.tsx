import React, { useState } from 'react';
import * as S from './styled'
import { filter } from '../../context/clients';
import { useRecoilState } from 'recoil'
import useFormatNameCondition from '../../hooks/useFormatNameCondition';
import { ConditionName } from '../../../domain';

export function Sidebar() {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [filters, setFilters] = useRecoilState(filter);

  const formatNameCondition = useFormatNameCondition();

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {

    if(event.target.checked) {
      setFilters(old => [...old, (event.target.value as any)])
    } else {
      const newFilters = [...filters]

      newFilters.splice(newFilters.findIndex((item: any) => item === event.target.value), 1)

      setFilters(newFilters)
    }

    // if(condition.checked) {
      
    //   if(condition.name !== allNameAndChecked.name && condition.checked) {
    //     allNameAndChecked.checked = false
    //   }

    //   let newConditions = conditions.slice(1)

    //   if (condition.name === allNameAndChecked.name){
    //     newConditions.forEach((condition) => condition.checked = false)
    //     allNameAndChecked.checked = true
    //   }

    //   setConditions([{
    //     name: allNameAndChecked.name,
    //     checked: allNameAndChecked.checked
    //   }, ...newConditions])

    // } else {
    //   const conditionsFalse = conditions.filter(value => value.name === condition.name && condition.checked === false)
    //   const justCondition = conditionsFalse.at(0)

    //   let newConditionsChange = conditions.slice(1)
      
    //   const everyConditionsCheckedFalse = newConditionsChange.every(value => value.checked === false)

    //   if(condition.name !== allNameAndChecked.name && everyConditionsCheckedFalse) {
    //     allNameAndChecked.checked = true
    //   }

    //   if(everyConditionsCheckedFalse && allNameAndChecked.checked === false) {
    //     allNameAndChecked.checked = true
    //   }

    //   newConditionsChange.forEach(condition => condition.name === justCondition.name ? condition.checked = justCondition.checked : condition.checked)

    //   setConditions([{
    //     name: allNameAndChecked.name,
    //     checked: allNameAndChecked.checked
    //   },...newConditionsChange])
    // }
    
    // setFilters(conditions.filter(c => c.checked === true).map(({name, checked}) => {
    //   return {name: name}
    // }))
  }
  
  return (
    <>
      <S.Wrapper>
        <S.ButtonOpenOrCloseSidebar isOpen={isOpened} onClick={() => setIsOpened(old => !old)}>
          {isOpened ? (<S.ArrowLeft opened={false} />) : (
          <>
            <S.ArrowLeft opened={true} />
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
                  Object.keys(ConditionName).map((key, index, conditionArray) => {
                    let condition = ConditionName[key]
                    condition = condition.replace('5', '')

                    return (
                      <React.Fragment key={index}>
                        <S.Flex>
                          <S.Checkbox type="checkbox" value={condition} onChange={(event) => handleChecked(event)} />
                          <S.Label>{formatNameCondition(condition)}</S.Label>
                        </S.Flex>
                        {conditionArray[index].endsWith("5") ? (<S.Separator />) : (<></>)}
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