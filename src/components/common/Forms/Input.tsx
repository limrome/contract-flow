import styled from "styled-components";


export const Input = styled.input`
    border: none;
    outline: none;
    padding: 12px 12px 12px 16px;
    gap: 10px;
    background: #F8FBFC;
    border-radius: 6px;
    font-family: 'Montserrat';
    font-style: normal;
    color: #264054;
    &::placeholder {
        color: rgba(104, 125, 141, 0.9);
    }
    &.full {
        width: 100%;
    }
    &.header {
        font-weight: 600;
        font-size: 16px;
        line-height: 140%;
        /* letter-spacing: 0.15px; */
    }
    &.body {
        font-weight: 500;
        font-size: 14px;
        line-height: 140%;
    }
`