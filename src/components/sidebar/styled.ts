import styled from "styled-components";

export const Nav = styled.nav`
    position: fixed;
    left: 0;
    height: 100vh;
    width: 40rem;
    display: flex;
    align-items: flex-start;
    gap: 3rem;
    padding: 3rem;
    flex-direction: column;
    border-right: 3px solid black;
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
    width: 30rem;
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