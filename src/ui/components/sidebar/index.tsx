import React, { forwardRef, useRef, useState } from 'react';
import * as S from './styled'
import { conditionFilter, addressFilter, runTimeAddressFilter, matchedAddresses } from '../../context/clients';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import useFormatNameCondition from '../../hooks/useFormatNameCondition';
import { ConditionName } from '../../../domain';
import { filterModal, modalIsActive } from '../../context';

export function Sidebar() {
  const [isOpened, setIsOpened] = useRecoilState(filterModal);
  const [conditionFilterIsOpened, setConditionFilterIsOpened] = useState<boolean>(false);
  const [addressFilterIsOpened, setAddressFilterIsOpened] = useState<boolean>(false);
  const [filters, setFilters] = useRecoilState(conditionFilter);
  const [addressesFilter, setAddressFilters] = useRecoilState(addressFilter)
  const [runTimeFilter, setRunTimeFilters] = useRecoilState(runTimeAddressFilter)
  const matched = useRecoilValue(matchedAddresses)
  const [modalIsOpened, setModalIsOpened] = useRecoilState(modalIsActive)

  const formatNameCondition = useFormatNameCondition();

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.checked) {
      setFilters(old => [...old, (event.target.value as any)])
    } else {
      const newFilters = [...filters]

      newFilters.splice(newFilters.findIndex((item: any) => item === event.target.value), 1)

      setFilters(newFilters)
    }
  }

  const checkAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRunTimeFilters(event.target.value)
  }

  const clearAddressFilter = () => {
    setRunTimeFilters('')
    setAddressFilters([])
  }

  return (
    <>
      <S.Wrapper>
        <S.ButtonOpenOrCloseSidebar isopen={isOpened} onClick={() => {
          setIsOpened(old => !old);
          setModalIsOpened(false)
          }}>
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
          <S.LabelTitle>Selecione como quer Filtrar:</S.LabelTitle>
          <S.TriggerFilter onClick={() => setConditionFilterIsOpened(old => !old)}>
            <span>Condições</span>
            <S.ChevronDown aria-hidden opened={conditionFilterIsOpened}/>
          </S.TriggerFilter>
          {
            conditionFilterIsOpened ? (
              <S.ContainerFilters>
                <S.ScrollRoot>
                  <S.ScrollView>
                    <S.Container>
                      {
                        Object.keys(ConditionName).map((key, index) => {
                          let condition = ConditionName[key]

                          return (
                            <React.Fragment key={index}>
                              <S.Flex>
                                <S.Checkbox type="checkbox" value={condition} onChange={(event) => handleChecked(event)} />
                                <S.Label>{formatNameCondition(condition)}</S.Label>
                              </S.Flex>
                              {ConditionName[key].endsWith("5") ? (<S.Separator />) : (<></>)}
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
              </S.ContainerFilters>
            ) 
            : 
            <></>
          }

          <S.TriggerFilter onClick={() => setAddressFilterIsOpened(old => !old)}>
            <span>Endereço</span>
            <S.ChevronDown aria-hidden opened={addressFilterIsOpened}/>
          </S.TriggerFilter>
          {
            addressFilterIsOpened ? (
              <S.ContainerFilters>
                <S.InputSearchAddress onChange={(e) => checkAddress(e)} value={runTimeFilter}/>
                <S.ButtonCancel onClick={clearAddressFilter}>Limpar Filtro</S.ButtonCancel>
                <S.AddressesFound>
                  <h3>Endereços correspondentes:</h3>
                  {matched.map((match, index) => {
                    return (<p key={index}>{match}</p>)
                  })}
                </S.AddressesFound>
              </S.ContainerFilters>
            )
            :
            <></>
          }
        </S.WrapperConditions>
      </S.Wrapper>
    </>
  )
}