import styled from "styled-components";
import { CrossCircledIcon } from "@radix-ui/react-icons";

export const Container = styled.div`
    display: flex;
    width: max-content;
    height: max-content;
    border-radius: 2rem;
    background-color: #B8B5B0;
    opacity: .7;
    padding: 1rem 1rem;
    gap: 1rem;
    margin: 1rem .5rem;
`

export const deleteAddressChip = styled(CrossCircledIcon)`
    width: 2rem;
    height: 2rem;
    cursor: pointer
`

export const LabelAddress = styled.p`
    font-size: 1.7rem;
`