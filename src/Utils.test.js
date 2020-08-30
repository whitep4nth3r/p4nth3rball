import Utils from './Utils';
import responses from './responses';

test('getResponse() returns a random response', () => {
  const randomResponse = Utils.getBallResponse();
  expect(responses.includes(randomResponse)).toBe(true);
});


test('Queue immediately fires first event', () => {
  let count = 0
  const queue = Utils.Queue(5000)
  queue.push(_ => { count++ })

  expect(count).toBe(1)
})

test('Queue waits delay ms before firing second event', async () => {
  const delay = 300
  let count = 0
  const queue = Utils.Queue(delay)
  queue.push(_ => { count++ })
  queue.push(_ => { count++ })

  expect(count).toBe(1)
  await Utils.wait(delay + 100) // wait 100ms more for calculation overhead
  expect(count).toBe(2)
})

test('Queue takes ~3 delays to handle 4 events', async () => {
  const delay = 300
  let count = 0
  const queue = Utils.Queue(delay)

  // queue four events
  queue.push(_ => { count++ })
  queue.push(_ => { count++ })
  queue.push(_ => { count++ })
  queue.push(_ => { count++ })

  const delays = (count) =>
    delay * count + 100 // adds 100 more for calculation overhead

  expect(count).toBe(1)
  Utils.wait(delays(1)).then(_ => expect(count).toBe(2))
  Utils.wait(delays(2)).then(_ => expect(count).toBe(3))
  await Utils.wait(delays(3)).then(_ => expect(count).toBe(4))
})