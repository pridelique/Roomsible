import Select from "react-select";

function OptionInput({ title, options, customStyles, setValue, value}) {
  return (
    <div>
      <label className="block font-semibold mb-1 text-gray-700">
        {title}
      </label>
      <Select
        className="react-select-container shadow-md"
        classNamePrefix="react-select"
        styles={customStyles}
        options={options}
        value={options.find((option) => option.value === value)}
        onChange={(selected) => setValue(selected?.value || "")}
        placeholder="เลือก"
      ></Select>
    </div>
  );
}

export default OptionInput;
