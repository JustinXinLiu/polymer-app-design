class SpreadMenuButton {
  get listeners() {
    return {'iron-select': '_onIronSelect'};
  }

  beforeRegister() {
    this.is = 'spread-menu-button';

    this.properties = {
      opened: {
        type: Boolean,
        notify: true,
        observer: '_openedChanged'
      },

      openAnimationConfig: {
        value: () => {
          return [
            {
              name: 'fade-in-animation',
              timing: {delay: 100, duration: 400}
            }, {
              name: 'rotate-in-animation',
              node: this.$.on
            }
          ];
        }
      },

      closeAnimationConfig: {
        value: () => {
          return [
            {
              name: 'fade-out-animation',
              timing: {duration: 300}
            }, {
              name: 'rotate-clockwise-animation',
              node: this.$.off
            }
          ];
        }
      }
    };
  }

  created() { }
  ready() { }
  attached() { }

  _openedChanged(opened) {
    if (opened) {
      this.fire('paper-dropdown-open');
    } else {
      this.fire('paper-dropdown-close');
    }
  }

  open() {
    this.$.dropdown.open();
  }

  close() {
    this.$.dropdown.close();
  }

  _onTriggerOnTap() {
    this.open();
  }

  _onTriggerOffTap() {
    this.close();
  }

  _onIronSelect() {
    this.close();
  }
}

Polymer(SpreadMenuButton);
