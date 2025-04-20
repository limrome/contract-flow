import * as React from "react";
import { useNavigate } from "react-router-dom";

export const SellerAccountNavigation = () => {
	const navigate = useNavigate();

	return (
		<div className="navigation-account" >
			<div className="navigation__header" onClick={() => navigate("/sellerdocuments", { replace: false })}>
				
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
