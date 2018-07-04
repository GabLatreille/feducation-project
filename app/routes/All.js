import React from 'react';
import {DisplayText} from '@shopify/polaris';
import QueryAll from '../components/QueryAll'

export default function All() {
  return (
    <div>
      <DisplayText size="medium">All Tasks</DisplayText>
      <QueryAll />
    </div>
  );
}
