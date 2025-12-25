import { useState } from "react";
import { updateUser } from "../services/authService";

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
    // New function to update user
  const handleUpdate = async (token) => {
    try {
      const response = await updateUser(form, token);
      setMessage(response.data.message || "User updated successfully");
      return response.data.data; // updated user info
    } catch (err) {
      setMessage(err.response?.data?.message || "Update failed");
      return null;
    }
  };

  return { form, setForm, message, setMessage, handleChange, resetForm,updateUser };
};


export default useAuthForm;
