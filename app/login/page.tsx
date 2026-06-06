"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../lib/api";
import { useAuthStore } from "../../store/auth.store";

export default function LoginPage() {
  const router = useRouter();

  const setAuth = useAuthStore((s) => s.setAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      setAuth(res.data);

      localStorage.setItem(
        "token",
        res.data.token
      );

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login gagal");
    }
  };

  return (
    <div className="flex flex-col gap-4 p-10 max-w-sm">
      <h1 className="text-2xl font-bold">
        Login
      </h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        className="border p-2"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        className="border p-2"
      />

      <button
        onClick={login}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Login
      </button>
    </div>
  );
}