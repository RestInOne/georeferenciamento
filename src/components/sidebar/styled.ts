import styled from "styled-components";
import * as Select from '@radix-ui/react-select'
import { ChevronDownIcon, ChevronUpIcon, CheckIcon } from '@radix-ui/react-icons'


export const IconUp = styled(ChevronUpIcon)`
    width: 3.5rem;
    height: 3.5rem;
`

export const IconDown = styled(ChevronDownIcon)`
    width: 3.5rem;
    height: 3.5rem;
`

export const IconCheck = styled(CheckIcon)`
    width: 3.5rem;
    height: 3.5rem;
`

export const Root = styled(Select.Root)``

export const Trigger = styled(Select.SelectTrigger)`
    all: 'unset';
    gap: 1rem;
    border-radius: .4rem;
    padding: 1rem 3.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FFFDF7;
    color: #73726F;
    position: absolute;
    top: 2rem;
    left: 2rem;
    z-index: 3;
    font-size: 1.5rem;
    box-shadow: 0 .2rem 1rem gray;
    cursor: pointer;

    transition: all .2s ease-in-out;
    
    &:hover {
        background-color: #ECE8EF;
    }
`

export const SelectIcon = styled(Select.SelectIcon)`
    color: #73726F;
`

export const Value = styled(Select.Value)``

export const Portal = styled(Select.Portal)`
    font-size: 1.5rem;
    background-color: #FFFDF7;
    z-index: 4;
`

export const Content = styled(Select.Content)``

export const Viewport = styled(Select.Viewport)``

export const Group = styled(Select.Group)`
    padding: 1rem;
    `

export const Label = styled(Select.Label)``

export const Item = styled(Select.Item)`
display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all .2s ease-in-out;
    
    &:hover {
        background-color: #ECE8EF;
    }
`

export const ItemText = styled(Select.ItemText)``

export const ScrollUpButton = styled(Select.ScrollUpButton)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: max-content;
    padding: 1rem 0;
    background-color: #FFFDF7;
    color: #73726F;
    cursor: pointer;

    transition: all .2s ease-in-out;

    &:hover {
        background-color: #ECE8EF;
    }
`

export const ScrollDownButton = styled(Select.ScrollDownButton)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: max-content;
    padding: 1rem 0;
    background-color: #FFFDF7;
    color: #73726F;
    cursor: pointer;

    transition: all .2s ease-in-out;


    &:hover {
        background-color: #ECE8EF;
    }
`

export const ItemIndicator = styled(Select.ItemIndicator)`
    width: 2.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
`