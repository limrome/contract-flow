import * as React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import BackButton from "../../common/BackButton";
import Button from "../../../ui-kit/Button";
import { Cluster } from "../../../ui-kit/layouts/Cluster";
import { Stack } from "../../../ui-kit/layouts/Stack";
import { SectionWithHeader, SimpleSection } from "../../common/Forms/Section";
import { Input } from "../../common/Forms/Input";
import { connect, useDispatch } from "react-redux";
import { IForm, ISellerForm } from "../../FormPage/interfaces";
import { getCurrentForm } from "../../../Actions/form-action";
import axios from "axios";
import { baseUrl } from "../../../Actions/actions-static"
import { useNavigate } from "react-router-dom";

const initialFormState: ISellerForm = {
    is_template: false,
    sections: [{
        title: "",
        fields: [],
    }],
    published: true,
    title: "",
}


export const PostEdit = ({
    currentForm,
    getCurrentForm,
}) => {
    const navigate = useNavigate();
    const [formState, setFormState] = useState<ISellerForm>(initialFormState);
    const dispatch = useDispatch();

    const handleSaveClick = async () => {
        await axios
            .post(`${baseUrl}/api/post`, {
                user_id: JSON.parse(localStorage.getItem("user")).id,
                form_id: formState.id,
                sections: formState.sections
            })
            .then((form) => {
                navigate(-1);
            })
            .finally(() => {
                dispatch({
                    type: "HIDE_MAIN_LOADER",
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        console.log(location);
        if (location.pathname === "/post") {
            getCurrentForm(location.search.split("=")[1])
        }
    }, [location])

    useEffect(() => {
        if ("id" in currentForm && location.pathname === "/post" && location.search.split("=")[1] == currentForm.id) {
            setFormState(currentForm);
        }
    }, [currentForm])

    const handleFieldNameChange = (event: React.ChangeEvent<HTMLInputElement>, sectionIdx: number, fieldIdx: number) => {
        const value = event.target.value;
        const sections = formState.sections.map((elem, index) => {
            if (index === sectionIdx) {

                const locField = elem.fields.map((field, fieldIndex) => {
                    if (fieldIndex === fieldIdx) {
                        field = { ...field, value: value };
                    }
                    return field
                });
                return { ...elem, fields: locField }


            }
            return elem
        });
        setFormState({ ...formState, sections })
    }
    console.log(formState)
    return (
        <Stack space="30px" style={{ padding: "60px" }}>
            <Cluster id="form-edit" justify="space-between" align="center">
                <Cluster space="12px">
                    <BackButton />
                    <div className="header-text h6">{formState.title.length ? formState.title : "Новаый договор поставщика"}</div>
                </Cluster>
                <Cluster space="12px">
                    <Button variant="light-primary" text="ОТПРАВИТЬ" onClick={() => handleSaveClick()} />
                    <Button variant="transparent" startIcon={<img src="/images/icons/more_horiz.svg" />} />
                </Cluster>
            </Cluster>
            <Stack space="20px">
                {
                    formState.sections.map((section, sectionIdx) =>
                        <SectionWithHeader key={sectionIdx}>
                            <Stack space="20px">
                                <Cluster space="16px">
                                    <div className="header full h5" >{section?.title}</div>
                                </Cluster>
                                {section.fields.map((field, fieldIdx) =>
                                    <Stack space="8px" key={String(sectionIdx) + String(fieldIdx)}>
                                        <div className="sub3" style={{ color: "rgba(104, 125, 141, 0.7)" }}>{field.title}</div>
                                        <Input type={field.type} className="body full" placeholder="" value={field.value || ""} onChange={(event) => handleFieldNameChange(event, sectionIdx, fieldIdx)} />
                                    </Stack>
                                )}
                            </Stack>
                        </SectionWithHeader>
                    )
                }


            </Stack>

        </Stack>

    );
}


const mapStateToProps = (state) => {
    return {
        currentForm: state.currentForm,
    };
};


const mapDispatchToProps = {
    getCurrentForm,
}

export default connect(mapStateToProps, mapDispatchToProps)(PostEdit);
