import styled from "styled-components";

export const Nav = styled.nav`
    position: absolute;
    top: 5rem;
    left: 2rem;
    height: 85vh;
    width: max-content;
    display: flex;
    align-items: center;
    gap: 3rem;
    padding: 3rem;
    flex-direction: column;
    border-radius: .5rem;
    border: .2rem solid black;
    z-index: 3;
    background-color: white;
`

export const Label = styled.label`
    font-weight: 700;
    font-size: 24px;
`

export const ConditionFilter = styled.select`
    border-top: 2px solid black;
    border-bottom: 2px solid black;
    border-top-left-radius: 8px;
    border-bottom-right-radius: 8px;
    width: 25rem;
    border-left: none;
    border-right: none;
    font-size: 18px;
    padding: 2rem;
`

export const CondititionSelector = styled.option`
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    width: 30rem;
    font-size: 18px;
`