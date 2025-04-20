import * as React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AuthForm, Background } from "./wrappers";
import { Stack } from "../../../ui-kit/layouts/Stack";
import { Cluster } from "../../../ui-kit/layouts/Cluster";
import { IUser } from "../../user";
import { Input } from "../../common/Forms/Input";
import Button from "../../../ui-kit/Button";
import { connect } from "react-redux";
import { postAuth, postRegister } from "../../../Actions/auth-actions";



export const Register = ({ postRegister }) => {
    const navigate = useNavigate();
    const [userState, setUserState] = React.useState<Omit<IUser, "id">>({
        type: "seller",
        email: "",
        phone: "",
        company_name: "",
        password: "",
        name: ""
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key) => {
        const value = e.target.value;
        setUserState({ ...userState, [key]: value })
    }
    function handleSaveClick(): void {
        postRegister(userState)
    }

    return (
        <Background>
            <AuthForm>
                <Stack space="24px">
                    <Cluster justify="center">
                    </Cluster>
                    <Cluster justify="center">
                        <div className="sub1">Регистрация</div>
                    </Cluster>
                    <Stack space="8px">
                        <div className="sub3" style={{ color: "rgba(104, 125, 141, 0.7)" }}>Email</div>
                        <Input type="text" placeholder="" value={userState.email} onChange={(e) => handleInputChange(e, "email")} />
                    </Stack>
                    <Stack space="8px">
                        <div className="sub3" style={{ color: "rgba(104, 125, 141, 0.7)" }}>ФИО</div>
                        <Input type="text" placeholder="" value={userState.name} onChange={(e) => handleInputChange(e, "name")} />
                    </Stack>
                    <Stack space="8px">
                        <div className="sub3" style={{ color: "rgba(104, 125, 141, 0.7)" }}>Название организации</div>
                        <Input type="text" placeholder="" value={userState.company_name} onChange={(e) => handleInputChange(e, "company_name")} />
                    </Stack>
                    <Stack space="8px">
                        <div className="sub3" style={{ color: "rgba(104, 125, 141, 0.7)" }}>Номер телефона</div>
                        <Input type="phone" placeholder="" value={userState.phone} onChange={(e) => handleInputChange(e, "phone")} />
                    </Stack>
                    <Stack space="8px">
                        <div className="sub3" style={{ color: "rgba(104, 125, 141, 0.7)" }}>Введите пароль</div>
                        <Input type="password" placeholder="" value={userState.password} onChange={(e) => handleInputChange(e, "password")} />
                    </Stack>
                    <Cluster justify="center">
                        <Button variant="primary" text="Зарегистрироваться" disabled={userState.email.length === 0 || userState.password.length === 0 || userState.phone.length === 0 || userState.company_name.length === 0 || userState.name.length === 0 ? true : false} onClick={() => handleSaveClick()} />
                    </Cluster>
                    <Cluster align="center" space="6px" justify="center">
                        <div className="sub3" style={{ color: "rgba(164, 165, 181)" }}>Уже  есть профиль?</div>
                        <div onClick={() => navigate("/sign_in")} className="sub3" style={{ fontWeight: 600, cursor: "pointer" }}>Войти</div>
                    </Cluster>
                </Stack>
            </AuthForm>
        </Background>
    );
}

const mapStateToProps = (state) => {
    return {
        loading: state.loadingStatus.loading,
    };
};

const mapDispatchToProps = {
    postRegister,
};

export default connect(null, mapDispatchToProps)(Register);
