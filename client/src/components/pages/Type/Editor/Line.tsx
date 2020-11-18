import React, {FC, useEffect, useRef} from 'react'
import { DefaultParams, useLocation, useRoute } from 'wouter';
import { hljs } from '../../../../utils/'
type LineProps = {
  line: string[],
  id: number,
}

// Line of code
const Line: FC<LineProps> = ({ line, id }) => {
  const lineRef = useRef(null);
  const [match, params] = useRoute('/type/:language/:extension')
  
  useEffect(() => {
    hljs.hlBlock(document.querySelector(`#codes-${id}`) as HTMLElement)
  }, [])

  return (
    <div id={`codes-${id}`} className={`hljs ${params?.language}`}>
      <pre>{line.map(char => <span>{char}</span>)}</pre>
    </div>
  )
}

export default Line
