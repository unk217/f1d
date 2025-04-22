import React from "react";

export function LiCard(props) {
  return (
    <li className="flex flex-row gap-6 items-center justify-between
     border-b border-zinc-700" 
    {...props}/>
  );
}

export default LiCard;
