import responses from './responses';

export default class Utils {
  static wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  static getBallResponse = () => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  static asyncLock = () => {
    const pending = [];
    let isLocked = false;
    const lock = {
      acquire: () => {
        if (isLocked) {
          return new Promise((resolve) => pending.push(resolve));
        }
        isLocked = true;
        return Promise.resolve();
      },
      release: () => (isLocked = !!pending.length) && pending.shift()(),
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
