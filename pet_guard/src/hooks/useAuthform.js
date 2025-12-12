import { useState } from "react";

const useAuthForm = (initialValues) => {
  const [form, setForm] = useState(initialValues);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm(initialValues);
    setMessage("");
  };

  return { form, setForm, message, setMessage, handleChange, resetForm };
};

export default useAuthForm;
