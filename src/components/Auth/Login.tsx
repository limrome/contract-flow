import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Функция для обработки изменений в полях ввода
  const handleChange = (e, key) => {
    setForm({ ...form, [key]: e.target.value });
  };

  // Функция для отправки данных на сервер
  const handleSubmit = async () => {
    const res = await fetch("http://localhost:8000/api/login/", {  // Убедитесь, что путь правильный
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      // Если авторизация успешна, сохраняем токен и перенаправляем на главную страницу
      localStorage.setItem("token", data.token);
      navigate("/dashboard");  // Перенаправление после успешного входа
    } else {
      alert(data.error || "Ошибка авторизации");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "60px auto", padding: "24px", background: "#fff", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center" }}>Авторизация</h2>

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
          Войти
        </button>
      </div>
    </div>
  );
};

export default Login;
