import React, { FC, useEffect } from 'react';

type CurrentRowType = {
    row: string[]
}



export const CurrentRow: FC<CurrentRowType> = ({row}) => {
    
    // useEffect(() => {
    //     if (active) {
    //       setClasses([...classes, 'newClass'])
    //     }
      
    //   }, [curChar, active])

    return (
        <div>
        <pre>
          <span>{row}</span>
        </pre>
      </div>
    )
}