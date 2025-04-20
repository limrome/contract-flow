import { useNavigate } from "react-router-dom";
import * as React from "react";
import { useContext } from "react";
import styled from "styled-components";
import "./FormListItem.scss";
import { IForm } from "../../interfaces";
import { deleteForm } from "../../../../Actions/form-action";
import { connect } from "react-redux";
import { formatDate } from "../../../../scripts/FormatDate";
import { ModalContext } from "../../../modal/ModalContext/ModalContext";
import { Cluster } from "../../../../ui-kit/layouts/Cluster";
import { Stack } from "../../../../ui-kit/layouts/Stack";
import Button from "../../../../ui-kit/Button";
interface IFormListItem {
    form: IForm;
    deleteForm;
}

const StyledButton = styled.button`
    border: none;
    outline: none;
    background: transparent;
    cursor: pointer;
    &:hover {
        svg {
            path {
                fill: var(--color-primary);
            }
        }
    }
`

const Title = styled.div`
    font-style: normal;
    font-weight: 600;
    font-size: 14px;

    display: flex;
    align-items: center;
    color: var(--color-dark-grey);
`
const AltTitle = styled.div`
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: var(--color-grey);
`

const FormWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    padding: 20px;
    gap: 8px;
    height: 80px;
    background: #FFFFFF;
    &.is_template {
        background: rgba(104, 125, 141, 0.1);
    }
    border-radius: 16px;
`

const ActionWrapper = styled.div`
display: flex;
    gap: 8px;
`

const StyledSvg = styled.div`
    svg {
        width: 16px;
        height: 16px;
    }

`


const LinkCopyModal = ({ id }: { id: number }) => {
    const { handleModal } = useContext(ModalContext)
    return (
        <>
            <div className="add-category-wrapper" style={{ width: "420px" }}>
                <Stack space="20px">

                    <Cluster justify="space-between" align="center">
                        <div className="sub1">Идентификатор договора</div>
                        <Button variant="transparent" startIcon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.8333 5.34166L14.6583 4.16666L9.99996 8.82499L5.34163 4.16666L4.16663 5.34166L8.82496 9.99999L4.16663 14.6583L5.34163 15.8333L9.99996 11.175L14.6583 15.8333L15.8333 14.6583L11.175 9.99999L15.8333 5.34166Z" fill="#004CCC" />
                        </svg>} onClick={() => handleModal()} />

                    </Cluster>

                    <div className="sub1">{id}</div>
                </Stack>
            </div>
        </>
    );
};


export const FormListItem = ({ form, deleteForm }: IFormListItem) => {
    const navigate = useNavigate();
    const { handleModal } = useContext(ModalContext) as any
    const handleCopyClick = (id: number) => {
        navigate(`/form-copy?id=${id}`);
    }
    const handleEditClick = (id: number) => {
        navigate(`/form-edit?id=${id}`);
    }
    const handleDeleteClick = (id: number) => {
        deleteForm(id);
    }

    return (
        <FormWrapper className={`form-list-item ${form.is_template ? 'is_template' : ''}`}>
            <div className="col">
                <Title>{form.title}</Title>
                <AltTitle>{form.is_template ? "Стандартный шаблон" : formatDate(form.date)}</AltTitle>
            </div>
            <ActionWrapper>
                <StyledButton className="copy-button" onClick={() => handleCopyClick(form.id)}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                            d="M10.6667 0.666656H2.66671C1.93337 0.666656 1.33337 1.26666 1.33337 1.99999V11.3333H2.66671V1.99999H10.6667V0.666656ZM10 3.33332H5.33337C4.60004 3.33332 4.00671 3.93332 4.00671 4.66666L4.00004 14C4.00004 14.7333 4.59337 15.3333 5.32671 15.3333H12.6667C13.4 15.3333 14 14.7333 14 14V7.33332L10 3.33332ZM5.33337 14V4.66666H9.33337V7.99999H12.6667V14H5.33337Z"
                            fill="#264054" />
                    </svg>
                </StyledButton>
                {
                    !form.is_template ?
                        <>
                            <StyledButton className="edit-button" onClick={() => handleModal(<LinkCopyModal id={form.id} />)} >
                                <StyledSvg>

                                    <svg enable-background="new 0 0 141.732 141.732" height="141.732px" id="Livello_1" version="1.1"
                                        viewBox="0 0 141.732 141.732" width="141.732px" xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g id="Livello_107">
                                            <path
                                                d="M57.217,63.271L20.853,99.637c-4.612,4.608-7.15,10.738-7.15,17.259c0,6.524,2.541,12.653,7.151,17.261   c4.609,4.608,10.74,7.148,17.259,7.15h0.002c6.52,0,12.648-2.54,17.257-7.15L91.738,97.79c7.484-7.484,9.261-18.854,4.573-28.188   l-7.984,7.985c0.992,4.667-0.443,9.568-3.831,12.957l-37.28,37.277l-0.026-0.023c-2.652,2.316-6.001,3.579-9.527,3.579   c-3.768,0-7.295-1.453-9.937-4.092c-2.681-2.68-4.13-6.259-4.093-10.078c0.036-3.476,1.301-6.773,3.584-9.39l-0.021-0.02   l0.511-0.515c0.067-0.071,0.137-0.144,0.206-0.211c0.021-0.021,0.043-0.044,0.064-0.062l0.123-0.125l36.364-36.366   c2.676-2.673,6.23-4.144,10.008-4.144c0.977,0,1.947,0.101,2.899,0.298l7.993-7.995c-3.36-1.676-7.097-2.554-10.889-2.554   C67.957,56.124,61.827,58.663,57.217,63.271 M127.809,24.337c0-6.52-2.541-12.65-7.15-17.258c-4.61-4.613-10.74-7.151-17.261-7.151   c-6.519,0-12.648,2.539-17.257,7.151L49.774,43.442c-7.479,7.478-9.26,18.84-4.585,28.17l7.646-7.646   c-0.877-4.368,0.358-8.964,3.315-12.356l-0.021-0.022l0.502-0.507c0.064-0.067,0.134-0.138,0.201-0.206   c0.021-0.02,0.04-0.04,0.062-0.06l0.126-0.127l36.363-36.364c2.675-2.675,6.231-4.147,10.014-4.147   c3.784,0,7.339,1.472,10.014,4.147c5.522,5.521,5.522,14.51,0,20.027L76.138,71.629l-0.026-0.026   c-2.656,2.317-5.999,3.581-9.526,3.581c-0.951,0-1.891-0.094-2.814-0.278l-7.645,7.645c3.369,1.681,7.107,2.563,10.907,2.563   c6.523,0,12.652-2.539,17.261-7.148l36.365-36.365C125.27,36.988,127.809,30.859,127.809,24.337" />
                                        </g>
                                        <g id="Livello_1_1_" />
                                    </svg>
                                </StyledSvg>

                            </StyledButton>
                            <StyledButton className="edit-button" onClick={() => handleEditClick(form.id)}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M9.37333 6.01333L9.98667 6.62667L3.94667 12.6667H3.33333V12.0533L9.37333 6.01333ZM11.7733 2C11.6067 2 11.4333 2.06667 11.3067 2.19333L10.0867 3.41333L12.5867 5.91333L13.8067 4.69333C14.0667 4.43333 14.0667 4.01333 13.8067 3.75333L12.2467 2.19333C12.1133 2.06 11.9467 2 11.7733 2ZM9.37333 4.12667L2 11.5V14H4.5L11.8733 6.62667L9.37333 4.12667Z" fill="#264054" />
                                </svg>
                            </StyledButton>
                            <StyledButton className="delete-button" onClick={() => handleDeleteClick(form.id)}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.00004 12.6667C4.00004 13.4 4.60004 14 5.33337 14H10.6667C11.4 14 12 13.4 12 12.6667V4.66667H4.00004V12.6667ZM5.33337 6H10.6667V12.6667H5.33337V6ZM10.3334 2.66667L9.66671 2H6.33337L5.66671 2.66667H3.33337V4H12.6667V2.66667H10.3334Z" fill="#264054" />
                                </svg>
                            </StyledButton>
                        </>
                        : null
                }
            </ActionWrapper>
        </FormWrapper >
    );
}



const mapDispatchToProps = {
    deleteForm,
}

export default connect(null, mapDispatchToProps)(FormListItem);
