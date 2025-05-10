// import { useNavigate } from "react-router-dom";
// import * as React from "react";
// import styled from "styled-components";
// import "./FormListItem.scss";
// import { IForm } from "../../interfaces";
// import { deleteForm } from "../../../../Actions/form-action";
// import { connect } from "react-redux";
// import { formatDate } from "../../../../scripts/FormatDate";
// import { IUser } from "../../../user";
// import { ModalContext } from "../../../modal/ModalContext/ModalContext";
// import ViewSellerModal from "./ViewSellerModal";

// interface IFormListItem {
//     seller: IUser;
// }

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
// `

// const Title = styled.div`
//     font-style: normal;
//     font-weight: 600;
//     font-size: 14px;

//     display: flex;
//     align-items: center;
//     color: var(--color-dark-grey);
// `
// const AltTitle = styled.div`
//     font-style: normal;
//     font-weight: 500;
//     font-size: 12px;
//     line-height: 16px;
//     color: var(--color-grey);
// `

// const FormWrapper = styled.div`
//     display: flex;
//     align-items: center;
//     width: 100%;
//     justify-content: space-between;
//     padding: 20px;
//     gap: 8px;
//     height: 80px;
//     background: #FFFFFF;
//     &.is_template {
//         background: rgba(104, 125, 141, 0.1);
//     }
//     border-radius: 16px;
// `

// const ActionWrapper = styled.div`
// display: flex;
//     gap: 8px;
// `

// export const SellerListItem = ({ seller }: IFormListItem) => {
//     const { handleModal } = React.useContext(ModalContext)

//     const handleCopyClick = (seller: IUser) => {
//         handleModal(<ViewSellerModal seller={seller} />)
//     }

//     return (
//         <FormWrapper className={`form-list-item`}>
//             <div className="col">
//                 <Title>{seller.name}</Title>
//                 <AltTitle>{seller.company_name}</AltTitle>
//             </div>
//             <ActionWrapper>
//                 <StyledButton className="copy-button" onClick={() => handleCopyClick(seller)}>
//                     <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path fill-rule="evenodd" clip-rule="evenodd" d="M9.99999 4.91668C10.9667 4.91668 11.75 5.70001 11.75 6.66668C11.75 7.63334 10.9667 8.41668 9.99999 8.41668C9.03333 8.41668 8.24999 7.63334 8.24999 6.66668C8.24999 5.70001 9.03333 4.91668 9.99999 4.91668ZM9.99999 12.4167C12.475 12.4167 15.0833 13.6333 15.0833 14.1667V15.0833H4.91666V14.1667C4.91666 13.6333 7.52499 12.4167 9.99999 12.4167ZM10 3.33334C8.15833 3.33334 6.66666 4.82501 6.66666 6.66668C6.66666 8.50834 8.15833 10 10 10C11.8417 10 13.3333 8.50834 13.3333 6.66668C13.3333 4.82501 11.8417 3.33334 10 3.33334ZM9.99999 10.8333C7.77499 10.8333 3.33333 11.95 3.33333 14.1667V16.6667H16.6667V14.1667C16.6667 11.95 12.225 10.8333 9.99999 10.8333Z" fill="#004CCC" />
//                     </svg>
//                 </StyledButton>
//             </ActionWrapper>
//         </FormWrapper >
//     );
// }



// const mapDispatchToProps = {
//     deleteForm,
// }

// export default connect(null, mapDispatchToProps)(SellerListItem);
