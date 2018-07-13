import React from 'react';
import { DisplayText } from '@shopify/polaris';
import { QueryAll } from '../components'

export default function All() {
  return (
    <div>
      <DisplayText size="medium">All Tasks</DisplayText>
      <QueryAll />
    </div>
  );
}
