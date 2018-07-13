import React from 'react';
import { DisplayText } from '@shopify/polaris';
import { NewTask } from '../components'

export default function New() {
  return (
    <div>
      <DisplayText size="medium">New Tasks</DisplayText>
      <NewTask />
    </div>
  );
}
