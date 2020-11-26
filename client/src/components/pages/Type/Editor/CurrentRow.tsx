import React, { FC, useEffect } from 'react';

type CurrentRowType = {
    row: string[]
}



export const CurrentRow: FC<CurrentRowType> = ({row}) => {
    
    return (
        <div>
        <pre>
          <span>{row}</span>
        </pre>
      </div>
    )
}