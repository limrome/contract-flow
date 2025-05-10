// import React from "react";
// import { Link } from "react-router-dom";

// export const Header = ({ isAuthenticated, onLogout }) => {
//     return (
//         <header>
//             <nav>
//                 <ul>
//                     <li>
//                         <Link to="/">Главная</Link>
//                     </li>
//                     {isAuthenticated ? (
//                         <>
//                             <li>
//                                 <Link to="/profile">Профиль</Link>
//                             </li>
//                             <li>
//                                 <button onClick={onLogout}>Выход</button>
//                             </li>
//                         </>
//                     ) : (
//                         <>
//                             <li>
//                                 <Link to="/login">Вход</Link>
//                             </li>
//                             <li>
//                                 <Link to="/register">Регистрация</Link>
//                             </li>
//                         </>
//                     )}
//                 </ul>
//             </nav>
//         </header>
//     );
// };
