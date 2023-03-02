import MapTest from "../../components/map-test";
import { Sidebar } from "../../components/sidebar";
import * as S from './styled'

export default function Main(){

    return (
        <S.Wrapper>
            <Sidebar/>
            <MapTest/>
        </S.Wrapper>
    )
}
