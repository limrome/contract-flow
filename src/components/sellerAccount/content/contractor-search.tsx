// import React, { ChangeEvent } from 'react';


// interface ContractorSearchProps {

//   searchQuery: string; // Строка с поисковым запросом
//   setSearchQuery: React.Dispatch<React.SetStateAction<string>>; // Функция для обновления поискового запроса
//   counterparties: Array<{ id: number; type: string; data: any }>;  // Указываем тип контрагентов

// }

// const ContractorSearch: React.FC<ContractorSearchProps> = ({
//   searchQuery,
//   setSearchQuery,
// }) => {
//   // Функция для фильтрации контрагентов
//   const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);
//   };

//   return (
//     <div className="search-container">
//       <input
//         className="input_text"
//         type="text"
//         value={searchQuery}
//         placeholder="Поиск контрагентов"
//         onChange={handleSearch}
//       />
//     </div>
//   );
// };

// export default ContractorSearch;
