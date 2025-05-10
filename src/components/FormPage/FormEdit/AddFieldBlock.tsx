// import * as React from "react";
// import Button from "../../../ui-kit/Button";
// import { IForm, IFormSectionField } from "../interfaces";
// import FieldCreateModal from "../field-create/FieldCreateModal";
// import { ModalContext } from "../../modal/ModalContext/ModalContext";

// interface IAddSectionBlockProps {
//     formState: IForm,
//     setFormState: React.Dispatch<React.SetStateAction<IForm>>,
//     sectionIdx: number,
// }

// export const AddFieldBlock = ({ formState, setFormState, sectionIdx }: IAddSectionBlockProps) => {
//     const { handleModal } = React.useContext(ModalContext) as any;

//     const AddFieldClick = (field: IFormSectionField) => {
//         const sections = formState.sections.map((elem, index) => {
//             if (index === sectionIdx) {
//                 elem.fields.push(field)

//             }
//             return elem
//         });
//         setFormState({ ...formState, sections })
//     }
//     return (
//         <Button variant="transparent" startIcon={<img src="/images/icons/add_circle_outline.svg" />} text="ДОБАВИТЬ ЕЩЁ ПОЛЕ" onClick={() => handleModal(<FieldCreateModal onSelect={(elem) => AddFieldClick(elem)} />)} />
//     );
// }

// export default AddFieldBlock;
