import React, { useEffect, useState } from "react";
import "./styles/Sidebar.scss"; // импорт стилей
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
	const location = useLocation();
	const [currentPageState, setCurrentPageState] = useState("/");
	useEffect(() => {
		setCurrentPageState(location.pathname);
	}, [location]);
	console.log(currentPageState);

	
	return (
		<aside id="sidebar" className="sidebar">
			<ul className="sidebar-links">
				<Link to="/">
					<li className={`sidebar-item poll ${currentPageState === "/" ? "assignment" : ""}`} >
						<h2>
							<img src="/images/universal/Sidebar/icons/poll.svg" alt="poll" />
							<span>Статистика</span>
						</h2>
					</li>
				</Link>
				<Link to="sellers">
					<li className={`sidebar-item store_mall_directory ${currentPageState === "/sellers" ? "assignment" : ""}`}>
						<h2>
							<img
								src="/images/universal/Sidebar/icons/store_mall_directory.svg"
								alt="store-mall-directory"
							/>
							<span>Контрагенты</span>
						</h2>
					</li>
				</Link>
				<Link to="/forms">
					<li className={`sidebar-item ${currentPageState === "/forms" ? "assignment" : ""}`}>
						<h2>
							<img src="/images/universal/Sidebar/icons/assignment.svg" alt="assignment" />
							<span>Договоры</span>
						</h2>
					</li>
				</Link>
			</ul>
		</aside>
	);
};

export { Sidebar };
