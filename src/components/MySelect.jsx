import Select from "react-select";

const customStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "rgb(31 41 55)", // bg-gray-800
    borderColor: state.isFocused ? "rgb(96 165 250)" : "rgb(75 85 99)", // focus:border-blue-400 border-gray-600
    color: "white",
    padding: "4px",
    borderRadius: "0.5rem", // rounded-lg
    boxShadow: state.isFocused ? "0 0 0 2px rgb(96 165 250 / 50%)" : "none", // shadow focus
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "rgb(31 41 55)", // bg-gray-800
    borderRadius: "0.5rem",
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isSelected
      ? "rgb(96 165 250)" // bg-blue-400
      : isFocused
      ? "rgb(55 65 81)" // hover:bg-gray-700
      : "rgb(31 41 55)", // bg-gray-800
    color: "white",
    padding: "4px",
  }),
  singleValue: (base) => ({
    ...base,
    color: "white", // text-white
  }),
};

function MySelect({ options, value, onChange }) {
  return (
    <Select 
      options={options} 
      value={value} 
      onChange={onChange} 
      styles={customStyles} 
    />
  );
}

export default MySelect;
