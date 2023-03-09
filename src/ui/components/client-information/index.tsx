import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import useFormatNameCondition from '../../hooks/useFormatNameCondition'
import { clientOnModal, modalIsActive } from '../../context'
import * as S from './styled'

export default function ClientInformation(){

    const client = useRecoilValue(clientOnModal)
    const [isOpened, setIsOpened] = useRecoilState(modalIsActive)
    const formatNameCondition = useFormatNameCondition();

    return (
    <S.Wrapper>
          <S.ButtonOpenOrCloseSidebar isOpen={isOpened} onClick={() => {setIsOpened(old => !old) }}>
               {isOpened ? (<S.ArrowRight opened={false} />) : (<S.ArrowRight opened={true}/>)}
          </S.ButtonOpenOrCloseSidebar>
    
          <S.WrapperConditions openOrCloseSide={isOpened}>
            {
                  client === null ?
                  <h1>Nenhum paciente selecionado</h1>
                  :
                  (
                        <>
                        <h1>{client.name}</h1>
                        {client.exam.conditions.map((condition, index) => { return (<h2 key={index}>{formatNameCondition(condition.name)};</h2>)})}         
                        </>
                  )
            }
          </S.WrapperConditions>
    </S.Wrapper>)
}