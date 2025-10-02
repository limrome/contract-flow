import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { DocumentCreator } from "../document-creator";
import { DocumentCreatorMain } from "../document-creator-main";
import { SellersForDocument } from "../sellers";
import { Document } from "../sellers/document/document";
import { FormLayout } from "./layout";
import AnalyticsDashboard from "../analytics/Analitics-dashboard";
import { Analytics } from "../analytics";

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	background: #e5e5e5;
	overflow: auto;
	scrollbar-width: none;
`;

export const Forms = () => {
	return (
		<Wrapper>
		
			<Routes>
				<Route element={<FormLayout />}>
					<Route path="/" element={<DocumentCreatorMain />} />
					<Route path="/creator" element={<DocumentCreator />} />
					<Route path="/sellers" element={<SellersForDocument />} />
					<Route path="/document/:id" element={<Document />} />

					<Route path="/documents" element={<DocumentCreatorMain />} />
					<Route path="/analytics" element={<Analytics />} />
				</Route>
			</Routes>
		</Wrapper>
	);
};
export default Forms;
