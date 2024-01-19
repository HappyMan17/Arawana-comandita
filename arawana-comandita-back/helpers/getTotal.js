const getValue = (item, key) => {
  if (key === 'price') {
    // for table plates:
    return item[key] * item['quantity'];
  }
  // Normal Summary
  return item[key];
};

export const getTotal = (objectList, objectKey) => {
  let total = 0;
  // console.log({ objectList, objectKey }); // todo remove
  if (!objectList) {
    return total;
  }
  objectList.map(item => {
    if (item[objectKey] && item[objectKey] > 0) {
      total =+ getValue(item, objectKey);
    }
  });
  // console.log({ total }); // todo remove
  return total;
};
