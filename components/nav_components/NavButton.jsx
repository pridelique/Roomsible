function NavButton({ session, handleLogin, handleLogout }) {
  if (session) return (
    <button className="px-4.5 py-2 bg-white text-slate-gray focus:outline-none border border-gray-300 hover:bg-gradient-to-r hover:from-red-400 hover:via-red-500 hover:to-red-600 hover:text-white hover:scale-105 active:scale-95 transition duration-150 font-medium text-[15px] text-center rounded-xl  shadow-md hover:shadow-red-500/50 hover:border-red-400 cursor-pointer" onClick={() => setTimeout(() => handleLogout(), 0)}>
      ออกจากระบบ
    </button>
  )
  return (
    <button className="px-4.5 py-2 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:outline-none hover:scale-105 active:scale-95 transition duration-150 shadow-red-500/50 font-medium text-[15px] text-center rounded-xl  shadow-md cursor-pointer " onClick={() => setTimeout(() => handleLogin(), 0) }>
      เข้าสู่ระบบ
    </button>
  )
}

export default NavButton