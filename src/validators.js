export const required = (val) => {
  if (typeof val === 'boolean') {
    return val;
  }

  if (Array.isArray(val)) {
    return val.filter(v => v.trim()).length
  }

  return val && val.trim().length;
};

export const minArrayLength = (len) => (arr = []) => {
  return Array.isArray(arr) && arr.filter(v => v.trim()).length >= len;
};


export default {
	required,
	minArrayLength	
}