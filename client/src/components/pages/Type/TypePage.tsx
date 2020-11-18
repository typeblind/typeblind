import React, {FC} from 'react';
import { useRoute } from 'wouter';
import Page from '../../layout/Page';
import Editor from './Editor/Editor';

export const TypePage: FC = () => {
  const [match, params] = useRoute('/type/:language/:extension');
  
  return (
    <Page>
      {
        params?.language ? <h1> {params.name} </h1> : <h1> Unknown </h1>
      }
      <Editor />
    </Page>
  )
}
