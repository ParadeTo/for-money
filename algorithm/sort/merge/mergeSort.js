function mergeSort(arr) {
  let reverseOrderNum = 0 // 逆序度
  function _mergeSort(arr, start, end) {
    if (start >= end) return
    const middle = Math.floor((start + end) / 2)
    _mergeSort(arr, start, middle)
    _mergeSort(arr, middle + 1, end)
    _merge(arr, start, middle, end)
  }

  function _merge(arr, start, middle, end) {
    const tmp = []
    let i = start
    let j = middle + 1
    while (i <= middle && j <= end) {
      if (arr[i] < arr[j]) {
        tmp.push(arr[i++])
      } else {
        reverseOrderNum += middle - i + 1
        tmp.push(arr[j++])
      }
    }
    if (i <= middle) {
      for (let k = i; k <= middle; k++) {
        tmp.push(arr[k])
      }
    }
    if (j <= end) {
      for (let k = j; k <= end; k++) {
        tmp.push(arr[k])
      }
    }
    for (let i = start; i <= end; i++) {
      arr[i] = tmp[i - start]
    }
  }

  _mergeSort(arr, 0, arr.length - 1)
  return reverseOrderNum
}

const arr = [3, 4, 1, 2]
console.log(mergeSort(arr))
console.log(arr)
