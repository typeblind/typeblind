import React, { FC } from 'react';
import { css } from '@emotion/core';
import Page from '../../layout/Page';
import { useLocation } from 'wouter';

type LangCard = {
  name: string;
  color?: string;
  extension: string;
}

const LangCard: FC<LangCard> = ({ name, color, extension }) => {
  const [,setLocation] = useLocation();
  const cardStyles = css`

  `;
  
  return (
    <>
      <Page>
        <div
          onClick={() => {
            setLocation(`/type/${name}`)
          }}
        >
          { name }
        </div>
      </Page>
    </>
  )
}

export default LangCard;
