'use strict';

var outDir = 'backend/assets';

module.exports = {
  host: 'localhost',
  port: 3000,

  // app directories
  appDir: 'frontend',

  // unit test directories
  unitTestDir: 'frontend',

  // build test dir
  buildTestDir: outDir + 'test/',

  // build directories
  buildDir: outDir + '/',
  buildCss: outDir + '/css/',
  buildFonts: outDir + '/fonts/',
  buildImages: outDir + '/images/',
  buildJs: outDir + '/js/',
  extDir: outDir + '/vendor/',
  extCss: outDir + '/vendor/css/',
  extFonts: outDir + '/vendor/fonts/',
  extJs: outDir + '/vendor/js/'
};
