import { useRecoilValue } from 'recoil'
import { clientOnModal } from '../../state/modal'
import * as S from './styled'

interface IClientInformation {
    visible: boolean
}


export default function ClientInformation({visible}: IClientInformation){

    const client = useRecoilValue(clientOnModal)

    return visible ? <S.Wrapper>
    <S.ClientName>{client.name}, {client.age} anos</S.ClientName>
    <S.ClientCondition>Condição: {client.condition.map(condition => (condition.name))}</S.ClientCondition>
    </S.Wrapper> : <></>
}