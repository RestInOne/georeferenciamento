import { useRecoilValue } from "recoil";
import ClientInformation from "../../components/client-information";
import Map from "../../components/map";
import { Sidebar } from "../../components/sidebar";
import { filteredGeolocationClients, modalIsActive } from "../../context";
import * as S from './styled'


export default function Home(){


    const filteredClients = useRecoilValue(filteredGeolocationClients)
    const isVisible = useRecoilValue(modalIsActive)

    return (
        <S.Wrapper>
            <Sidebar/>
            <ClientInformation visible={isVisible}/>
            <Map filteredClients={filteredClients}/>
        </S.Wrapper>
    )
}
