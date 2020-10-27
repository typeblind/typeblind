import React, { FC } from 'react';
import { css } from '@emotion/core';
import Page from '../../layout/Page';

type LangCard = {
  name: string;
  color: string;
}

const LangCard: FC<LangCard> = ({ name, color }) => {
  return (
    <>
      <Page>
        <div>
          { name }
        </div>
      </Page>
    </>
  )
}

export default LangCard;
