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
import { hljs } from "../../../../utils";
import { CurrentRow } from "./CurrentRow";
import Line from "./Line";
import Highlight from 'react-highlight.js';


export default function Editor() {
  const dispatch = useDispatch();
  const lines = useSelector((state: RootState) => state.typing.lines).filter(
    (line) => line.length !== 0
  );

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
    //setCurRow(lines[curRow1]);
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
        
      <textarea name="" id="" onKeyDown={(e) => changeInput(e)} />


      <div id="#codes" className={params?.language} ref={codeRef}>
        {lines?.length > 0
          ? lines.map(
              (line, index) =>
                index === curRow1 ? (
                  <CurrentRow
                    key={index}
                    id={index}
                    row={fullRow && fullRow.filter((char) => char !== "\t")}
                  />
                ) : (
                  <Line line={line} id={index} key={index} executed={curRow1 > index} />
                )
            )
          : null}
      </div>
    </>
  );
}
