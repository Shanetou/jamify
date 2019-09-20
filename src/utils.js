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
  if (typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const millisecondsToMinutesAndSeconds = milliseconds => {
  var minutes = Math.floor(milliseconds / 60000);
  var seconds = ((milliseconds % 60000) / 1000).toFixed(0);

  return seconds === 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

export const arrayToObject = (array, keyTarget = "id") =>
  array.reduce((obj, item) => {
    obj[item[keyTarget]] = item;

    return obj;
  }, {});
