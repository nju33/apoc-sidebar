const defaultOpts = {
  type: 'slide',
  // type: 'water',
  // type: 'push',
  // type: 'lid',
  // type: 'door',
  // type: 'waterfall',
  // type: 'waterfallReverse',
  side: 'left',
  // side: 'right'
  transitionTimingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
  transitionDuration: '.2s',
  wallBackgroundColor: 'rgba(0,0,0,.3)'
};

export default class ApocSidebar {
  constructor(el = null, opts = defaultOpts) {
    if (el === null) {
      throw new Error('Required element');
    }
    this.wall = null;
    this.el = el;
    this.opts = Object.assign({}, defaultOpts, opts);

    this.handleTransitionendForWall =
      this.createTransitionendHandlerForWall.bind(this);
    this.handleTransitionendForSidebar =
      this.createTransitionendHandlerForSidebar.bind(this);
    this.handleTransitionendForOther =
      this.createTransitionendHandlerForOther.bind(this);
    this.handleClose = this.close.bind(this);

    this.opened = false;
  }

  createTransitionendHandlerForWall() {
    Object.assign(this.wall.style, {
      webkitBackfaceVisibility: '',
      backfaceVisibility: '',
      willChange: ''
    });
  }

  createTransitionendHandlerForOther() {
    if (this.opts.type === 'lid' && this.isOpen()) {
      Object.assign(this.el.style, {
        zIndex: 9999
      });
    }
  }

  createTransitionendHandlerForSidebar() {
    Object.assign(this.el.style, {
      webkitBackfaceVisibility: '',
      backfaceVisibility: '',
      willChange: '',
      borderRadius: 0,
      zIndex: 9999
    });
  }

  createWall() {
    this.wall = document.createElement('div');
    Object.assign(this.wall.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: this.opts.wallBackgroundColor, 
      opacity: 0,
      zIndex: -9998,
      ...this.transitionDecls
    });
    document.body.appendChild(this.wall);
    this.wall.addEventListener('click', this.handleClose);
    this.wall.addEventListener(
      'transitionend', this.handleTransitionendForWall
    );
  }

  init() {
    this.createWall();

    if (this.opts.type === 'push') {
      Object.assign(document.body.style, {
        webkitTransition: '.2s',
        transition: '.2s'
      });
      document.body.addEventListener(
        'transitionend', this.handleTransitionendForOther
      );
    } else if (this.opts.type === 'lid') {
      this.siblings.forEach(el => {
        Object.assign(el.style, this.transitionDecls);
        el.addEventListener(
          'transitionend', this.handleTransitionendForOther
        );
      });
    }

    const styles = [this.el.style];
    styles.push({
      display: '',
      height: '100%',
      position: 'fixed',
      zIndex: this.initZIndex,
      top: this.initYPosition,
      [this.opts.side]: this.initXPosition + 'px'
    });

    if (this.opts.type === 'door') {
      styles.push({
        webkitTransformOrigin: `${this.opts.side} top`,
        transformOrigin: `${this.opts.side} top`,
        ...this.postdoor
      });
    } else if (this.opts.type === 'waterfall' ||
               this.opts.type === 'waterfallReverse') {
      styles.push(this.postwaterfall);
    }

    Object.assign.apply(null, styles);

    this.el.addEventListener(
      'transitionend', this.handleTransitionendForSidebar
    );

    setTimeout(() => {
      Object.assign(this.el.style, this.transitionDecls);
    }, 0);
  }

  get initXPosition() {
    if (/^(?:lid|door|waterfall|waterfallReverse)$/.test(this.opts.type)) {
      return 0;
    }
    return -this.el.clientWidth;
  }

  get initYPosition() {
    if (this.opts.type === 'waterfall') {
      return '-100%';
    } else if (this.opts.type === 'waterfallReverse') {
      return '100%';
    }
    return 0;
  }

  get initZIndex() {
    if (this.opts.type === 'lid') {
      return -9999;
    }
    return '';
  }

  get transitionDecls() {
    return {
      wabkitTransitionTimingFunction: this.opts.transitionTimingFunction,
      transitionTimingFunction: this.opts.transitionTimingFunction,
      webkitTransitionDuration: this.opts.transitionDuration,
      transitionDuration: this.opts.transitionDuration
    };
  }

  get preslide() {
    const size = this.opts.side === 'left' ?
                   this.el.clientWidth :
                   -this.el.clientWidth;
    return {
      webkitTransform: `translate3d(${size}px, 0, 0)`,
      transform: `translate3d(${size}px, 0, 0)`,
      zIndex: 9999
    };
  }

  get postslide() {
    return {
      webkitTransform: `translate3d(0, 0, 0)`,
      transform: `translate3d(0, 0, 0)`
    };
  }

  get prewater() {
    if (this.opts.side === 'left') {
      return {
        borderTopRightRadius: '40% 80%',
        borderBottomRightRadius: '40% 80%'
      };
    }
    return {
      borderTopLeftRadius: '40% 80%',
      borderBottomLeftRadius: '40% 80%'
    };
  }

  get postwater() {
    if (this.opts.side === 'left') {
      return {
        borderTopRightRadius: '0 80%',
        borderBottomRightRadius: '0 80%'
      };
    }
    return {
      borderTopLeftRadius: '0 80%',
      borderBottomLeftRadius: '0 80%'
    };
  }

  get predoor() {
    return {
      webkitTransform: 'rotateY(0deg)',
      transform: 'rotateY(0deg)'
    };
  }

  get postdoor() {
    return {
      webkitTransform: 'rotateY(90deg)',
      transform: 'rotateY(90deg)'
    };
  }

  get prewaterfall() {
    return {
      borderBottomLeftRadius: '80% 40%',
      borderBottomRightRadius: '80% 40%',
      webkitTransform: 'translate3d(0, 100%, 0)',
      transform: 'rotateY(0, 100%, 0)'
    };
  }

  get prewaterfallReverse() {
    return {
      borderTopLeftRadius: '80% 40%',
      borderTopRightRadius: '80% 40%',
      webkitTransform: 'translate3d(0, -100%, 0)',
      transform: 'rotateY(0, 100%, 0)'
    };
  }

  get postwaterfall() {
    return {
      webkitTransform: 'translate3d(0, 0, 0)',
      transform: 'rotateY(0, 0, 0)'
    };
  }

  get siblings() {
    const siblings = Array.prototype.slice.call(this.el.parentElement.children)
                       .filter(el => (
                         el.getAttribute('data-apoc-sidebar-sibling') !== null
                       ));
    if (siblings.length === 0) {
      throw new Error(`
In 'push' or 'lid' type,
Required [data-apoc-sidebar-sibling] attr to sibling elements`);
    }
    return siblings;
  }

  isOpen() {
    return this.opened;
  }

  isSlideType() {
    return /^(?:slide|water)$/.test(this.opts.type);
  }

  isWaterType() {
    return this.opts.type === 'water';
  }

  isDoorType() {
    return this.opts.type === 'door';
  }

  isWaterfallType() {
    return this.opts.type === 'waterfall';
  }

  isWaterfallReverseType() {
    return this.opts.type === 'waterfallReverse';
  }

  open() {
    Object.assign(this.wall.style, {
      webkitBackfaceVisibility: 'hidden',
      backfaceVisibility: 'hidden',
      willChange: 'opacity',
      zIndex: 9998,
      opacity: 1
    });

    if (this.opts.type === 'push') {
      Object.assign(document.body.style, {
        ...this.preslide
      });
    } else if (this.opts.type === 'lid') {
      this.siblings.forEach(el => {
        Object.assign(el.style, {
          ...this.preslide
        });
      });
    }

    Object.assign(this.el.style, {
      webkitBackfaceVisibility: 'hidden',
      backfaceVisibility: 'hidden',
      willChange: 'transform, border-radius',

      ...(this.isSlideType() ? this.preslide : {}),
      ...(this.isWaterType() ? this.prewater : {}),
      ...(this.isDoorType() ? this.predoor : {}),
      ...(this.isWaterfallType() ? this.prewaterfall : {}),
      ...(this.isWaterfallReverseType() ? this.prewaterfallReverse : {})
    });

    this.opened = true;
  }

  close() {
    Object.assign(this.wall.style, {
      webkitBackfaceVisibility: 'hidden',
      backfaceVisibility: 'hidden',
      willChange: 'opacity',
      zIndex: -9998,
      opacity: 0
    });

    if (this.opts.type === 'push') {
      Object.assign(document.body.style, {
        ...this.postslide
      });
    } else if (this.opts.type === 'lid') {
      this.siblings.forEach(el => {
        Object.assign(el.style, {
          ...this.postslide
        });
      });
    }

    Object.assign(this.el.style, {
      webkitBackfaceVisibility: 'hidden',
      backfaceVisibility: 'hidden',
      willChange: 'transform, border-radius',
      zIndex: this.initZIndex,

      ...(this.isSlideType() ? this.postslide : {}),
      ...(this.isWaterType() ? this.postwater : {}),
      ...(this.isDoorType() ? this.postdoor : {}),
      ...(this.isWaterfallType() ? this.postwaterfall : {}),
      ...(this.isWaterfallReverseType() ? this.postwaterfall : {})
    });

    this.opened = false;
  }

  teardown() {
  }

  on(type, cb) {
  }
}
