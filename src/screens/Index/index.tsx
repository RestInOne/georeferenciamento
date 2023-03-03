import { useRecoilValue } from "recoil";
import MapTest from "../../components/map-test";
import { Sidebar } from "../../components/sidebar";
import { clientGeolocation } from "../../state/clients";
import * as S from './styled'

export default function Main(){

    const geolocations = useRecoilValue(clientGeolocation)
    console.log(geolocations)

    return (
        <S.Wrapper>
            <Sidebar/>
            <MapTest geolocations={geolocations}/>
        </S.Wrapper>
    )
}
