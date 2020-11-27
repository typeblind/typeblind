import { css } from "@emotion/core";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

type CharType = {
  char: string;
  index: number;
  // numberRow: number
  active?: boolean;
  executed?: boolean;
  error?: boolean;
  number?: number
};

export const Char: FC<CharType> = ({ char, index, active, error, executed, number }) => {
  const curChar = useSelector((state: RootState) => state.editor.curChar);
  const boardChar = useSelector((state: RootState) => state.editor.boardChar);
  const [classes, setClasses] = useState<string[]>([]);
  const currentStyles = css`
    color: gray;
  `;

  const errorStyles = css`
    background: red;
  `;


  // active && console.log("active", index, curChar);

  // useEffect(() => {
  //   number && setContent(number)
  // }, [number])
  
  // const [content, setContent] = useState(0);
  // let _debouncedSetStateTimeoutId: any ;

  // const toggle = (num: number) => {
  //   if (_debouncedSetStateTimeoutId) {
  //     clearTimeout(_debouncedSetStateTimeoutId)
  //   }
  //   _debouncedSetStateTimeoutId = setTimeout(() => {
  //     setContent(num);
  //   }, 500)
  // }

  // useEffect(() => { 
  //   //number && toggle(number)
  //   console.log("change curChar");
    
  // }, [number]);

  const checkStyle = () => {
    if (index === curChar && error){
      console.log("error");
      setClasses([ "error-char"])
      return;
    }

    if (curChar === index){
      console.log("active");
      
      setClasses([ "active-char"])
      return;
    }

    if (curChar > index){
      console.log("executed");
      setClasses(["executed-char"])
      return;
    }
  
      
    else {
      setClasses([])
    }
  }

  useEffect(() => {
    //checkStyle()
  }, [boardChar])

  return (
    <>
    <span
      key={index}
      //css={error ? errorStyles : ""}
      // className={classes.join(' ')}
      className={active ? "active-char" : ""}
      css={executed ? currentStyles : ""}
    >
     {char}
    </span>
    </>
  );
};
