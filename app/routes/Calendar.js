import React from 'react';
import { DisplayText } from '@shopify/polaris';
import { HolidayCalendar } from '../components'

export default function Calendar() {
  return (
    <div>
      <DisplayText size="medium">Holidays</DisplayText>
      <HolidayCalendar />
    </div>
  );
}
