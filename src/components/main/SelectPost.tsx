import * as React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Cluster } from "../../ui-kit/layouts/Cluster";
import { Input } from "../common/Forms/Input";
import Button from "../../ui-kit/Button";


const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background: #E5E5E5;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const SelectPost = () => {
    const [value, setValue] = React.useState("");
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setValue(value)
    }


    const handleSelectClick = () => {
        navigate(`/post?id=${value}`)
    }

    return (
        <Wrapper>
            <Cluster space="24px">
                <Input className="header full" style={{ width: "400px" }} placeholder="Введите идентификатор анкеты" value={value} onChange={(e) => handleInputChange(e)} />
                <Button variant="primary" text="Перейти" onClick={() => handleSelectClick()} />
            </Cluster>
        </Wrapper>
    );
}
export default SelectPost;
