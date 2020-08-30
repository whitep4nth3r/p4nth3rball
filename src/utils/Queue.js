// Create a queue that waits `delay` milliseconds
// before handling the next item
export const Queue = (delay = 0) => {
  // This is where we'll track items to work on
  let locked = false
  let items = []

  // We'll call this whenever we want to run
  // the first item in our queue
  const attempt = () => {
    if (items.length > 0 && locked === false) {
      setLockTimer()
      const fn = items.shift()
      fn()
    }
  }

  const setLockTimer = () => {
    locked = true      // immediately locks queue
    setTimeout(_ => {
      locked = false   // unlocks when complete
      attempt()        // attempts to run again when available
    }, delay)
  }

  return {
    push(fn) {
      // prevent bad times with a helpful message
      if (typeof fn !== 'function')
        return console.warn('Must pass "queue.push" a function!')

      items.push(fn) // add work to the queue
      attempt()      // immediately attempt to run it
    }
  }
}