import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useRoute } from "wouter";
import { string } from "yup";
import { RootState } from "../../../../store";
import {
  ChangeBoardChar,
  ChangeFullRow,
} from "../../../../store/editor/actions";
import { getFileEvent } from "../../../../store/type/events/getFileEvent";
import { CurrentRow } from "./CurrentRow";
import Line from "./Line";


export default function Editor() {
  const dispatch = useDispatch();
  const lines = useSelector((state: RootState) => state.typing.lines).filter(
    (line) => line.length !== 0
  );

  const curChar = useSelector((state: RootState) => state.editor.curChar);
  const curRow1 = useSelector((state: RootState) => state.editor.curRow);
  const fullRow = useSelector((state: RootState) => state.editor.row);

  const codeRef = useRef<HTMLTextAreaElement>(null);
  const [match, params] = useRoute("/type/:language/:extension");
  useEffect(() => {
    dispatch(
      getFileEvent(params?.language as string, params?.extension as string)
    );
    codeRef.current && codeRef.current.focus() // && (codeRef.current.style.)
  }, []);

  useEffect(() => {
    dispatch(ChangeFullRow(lines[curRow1]));
    // hljs.hlBlock((codeRef.current as unknown) as HTMLElement)
  }, [lines]);

  useEffect(() => {
    dispatch(ChangeFullRow(lines[curRow1]));
  }, [curRow1]);

  const code = `
    class Some() {
      
    }
  `;


  const changeInput = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    dispatch(ChangeBoardChar(e.key));
  };

  return (
    <>
      {curChar}
      {curRow1}
        
      <textarea ref={codeRef} name="" id="" onKeyDown={(e) => changeInput(e)} />
      <div>Timer</div>
      <div id="codes" className={params?.language} onClick={() =>codeRef.current && codeRef.current.focus()} >
        {lines?.length > 0
          ? lines.map(
              (line, index) =>
                index === curRow1 ? (
                  <CurrentRow
                    key={index}
                    id={index}
                    row={fullRow && [...fullRow.filter((char) => char !== "\t"), "Enter"]}
                  />
                ) : (
                  <Line current={index === curRow1} line={line} id={index} key={index} executed={curRow1 > index} />
                )
            )
          : null}
      </div>
    </>
  );
}
