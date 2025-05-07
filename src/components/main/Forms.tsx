import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "../common/Navbar/Navbar";
import { Sidebar } from "../common/Sidebar/Sidebar";
import styled from "styled-components";
import FormList from "../FormPage/FormList/FormList";
import FormEdit from "../FormPage/FormEdit/FormEdit";
import { PrivatePersonalRoute } from "../../App/PrivatePersonalRoutes";
import Statistic from "../FormPage/Statistic/Statistic";
import SellerList from "../FormPage/SellerList/SellerList";
import { DocumentCreator } from "../document-creator";
import { DocumentCreatorMain } from "../document-creator-main";
import { SellersForDocument } from "../sellers";
import { Document } from "../sellers/document/document";
import { FormLayout } from "./layout";

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	background: #e5e5e5;
	overflow: hidden;
`;

const ContentContainer = styled.div`
	padding: 40px 40px 120px 40px;
	padding-left: 304px;
	width: 100%;
	height: 100%;
	overflow: auto;
`;

export const Forms = () => {
	return (
		<Wrapper>
			{/* <Routes>
				<Route path="*" element={<DocumentCreator />} />
			</Routes> */}
			<Routes>
				<Route element={<FormLayout />}>
					<Route path="/creator" element={<DocumentCreator />} />
					<Route path="/sellers" element={<SellersForDocument />} />
					<Route path="/document/:id" element={<Document />} />
					<Route path="/" element={<DocumentCreatorMain />} />
					<Route path="/documents" element={<DocumentCreatorMain />} />
				</Route>
			</Routes>

			{/* <Routes>
				<Route path="*" element={<DocumentCreatorEmploymentContract />} />
			</Routes> */}

			{/* <Navbar />  
			<Sidebar />
			<ContentContainer>
				<Routes>
					<Route path="/form-edit" element={<FormEdit />} />
					<Route path="/form-copy" element={<FormEdit />} />
					<Route path="/form-create" element={<FormEdit />} />
					<Route path="/forms" element={<FormList />} />
					<Route path="/" element={<Statistic />} />
					<Route path="/sellers" element={<SellerList />} />
				</Routes>
			</ContentContainer> */}
		</Wrapper>
	);
};
export default Forms;
