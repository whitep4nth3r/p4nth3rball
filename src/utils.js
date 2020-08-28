import responses from './responses';

export default class Utils {
  static wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  static getBallResponse = () => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  static asyncLock = () => {
    const pending = [];
    let isLock = false;
    const lock = {
      acquire: () => {
        if (isLock) {
          return new Promise((resolve) => pending.push(resolve));
        }
        isLock = true;
        return Promise.resolve();
      },
      release: () => (isLock = !!pending.length) && pending.shift()(),
      with: callback => async (...args) => {
        await lock.acquire();
        try {
          return await callback(...args);
        } finally {
          await lock.release();
        }
      },
    };
    return lock;
  };
}
