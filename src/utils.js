export const chunk = (inputArray, chunkLength) => (
  inputArray.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index/chunkLength)

    if(!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []
    }

    resultArray[chunkIndex].push(item)

    return resultArray
  }, [])
)