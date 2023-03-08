import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { clientOnModal } from '../../context'
import * as S from './styled'

interface IClientInformation {
    visible: boolean
}


export default function ClientInformation({visible}: IClientInformation){

    const client = useRecoilValue(clientOnModal)
    const [isOpened, setIsOpened] = useState<boolean>(false);

    return visible ? <S.Wrapper>
    <S.ButtonOpenOrCloseSidebar isOpen={isOpened} onClick={() => {setIsOpened(old => !old) }}>
         {isOpened ? (<S.ArrowRight />) : (<S.ArrowLeft />)}
    </S.ButtonOpenOrCloseSidebar>
    <S.WrapperConditions openOrCloseSide={isOpened}>
         <h1>{client.name}</h1>
         {client.condition.map(condition => { return (<h2>{condition.name};</h2>)})}
    </S.WrapperConditions>
    </S.Wrapper> : 
    <S.Wrapper>
         <S.ButtonOpenOrCloseSidebar isOpen={isOpened} onClick={() => {setIsOpened(old => !old) }}>
         {isOpened ? (<S.ArrowRight />) : (<S.ArrowLeft />)}
         </S.ButtonOpenOrCloseSidebar>
         <S.WrapperConditions openOrCloseSide={isOpened}>
         <h1>Nenhum paciente selecionado</h1>
         </S.WrapperConditions>
    </S.Wrapper>
}