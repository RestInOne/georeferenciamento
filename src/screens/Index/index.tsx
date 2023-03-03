import { useRecoilValue } from "recoil";
import MapTest from "../../components/map-test";
import { Sidebar } from "../../components/sidebar";
import { filteredGeolocationClients } from "../../state/clients";
import * as S from './styled'

export default function Main(){

    const clients = useRecoilValue(filteredGeolocationClients)

    return (
        <S.Wrapper>
            <Sidebar/>
            <MapTest filteredClients={clients}/>
        </S.Wrapper>
    )
}
