# ApocSidebar

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

Sidebar not dependent on others.

![screenshot](https://github.com/nju33/apoc-sidebar/raw/master/images/screenshot.gif?raw=true)

## Install or Download

```bash
yarn add apoc-sidebar
npm i -S apoc-sidebar
```

Or access to [releases page](https://github.com/nju33/apoc-sidebar/releases).
Then, download the latest version.

## Usage

```html
<!-- Elements that catch events -->
<button id="trigger">...</button>

<!--
  Please specify `width` in CSS.
  Also, adding `display:none` does not show useless parts when displaying the page.
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
document.getElementById('trigger').addEventListener('click', () => {
  if (sidebar.isOpen()) {
    sidebar.close();
  } else {
    sidebar.open();
  }
});
```

### Examples

- `test/fixtures/`
- `example/webpack/`

## LICENSE

The MIT License (MIT)

Copyright (c) 2017 nju33 <nju33.ki@gmail.com>
