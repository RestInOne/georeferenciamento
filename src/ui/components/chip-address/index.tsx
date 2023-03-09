import * as S from './styled';

export default function ChipAddress({children}: any) {
    return(
        <S.Container>
            <S.LabelAddress>{children}</S.LabelAddress>
            <S.deleteAddressChip />
        </ S.Container>
    )
}