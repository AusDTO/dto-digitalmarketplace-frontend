let fileList = require.context('../icons', true, /[\s\S]*$/);

let dictionary = {};
fileList.keys().forEach(x => {
  x = x.replace('./', '');
  dictionary[x.replace('.svg', '')] = require(`../icons/${x}`);
});

export default dictionary