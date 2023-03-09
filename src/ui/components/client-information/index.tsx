import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import useFormatNameCondition from '../../hooks/useFormatNameCondition'
import { clientOnModal } from '../../context'
import * as S from './styled'

export default function ClientInformation(){

    const client = useRecoilValue(clientOnModal)
    const [isOpened, setIsOpened] = useState<boolean>(false);
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
                        {client.condition.map((condition, index) => { return (<h2 key={index}>{formatNameCondition(condition.name)};</h2>)})}         
                        </>
                  )
            }
          </S.WrapperConditions>
    </S.Wrapper>)
}