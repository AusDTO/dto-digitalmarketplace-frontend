if ( process.env.NODE_ENV === 'development') {
  module.exports = require('./development')
} else {
  module.exports = require('./production')
}
