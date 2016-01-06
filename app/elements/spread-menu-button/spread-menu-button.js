'use strict';

let spreadMenuButtonBehaviors = Symbol('behaviors');

class SpreadMenuButton {
  get behaviors() {
    return this[spreadMenuButtonBehaviors] || (this[spreadMenuButtonBehaviors] = [
      Polymer.NeonAnimationRunnerBehavior
    ]);
  }

  set behaviors(value) {
    this[spreadMenuButtonBehaviors] = value;
  }

  get listeners() {
    return {
      'neon-animation-finish': '_onNeonAnimationFinish',
      'iron-select': '_onIronSelect'
    };
  }

  beforeRegister() {
    this.is = 'spread-menu-button';

    this.properties = {
      opened: {
        type: Boolean,
        notify: true,
        observer: '_openedChanged'
      },

      animationConfig: {
        value: function() {
          return {
            'entry': [
              {
                name: 'fade-in-animation',
                node: this
              }, {
                name: 'scale-up-animation',
                node: this,
                transformOrigin: '200% 200%',
                timing: {duration: 300, delay: 400, easing: app.ANIMATION_EASE_OUT_BACK}
              }
            ],

            'exit': [
              {
                name: 'fade-out-animation',
                node: this
              }, {
                name: 'scale-down-animation',
                node: this,
                transformOrigin: '200% 200%',
                timing: {duration: 200, easing: app.ANIMATION_EASE_IN_BACK}
              }
            ],

            'open': [
              {
                name: 'fade-in-animation',
                node: this.offElement
              }, {
                name: 'rotate-clockwise-animation',
                node: this.offElement
              }, {
                name: 'fade-out-animation',
                node: this.onElement
              }, {
                name: 'rotate-clockwise-animation',
                node: this.onElement
              }
            ],

            'close': [
              {
                name: 'fade-out-animation',
                node: this.offElement
              }, {
                name: 'rotate-anticlockwise-animation',
                node: this.offElement
              }, {
                name: 'fade-in-animation',
                node: this.onElement
              }, {
                name: 'rotate-anticlockwise-animation',
                node: this.onElement
              }
            ]
          };
        }
      },

      openAnimationConfig: {
        value: function() {
          return [
            {
              name: 'cascaded-animation',
              animation: 'fade-in-animation',
              nodes: this.itemsReversed,
              nodeDelay: 100,
              timing: {delay: 100, duration: 400}
            }, {
              name: 'cascaded-animation',
              animation: 'scale-up-animation',
              nodes: this.itemsReversed,
              nodeDelay: 100
            }
          ];
        }
      },

      closeAnimationConfig: {
        value: function() {
          return [
            {
              name: 'cascaded-animation',
              animation: 'fade-out-animation',
              nodes: this.items,
              nodeDelay: 100,
              timing: {duration: 300}
            }, {
              name: 'cascaded-animation',
              animation: 'scale-down-animation',
              nodes: this.items,
              nodeDelay: 100
            }
          ];
        }
      }
    };
  }

  get onElement() {
    return this.queryEffectiveChildren('.dropdown-trigger-on');
  }

  get offElement() {
    return this.queryEffectiveChildren('.dropdown-trigger-off');
  }

  get items() {
    let content = this.queryEffectiveChildren('.dropdown-content');
    // iron-selector
    let child = content.children[0];
    // fabs
    let children = child.children;

    return children;
  }

  get itemsReversed() {
    let items = [];
    let length = this.items.length;

    for (let i = 1; i <= length; i++) {
      items.push(this.items[length - i]);
    }

    return items;
  }

  _onNeonAnimationFinish(e, animation) {
    switch (animation) {
      case 'open':
        this.onElement.style.display = 'none';
        break;
      case 'close':
        this.offElement.style.display = 'none';
        break;
    }
  }

  _openedChanged(opened) {
    if (opened) {
      this.fire('paper-dropdown-open');

      this.cancelAnimation();
      this.offElement.style.display = '';
      this.playAnimation('open', 'open');
    } else {
      this.fire('paper-dropdown-close');

      this.cancelAnimation();
      this.onElement.style.display = '';
      this.playAnimation('close', 'close');
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
