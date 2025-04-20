import * as React from "react";
import styled from "styled-components";
import FormListItem from "./FormListItem/StatisticListItem";
import { connect } from "react-redux";
import { getFormList } from "../../../Actions/form-action";
import { Stack } from "../../../ui-kit/layouts/Stack";
import { Cluster } from "../../../ui-kit/layouts/Cluster";
import Button from "../../../ui-kit/Button";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../../Actions/post-actions";
import StatisticListItem from "./FormListItem/StatisticListItem";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

export const Statistic = ({ getPosts, postList }) => {
    const navigate = useNavigate();

    const [formState, setFormState] = React.useState([]);
    React.useEffect(() => {
        getPosts();
    }, [])


    React.useEffect(() => {
        setFormState(postList);
    }, [postList])

    return (
        <Stack space="20px" >
            <Cluster align="center" justify="space-between"><h2>Статистика</h2><Button onClick={() => navigate('/form-create')} variant="light-primary" text="НОВЫЙ ДОГОВОР" startIcon={<img src="/images/icons/add_box.svg" />} /></Cluster>
            {
                formState.length ? formState.map((elem) =>
                    <StatisticListItem form={elem} key={elem.id} />
                ) : null
            }
        </Stack>
    );
}

const mapStateToProps = (state) => {
    return {
        postList: state.postList,
    };
};


const mapDispatchToProps = {
    getPosts,
}

export default connect(mapStateToProps, mapDispatchToProps)(Statistic);
