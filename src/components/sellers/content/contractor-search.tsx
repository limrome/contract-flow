import React, { ChangeEvent } from "react";

interface ContractorSearchProps {
	searchQuery: string;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
	counterparties: Array<{ id: number; type: string; data: any }>;
}

const ContractorSearch: React.FC<ContractorSearchProps> = ({ searchQuery, setSearchQuery }) => {
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value.toLowerCase();
		setSearchQuery(query);
	};

	return (
		<div className="search-container">
			<input
				className="input_text"
				type="text"
				value={searchQuery}
				placeholder="Поиск контрагентов"
				onChange={handleSearch}
			/>
		</div>
	);
};

export default ContractorSearch;
