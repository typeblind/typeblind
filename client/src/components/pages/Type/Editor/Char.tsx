import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

type CharType = {
  char: string;
  index: number;
  numberRow: number
  active: boolean
};



export const Char: FC<CharType> = ({ char, index, numberRow, active }) => {
  const [classes, setClasses] = useState<string[]>([]);
  const curChar = useSelector((state: RootState) => state.editor.curChar);
  
 
useEffect(() => {
  if (active) {
    setClasses([...classes, 'newClass'])
  }

}, [curChar, active])

  return (
    <span
      key={index}
     // className={active ? 'active-clas' : ''}
    >
      {char}
    </span>
  );
};
