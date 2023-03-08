import styled, { css } from "styled-components";
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

export const Wrapper = styled.div`
    display: flex;
    overflow: hidden;
`

export const ButtonOpenOrCloseSidebar = styled.div<{ isOpen: boolean }>`
    position: absolute;
    top: 3rem;
    left: 2rem;
    background-color: #B8B5B0;
    width: 12rem;
    padding: 1.5rem;
    cursor: pointer;
    border-radius: 0.8rem;
    z-index: 10;

    transition: all .3s ease-in-out;

    &:hover {
        background-color: #DEDBD5;
    }

    ${props => props.isOpen ? 
    css`
        transform: rotate(-180deg);
        left: 38rem;
    `
    :
    css`
        transform: rotate(180deg);
    `
    }
`

export const WrapperConditions = styled.div<{ openOrCloseSide: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    background-color: #DEDBD5;
    align-items: center;
    width: 35rem;
    height: max-content;
    font-size: 1.5rem;
    z-index: 4;
    box-shadow: 6px 10px 16px -3px rgba(0,0,0,0.75);
    border-radius: .8rem;
    padding: 1.5rem;
    border: .1rem solid #d4d4d4;
    transform: translateX(-95%);

    ${props => props.openOrCloseSide ? css`
    transform: translateX(0);
    ` : ''  
    };
    
    transition: transform .3s ease-in-out;
`

export const ArrowRight = styled(ArrowRightIcon)<{opened: boolean}>`
    width: 2rem;
    height: 2rem;

    ${props => props.opened ? css`
    transform: rotate(0.5turn); 
    ` : ''}
`
