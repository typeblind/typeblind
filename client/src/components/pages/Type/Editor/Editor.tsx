import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getFileEvent  } from '../../../../store/type/events/getFileEvent';

export default function Editor() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFileEvent('go'));
  }, [])
  return (
    <div>
      Hello, testing
    </div>
  )
}
