import React from 'react';
// import { render } from '@testing-library/react';
import App from './App';
import { getBallResponse } from './App'
import responses from './responses'

test('getResponse() returns a random response', () => {
  const randomResponse = getBallResponse();
  expect(responses.includes(randomResponse)).toBe(true);
});
