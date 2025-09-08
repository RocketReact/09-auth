"use client";
import css from "./SignInPage.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/lib/api/clientApi";
import { isAxiosError } from "axios";
import { RegisterLoginRequest } from "@/types/user";

const getUserDataFromInput = (formData: FormData): RegisterLoginRequest => {
  return {
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };
};

export default function SignIn() {
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    try {
      const loginValues = getUserDataFromInput(formData);
      const res = await login(loginValues);

      if (res) {
        setUser(res);
        router.push("/profile");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        setError(
          error.response?.data?.response?.validation?.body?.message ||
            error.response?.data?.response?.message ||
            "Login failed try again later.",
        );
      }
    }
  };

  return (
    <main className={css.mainContent}>
      <form action={handleSubmit} className={css.form}>
        <h1 className={css.formTitle}>Sign in</h1>

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
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
