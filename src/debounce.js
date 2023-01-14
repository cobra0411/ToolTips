export const debounce = (func, time) => {
  let timerId;
  return function (...args) {
    let that = this;
    if (timerId) {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func.apply(that, args);
      }, time);
    } else {
      timerId = setTimeout(() => {
        func.apply(that, args);
      }, time);
    }
  };
};
