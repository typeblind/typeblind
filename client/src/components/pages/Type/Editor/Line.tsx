import React, {FC} from 'react'

type LineProps = {
  line: string[]
}

// Line of code
const Line: FC<LineProps> = ({ line }) => {
  return (
    <div>
      { line.map(char => <span> {char} </span>) }
    </div>
  )
}

export default Line
