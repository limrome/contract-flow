import * as React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { ModalProvider } from "../modal/ModalContext/ModalContext";
import Forms from "./Forms";
import { IUser } from "../user";
import Sellers from "./Sellers";


const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background: #E5E5E5;
    overflow: hidden;
`

const ContentContainer = styled.div`
    padding: 40px 40px 120px 40px;
    padding-left: 304px;
    width: 100%;
    height: 100%;
    overflow: auto;
`

interface IMainProps {
    user: IUser
}

export const Main = ({ user }: IMainProps) => {
    console.log(user);
    return (
        <ModalProvider>
            <Routes>
                {
                    user.type === "manager" ?
                        <Route path="*" element={<Forms />} /> :
                        <Route path="*" element={<Sellers />} />
                }
            </Routes>
        </ModalProvider >
    );
}

export default Main;
