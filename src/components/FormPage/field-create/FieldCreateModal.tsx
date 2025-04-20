import React, { useContext, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { ModalContext } from "../../modal/ModalContext/ModalContext";
import { IFormSectionField } from "../interfaces";
import { Cluster } from "../../../ui-kit/layouts/Cluster";
import { Stack } from "../../../ui-kit/layouts/Stack";
import { Input } from "../../common/Forms/Input";
import { Option, Select } from "../../../ui-kit/select";
import { FieldTypeCollection, IFieldType } from "./static";
import Button from "../../../ui-kit/Button";

interface IFieldCreateModal {
    onSelect(item: IFormSectionField): void;
}

const FieldCreateModal = ({ onSelect }: IFieldCreateModal) => {
    const { handleModal, modal } = useContext(ModalContext) as any;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: "title" | "description") => {
        const value = e.target.value;
        setFieldState({ ...fieldState, [key]: value })
    }

    const [fieldState, setFieldState] = useState<IFormSectionField>({
        title: "",
        type: "",
        description: "",
    });

    const handleSaveClick = () => {
        onSelect(fieldState)
        handleModal();
    }

    return (
        <>
            <div className="add-category-wrapper" style={{ width: "640px" }}>
                <Stack space="20px">

                    <Cluster justify="space-between" align="center">
                        <div className="sub1">Создание нового поля</div>
                        <Button variant="transparent" startIcon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.8333 5.34166L14.6583 4.16666L9.99996 8.82499L5.34163 4.16666L4.16663 5.34166L8.82496 9.99999L4.16663 14.6583L5.34163 15.8333L9.99996 11.175L14.6583 15.8333L15.8333 14.6583L11.175 9.99999L15.8333 5.34166Z" fill="#004CCC" />
                        </svg>} onClick={() => handleModal()} />


                    </Cluster>
                    <Stack space="8px">
                        <div className="sub3" style={{ color: "rgba(104, 125, 141, 0.7)" }}>Имя поля</div>
                        <Input placeholder="Название поля*" value={fieldState.title} onChange={(e) => handleInputChange(e, "title")} />
                    </Stack>
                    <Stack space="8px">
                        <div className="sub3" style={{ color: "rgba(104, 125, 141, 0.7)" }}>Тип данных*</div>
                        <Select placeholder="Выберите тип данных" resolveValue={(elem) => elem['title']} onSelect={(elem: IFieldType) => setFieldState({ ...fieldState, type: elem.type })}>
                            {
                                FieldTypeCollection.map((elem, index) => <Option key={index} value={elem}>{elem.title}</Option>)
                            }
                        </Select>
                    </Stack>


                    <Stack space="8px">
                        <div className="sub3" style={{ color: "rgba(104, 125, 141, 0.7)" }}>Описание</div>
                        <Input placeholder="Опишите подробно" value={fieldState.description} onChange={(e) => handleInputChange(e, "description")} />
                    </Stack>
                    <Cluster space="16px" justify="flex-end">
                        <Button variant="light-primary" text="Отменить" onClick={() => handleModal()} />
                        <Button variant="primary" text="Сохранить" disabled={fieldState.type.length === 0 || fieldState.title.length === 0 ? true : false} onClick={() => handleSaveClick()} />
                    </Cluster>
                </Stack>
            </div>
        </>
    );
};

export default connect(null, null)(FieldCreateModal);
