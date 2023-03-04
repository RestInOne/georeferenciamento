import { useRecoilValue, useSetRecoilState } from "recoil";
import ClientInformation from "../../components/client-information";
import MapTest from "../../components/map-test";
import { Sidebar } from "../../components/sidebar";
import { IClient } from "../../interfaces/client";
import { clients, filteredGeolocationClients } from "../../state/clients";
import { modalIsActive } from "../../state/modal";
import * as S from './styled'

interface IMapWithPins {
    filteredClients: IClient[]
  } 

export default function Home(props: IMapWithPins){

    //const filteredClients = useRecoilValue(filteredGeolocationClients)
    const isVisible = useRecoilValue(modalIsActive)

    return (
        <S.Wrapper>
            <Sidebar/>
            <ClientInformation visible={isVisible}/>
            <MapTest filteredClients={props.filteredClients}/>
        </S.Wrapper>
    )
}
