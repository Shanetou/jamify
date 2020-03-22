export const chunk = (inputArray = [], chunkLength = 1) =>
  inputArray.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunkLength);
    const newResults = [...resultArray];

    if (!newResults[chunkIndex]) {
      newResults[chunkIndex] = [];
    }

    newResults[chunkIndex].push(item);

    return newResults;
  }, []);

export const capitalize = str => {
  if (typeof str !== "string")
    throw new Error("Capitalize: argument is not a string");
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const millisecondsToMinutesAndSeconds = milliseconds => {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = ((milliseconds % 60000) / 1000).toFixed(0);

  return seconds === 60
    ? `${minutes + 1}:00`
    : `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export const arrayToObject = (array, keyTarget = "id") =>
  array.reduce((obj, item) => {
    const newObj = { ...obj };

    newObj[item[keyTarget]] = item;

    return newObj;
  }, {});
