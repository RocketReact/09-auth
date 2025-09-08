"use client";

import css from "./SignUpPage.module.css";
import { RegisterLoginRequest } from "@/types/user";
import { register } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { isAxiosError } from "axios";
import { useAuthStore } from "@/lib/store/authStore";

const getUserDataFromInput = (formData: FormData): RegisterLoginRequest => {
  return {
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };
};

export default function SignUpPage() {
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const [error, setError] = useState("");
  const handleSubmit = async (formData: FormData) => {
    try {
      const registerValues = getUserDataFromInput(formData);
      const res = await register(registerValues);

      if (res) {
        setUser(res);
        router.push("/profile");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        setError(
          error.response?.data?.response?.validation?.body?.message ||
            error.response?.data?.response?.message ||
            "Registration failed try again later.",
        );
      }
    }
  };

  return (
    <main className={css.mainContent}>
      <form action={handleSubmit} className={css.form}>
        <h1 className={css.formTitle}>Sign up</h1>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>Error</p>}
      </form>
    </main>
  );
}
