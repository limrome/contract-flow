// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Input } from "../../common/Forms/Input";
// import Button from "../../../ui-kit/Button";
// import { Stack } from "../../../ui-kit/layouts/Stack";
// import { Cluster } from "../../../ui-kit/layouts/Cluster";
// import { AuthForm, Background } from "./wrappers";

// const RegisterUser = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e, key) => {
//     setForm({ ...form, [key]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     const res = await fetch("/api/register/", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();
//     if (res.ok) {
//       localStorage.setItem("user_id", data.user_id);
//       navigate("/register/counterparty");
//     } else {
//       alert(data.error || "Ошибка регистрации");
//     }
//   };

//   return (
//     <Background>
//       <AuthForm>
//         <Stack space="24px">
//           <Cluster justify="center"><div className="sub1">Регистрация</div></Cluster>

//           <Stack space="8px">
//             <div className="sub3">Email</div>
//             <Input type="email" value={form.email} onChange={(e) => handleChange(e, "email")} />
//           </Stack>

//           <Stack space="8px">
//             <div className="sub3">Пароль</div>
//             <Input type="password" value={form.password} onChange={(e) => handleChange(e, "password")} />
//           </Stack>

//           <Cluster justify="center">
//             <Button
//               variant="primary"
//               text="Продолжить"
//               disabled={!form.email || !form.password}
//               onClick={handleSubmit}
//             />
//           </Cluster>
//         </Stack>
//       </AuthForm>
//     </Background>
//   );
// };

// export default RegisterUser;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e, key) => {
    setForm({ ...form, [key]: e.target.value });
  };


  const handleSubmit = async () => {
    console.log("Нажата кнопка регистрации", form); // ← проверь, вызывается ли
    const res = await fetch("http://localhost:8000/api/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("user_id", data.user_id);
      navigate("/register/counterparty");
    } else {
      alert(data.error || "Ошибка регистрации");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "60px auto", padding: "24px", background: "#fff", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center" }}>Регистрация</h2>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", marginBottom: "4px" }}>Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => handleChange(e, "email")}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      <div style={{ marginBottom: "24px" }}>
        <label style={{ display: "block", marginBottom: "4px" }}>Пароль</label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => handleChange(e, "password")}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      <div style={{ textAlign: "center" }}>
        <button
          onClick={handleSubmit}
          disabled={!form.email || !form.password}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: form.email && form.password ? "pointer" : "not-allowed"
          }}
        >
          Продолжить
        </button>
      </div>
    </div>
  );
};

export default RegisterUser;
