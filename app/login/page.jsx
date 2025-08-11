"use client";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { SessionContext } from "@provider/SessionProvider";
import Image from "@node_modules/next/image";
import { loginImage, logo } from "@public/assets/images";
import { Warning } from "@public/assets/icons";
import { notifySuccess } from "@utils/notify";

function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState("เข้าสู่ระบบ");
  const router = useRouter();
  const { getUser } = useContext(SessionContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
      
      const data = await res.json();
      if (!res.ok) {        
        setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
      } else {
        setButtonText("เข้าสู่ระบบสำเร็จ");
        notifySuccess("เข้าสู่ระบบสำเร็จ!");
        getUser();
        router.push('/');
      }
    } catch (error) {
      console.error(error);
      setError("เกิดข้อผิดพลาดในการเข้าสู่ระบบ กรุณาลองใหม่อีกครั้ง");
    }

    setLoading(false);
  };
  return (
  <section className="relative flex flex-1 min-[460px]:padding-x  max-container w-full pt-6 max-[460px]:p-0">
    {/* <ToastContainer/> */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-16 max-[460px]:px-0 max-[460px]:relative max-[460px]:top-0 max-[460px]:left-0 max-[460px]:-translate-x-0 max-[460px]:-translate-y-0">
      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-md w-full max-w-[400px] md:max-w-4xl sm:min-h-[400px] mx-auto border border-gray-300 overflow-hidden mb-7 max-[460px]:rounded-none max-[460px]:shadow-none max-[460px]:border-none max-[460px]:max-w-[460px] max-[460px]:m-0 ">

        {/* Image */}
        <div className="flex-[1_1_200px] md:w-[400px] h-[250px] md:h-auto bg-gray-100">
          <Image
            src={loginImage}
            alt="Login Image"
            width={448}
            height={300}
            draggable="false"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Form */}
        <div className="px-15 max-[460px]:px-10 flex-[1_1_300px] pt-8 pb-8 w-full md:w-[200px] flex flex-col justify-center">
          {/* <div className="flex justify-center">
            <Image
              src={logo}
              alt="logo"
              width={60}
              height={60}
            />
          </div> */}
          <h2 className="text-3xl font-semibold  text-gray-700 text-center">
            เข้าสู่ระบบ
          </h2>
          <p className="mt-2 text-center text-sm text-slate-gray ">ใช้อีเมลโรงเรียนของคุณเพื่อเข้าสู่ระบบ</p>
          <form className="mt-8" onSubmit={(e) => handleSubmit(e)}>
            <ul className="flex flex-col gap-6">
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
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full outline-none placeholder-gray-500 text-gray-700"
                  required
                />
                <div className="mr-2 flex items-center justify-center">
                  {showPassword ? (
                    <Eye
                      className="w-5 h-5 text-gray-500 cursor-pointer"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <EyeOff
                      className="w-5 h-5 text-gray-500 cursor-pointer"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
              </li>
            </ul>
            {error && (
              <div className="flex gap-2 justify-start items-center mt-3">
                <Warning className="w-5 h-5 text-red-500" />
                <p className="text-red-500 text-[12px] text-start whitespace-pre-line">
                  {error}
                </p>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full py-2 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:bg-gradient-to-br focus:outline-none shadow-red-500/50 font-medium text-[15px] text-center rounded-xl shadow-md cursor-pointer flex items-center justify-center transition-all duration-200 ease-in-out disabled:cursor-auto"
            >
              {loading ? (
                <div className="border-2 border-t-2 border-transparent border-t-white animate-spin size-[22px] rounded-full"></div>
              ) : (
                <p>{buttonText}</p>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

}

export default login;
