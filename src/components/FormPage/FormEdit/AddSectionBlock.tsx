import * as React from "react";
import { SimpleSection } from "../../common/Forms/Section";
import Button from "../../../ui-kit/Button";
import { IForm } from "../interfaces";

interface IAddSectionBlockProps {
    formState: IForm,
    setFormState: React.Dispatch<React.SetStateAction<IForm>>,
}

const initialSection = {
    title: "",
    fields: [],
}

export const AddSectionBlock = ({ formState, setFormState }: IAddSectionBlockProps) => {


    const AddSectionClick = () => {
        const sections = [...formState.sections];
        sections.push(initialSection);
        setFormState({ ...formState, sections })
    }
    return (
        <SimpleSection>
            <Button variant="transparent" startIcon={<img src="/images/icons/add_circle_outline.svg" />} text="ДОБАВИТЬ ЕЩЁ РАЗДЕЛ" onClick={AddSectionClick} />
        </SimpleSection>
    );
}

export default AddSectionBlock;
