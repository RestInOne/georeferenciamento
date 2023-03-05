import styled, { css } from "styled-components";
import * as Selector from "@radix-ui/react-separator";
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { CheckIcon, ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

export const Wrapper = styled.div`
    display: flex;
    overflow: hidden;
`

export const ButtonOpenOrCloseSidebar = styled.div<{ isOpen: boolean }>`
    position: absolute;
    top: 3rem;
    right: 2rem;
    background-color: #B8B5B0;
    padding: 1.5rem;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    width: max-content;
    border-radius: 0.8rem;
    z-index: 11;

    transition: all .4s ease-in-out;

    &:hover {
        background-color: #DEDBD5;
    }

    ${props => props.isOpen ? 
    css`
        transform: rotate(-180deg);
        right: 38rem;
    `
    :
    css`
        transform: rotate(180deg);
    `
    }
`

export const LabelFilter = styled.p`
    font-size: 1.3rem;
    font-weight: 600;
    transform: rotate(180deg);
`

export const ArrowLeft = styled(ArrowLeftIcon)`
    width: 2rem;
    height: 2rem;
`

export const ArrowRight = styled(ArrowRightIcon)`
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
    position: absolute;
    top: 2rem;
    right: 0;
    display: flex;
    flex-direction: column;
    background-color: #DEDBD5;
    align-items: center;
    width: 35rem;
    height: max-content;
    font-size: 1.5rem;
    z-index: 5;
    box-shadow: 6px 10px 16px -3px rgba(0,0,0,0.75);
    border-radius: .8rem;
    padding: 1.5rem;
    border: .1rem solid #d4d4d4;
    transform: translateX(100%);

    ${props => props.openOrCloseSide ? css`
    transform: translateX(0);
    ` : ''  
    };
    
    transition: transform .4s ease-in-out;
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

export const Checkbox = styled.input`
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

export const ScrollRoot = styled(ScrollArea.Root)`
    width: 31rem;
    height: 60.5rem;
    overflow: hidden;
`

export const ScrollView = styled(ScrollArea.Viewport)`
    width: 100%;
    height: 100%;
    border-radius: inherit;
    gap: 2rem;
`

export const ScrollBar = styled(ScrollArea.Scrollbar)`
    display: flex;
    user-select: none;
    touch-action: none;
    padding: .2rem;
    flex-direction: column;
    background-color: #B8B5B0;
    border-radius: .8rem;
    
    &:hover {
    }

    &[data-orientation='vertical'] {
        width: 1rem;
    }
`

export const ScrollThumb = styled(ScrollArea.Thumb)`
    flex: 1;
    background-color: #d4d4d4;
    border-radius: .8rem;
`