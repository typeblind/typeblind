import React, {FC, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DefaultParams, useLocation, useRoute } from 'wouter';
import { RootState } from '../../../../store';
import { ChangeChar, ChangeRow } from '../../../../store/editor/actions';
import { hljs } from '../../../../utils/'
import { Char } from './Char';
type LineProps = {
  line: string[],
  id: number,

}

// Line of code
const Line: FC<LineProps> = ({ line, id }) => {
  const lineRef = useRef(null);
  const [match, params] = useRoute('/type/:language/:extension')


  const boardChar = useSelector((state: RootState) => state.editor.boardChar);
  const curRow = useSelector((state: RootState) => state.editor.curRow);
  const curChar = useSelector((state: RootState) => state.editor.curChar);
  const dispatch = useDispatch();

  const newLine = line.filter((char) => char !== '\t' && char !== '\n')
  const newLineWithEnter = [...newLine, "Enter"]
  // console.log(newLineWithEnter);
  

  const checkSymbol = () => {
    if (curRow == id) {
      if (boardChar === newLineWithEnter[curChar]) {
        //console.log("верно");
        if (newLineWithEnter[curChar] === "Enter")
          dispatch(ChangeRow(1))
        else
         dispatch(ChangeChar(1))
     }
    }
  }
 

 useEffect(() => {
   checkSymbol()
 }, [boardChar])

  useEffect(() => {
    hljs.hlBlock(document.querySelector(`#codes-${id}`) as HTMLElement)
    // if (curRow == id) 
    //  console.log("первая строка", id);
  }, [])

  return (
    <div id={`codes-${id}`} className={`hljs ${params?.language}`}>
      <pre>{line.map((char, index) => {
        return (
          //active={id === curRow && index === curChar}
          <span key={index}>{char}</span>
          // <Char active={true} char={char} index={index} numberRow={id} key={index} />
        )
      })}</pre>
    </div>
  )
}

export default Line
