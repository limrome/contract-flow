// import * as React from "react";
// import styled from "styled-components";
// import FormListItem from "./FormListItem/FormListItem";
// import { connect } from "react-redux";
// import { getFormList } from "../../../Actions/form-action";
// import { Stack } from "../../../ui-kit/layouts/Stack";
// import { Cluster } from "../../../ui-kit/layouts/Cluster";
// import Button from "../../../ui-kit/Button";
// import { useNavigate } from "react-router-dom";

// const Wrapper = styled.div`
//     display: flex;
//     flex-direction: column;
//     gap: 20px;
// `

// export const FormList = ({ getFormList, formList }) => {
//     const navigate = useNavigate();

//     const [formState, setFormState] = React.useState([]);
//     React.useEffect(() => {
//         getFormList();
//     }, [])


//     React.useEffect(() => {
//         setFormState(formList);
//     }, [formList])

//     return (
//         <Stack space="20px" >
//             <Cluster align="center" justify="space-between"><h2>Договоры</h2><Button onClick={() => navigate('/form-create')} variant="light-primary" text="Новый договор" startIcon={<img src="/images/icons/add_box.svg" />} /></Cluster>
//             {
//                 formState.length ? formState.map((elem) =>
//                     <FormListItem form={elem} key={elem.id} />
//                 ) : null
//             }
//         </Stack>
//     );
// }

// const mapStateToProps = (state) => {
//     return {
//         formList: state.formList,
//     };
// };


// const mapDispatchToProps = {
//     getFormList,
// }

// export default connect(mapStateToProps, mapDispatchToProps)(FormList);
