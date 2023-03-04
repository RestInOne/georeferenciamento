import { useRecoilValue, useSetRecoilState } from "recoil";
import MapTest from "../../components/map-test";
import { Sidebar } from "../../components/sidebar";
import { IClient } from "../../interfaces/client";
import { clients, filteredGeolocationClients } from "../../state/clients";
import * as S from './styled'

interface IMapWithPins {
    filteredClients: IClient[]
  } 

export default function Home(props: IMapWithPins){

    //const filteredClients = useRecoilValue(filteredGeolocationClients)

    return (
        <S.Wrapper>
            <Sidebar/>
            <MapTest filteredClients={props.filteredClients}/>
        </S.Wrapper>
    )
}
