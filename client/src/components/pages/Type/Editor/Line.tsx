import React, { FC, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DefaultParams, useLocation, useRoute } from "wouter";
import { RootState } from "../../../../store";
import { ChangeChar, ChangeRow } from "../../../../store/editor/actions";
import { hljs } from "../../../../utils/";
import { Char } from "./Char";
import Highlight from "react-highlight.js";

type LineProps = {
  line: string[];
  id: number;
  executed: boolean;
};

// Line of code
const Line: FC<LineProps> = ({ line, id, executed }) => {
  const lineRef = useRef(null);
  const [match, params] = useRoute("/type/:language/:extension");
  // const newLine = line.filter((char) => char !== "\t" && char !== "\n");

  useEffect(() => {
    hljs.hlBlock(document.querySelector(`#codes-${id}`) as HTMLElement);
  }, []);

  return (
    // <Highlight language={`${params?.language}`}>
     <div id={`codes-${id}`} className={`hljs ${params?.language}`}>
       <pre>
      {line.map((char, index) => {
        return (
          <span className={executed ? "executed" : ""} key={index}>
            {char}
          </span>
        );
      })}
      </pre>
      </div>
    // </Highlight>
  );
};

export default Line;
