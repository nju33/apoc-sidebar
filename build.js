const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const easings = require('postcss-easings');
const modules = require('postcss-modules');
const {rollup} = require('rollup');
const rollupConfig = require('./rollup.config');

const MODULE_NAME = 'ApocSidebar';
const globals = {};

exports.bundleAll = () => {
  return new Promise((resolve, reject) => {
    gulp
      .src('src/styles/style.less')
      .pipe(less())
      .pipe(
        postcss([
          autoprefixer({
            browsers: '> 3%, last 2 versions'
          }),
          easings,
          modules({
            getJSON(cssFileName, json) {
              // const baseName = path.basename(cssFileName) + '.json';
              const baseName = 'class-name.json';
              const jsonFileName = path.join(__dirname, 'lib', baseName);
              fs.writeFileSync(jsonFileName, JSON.stringify(json));
            }
          })
        ])
      )
      .pipe(gulp.dest('lib/'))
      .on('end', () => {
        bundle()
          .then(() => resolve())
          .catch(err => reject(err));
      });
  });
};

exports.bundle = bundle;

function bundle() {
  return new Promise((resolve, reject) => {
    rollup(rollupConfig).then(bundle => {
      rollupConfig.cache = bundle;

      ['iife', 'es', 'umd'].forEach(async format => {
        switch (format) {
          case 'iife': {
            const opts = {
              name: MODULE_NAME,
              globals,
              format,
              banner: rollupConfig.banner
            };
            const destPath = './dist/apoc-sidebar.js';
            try {
              const result = await bundle.generate(opts);
              fs.writeFileSync(destPath, result.code);
            } catch (err) {
              reject(err);
            }
            break;
          }
          case 'umd': {
            const opts = {
              name: 'default',
              globals,
              format
            };
            const destPath = './dist/apoc-sidebar.umd.js';
            try {
              const result = await bundle.generate(opts);
              fs.writeFileSync(destPath, result.code);
            } catch (err) {
              reject(err);
            }
            break;
          }
          case 'es':
          default: {
            const opts = {
              globals,
              format,
              exports: 'default'
            };
            const destPath = './dist/apoc-sidebar.es.js';
            try {
              const result = await bundle.generate(opts);
              fs.writeFileSync(destPath, result.code);
            } catch (err) {
              reject(err);
            }
            break;
          }
        }
      });

      resolve();
    });
  });
}
