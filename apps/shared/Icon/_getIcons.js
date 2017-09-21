/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const dictionary = {}
// no require.context in tests
// https://github.com/facebookincubator/create-react-app/issues/517#issuecomment-243488178
if (typeof require.context !== 'undefined') {
  const fileList = require.context('../icons', true, /[\s\S]*$/)

  fileList.keys().forEach(x => {
    const file = x.replace('./', '')
    dictionary[file.replace('.svg', '')] = require(`../icons/${file}`)
  })
}
export default dictionary
