
var lang = {
  smarty: require('./lang/smarty.js'),
  swig: require('./lang/swig.js'),
  velocity: require('./lang/velocity.js'),
  jsp: require('./lang/jsp.js')
};

function getTypeByFile(file) {
  var map = {
    '.tpl': 'smarty',
    '.vm': 'velocity',
    '.jsp': 'jsp'
  };

  return map[file.ext];
}

module.exports = function(content, file, conf) {
  var type = conf.type || getTypeByFile(file);

  if (type) {
    if (![lang[type]]) {
      fis.log.warn('lang `%s` is not supported yet!', type);
    } else {
      content = lang[type](content, file, conf);
    }
  }

  return content;
};