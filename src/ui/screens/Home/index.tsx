import { useRecoilValue } from "recoil";
import { getClients } from "../../../infra/gateways/getClients";
import ClientInformation from "../../components/client-information";
import Map from "../../components/map";
import { Sidebar } from "../../components/sidebar";
import { filteredGeolocationClients } from "../../context";
import * as S from './styled'


export default function Home(){

    const filteredClients = useRecoilValue(filteredGeolocationClients)

    return (
        <S.Wrapper>
            <Sidebar/>
            <ClientInformation />
            <Map filteredClients={filteredClients}/>
        </S.Wrapper>
    )
}
