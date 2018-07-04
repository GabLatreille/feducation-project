import React from 'react';
import {DisplayText} from '@shopify/polaris';
import QueryByTag from '../components/QueryByTag'

export default function Low() {
  return (
    <div>
      <DisplayText size="medium">Tagged Tasks</DisplayText>
      <QueryByTag />
    </div>
  );
}
