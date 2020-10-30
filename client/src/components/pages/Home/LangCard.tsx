import React, { FC } from 'react';
import { css } from '@emotion/core';
import Page from '../../layout/Page';
import { useLocation } from 'wouter';

export type LangCardProps = {
  name: string;
  color: string;
  extension: string;
  description: string;
}

const LangCard: FC<LangCardProps> = ({ name, color, extension, description }) => {
  const [,setLocation] = useLocation();
  const cardStyles = css`
    border-radius: 5px;
    border-left: 5px solid ${color};
    padding-left: 24px;
    background: white;
    width: 30%;
    color: ${color};
    text-align: left;
    cursor: pointer;
    margin-bottom: 24px;

    .title {
      font-size: 2rem;
    }

    .description {
      font-size: 0.9rem;
    }
  `;
  
  return (
    <>
      <div
        onClick={() => {
          setLocation(`/type/${name}`)
        }}
        css={cardStyles}
      >
        <p className={"title"}> { name } </p>
        <p className={"extension"}> { extension } </p>
        <p className={"desc"}> { description } </p>
      </div>
    </>
  )
}

export default LangCard;
