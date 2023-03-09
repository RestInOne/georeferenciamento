import React, { forwardRef, useState } from 'react';
import * as S from './styled'
import { conditionFilter, matchedFilterAddresses, runTimeAddressFilter } from '../../context/clients';
import { useRecoilState, useRecoilValue } from 'recoil'
import useFormatNameCondition from '../../hooks/useFormatNameCondition';
import { ConditionName } from '../../../domain';
import ChipAddress from '../chip-address';

export function Sidebar() {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [conditionFilterIsOpened, setConditionFilterIsOpened] = useState<boolean>(false);
  const [addressFilterIsOpened, setAddressFilterIsOpened] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const [filters, setFilters] = useRecoilState(conditionFilter);
  const clientAddress = useRecoilValue(matchedFilterAddresses);
  const [addressFilter, setAddressFilter] = useRecoilState(runTimeAddressFilter)

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

  const filterByDistrictAndCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(!clientAddress.includes(event.target.value)) {
      setAddress(event.target.value)
      setAddressFilter(old => [...old, address])
    }

    if(event.target.value === '') {
      setAddressFilter([])
    }
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
                <S.InputSearchAddress onChange={(event) => filterByDistrictAndCity(event)} />
                <S.ContainerChipAddress>
                  {/* <ChipAddress onClick={(event) => deleteChip(event)}>teste</ChipAddress> */}
                </S.ContainerChipAddress>
                <S.AddressesFound>
                  {
                    clientAddress.map((address, index) => (
                    <S.ButtonAddress key={index}>{address}</S.ButtonAddress>
                    ))
                  }
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