import React, { FC, useEffect, useState, useCallback, useRef } from "react";
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
  const [chars, setChars] = useState<NodeListOf<HTMLElement>>();
  const [prevChar, setPrevChar] = useState<Element | null>();
  const [errorChar, setErrorChar] = useState(false);
  const curChar = useSelector((state: RootState) => state.editor.curChar);
  const boardChar = useSelector((state: RootState) => state.editor.boardChar);
  const dispatch = useDispatch();
  const [match, params] = useRoute("/type/:language/:extension");

  useEffect(() => {
    const char = document.querySelector(`#char-${curChar}`)
    setPrevChar(char) // запоминаем предыдущий активный символ ???
    char?.classList.add('active-char')
  }, [row]);


  const checkSymbol = () => {
    if (row && boardChar === row[curChar]) {
      setErrorChar(false);
      (row[curChar] === "Enter") ? dispatch(ChangeRow(1)) : dispatch(ChangeChar(1));
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
     if (errorChar){
      const errorChar = document.querySelector(`#char-${curChar}`)
      errorChar?.classList.remove('active-char')
      errorChar?.classList.add('error-char')
     }
   }, [errorChar])

    useEffect(() => {
      if (curChar === 1) { 
        // исправление бага с выделением активного первого символа строчки, 
        // почему то без этой проверки активный класс остается при переходе к след. символу 
        const firstChar = document.querySelector(`#char-0`);
        firstChar?.classList.remove('active-char')
        firstChar?.classList.add('executed-char')
      }
      prevChar?.classList.remove('active-char')
      prevChar?.classList.add('executed-char')
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
          {row &&
            row.map((char, index) => {    
              return (
                <span
                  id={`char-${index}`}
                 // className={`char ${curChar > index ? "executed-char" : ""} ${index === curChar && !errorChar ? "active-char" : ""} ${index === curChar && errorChar ? "error-char" : ""}`}
                  key={index}
                  style={{display: (char === 'Enter') ? 'none' : ''}}
                  //css={spanStyles}
                >                  
                  {char}
                  
                </span>
              );
            })}
        </pre>
      </div>
  );
};
