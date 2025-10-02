import React, { useEffect, useState } from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	BarChart,
	Bar,
	Legend,
} from "recharts";

const AnalyticsDashboard = () => {
	const [monthlyData, setMonthlyData] = useState([]);
	const [averageTime, setAverageTime] = useState(null);

	const [startDate, setStartDate] = useState("2024-01-01");
	const [endDate, setEndDate] = useState("2025-12-31");

	const [durationData, setDurationData] = useState([]);
	const [statusTrendData, setStatusTrendData] = useState([]);
	const [tempStartDate, setTempStartDate] = useState(startDate);
	const [tempEndDate, setTempEndDate] = useState(endDate);

	useEffect(() => {
		const fetchAnalytics = async () => {
			const startDate = "2024-01-01";
			const endDate = "2025-12-31";

			const monthRes = await fetch(
				`http://localhost:8000/api/analytics/agreed-per-month/?start_date=${startDate}&end_date=${endDate}`
			);
			const monthData = await monthRes.json();
			setMonthlyData(
				monthData.map((item) => ({
					month: new Date(item.month).toLocaleString("default", {
						month: "short",
						year: "numeric",
					}),
					count: item.count,
				}))
			);

			const avgRes = await fetch("http://localhost:8000/api/analytics/average-time/");
			const avgData = await avgRes.json();
			setAverageTime(avgData.average_hours);

			const durationRes = await fetch("http://localhost:8000/api/analytics/duration-by-month/");
			const durationJson = await durationRes.json();
			setDurationData(
				durationJson.map((item) => ({
					month: new Date(item.month).toLocaleString("default", {
						month: "short",
						year: "numeric",
					}),
					average_hours: item.average_hours,
				}))
			);
		};

		fetchAnalytics();
	}, []);

	useEffect(() => {
		const fetchAnalytics = async () => {
			const monthRes = await fetch(
				`http://localhost:8000/api/analytics/agreed-per-month/?start_date=${startDate}&end_date=${endDate}`
			);
			const monthData = await monthRes.json();
			setMonthlyData(
				monthData.map((item) => ({
					month: new Date(item.month).toLocaleString("default", {
						month: "short",
						year: "numeric",
					}),
					count: item.count,
				}))
			);

			const avgRes = await fetch(
				`http://localhost:8000/api/analytics/average-time/?start_date=${startDate}&end_date=${endDate}`
			);
			const avgData = await avgRes.json();
			setAverageTime(avgData.average_hours);

			const trendRes = await fetch(
				`http://localhost:8000/api/analytics/status-trend/?start_date=${startDate}&end_date=${endDate}`
			);
			const trendData = await trendRes.json();
			setStatusTrendData(
				trendData.map((item) => ({
					...item,
					month: new Date(item.month + "-01").toLocaleString("default", {
						month: "short",
						year: "numeric",
					}),
				}))
			);
		};

		fetchAnalytics();
	}, [startDate, endDate]);

	return (
		<div className="content-analytic">
			<div className="p-4">
				<div className="flex flex-col md:flex-row gap-4 mb-6">
					<div>
						<h3 className="text-2xl font-bold mb-4">Начальная дата:</h3>
						<input
							type="date"
							value={startDate}
							onChange={(e) => setStartDate(e.target.value)}
							className="border px-2 py-1 rounded"
						/>
						<button
							style={{
								marginLeft: "20px",
								padding: "16px 16px",
								backgroundColor: "#405651",
								color: "white",
								border: "none",
								borderRadius: "8px",
								cursor: "pointer",
								fontWeight: "bold",
								letterSpacing: "2px",
								fontSize: "16px",
							}}
							onClick={() => {
								setStartDate(tempStartDate);
								setEndDate(tempEndDate);
							}}
							className="ml-4 px-4 py-2 bg-blue-600 text-white rounded">
							Сбросить
						</button>
					</div>
					<div>
						<h3 className="block font-medium mb-1">Конечная дата:</h3>
						<input
							type="date"
							value={endDate}
							onChange={(e) => setEndDate(e.target.value)}
							className="border px-2 py-1 rounded"
						/>

						
					</div>
				</div>

				<div className="p-6 space-y-12 bg-gray-50 min-h-screen max-w-[600px] mx-auto">
					<div>
						<h2 className="text-2xl font-bold mb-4">Согласованные документы по месяцам</h2>
						<ResponsiveContainer width="100%" height={300}>
							<BarChart data={monthlyData}>
								<CartesianGrid strokeDasharray="4 4" />
								<XAxis
									dataKey="month"
									tickFormatter={(str) => {
										const date = new Date(str);
										return date.toLocaleString("ru-RU", { month: "short", year: "numeric" });
									}}
									tick={{ fontSize: 18, fill: "#333", fontWeight: "bold" }}
								/>
								<YAxis
									allowDecimals={false}
									tick={{ fontSize: 16, fill: "#333", fontWeight: "bold" }}
								/>
								<Tooltip
									contentStyle={{ backgroundColor: "#e4efee", borderRadius: 8 }}
									itemStyle={{ fontSize: 18, fontWeight: "bold" }}
									formatter={(value) => [`${value} шт.`, "Документы"]}
								/>
								<Bar dataKey="count" fill="#5c9f9e" />
							</BarChart>
						</ResponsiveContainer>
					</div>

					{/* <div>
						<h2 className="text-2xl font-bold mb-4">Среднее время согласования</h2>
						<div className="text-3xl text-center text-gray-700">
							{averageTime !== null ? `${averageTime.toFixed(2)} часов` : "Загрузка..."}
						</div>
					</div> */}

					<div className="max-w-[600px] mx-auto">
						<h2 className="text-2xl font-bold mb-4">Среднее время согласования по месяцам</h2>
						<ResponsiveContainer width="100%" height={300}>
							<LineChart data={durationData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis
									dataKey="month"
									tickFormatter={(str) => {
										const date = new Date(str);
										return date.toLocaleString("ru-RU", { month: "short", year: "numeric" });
									}}
									tick={{ fontSize: 18, fill: "#333", fontWeight: "bold" }}
								/>
								<YAxis
									unit=" ч"
									ticks={[0, 5, 10, 15, 20, 25, 30]}
									tick={{ fontSize: 16, fill: "#333", fontWeight: "bold" }}
								/>
								<Tooltip
									contentStyle={{ backgroundColor: "#f9f9f9", borderRadius: 8 }}
									itemStyle={{ fontSize: 18 }}
									formatter={(value) => [`${value} ч.`, "Среднее время"]}
								/>
								<Line type="monotone" dataKey="average_hours" stroke="#0e2b28" strokeWidth={2} />
							</LineChart>
						</ResponsiveContainer>
					</div>
					<div className="max-w-[600px] mx-auto">
						<h2 className="text-xl font-semibold mb-4">Тренд активности по статусам</h2>
						<ResponsiveContainer width="100%" height={400}>
							<BarChart data={statusTrendData} stackOffset="expand">
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis
									dataKey="month"
									tickFormatter={(str) => {
										const date = new Date(str);
										return date.toLocaleString("ru-RU", { month: "short", year: "numeric" });
									}}
									tick={{ fontSize: 18, fill: "#333", fontWeight: "bold" }}
								/>
								<YAxis
									tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
									tick={{ fontSize: 16, fill: "#333", fontWeight: "bold" }}
								/>
								<Tooltip itemStyle={{ fontSize: 18, fontWeight: "bold" }} />
								<Legend wrapperStyle={{ fontSize: 18, fontWeight: "bold" }} />
								<Bar dataKey="Ожидается согласование" stackId="a" fill="#ffc658" />
								<Bar dataKey="На согласовании" stackId="a" fill="#8884d8" />
								<Bar dataKey="Согласован" stackId="a" fill="#82ca9d" />
								<Bar dataKey="Не согласован" stackId="a" fill="#ff7f7f" />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AnalyticsDashboard;
