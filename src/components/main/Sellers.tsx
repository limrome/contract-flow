import * as React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { SellerMainDocuments } from "../seller-main-documents";
import { SellerAccount } from "../sellerAccount";
import { FormLayout } from "./layout";
import { SellerDocumentView } from "../seller-main-documents/seller-main-documents-content/SellerDocumentView";

const Wrapper = styled.div`
	background: #e5e5e5;
`;

export const Sellers = () => {
	return (
		<Wrapper>
			<Routes>
				<Route element={<FormLayout />}>
					<Route path="/" element={<SellerMainDocuments />} />
					<Route path="/account" element={<SellerAccount />} />
					<Route path="/seller/document/:id" element={<SellerDocumentView />} />
				</Route>
			</Routes>
		</Wrapper>
	);
};
export default Sellers;
