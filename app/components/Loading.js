import React from 'react';
import {
  Card,
  SkeletonBodyText,
  SkeletonDisplayText,
  TextContainer,
} from '@shopify/polaris';

export default function Loading() {
  return (
    <div>
      <Card sectioned="sectioned">
        <TextContainer>
          <SkeletonDisplayText size="small" />
          <SkeletonBodyText />
        </TextContainer>
      </Card>
    </div>
  )
}
