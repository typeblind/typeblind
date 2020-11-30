import React, { FC, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRoute } from "wouter";
import { RootState } from "../../../../store";
import { ChangeChar, ChangeRow } from "../../../../store/editor/actions";
import { hljs } from "../../../../utils/";
import { css } from '@emotion/core';

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

  const checkSymbol = () => {
    if (row && boardChar === newLineWithEnter[curChar]) {
      console.log("check");
      setErrorChar(false);
      (newLineWithEnter[curChar] === "Enter") ? dispatch(ChangeRow(1)) : dispatch(ChangeChar(1));
    } else 
      setErrorChar(true);
  };

  useEffect(() => {
    checkSymbol();
  }, [boardChar]);

  useEffect(() => {
    setTimeout(() => {
      hljs.hlBlock(document.querySelector(`#codes-${id}`) as HTMLElement)
    }, 0);
    setErrorChar(false);
  }, []);

    useEffect(() => {
      return () => {
        console.log("Rerender")
        console.log(errorChar)
        console.log(errorChar)
      }
    }, [curChar])

  const updateCodeSyntaxHighlighting = () => {
    setTimeout(() => {
      hljs.hlBlock(document.querySelector(`#codes-${id}`) as HTMLElement)
    }, 0);
  }; 

  useEffect(() => {
    //updateCodeSyntaxHighlighting()
    }, [boardChar]);


  const spanStyles = css`
    .active-char {
      background: green !important;

      span {
        background: green !important;
      }
    }

    .error-char {
      background: red !important;

      span {
        background: red !important;
      }
    }
  `;

  return (
      <div >
        <pre id={`codes-${id}`} className={`hljs ${params?.language}`}>
          {curChar}
          {row &&
            row.map((char, index) => {    
              // console.group(char)
              // console.log(index)
              // console.log(index === curChar && !errorChar)
              // console.log(index === curChar && errorChar)
              // console.groupEnd()
              return (
                <span
                  id={`${curChar}`}
                  className={`char ${curChar > index ? "executed-char" : ""} ${index === curChar && !errorChar ? "active-char" : ""} ${index === curChar && errorChar ? "error-char" : ""}`}
                  key={index}
                  style={{display: (char === 'Enter') ? 'none' : ''}}
                  css={spanStyles}
                >                  
                  <span>{char}</span>
                  
                </span>
              );
            })}
        </pre>
      </div>
  );
};
