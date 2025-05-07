// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Input } from "../../common/Forms/Input";
// import Button from "../../../ui-kit/Button";
// import { Stack } from "../../../ui-kit/layouts/Stack";
// import { Cluster } from "../../../ui-kit/layouts/Cluster";
// import { AuthForm, Background } from "./wrappers";

// const RegisterCounterparty = () => {
//   const user_id = localStorage.getItem("user_id");
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     user_id: user_id,
//     counterparty_type: "company",
//     full_name: "",
//     inn: "",
//     email: "",
//     phone: "",
//     legal_address: "",
//     director_name: "",
//     kpp: "",
//     ogrn: "",
//     bank_name: "",
//     account: "",
//     corp_account: "",
//     passport_series: "",
//     passport_number: "",
//     issued_by: "",
//     issue_date: "",
//     birth_date: "",
//     birth_place: "",
//     passport_code: "",
//     address: ""
//   });

//   const handleChange = (e, key) => {
//     setForm({ ...form, [key]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     const res = await fetch("/api/counterparty/", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();
//     if (res.ok) {
//       alert("Контрагент зарегистрирован!");
//       localStorage.removeItem("user_id");
//       navigate("/sign_in");
//     } else {
//       alert(data.error || "Ошибка");
//     }
//   };

//   return (
//     <Background>
//       <AuthForm>
//         <Stack space="24px">
//           <Cluster justify="center"><div className="sub1">Данные контрагента</div></Cluster>

//           <Input placeholder="Тип (например, ИП, ООО)" value={form.counterparty_type} onChange={(e) => handleChange(e, "counterparty_type")} />
//           <Input placeholder="Полное наименование" value={form.full_name} onChange={(e) => handleChange(e, "full_name")} />
//           <Input placeholder="ИНН" value={form.inn} onChange={(e) => handleChange(e, "inn")} />
//           <Input placeholder="Email" value={form.email} onChange={(e) => handleChange(e, "email")} />
//           <Input placeholder="Телефон" value={form.phone} onChange={(e) => handleChange(e, "phone")} />
//           <Input placeholder="Юр. адрес" value={form.legal_address} onChange={(e) => handleChange(e, "legal_address")} />
//           <Input placeholder="ФИО директора" value={form.director_name} onChange={(e) => handleChange(e, "director_name")} />
//           <Input placeholder="КПП" value={form.kpp} onChange={(e) => handleChange(e, "kpp")} />
//           <Input placeholder="ОГРН" value={form.ogrn} onChange={(e) => handleChange(e, "ogrn")} />
//           <Input placeholder="Банк" value={form.bank_name} onChange={(e) => handleChange(e, "bank_name")} />
//           <Input placeholder="Расчетный счет" value={form.account} onChange={(e) => handleChange(e, "account")} />
//           <Input placeholder="Кор. счет" value={form.corp_account} onChange={(e) => handleChange(e, "corp_account")} />
//           <Input placeholder="Серия паспорта" value={form.passport_series} onChange={(e) => handleChange(e, "passport_series")} />
//           <Input placeholder="Номер паспорта" value={form.passport_number} onChange={(e) => handleChange(e, "passport_number")} />
//           <Input placeholder="Кем выдан" value={form.issued_by} onChange={(e) => handleChange(e, "issued_by")} />
//           <Input type="date" placeholder="Дата выдачи" value={form.issue_date} onChange={(e) => handleChange(e, "issue_date")} />
//           <Input type="date" placeholder="Дата рождения" value={form.birth_date} onChange={(e) => handleChange(e, "birth_date")} />
//           <Input placeholder="Место рождения" value={form.birth_place} onChange={(e) => handleChange(e, "birth_place")} />
//           <Input placeholder="Код подразделения" value={form.passport_code} onChange={(e) => handleChange(e, "passport_code")} />
//           <Input placeholder="Адрес регистрации" value={form.address} onChange={(e) => handleChange(e, "address")} />

//           <Cluster justify="center">
//             <Button variant="primary" text="Завершить регистрацию" onClick={handleSubmit} />
//           </Cluster>
//         </Stack>
//       </AuthForm>
//     </Background>
//   );
// };

// export default RegisterCounterparty;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterCounterparty = () => {
  const user_id = localStorage.getItem("user_id");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    user_id: user_id,
    counterparty_type: "company",
    full_name: "",
    inn: "",
    email: "",
    phone: "",
    legal_address: "",
    director_name: "",
    kpp: "",
    ogrn: "",
    bank_name: "",
    account: "",
    corp_account: "",
    passport_series: "",
    passport_number: "",
    issued_by: "",
    issue_date: "",
    birth_date: "",
    birth_place: "",
    passport_code: "",
    address: ""
  });

  const handleChange = (e, key) => {
    setForm({ ...form, [key]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:8000/api/counterparty/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form), // убедитесь, что form содержит все нужные данные
    });
  
    const data = await res.json();
    if (res.ok) {
      alert("Контрагент зарегистрирован!");
      localStorage.removeItem("user_id");
      navigate("/sign_in");
    } else {
      alert(data.error || "Ошибка");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px", background: "#fff", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center" }}>Данные контрагента</h2>
      {[
        ["Тип (например, ИП, ООО)", "counterparty_type"],
        ["Полное наименование", "full_name"],
        ["ИНН", "inn"],
        // ["Email", "email"],
        ["Телефон", "phone"],
        ["Юр. адрес", "legal_address"],
        ["ФИО директора", "director_name"],
        ["КПП", "kpp"],
        ["ОГРН", "ogrn"],
        ["Банк", "bank_name"],
        ["Расчетный счет", "account"],
        ["Кор. счет", "corp_account"],
        ["Серия паспорта", "passport_series"],
        ["Номер паспорта", "passport_number"],
        ["Кем выдан", "issued_by"],
        ["Место рождения", "birth_place"],
        ["Код подразделения", "passport_code"],
        ["Адрес регистрации", "address"]
      ].map(([placeholder, key]) => (
        <input
          key={key}
          placeholder={placeholder}
          value={form[key]}
          onChange={(e) => handleChange(e, key)}
          style={{ marginBottom: "12px", padding: "8px", width: "100%", boxSizing: "border-box" }}
        />
      ))}

      <input
        type="date"
        placeholder="Дата выдачи"
        value={form.issue_date}
        onChange={(e) => handleChange(e, "issue_date")}
        style={{ marginBottom: "12px", padding: "8px", width: "100%" }}
      />

      <input
        type="date"
        placeholder="Дата рождения"
        value={form.birth_date}
        onChange={(e) => handleChange(e, "birth_date")}
        style={{ marginBottom: "12px", padding: "8px", width: "100%" }}
      />

      <div style={{ textAlign: "center" }}>
        <button onClick={handleSubmit} style={{ padding: "10px 20px", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px" }}>
          Завершить регистрацию
        </button>
      </div>
    </div>
  );
};

export default RegisterCounterparty;
