# ApocSidebar

[![npm: apoc-sidebar](https://img.shields.io/npm/v/apoc-sidebar.svg)](https://www.npmjs.com/package/apoc-sidebar)
[![CircleCI: nju33/apoc-sidebar](https://circleci.com/gh/nju33/apoc-sidebar.svg?style=svg)](https://circleci.com/gh/nju33/apoc-sidebar)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![license: mit](https://img.shields.io/packagist/l/doctrine/orm.svg)

Sidebar without dependenceies

![screenshot](https://github.com/nju33/apoc-sidebar/raw/master/images/screenshot.gif?raw=true)

## Install or Download

```bash
yarn add apoc-sidebar
npm i apoc-sidebar
```

Or access to [releases page](https://github.com/nju33/apoc-sidebar/releases).
Then, download the latest version.

## Demo

[https://nju33.github.io/apoc-sidebar/](https://nju33.github.io/apoc-sidebar/)

## Usage

```html
<!-- Elements that catch events -->
<button id="trigger">...</button>

<!--
  `data-apoc-sidebar-sibling` is required only when type is `lid`.
  It must be a sibling of an element to become a sidebar.
-->
<div data-apoc-sidebar-sibling></div>

<!--
  Specify `width` in CSS.
  Also, can hide the first state by adding `display:none` to the style
-->
<div id="sidebar" style="width:300px;display:none">...</div>

<!-- When reading by itself -->
<script src="/path/tp/apoc-sidebar.js"></script>
```

```js
// es
import ApocSidebar from 'apoc-sidebar';

const sidebar = new ApocSidebar(
  document.getElementById('sidebar'),
  {
    // options

    // default
    type: 'slide',
    // There are other types like this
    // - 'water',
    // - 'push',
    // - 'lid',
    // - 'door',
    // - 'waterfall',
    // - 'waterfallReverse'

    // Parent surrounding `#sidebar` and `[data-apoc-sidebar-sibling]`
    // default
    container: sidebar.parentElement // the parentElement of the `#sidebar`


    // Which side you put on
    // default
    side: 'left', // or 'right'

    // The `transition-timing-function` value of css attached
    // to all relevant elements
    // default (easeInOutQuad)
    // ref: http://easings.net/
    transitionTimingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',

    // The `transition-duration` value of css attached
    // to all relevant elements
    // default
    transitionDuration: '.2s',

    // Wall background color
    // default
    wallBackgroundColor: 'rgba(0,0,0,.3)'
  }
);

sidebar.init();
// You can also decide "Open first or close" like `sidebar.init(true)`.


document.getElementById('trigger').addEventListener('click', () => {
  if (sidebar.isOpen()) {
    sidebar.close();
  } else {
    sidebar.open();
  }
});

setTimeout(() => {
  // Delete events
  sidebar.teardown();
}, 999999)
```

### Examples

- `test/fixtures/`
- `example/webpack/`

## LICENSE

The MIT License (MIT)

Copyright (c) 2017 nju33 <nju33.ki@gmail.com>
