"use client";
import React, { useContext } from "react";
import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { SessionContext } from "@provider/SessionProvider";
import Image from "@node_modules/next/image";
import { loginImgae } from "@public/assets/images";
import { Warning } from "@public/assets/icons";

function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser } = useContext(SessionContext);
  const handleLogin = () => {
    if (!email || !password) {
      setError("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    setError("");
    setUser(email);
    router.push("/");
  };

  return (
    <section className="padding-x max-container w-full pt-6">
      <div className="absolute top-1/2 left-1/2 -translate-1/2 flex items-center justify-center text-center flex-col bg-white rounded-3xl shadow-md w-full max-w-[400px] mx-auto border border-gray-300 mb-7">
        <div className="">
          <Image
            src={loginImgae}
            alt="Login Image"
            width={448}
            height={300}
            draggable="false"
            className="rounded-t-3xl object-cover"
          />
        </div>
        <div className="px-7 pt-4 pb-8 w-full max-w-[325px]">
          <div className="mt-1 text-[26px] font-semibold mb-4 text-gray-700">
            เข้าสู่ระบบ
          </div>
          <form>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center border-b border-gray-400 pb-2 ">
                
                  <Mail className="w-5 h-5 text-gray-500 mr-3" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full outline-none placeholder-gray-500 text-gray-700"
                    required
                  />
              </li>
              <li className="flex items-center border-b border-gray-400 pb-2 w-full">
              
                  <Lock className="w-5 h-5 text-gray-500 mr-3" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full outline-none placeholder-gray-500 text-gray-700"
                    required
                  />
              </li>
            </ul>
          </form>
          {error && (
            <div className="flex gap-2 justify-start items-center mt-3">
              <Warning className="w-5 h-5 text-red-500" />
              <p className="text-red-500 text-[12px] text-start ">
                {error}
              </p>
            </div>
          )}
          <button
            onClick={() => handleLogin()}
            className="mt-5 w-full py-2 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:bg-gradient-to-br focus:outline-none shadow-red-500/50 font-medium text-[15px] text-center rounded-xl shadow-md cursor-pointer "
          >
            เข้าสู่ระบบ
          </button>
        </div>
      </div>
    </section>
  );
}

export default login;
