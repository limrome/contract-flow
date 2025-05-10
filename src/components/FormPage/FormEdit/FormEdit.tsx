// import * as React from "react";
// import { useState, useEffect } from "react";
// import styled from "styled-components";
// import BackButton from "../../common/BackButton";
// import Button from "../../../ui-kit/Button";
// import { Cluster } from "../../../ui-kit/layouts/Cluster";
// import { Stack } from "../../../ui-kit/layouts/Stack";
// import { SectionWithHeader, SimpleSection } from "../../common/Forms/Section";
// import { Input } from "../../common/Forms/Input";
// import { IForm } from "../interfaces";
// import { AddSectionBlock } from "./AddSectionBlock";
// import AddFieldBlock from "./AddFieldBlock";
// import { connect } from "react-redux";
// import { createForm, deleteForm, getCurrentForm, updateForm } from "../../../Actions/form-action";
// import { useNavigate } from "react-router-dom";

// const initialFormState: IForm = {
//     is_template: false,
//     sections: [{
//         title: "",
//         fields: [],
//     }],
//     published: true,
//     title: "",
// };

// const StyledButton = styled.button`
//     border: none;
//     outline: none;
//     background: transparent;
//     cursor: pointer;
//     &:hover {
//         svg {
//             path {
//                 fill: var(--color-primary);
//             }
//         }
//     }
// `;

// export const FormEdit = ({
//     currentForm,
//     createForm,
//     updateForm,
//     deleteForm,
//     getCurrentForm,
// }) => {
//     const [formState, setFormState] = useState<IForm>(initialFormState);
//     const navigate = useNavigate();

//     const handleSaveClick = () => {
//         if (location.pathname === "/form-copy" || location.pathname === "/form-create")
//             createForm({ ...formState, is_template: false });
//         if (location.pathname === "/form-edit")
//             updateForm(formState.id, formState);
//         navigate(-1);
//     };

//     useEffect(() => {
//         if (location.pathname === "/form-copy" || location.pathname === "/form-edit") {
//             getCurrentForm(location.search.split("=")[1]);
//         }
//     }, [location]);

//     useEffect(() => {
//         if ("id" in currentForm && (location.pathname === "/form-copy" || location.pathname === "/form-edit") && location.search.split("=")[1] === currentForm.id) {
//             setFormState(currentForm);
//         }
//     }, [currentForm]);

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
//         const value = e.target.value;
//         setFormState({ ...formState, [key]: value });
//     };

//     const handleFieldNameChange = (event: React.ChangeEvent<HTMLInputElement>, sectionIdx: number, fieldIdx: number) => {
//         const value = event.target.value;
//         const sections = formState.sections.map((elem, index) => {
//             if (index === sectionIdx) {
//                 const locField = elem.fields.map((field, fieldIndex) => {
//                     if (fieldIndex === fieldIdx) {
//                         field = { ...field, title: value };
//                     }
//                     return field;
//                 });
//                 return { ...elem, fields: locField };
//             }
//             return elem;
//         });
//         setFormState({ ...formState, sections });
//     };

//     const handleSectionNameChange = (event: React.ChangeEvent<HTMLInputElement>, sectionIdx: number) => {
//         const value = event.target.value;
//         const sections = formState.sections.map((elem, index) => {
//             if (index === sectionIdx) {
//                 elem.title = value;
//             }
//             return elem;
//         });
//         setFormState({ ...formState, sections });
//     };

//     function handleCopySectionClick(idx: any): void {
//         const newSections = [...formState.sections];
//         const section = formState.sections.find((_, index) => index === idx);
//         newSections.push(section);
//         setFormState({ ...formState, sections: newSections });
//     }

//     function handleDeleteSectionClick(idx: any): void {
//         const newSections = formState.sections.filter((_, index) => index !== idx);
//         setFormState({ ...formState, sections: newSections });
//     }

//     function handleDeleteField(sectionIdx: number, fieldIdx: number): void {
//         const sections = formState.sections.map((elem, index) => {
//             if (index === sectionIdx) {
//                 const locField = elem.fields.filter((_, fieldIndex) => fieldIndex !== fieldIdx);
//                 return { ...elem, fields: locField };
//             }
//             return elem;
//         });
//         setFormState({ ...formState, sections });
//     }

//     return (
//         <Stack space="30px">
//             <Cluster id="form-edit" justify="space-between" align="center">
//                 <Cluster space="12px">
//                     <BackButton />
//                     <div className="header-text h6">{formState.title.length ? formState.title : "Новый договор"}</div>
//                 </Cluster>
//                 <Cluster space="12px">
//                     <Button variant="light-primary" text="СОХРАНИТЬ" onClick={handleSaveClick} />
//                     <Button variant="transparent" startIcon={<img src="/images/icons/more_horiz.svg" />} />
//                 </Cluster>
//             </Cluster>
//             <Stack space="20px">
//                 <SimpleSection>
//                     <Input className="header full" placeholder="Название договора" name="title" value={formState.title} onChange={(e) => handleInputChange(e, "title")} />
//                 </SimpleSection>
//                 {formState.sections.map((section, sectionIdx) => (
//                     <SectionWithHeader key={sectionIdx}>
//                         <Stack space="14px">
//                             <Cluster space="10px">
//                                 <Input className="header full" placeholder="Название раздела" value={section.title} onChange={(event) => handleSectionNameChange(event, sectionIdx)} />
//                                 <StyledButton className="edit-button" onClick={() => handleCopySectionClick(sectionIdx)}>
//                                     📄
//                                 </StyledButton>
//                                 <StyledButton className="delete-button" onClick={() => handleDeleteSectionClick(sectionIdx)}>
//                                     ❌
//                                 </StyledButton>
//                             </Cluster>
//                             {section.fields.map((field, fieldIdx) => (
//                                 <Cluster space="10px" key={String(sectionIdx) + String(fieldIdx)}>
//                                     <Input className="body full" placeholder="Название пункта договора" value={field.title} onChange={(event) => handleFieldNameChange(event, sectionIdx, fieldIdx)} />
//                                     <StyledButton className="delete-button" onClick={() => handleDeleteField(sectionIdx, fieldIdx)}>
//                                         ❌
//                                     </StyledButton>
//                                 </Cluster>
//                             ))}
//                             <AddFieldBlock formState={formState} setFormState={setFormState} sectionIdx={sectionIdx} />
//                         </Stack>
//                     </SectionWithHeader>
//                 ))}
//                 <AddSectionBlock formState={formState} setFormState={setFormState} />
//             </Stack>
//         </Stack>
//     );
// };

// const mapStateToProps = (state) => ({
//     currentForm: state.currentForm,
// });

// const mapDispatchToProps = {
//     createForm,
//     updateForm,
//     deleteForm,
//     getCurrentForm,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(FormEdit);
