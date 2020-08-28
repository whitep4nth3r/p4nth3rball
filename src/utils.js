import responses from './responses';

export default class Utils {
  static wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  static getBallResponse = () => {
    return responses[Math.floor(Math.random() * responses.length)];
  };
}
