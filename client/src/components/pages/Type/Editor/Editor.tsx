import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useRoute } from 'wouter';
import { RootState } from '../../../../store';
import { getFileEvent  } from '../../../../store/type/events/getFileEvent';
import { hljs } from '../../../../utils'
import Line from './Line';


export default function Editor() {
  const dispatch = useDispatch()
  const lines = useSelector((state: RootState) => state.typing.lines);
  const codeRef = useRef(null);
  const [match, params] = useRoute('/type/:language');
  useEffect(() => {
    dispatch(getFileEvent(params?.language as string));
  }, [])

  useEffect(() => {
    console.log(lines)
    // hljs.hlBlock((codeRef.current as unknown) as HTMLElement)
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
            <Line line={line} id={index} key={index}/>
          ))
          : null
        }
      </div>
    </>

  )
}
