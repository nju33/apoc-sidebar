const defaultOpts = {
  type: 'slide',
  type: 'water',
  type: 'push',
  type: 'lid',
  side: 'left'
};

export default class ApocSidebar {
  constructor(el = null, opts = defaultOpts) {
    if (el === null) {
      throw new Error('Required element');
    }
    this.wall = null;
    this.el = el;
    this.opts = Object.assign({}, defaultOpts, opts);

    this.handleTransitionend = this.createTransitionendHandler.bind(this);
    this.handleClose = this.close.bind(this);

    this.opened = false;
  }

  createTransitionendHandler() {
    Object.assign(this.el.style, {
      webkitBackfaceVisibility: '',
      backfaceVisibility: '',
      willChange: '',
      borderRadius: 0,
      zIndex: this.isOpen() ? 9999 : -9999
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
      backgroundColor: 'rgba(0, 0, 0, .3)',
      webkitTransition: '.2s',
      transition: '.2s',
      opacity: 0,
      zIndex: -9998
    });
    document.body.appendChild(this.wall);
    this.wall.addEventListener('click', this.handleClose);
  }

  init() {
    this.createWall();

    if (this.opts.type === 'push') {
      Object.assign(document.body.style, {
        webkitTransition: '.2s',
        transition: '.2s'
      });
    } else if (this.opts.type === 'lid') {
      this.siblings.forEach(el => {
        Object.assign(el.style, {
          webkitTransition: '.2s',
          transition: '.2s'
        });
      });
    }

    Object.assign(this.el.style, {
      display: '',
      height: '100%',
      position: 'fixed',
      top: 0,
      zIndex: this.initZIndex,
      [this.opts.side]: -this.initPosition + 'px',
      webkitTransition: '.2s',
      transition: '.2s'
    });

    this.el.addEventListener('transitionend', this.handleTransitionend);
  }

  get initPosition() {
    if (this.opts.type === 'lid') {
      return 0;
    }
    return this.el.clientWidth;
  }

  get initZIndex() {
    if (this.opts.type === 'lid') {
      return -9999;
    }
    return '';
  }

  get preslide() {
    return {
      webkitTransform: `translate3d(${this.el.clientWidth}px, 0, 0)`,
      transform: `translate3d(${this.el.clientWidth}px, 0, 0)`,
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
    return {
      borderTopRightRadius: '40% 80%',
      borderBottomRightRadius: '40% 80%'
    };
  }

  get postwater() {
    return {
      borderTopRightRadius: '0 80%',
      borderBottomRightRadius: '0 80%'
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
    return /slide|water/.test(this.opts.type);
  }

  isWaterType() {
    return this.opts.type === 'water';
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
      ...(this.isWaterType() ? this.prewater : {})
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

      ...(this.isSlideType() ? this.postslide : {}),
      ...(this.isWaterType() ? this.postwater : {})
    });

    this.opened = false;
  }

  teardown() {
  }

  on(type, cb) {
  }
}
