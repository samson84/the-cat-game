export default function createSubscriber() {
  let subscriptions = [];
  return function subscriber() {
    return {
      add: (handler) => {
        if (subscriptions.includes(handler)) {return handler};
        subscriptions = subscriptions.concat(handler);
        return handler;
      },
      remove: (handler) => {
        subscriptions = subscriptions.filter(item => item !== handler)
      },
      fire: (...data) => {
        subscriptions.forEach(item => item(...data))
      }
    }
  }
}
