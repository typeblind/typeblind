import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useRoute } from "wouter";
import { string } from "yup";
import { RootState } from "../../../../store";
import {
  ChangeBoardChar,
  ChangeFullRow,
} from "../../../../store/editor/actions";
import { getFileEvent } from "../../../../store/type/events/getFileEvent";
import { hljs } from "../../../../utils";
import { CurrentRow } from "./CurrentRow";
import Line from "./Line";

export default function Editor() {
  const dispatch = useDispatch();
  const lines = useSelector((state: RootState) => state.typing.lines).filter(
    (line) => line.length !== 0
  );

  const [curRow, setCurRow] = useState([] as string[]);
  const [curS, setCurS] = useState(1);
  const [curNumberRow, setCurNumberRow] = useState(0);
  const curChar = useSelector((state: RootState) => state.editor.curChar);
  const curRow1 = useSelector((state: RootState) => state.editor.curRow);
  const fullRow = useSelector((state: RootState) => state.editor.row);

  const codeRef = useRef(null);
  const [match, params] = useRoute("/type/:language/:extension");
  useEffect(() => {
    dispatch(
      getFileEvent(params?.language as string, params?.extension as string)
    );
  }, []);

  useEffect(() => {
    //console.log(lines);
    setCurRow(lines[curRow1]);
    dispatch(ChangeFullRow(lines[curRow1]));

    // hljs.hlBlock((codeRef.current as unknown) as HTMLElement)
  }, [lines]);

  useEffect(() => {
    // const r = lines.filter((line, index) => index !== curRow1 )
    // console.log(r);
    dispatch(ChangeFullRow(lines[curRow1]));
  }, [curRow1])

  const code = `
    class Some() {
      
    }
  `;

  useEffect(() => {
    // for (let line of lines) {
    //   for (let symbol of line) {
    //     console.log(symbol);
    //   }
    // }
    // lines.forEach((line) => {
    //   const newlines = line.map((s) => {
    //     s.replace(/ /g, "");
    //   });
    // });
    // setstate(newlines)
  }, []);

  const checkSymbol = (symbol: string): boolean => {
    // const str = ["}", "Enter"]
    // if (symbol === str[1]){
    //   console.log('symbol - Enter');
    // }
    if (curRow[curS] === "\t") {
      console.log("табуляция...");
      //setCurS(curS + 1)
    }

    if (curRow.length === 0) {
      console.log("пустая строка...");
      //setCurNumberRow(curNumberRow + 1);
    }

    if (symbol === curRow[curS]) {
      console.log("верно");
      setCurS(curS + 1);
      return true;
    }
    if (curRow[curS + 1] === undefined) {
      // setCurRow(lines[curNumberRow + 2]);
      // setCurS(0)
      // console.log('newRow', curRow[curS]);
    }

    console.log("не верно!");
    return false;
  };

  const changeInput = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    dispatch(ChangeBoardChar(e.key));
    //checkSymbol(e.key);
  };




  return (
    <>
      {curChar}
      {curRow1}
      
      <textarea name="" id="" onKeyDown={(e) => changeInput(e)} />
      <div id="#codes" className={params?.language} ref={codeRef}>
      <CurrentRow row={fullRow} />
        {lines?.length > 0
          ? lines.map((line, index) => (
              <Line line={line} id={index} key={index} />
            ))
          : null}
      </div>
    </>
  );
}
