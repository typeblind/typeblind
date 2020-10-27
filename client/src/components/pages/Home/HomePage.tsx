import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/index';
import { css, keyframes } from '@emotion/core';
import { useLocation } from 'wouter';
import Page from '../../layout/Page';

const HomePage = () => {
  const theme = useSelector((state: RootState) => state.theme);
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    position: relative;
    padding-top: 3%;

    @media (max-width: 560px) {
      flex-direction: column;
    }

    .job-title {
      width: 50%;
      align-self: flex-start;
    }
  `;

  useEffect(() => {
    setTimeout(() => {
      setisTitle(false);
    }, 1700);
  }, []);

  return (
    <Page>
        <h2> Home page  </h2>
    </Page>
  )
}

export default HomePage;
