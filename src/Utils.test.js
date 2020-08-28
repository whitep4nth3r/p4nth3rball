import Utils from './Utils';
import responses from './responses';

test('getResponse() returns a random response', () => {
  const randomResponse = Utils.getBallResponse();
  expect(responses.includes(randomResponse)).toBe(true);
});
