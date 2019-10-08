module.exports = (env) => {
  switch(env) {
    case 'development':
      return devConf;
  }
};

const devConf = {
  reactExtensionHash: 'fmkadmapgofadopljbjfkapdkoienihi/4.2.0_0',
  reduxExtensionHash: 'lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.0_0'
};