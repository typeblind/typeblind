import React, { FC, useEffect, useRef, useState } from "react";
import { DefaultParams, useLocation, useRoute } from "wouter";
import { hljs } from "../../../../utils/";

type LineProps = {
  line: string[];
  id: number;
  executed: boolean;
  current: boolean;
};

// Line of code
const Line: FC<LineProps> = ({ line, id, executed, current }) => {
  const lineRef = useRef(null);
  const [match, params] = useRoute("/type/:language/:extension");

  useEffect(() => {
    hljs.hlBlock(document.querySelector(`#codes-${id}`) as HTMLElement);
  }, []);

  return (
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
  );
};

export default Line;
