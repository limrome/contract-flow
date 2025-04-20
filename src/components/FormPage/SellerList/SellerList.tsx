import * as React from "react";
import styled from "styled-components";
import FormListItem from "./FormListItem/SellerListItem";
import { connect } from "react-redux";
import { getFormList } from "../../../Actions/form-action";
import { Stack } from "../../../ui-kit/layouts/Stack";
import { Cluster } from "../../../ui-kit/layouts/Cluster";
import Button from "../../../ui-kit/Button";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../../Actions/auth-actions";
import SellerListItem from "./FormListItem/SellerListItem";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

export const SellerList = ({ getUsers, usersList }) => {
    const navigate = useNavigate();

    const [formState, setFormState] = React.useState([]);
    React.useEffect(() => {
        getUsers();
    }, [])


    React.useEffect(() => {
        setFormState(usersList);
    }, [usersList])

    return (
        <Stack space="20px" >
            <Cluster align="center" justify="space-between"><h2>Список контрагентов</h2></Cluster>
            {
                formState.length ? formState.map((elem) =>
                    <SellerListItem seller={elem} key={elem.id} />
                ) : null
            }
        </Stack>
    );
}

const mapStateToProps = (state) => {
    return {
        usersList: state.usersList,
    };
};


const mapDispatchToProps = {
    getUsers,
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerList);
