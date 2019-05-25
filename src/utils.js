export const chunk = (inputArray = [], chunkLength = 1) =>
  inputArray.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunkLength);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);

export const capitalize = str => {
  if (typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
