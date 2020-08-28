import Utils from './Utils';
import responses from './responses';

test('getResponse() returns a random response', () => {
  const randomResponse = Utils.getBallResponse();
  expect(responses.includes(randomResponse)).toBe(true);
});

test('asyncLock() resolve calls synchronous', async () => {
  const sortedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const resultNumbers = [];
  const asyncLock = Utils.asyncLock();
  const asyncFunction = asyncLock.with(async (numberToProcess) => {
    await Utils.wait(72 * Math.random() + 3);
    resultNumbers.push(numberToProcess);
  });

  for (let number of sortedNumbers){
    asyncFunction(number);
  }
  await asyncLock.acquire();
  expect(resultNumbers).toEqual(sortedNumbers)
});
