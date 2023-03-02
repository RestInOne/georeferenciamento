import * as S from './styled'


export function Sidebar(){

    return (
        <S.Nav>
            <S.Label htmlFor='condition'>Selecione o filtro</S.Label>
            <S.ConditionFilter id='condition'>
                <S.CondititionSelector value="depressão">
                  Depressão
                </S.CondititionSelector>
                <S.CondititionSelector value="hipertensão">
                  Hipertensão
                </S.CondititionSelector>
            </S.ConditionFilter>
        </S.Nav>
    )
}