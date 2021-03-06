'use strict';

class IconTransitionButton {
  beforeRegister() {
    this.is = 'icon-transition-button';

    this.hostAttributes = {
      role: 'button',
      tabindex: '0'
    };

    this.properties = {
      rotate: {
        type: Number,
        value: 0
      },

      icon: {
        type: String,
      },

      color: {
        type: String,
        value: '#fff'
      },

      route: {
        type: String,
        observer: '_routeChanged'
      },

      alt: {
        type: String,
        observer: '_altChanged'
      }
    };
  }

  _computeIconClass(rotate, icon) {
    rotate += 180;
    let cl = icon;

    if ((rotate % 360) === 180) {
      cl += ' rotate';
    }

    let svg = this.$.svg;
    let transform = `rotate(${rotate}deg)`;
    if (document.documentElement.style.transform) {
      svg.style.transform = transform;
    } else {
      svg.style.webkitTransform = transform;
    }

    return cl;
  }

  _routeChanged(newValue) {
    let newRoute = newValue;

    if (newRoute === 'home') {
      this.icon = 'menu';
      this.setAttribute('paper-drawer-toggle', true);
    } else {
      this.icon = 'left-arrow';
      this.removeAttribute('paper-drawer-toggle');
    }
  }

  _altChanged(newValue, oldValue) {
    let label = this.getAttribute('aria-label');

    // Don't stomp over a user-set aria-label.
    if (!label || oldValue === label) {
      this.setAttribute('aria-label', newValue);
    }
  }
}

Polymer(IconTransitionButton);
