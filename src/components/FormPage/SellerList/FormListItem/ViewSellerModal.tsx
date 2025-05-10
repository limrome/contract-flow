// import React, { useContext, useEffect, useState } from "react";
// import { connect, useDispatch } from "react-redux";
// import { useNavigate, useLocation } from "react-router-dom";
// import { IUser } from "../../../user";
// import { ModalContext } from "../../../modal/ModalContext/ModalContext";
// import { Stack } from "../../../../ui-kit/layouts/Stack";
// import { Cluster } from "../../../../ui-kit/layouts/Cluster";
// import { Input } from "../../../common/Forms/Input";
// import Button from "../../../../ui-kit/Button";

// interface IViewSellerModal {
//     seller: IUser,
// }

// const ViewSellerModal = ({ seller }: IViewSellerModal) => {
//     const { handleModal, modal } = useContext(ModalContext) as any;
//     return (
//         <>
//             <div className="add-category-wrapper" style={{ width: "640px" }}>
//                 <Stack space="20px">

//                     <Cluster justify="space-between" align="center">
//                         <div className="sub1">Профиль</div>
//                         <Button variant="transparent" startIcon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path fill-rule="evenodd" clip-rule="evenodd" d="M15.8333 5.34166L14.6583 4.16666L9.99996 8.82499L5.34163 4.16666L4.16663 5.34166L8.82496 9.99999L4.16663 14.6583L5.34163 15.8333L9.99996 11.175L14.6583 15.8333L15.8333 14.6583L11.175 9.99999L15.8333 5.34166Z" fill="#004CCC" />
//                         </svg>} onClick={() => handleModal()} />


//                     </Cluster>
//                     <Stack space="8px">
//                         <div className="sub3" style={{ color: "rgba(104, 125, 141, 0.7)" }}>ФИО</div>
//                         <Input readOnly placeholder="Название поля*" value={seller.name} />
//                     </Stack>
//                     <Stack space="8px">
//                         <div className="sub3" style={{ color: "rgba(104, 125, 141, 0.7)" }}>Email</div>
//                         <Input readOnly placeholder="Название поля*" value={seller.email} />
//                     </Stack>
//                     <Stack space="8px">
//                         <div className="sub3" style={{ color: "rgba(104, 125, 141, 0.7)" }}>Название организации</div>
//                         <Input readOnly placeholder="Название поля*" value={seller.company_name} />
//                     </Stack>
//                     <Stack space="8px">
//                         <div className="sub3" style={{ color: "rgba(104, 125, 141, 0.7)" }}>Телефон</div>
//                         <Input readOnly placeholder="Название поля*" value={seller.phone} />
//                     </Stack>
//                     <Cluster space="16px" justify="flex-end">
//                         <Button variant="primary" text="Принять" onClick={() => handleModal()} />
//                     </Cluster>
//                 </Stack>
//             </div>
//         </>
//     );
// };

// // const mapStateToProps = (state) => {
// //     return {
// //         loading: state.loadingStatus.loading,
// //     };
// // };

// // const mapDispatchToProps = {
// // 	deleteUser,
// // };

// export default connect(null, null)(ViewSellerModal);
