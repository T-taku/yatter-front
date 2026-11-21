"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import React, { useState } from "react";
import { useAuth } from "@/auth/AuthProvider";
import { useRouter } from "next/navigation";

export default function Page(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async(e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/login`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       username,
    //       password,
    //     }),
    //   }
    // )
    // if(!response.ok){
    //   alert("エラーが発生しました")
    //   return
    // }
    // const data = (await response.json()) as {username: string}
    // console.log(data);
    try {
      await login(username, password)
      router.push("/")
    } catch {
      alert("エラーが発生しました") // TODO: 後でフロントのコンポーネントにするとよさげ
    }
  }
  return(
    <>
      <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-sm flex-col justify-center px-4">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
        ログイン
      </h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <label className="flex flex-col gap-1 text-sm text-gray-700">
          ユーザー名
          <Input
            type="text"
            name="username"
            placeholder="john"
            autoComplete="username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-gray-700">
          パスワード
          <Input
            type="password"
            name="password"
            placeholder="password"
            autoComplete="current-password"
            onChange={(e)=>setPassword(e.target.value)}
          />
        </label>
        <Button type="submit" className="w-full">
          ログイン
        </Button>
      </form>
    </div>
    </>
  )
}