import React, { forwardRef, useRef, useState } from 'react';
import * as S from './styled'
import { conditionFilter, addressFilter, runTimeAddressFilter, matchedAddresses } from '../../context/clients';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import useFormatNameCondition from '../../hooks/useFormatNameCondition';
import { ConditionName } from '../../../domain';
import ChipAddress from '../chip-address';

export function Sidebar() {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [conditionFilterIsOpened, setConditionFilterIsOpened] = useState<boolean>(false);
  const [addressFilterIsOpened, setAddressFilterIsOpened] = useState<boolean>(false);
  const [buttonAble, setButtonAble] = useState<boolean>(true);
  const [filters, setFilters] = useRecoilState(conditionFilter);
  const [addressesFilter, setAddressFilters] = useRecoilState(addressFilter)
  const [runTimeFilter, setRunTimeFilters] = useRecoilState(runTimeAddressFilter)
  const [currentAddress, setCurrentAddress] = useState<string>('')
  const matched = useRecoilValue(matchedAddresses)

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
    setCurrentAddress(event.target.value)
    setRunTimeFilters(old => [...old, currentAddress])
  }

  const addAddress = () => {
    setAddressFilters(old => [...old, ...matched])
  }

  const clearAddressFilter = () => {
    setRunTimeFilters([])
    setAddressFilters([])
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
                <S.InputSearchAddress onChange={(e) => checkAddress(e)} value={currentAddress}/>
                <S.ButtonAddress onClick={addAddress}>Procurar...</S.ButtonAddress>
                <S.ButtonCancel onClick={clearAddressFilter}>Limpar Filtro</S.ButtonCancel>
                <S.ContainerChipAddress>
                </S.ContainerChipAddress>
                <S.AddressesFound>
                  <h3>Os endereços que batem são:</h3>
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