function StatusLabel({ statusThai, color }) {
  return (
    <div
      className="flex gap-2 justify-start items-center text-slate-gray text-base"
    >
      <div
        className="size-4 rounded-sm shadow-lg"
        style={{ backgroundColor: color }}
      ></div>
      <span className="whitespace-nowrap">{statusThai}</span>
    </div>
  );
}

export default StatusLabel;
