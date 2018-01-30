// will add fns to this file over time
/* eslint-disable import/prefer-default-export */
export const uniqueID = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)
