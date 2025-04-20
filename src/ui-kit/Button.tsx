import * as React from "react";
import { useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledButton = styled.button`
	border: none;
	outline: none;
	padding: 8px;
	background: transparent;
	cursor: pointer;
	padding: 10px 16px;
	border-radius: 6px;
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 135%;
    display: flex;
    align-items: center;
    letter-spacing: 0.5px;
    gap: 12px;
	&.light-primary {
		background: rgba(0, 76, 204, 0.1);
		color: #004ccc;
	}
	&.primary {
		background: #004CCC;
        color: #FFFFFF;
	}
    &.transparent {
        background: transparent;
        color: #004ccc;
    }
    &:disabled {
        background: rgba(0, 76, 204, 0.1);
    }
`;

interface IButton {
    variant: "transparent" | "primary" | "light-primary";
    startIcon?: JSX.Element;
    endIcon?: JSX.Element;
    text?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    disabled?: boolean
}

export const Button = memo(({ variant, startIcon, endIcon, text, onClick, disabled = false }: IButton) => {
    return <StyledButton type="button" className={variant} onClick={(e) => onClick(e)} disabled={disabled}>
        {startIcon}
        {text}
        {endIcon}
    </StyledButton>;
});

export default Button;
