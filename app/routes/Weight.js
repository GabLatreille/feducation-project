import React from 'react';
import { DisplayText } from '@shopify/polaris';
import { QueryByWeight } from '../components'

export default function High() {
  return (
    <div>
      <DisplayText size="medium">Priority Tasks</DisplayText>
      <QueryByWeight />
    </div>
  );
}
