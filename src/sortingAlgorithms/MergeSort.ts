export async function* MergeSort(
  array: any,
  combine: any,
  highlight: any,
  markSort: any,
  offSet = 0,
  finalMerge = true
): any {
  if (array.length === 1) {
    if (finalMerge) markSort(0);
    return array;
  }

  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle);
  const right = array.slice(middle);

  const arr: any = yield* await merge(
    yield* await MergeSort(left, combine, highlight, markSort, offSet, false),
    yield* await MergeSort(
      right,
      combine,
      highlight,
      markSort,
      offSet + middle,
      false
    ),
    offSet,
    offSet + middle,
    finalMerge,
    markSort
  );
  return arr;

  async function* merge(
    left: any,
    right: any,
    off1: any,
    off2: any,
    finalMerge = false,
    markSort: any
  ) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] <= right[rightIndex]) {
        yield await highlight([
          off1 + leftIndex + rightIndex,
          off2 + rightIndex,
        ]);
        yield await combine(
          off1 + leftIndex + rightIndex,
          off1 + result.length
        );
        if (finalMerge) yield await markSort(off1 + result.length);
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        yield await highlight([
          off1 + leftIndex + rightIndex,
          off2 + rightIndex,
        ]);
        yield await combine(off2 + rightIndex, off1 + result.length);
        if (finalMerge) yield await markSort(off1 + result.length);
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    while (leftIndex < left.length) {
      yield await highlight([off1 + leftIndex + rightIndex]);
      if (finalMerge) yield await markSort(off1 + leftIndex + rightIndex);
      result.push(left[leftIndex]);
      leftIndex++;
    }

    while (rightIndex < right.length) {
      yield await highlight([off1 + leftIndex + rightIndex]);
      if (finalMerge) yield await markSort(off1 + leftIndex + rightIndex);
      result.push(right[rightIndex]);
      rightIndex++;
    }

    return result;
  }
}
