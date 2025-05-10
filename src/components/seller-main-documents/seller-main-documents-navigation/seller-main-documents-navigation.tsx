import * as React from "react";
import { useNavigate } from "react-router-dom";

export const SellerMainDocumentsNavigation = () => {

	const navigate = useNavigate();

	return (
		<div className="navigation-seller" >
			<div className="navigation__header" onClick={() => navigate("/", { replace: false })}>
				
				<button className="icon-btn" />
				<span className="span">Документы</span>
			</div>

			<div className="navigation__header" onClick={() => navigate("/account", { replace: false })}>
				<button className="icon-btn-seller-acc" />
				<span className="span">Профиль</span>
			</div>
		</div>
	);
};
