import * as React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const Wrapper = styled.button`
    border: none;
    outline: none;
    padding: 8px;
    background: transparent;
    cursor: pointer;
    width: 36px;
    height: 36px;
`

export const BackButton = () => {
    const navigate = useNavigate();
    return (
        <Wrapper onClick={() => navigate(-1)}>
            <img src="/images/icons/arrow_back.svg" alt="back" />
        </Wrapper>
    );
}

export default BackButton;
