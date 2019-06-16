let currentUpdaterId = 0;

export default () => {
  currentUpdaterId = currentUpdaterId + 1;
  return currentUpdaterId;
};