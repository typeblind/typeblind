import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { getFileEvent  } from '../../../../store/type/events/getFileEvent';
import Line from './Line';
declare let hljs: any;

export default function Editor() {
  const dispatch = useDispatch()
  const lines = useSelector((state: RootState) => state.typing.lines);
  const codeRef = useRef(null);
  useEffect(() => {
    dispatch(getFileEvent('go'));
  }, [])

  useEffect(() => {
    console.log(lines)
    hljs.highlightBlock(codeRef.current)
  }, [lines])

  const code = `
    class Some() {
      
    }
  `

  useEffect(() => {
  }, [])

  return (
    <>
      <div id="#codes" className={"go"} ref={codeRef}>
        {
          lines?.length > 0 ? 
          lines.map((line, index) => (
            <Line line={line} key={index} />
          ))
          : null
        }
      </div>
    </>

  )
}
