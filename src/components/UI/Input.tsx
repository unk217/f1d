import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: Props) {
  return (
    <input
      className="flex justify-center mr-4 rounded-lg font-extrabold text-sky-700"
      {...props}
    />
  );
}

export default Input;
