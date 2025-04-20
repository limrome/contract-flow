import * as React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AuthForm, Background } from "./wrappers";
import { Stack } from "../../../ui-kit/layouts/Stack";
import { Cluster } from "../../../ui-kit/layouts/Cluster";
import { IUser } from "../../user";
import { Input } from "../../common/Forms/Input";
import Button from "../../../ui-kit/Button";
import { connect } from "react-redux";
import { postAuth } from "../../../Actions/auth-actions";



export const Auth = ({ postAuth }) => {
    const navigate = useNavigate();
    const [userState, setUserState] = React.useState<Omit<IUser, "id" | "phone" | "company_name" | "name">>({
        type: "seller",
        email: "",
        password: "",
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key) => {
        const value = e.target.value;
        setUserState({ ...userState, [key]: value })
    }
    function handleSaveClick(): void {
        postAuth(userState)
    }

    return (
        <Background>
            <AuthForm>
                <Stack space="24px">
                    <Cluster justify="center">
                        {/* <img style={{ width: "64px", height: "64px", borderRadius: "16px" }} src="/images/universal/navbar/logo.png" alt="логотип" /> */}
                    </Cluster>
                    <Cluster justify="center">
                        <div className="sub1">Вход в сервис</div>
                    </Cluster>
                    <Stack space="8px">
                        <div className="sub3" style={{ color: "rgba(104, 125, 141, 0.7)" }}>Email</div>
                        <Input type="email" name="login" placeholder="" value={userState.email} onChange={(e) => handleInputChange(e, "email")} />
                    </Stack>

                    <Stack space="8px">
                        <div className="sub3" style={{ color: "rgba(104, 125, 141, 0.7)" }}>Пароль</div>
                        <Input type="password" placeholder="" value={userState.password} onChange={(e) => handleInputChange(e, "password")} />
                    </Stack>
                    <Cluster justify="center">
                        <Button variant="primary" text="Войти" disabled={userState.email.length === 0 || userState.password.length === 0 ? true : false} onClick={() => handleSaveClick()} />
                    </Cluster>
                    <Cluster align="center" space="6px" justify="center">
                        <div className="sub3" style={{ color: "rgba(164, 165, 181)" }}>Ещё нет профиля?</div>
                        <div onClick={() => navigate("/sign_up")} className="sub3" style={{ fontWeight: 600, cursor: "pointer" }}>Зарегистрироваться</div>
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
    postAuth,
};

export default connect(null, mapDispatchToProps)(Auth);
