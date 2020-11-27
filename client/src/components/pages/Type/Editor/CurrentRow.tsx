import React, { FC, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRoute } from "wouter";
import { RootState } from "../../../../store";
import { ChangeChar, ChangeRow } from "../../../../store/editor/actions";
import { Char } from "./Char";
import { hljs } from "../../../../utils/";
import Highlight from "react-highlight.js";

type CurrentRowType = {
  row: string[];
  id: number;
};

export const CurrentRow: FC<CurrentRowType> = ({ row, id }) => {
  //const [classes, setClasses] = useState<string[]>([]);
  const [errorChar, setErrorChar] = useState(false);
  const [newLineWithEnter, setnewLineWithEnter] = useState<string[]>([]);
  const curChar = useSelector((state: RootState) => state.editor.curChar);
  const boardChar = useSelector((state: RootState) => state.editor.boardChar);
  const dispatch = useDispatch();
  const [match, params] = useRoute("/type/:language/:extension");

  useEffect(() => {
    row && setnewLineWithEnter([...row, "Enter"]);
  }, [row]);
  //const newLineWithEnter = row && [...row, "Enter"];

  const checkSymbol = () => {
    if (row && boardChar === newLineWithEnter[curChar]) {
      setErrorChar(false);
      (newLineWithEnter[curChar] === "Enter") ? dispatch(ChangeRow(1)) : dispatch(ChangeChar(1));
    } else 
      setErrorChar(true);
  };

  // let _debouncedSetStateTimeoutId: any;

  // const toggle = () => {
  //   if (_debouncedSetStateTimeoutId) {
  //     console.log("ClearTIme");
  //     clearTimeout(_debouncedSetStateTimeoutId);
  //   }
  //   _debouncedSetStateTimeoutId = setTimeout(() => {
  //     //setCharrr(char);
  //     console.log("SetTIme");

  //     hljs.hlBlock(document.querySelector(`#codes-${id}`) as HTMLElement)
  //   }, 2000);
  // };

  useEffect(() => {
    checkSymbol();
  }, [boardChar]);

  useEffect(() => {
    setTimeout(() => {
      //hljs.hlBlock(document.querySelector(`#codes-${id}`) as HTMLElement)
    }, 0);
    setErrorChar(false);
  }, []);

  return (
    <>
      <div id={`codes-${id}`} className={`hljs ${params?.language}`}>
        <pre>
          {row &&
            row.map((char, index) => {
              return (
                <span
                  className={`char ${curChar > index ? "executed-char" : ""} ${index === curChar && !errorChar ? "active-char" : ""} ${index === curChar && errorChar ? "error-char" : ""}`}
                  key={index}
                >
                  {char}
                </span>
              );
            })}
        </pre>
      </div>
    </>
  );
};
