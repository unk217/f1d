import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: Props) {
  return (
    <input
      className={className || "flex justify-center mr-4 rounded-lg font-extrabold text-sky-700 bg-white"}
      {...props}
    />
  );
}

export default Input;
