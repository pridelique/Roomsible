function StatusLabel({ statusThai, color }) {
  return (
    <div
      className="flex gap-2 justify-start items-center text-slate-gray text-sm md:text-base"
    >
      <div
        className="size-3 sm:size-4 rounded-sm shadow-lg"
        style={{ backgroundColor: color }}
      ></div>
      <span>{statusThai}</span>
    </div>
  );
}

export default StatusLabel;
