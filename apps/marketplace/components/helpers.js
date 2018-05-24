// will add fns to this file over time
/* eslint-disable import/prefer-default-export */
export const uniqueID = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)

export const statusConvert = (status = '') => {
  const newStatus = status === 'live' ? 'open' : status
  return `${newStatus.charAt(0).toUpperCase()}${newStatus.slice(1)}`
}

export const getFileSizeAndType = (bytes, lot) => {
  let result = ''
  if (lot === 'digital-professionals') {
    let size = ''
    if (bytes < 1048576) {
      size = `${parseFloat(bytes / 1024).toFixed(2)}KB`
    } else {
      size = `${parseFloat(bytes / 1024 / 1024).toFixed(2)}MB`
    }
    result = `${size} zip`
  } else if (lot === 'digital-outcome') {
    result = 'csv'
  }
  return result
}
