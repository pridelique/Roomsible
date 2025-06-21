"use client";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { SessionContext } from "@provider/SessionProvider";
import Image from "@node_modules/next/image";
import { loginImgae } from "@public/assets/images";
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
  const { setUser } = useContext(SessionContext);

  const handleLogin = () => {
    if (!email || !password) {
      setError("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    setError("");
    // Here you would typically make an API call to log in the user
    // Simulate a login request
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (Math.random() < 0.5) {
        setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
        return;
      }
      setButtonText("เข้าสู่ระบบสำเร็จ!");
      setUser(email);
      notifySuccess("คุณเข้าสู่ระบบเรียบร้อยแล้ว!");
      router.push("/");
    }, 2000);
  };
  return (
    <section className="padding-x max-container w-full pt-6">
      {/* <ToastContainer/> */}
      <div className="absolute top-1/2 left-1/2 -translate-1/2 w-full padding-x">
        <div className="flex items-center justify-center text-center flex-col bg-white rounded-3xl shadow-md w-full max-w-[400px] mx-auto border border-gray-300 mb-7">
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
              <ul className="flex flex-col gap-4">
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
            </form>
            {error && (
              <div className="flex gap-2 justify-start items-center mt-3">
                <Warning className="w-5 h-5 text-red-500" />
                <p className="text-red-500 text-[12px] text-start whitespace-pre-line">
                  {error}
                </p>
              </div>
            )}
            <button
              onClick={() => handleLogin()}
              disabled={loading}
              className="mt-5 w-full py-2 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:bg-gradient-to-br focus:outline-none shadow-red-500/50 font-medium text-[15px] text-center rounded-xl shadow-md cursor-pointer flex items-center justify-center transition-all duration-200 ease-in-out disabled:cursor-auto"
            >
              {loading ? (
                <div className="border-2 border-t-2  border-transparent border-t-white animate-spin size-[22px] rounded-full"></div>
              ) : (
                <p>{buttonText}</p>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default login;
