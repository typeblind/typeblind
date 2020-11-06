import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/index';
import { css, keyframes } from '@emotion/core';
import { useLocation } from 'wouter';
import Page from '../../layout/Page';
import LangCard from './LangCard';

const HomePage = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const langs = useSelector((state: RootState) => state.langs);
  const [location] = useLocation();
  const [isTitle, setisTitle] = useState(true);

  const home = keyframes`
    0% {
      opacity: 0;
    }

    80% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  `;

  const homeStyles = css`
    
  `;

  const cardsStyles = css`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  `;

  return (
    <Page>
        <h2> Home page  </h2>

        <div 
          className="cards"
          css={cardsStyles}
        >
          {
            Object.keys(langs).map((name: string) => (
              <LangCard  
                name={name} 
                color={langs[name].color} 
                extension={langs[name].extension}
                description={langs[name].description}
              />
            ))
          }
        </div>
    </Page>
  )
}

export default HomePage;
