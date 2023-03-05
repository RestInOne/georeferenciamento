import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import ClientInformation from "../../components/client-information";
import MapTest from "../../components/map-test";
import { Sidebar } from "../../components/sidebar";
import { IClient } from "../../interfaces/client";
import { clients, filteredGeolocationClients } from "../../atom/clients";
import { modalIsActive } from "../../atom/modal";
import * as S from './styled'


export default function Home(){


    const filteredClients = useRecoilValue(filteredGeolocationClients)
    const isVisible = useRecoilValue(modalIsActive)

    return (
        <S.Wrapper>
            <Sidebar/>
            <ClientInformation visible={isVisible}/>
            <MapTest filteredClients={filteredClients}/>
        </S.Wrapper>
    )
}
