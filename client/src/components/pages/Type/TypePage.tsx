import React, {FC} from 'react';
import { useRoute } from 'wouter';
import Page from '../../layout/Page';

export const TypePage: FC = () => {
  const [match, params] = useRoute('/type/:name');
  
  return (
    <Page>
      {
        params?.name ? <h1> {params.name} </h1> : <h1> Unknown </h1>
      }
    </Page>
  )
}
