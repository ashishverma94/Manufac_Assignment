//GET MEAN MEDIAN AND MODE OF ARRAY
export function getMeanMedianMode(arr: number[]): { mean: number, median: number, mode: number } {
  const sum = arr.reduce((acc, val) => acc + val, 0);
  const sortedArr = arr.slice().sort((a, b) => a - b);
  const mid = Math.floor(sortedArr.length / 2);
  
  let modeValue: number | undefined;
  let maxFrequency = -Infinity;
  const frequencyMap = new Map<number, number>();

  arr.forEach(num => {
      frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
  });

  frequencyMap.forEach((frequency, value) => {
      if (frequency > maxFrequency) {
          modeValue = value;
          maxFrequency = frequency;
      }
  });

  return {
      mean: (sum / arr.length),
      median: sortedArr.length % 2 === 0 ? (sortedArr[mid - 1] + sortedArr[mid]) / 2 : sortedArr[mid],
      mode: modeValue!
  };
}

// FIND TRANSPOSE OF MATRIX
export function transposeOfMatrix(matrix:Array<Array<number|string>>) {
  const result:Array<Array<number|string>> = [];
  for (let i = 0; i < matrix[0].length; i++) {
    result.push([]);
    for (let j = 0; j < matrix.length; j++) {
      result[i][j] = matrix[j][i];
    }
  }
  return result;
}

// FIND TABLE ELEMENTS
export function findTableElements(transposedData:Array<any>, name:string) {
  let allMean:any = { Measure: `${name} Mean` };
  for (let i = 0; i < transposedData[1].length; i++) {
    allMean[transposedData[0][i]] = transposedData[1][i];
  }

  let allMedian:any = { Measure: `${name} Median` };
  for (let i = 0; i < transposedData[2].length; i++) {
    allMedian[transposedData[0][i]] = transposedData[2][i];
  }

  let allModes:any = { Measure: `${name} Mode` };
  for (let i = 0; i < transposedData[3].length; i++) {
    allModes[transposedData[0][i]] = transposedData[3][i];
  }

  return [allMean, allMedian, allModes];
}
