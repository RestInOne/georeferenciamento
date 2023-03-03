import styled, { css } from "styled-components";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Selector from "@radix-ui/react-separator"
import { CheckIcon, ArrowLeftIcon } from "@radix-ui/react-icons";

export const Wrapper = styled.div`
    display: flex;
`

export const ButtonOpenOrCloseSidebar = styled.div`
   
`

export const ArrowLeft = styled(ArrowLeftIcon)`
    width: 2rem;
    height: 2rem;
    
`

export const IconCheck = styled(CheckIcon)`
    width: 2rem;
    height: 2rem;
`

export const Separator = styled(Selector.Root)`
    background-color: #383736;
    margin: .5rem 0;

    &[data-orientation=horizontal]{
        height: .1rem;
        width: 100%;
    }
`

export const WrapperConditions = styled.div<{ openOrCloseSide: boolean }>`
    margin-left: auto;
    position: fixed;
    top: 2rem;
    right: 2rem;
    display: none;
    flex-direction: column;
    background-color: #DEDBD5;
    align-items: center;
    width: max-content;
    height: max-content;
    font-size: 1.5rem;
    z-index: 5;
    box-shadow: 6px 10px 16px -3px rgba(0,0,0,0.75);
    border-radius: .8rem;
    padding: 1.5rem;
    border: .1rem solid #d4d4d4;

    transition: transform .3s ease-in-out

    ${props => props.openOrCloseSide ? css`
        transform: translateX(1%);
    ` : css`
        transform: translateX(100%);
    `}
`

export const Label = styled.label`
    color: #383736;
    font-size: 1.7rem;
    padding: 1rem;
`

export const LabelTitle = styled(Label)`
    font-weight: 600;
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: max-content;
    gap: .1rem;
`

export const Flex = styled.div`
    display: flex;
    align-items: center;
`

export const CheckBoxRoot = styled(Checkbox.Root)`
    all: 'unset';
    background-color: #F8F5EE;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: .4rem;
    display: block;
    box-shadow: 0 .2rem 1rem #383736;
    cursor: pointer;

    transition: all .2s ease-in-out;

    &:hover {
        background-color: #B8B5B0;
    }

    &:focus {
        box-shadow: 0 0 0 .2rem #000000;
    }
`

export const CheckBoxIndicator = styled(Checkbox.Indicator)`
    color: #383736;
`