const expect = require('chai').expect;

describe('index.js', () => {
  const index = require('../index.js');

  describe('index', async() => {
    // body
    const options = {
      folderPath:'./testPath',
      name:'grtest',
      filePath: './test',
      config: {
        accessId: 'xx',
        dslId: 41,
        generator: ['@imgcook/generator-react'],
        plugin: ['@imgcook/plugin-images'],
        uploadUrl: 'http://127.0.0.1:7001/ajax',
        value: '42997'
      }
    };
    await index(options);
  });
});
