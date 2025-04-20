import * as React from "react";

import "./App.scss";
import Main from "../components/main/Main";
import { BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { PrivatePersonalRoute } from "./PrivatePersonalRoutes";
import { Route } from "react-router-dom";
import { IUser } from "../components/user";
import Auth from "../components/SellerArea/index/Auth";
import Register from "../components/SellerArea/index/Register";
import { AuthGuard } from "./AuthGuard";
import { DocumentCreator } from "../components/document-creator";

interface IAppProps {
    mainLoader: number;
    authUser: IUser;
}

const App = ({ mainLoader }: IAppProps) => {

    return (
        <div className="App">
            <Router>
                <Routes>

                    <Route exact path="*" element={<PrivatePersonalRoute user={localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null} />} >
                        <Route exact path="*" element={<Main user={JSON.parse(localStorage.getItem("user"))} />} />

                       

                    </Route>
                    <Route exact path="/sign_in" element={<AuthGuard user={localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null} />} >
                        <Route exact path="/sign_in" element={<Auth />} />
                    </Route>
                    <Route exact path="/sign_up" element={<Register />} />
                </Routes>
            </Router>
            <div
                className={`main-loader-wrapper ${mainLoader > 0 ? "active" : "passive"
                    }`}
            >
                <div className="main-loader-img"></div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        mainLoader: state.mainLoader,
        authUser: state.authUser
    };
};


export default connect(mapStateToProps, null)(App);
