import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import useFormatNameCondition from '../../hooks/useFormatNameCondition'
import { clientOnModal, modalIsActive } from '../../context'
import * as S from './styled'
import { doctorLoggedIn } from '../../context/doctor'

export default function ClientInformation(){

    const client = useRecoilValue(clientOnModal)
    const [isOpened, setIsOpened] = useRecoilState(modalIsActive)
    const formatNameCondition = useFormatNameCondition();
    const doctor = useRecoilValue(doctorLoggedIn)

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
                        <S.Informations>
                        <S.ClientName>{client.name}</S.ClientName>
                        <S.CommonInformation>CPF: {client.cpf}</S.CommonInformation>
                        <S.CommonInformation>
                              {client.address.state === undefined ? '' : client.address.state + ', '}  
                              {client.address.city + ', '} 
                              {client.address.district === undefined ? '' : client.address.district + ', '}
                              {client.address.street + ','} {client.address.number}
                              </S.CommonInformation>
                        <S.CommonInformation>Patologia:</S.CommonInformation>
                        <S.CommonInformation>
                              {client.exam.conditions.map((condition, index) => { return (<S.CommonInformation key={index}>{formatNameCondition(condition.name)}</S.CommonInformation>)})}
                        </S.CommonInformation>
                        <S.DoctorName>{doctor.name}</S.DoctorName>        
                        </S.Informations>
                  )
            }
          </S.WrapperConditions>
    </S.Wrapper>)
}