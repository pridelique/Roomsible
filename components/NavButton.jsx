function NavButton({ label, onClick }) {
  return (
    <button className="px-5 py-2.5 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:outline-none shadow-red-500/50 font-medium text-sm text-center rounded-xl text-md  shadow-lg cursor-pointer " onClick={onClick}>
      {label}
    </button>
  )
}

export default NavButton