import * as React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import PostEdit from "../SellerArea/form-fill/PostEdit";
import {SellerMainDocuments} from "../seller-main-documents";
import {SellerAccount} from "../sellerAccount";


const Wrapper = styled.div`
	background: #e5e5e5;
`;

export const Sellers = () => {
	return (
		<Wrapper>
			<Routes>
				<Route path="/" element={<SellerMainDocuments />} />
				<Route path="/account" element={<SellerAccount />} />
			</Routes>
		</Wrapper>
	);
};
export default Sellers;
