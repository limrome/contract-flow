import * as React from "react";
import { useNavigate } from "react-router-dom";

export const SellerAccountNavigation = () => {
	const navigate = useNavigate();
	const isActive = (path: string) => location.pathname === path;

	return (
		<div className="navigation-account">
			<div
				className={`navigation__header ${isActive("/") ? "active" : ""}`}
				onClick={() => navigate("/", { replace: false })}>
				<button className="icon-btn" />
				<span className="span">Документы</span>
			</div>
			<div
				className={`navigation__header ${isActive("/account") ? "active" : ""}`}
				onClick={() => navigate("/account", { replace: false })}>
				<button className="icon-btn-seller-acc" />
				<span className="span">Профиль</span>
			</div>
		</div>
	);
};
