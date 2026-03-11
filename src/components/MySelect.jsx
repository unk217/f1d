import Select from "react-select";

const customStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "rgba(15, 23, 42, 0.4)", // Equivalente a bg-slate-900/40
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)", 
    borderColor: state.isFocused ? "rgb(6 182 212)" : "rgba(30, 41, 59, 0.6)", // cyan-500 o slate-800/60
    color: "white",
    padding: "4px",
    borderRadius: "0.75rem", // rounded-xl
    boxShadow: state.isFocused ? "0 0 0 2px rgba(6, 182, 212, 0.2)" : "none", // Focus en cyan sutil
    transition: "all 0.2s ease",
    cursor: "pointer",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "rgba(15, 23, 42, 0.75)", // bg-slate-900/75
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    borderRadius: "0.75rem", // rounded-xl
    border: "1px solid rgba(30, 41, 59, 0.8)", // Borde sutil
    zIndex: 50,
    overflow: "hidden",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)", // shadow-xl oscura
  }),
  menuList: (base) => ({
    ...base,
    padding: "4px",
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isSelected
      ? "rgba(6, 182, 212, 0.9)" // cyan-500
      : isFocused
      ? "rgba(30, 41, 59, 0.8)" // hover: bg-slate-800/80
      : "transparent",
    color: isSelected ? "white" : "rgb(226 232 240)", // slate-200
    padding: "10px 12px",
    borderRadius: "0.5rem",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    ":active": {
      backgroundColor: "rgba(6, 182, 212, 0.6)",
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: "white",
  }),
  indicatorSeparator: (base) => ({
    ...base,
    backgroundColor: "rgba(30, 41, 59, 0.8)", // slate-800
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isFocused ? "rgb(6 182 212)" : "rgb(148 163 184)", // cyan o slate-400
    padding: "8px",
    transition: "color 0.2s ease",
    "&:hover": {
      color: "rgb(6 182 212)",
    },
  }),
};

function MySelect({ options, value, onChange }) {
  return (
    <Select 
      options={options} 
      value={value} 
      onChange={onChange} 
      styles={customStyles} 
      isSearchable={false}
    />
  );
}

export default MySelect;
