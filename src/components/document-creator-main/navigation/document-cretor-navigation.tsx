import * as React from "react";
import { useNavigate } from "react-router-dom";

export const DocumentCreatorNavigation = () => {
	const navigate = useNavigate();

	return (
		<div className="navigation" id="navigation">
			<div className="navigation__header" onClick={() => navigate("/", { replace: false })}>
				<button className="icon-btn" />
				<span className="span">Документы</span>
			</div>

			<div className="navigation__header" onClick={() => navigate("/sellers", { replace: false })}>
				<button className="icon-btn-seller" />
				<span className="span">Контрагенты</span>
			</div>
			<div
				className="navigation__header"
				onClick={() => navigate("/analitics", { replace: false })}>
				<button className="icon-btn-analytics" />
				<span className="span">Аналитика</span>
			</div>
		</div>
	);
};
