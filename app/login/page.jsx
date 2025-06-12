'use client'
import React, { useContext } from "react";
import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SessionContext } from "@app/SessionProvider";

function login() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const imageSrc = `/assets/images/loginImage.jpg`;
    const router=useRouter();
    const { setUser } = useContext(SessionContext);
    const handleLogin = () => {
      setUser(email)
      router.push('/')
    }

  return (
    <div className="flex items-center justify-center text-center">
      <div className="bg-white rounded-3xl shadow-md w-full max-w-md mx-auto border border-gray-300 mb-7">
        <img
            src={imageSrc} className="mb-7 rounded-t-3xl"/>
            <div className="p-4">
          <div className="text-2xl font-semibold mb-4 text-gray-700">
          เข้าสู่ระบบ
          </div>
          <div className="mx-15">
            <div className="w-full mb-4">
              <label className="flex items-center border-b border-gray-400 pb-2">
                <Mail className="w-5 h-5 text-gray-500 mr-3" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full outline-none placeholder-gray-500"
                  required
                />
              </label>
            </div>
            <div className="w-full mb-6">
              <label className="flex items-center border-b border-gray-400 pb-2">
                <Lock className="w-5 h-5 text-gray-500 mr-3" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full outline-none placeholder-gray-500"
                  required
                />
              </label>
            </div>
          </div>
          <button
            onClick={() => handleLogin()}
            className="mb-15 mt-10 w-[90%] py-2 rounded-full shadow-md mx-auto block border border-gray-300 bg-white text-gray-600 hover:bg-gradient-to-r from-red-300 to-red-600 hover:text-white">
            เข้าสู่ระบบ
          </button>
        </div>
      </div>
    </div>
  );
};

export default login;
