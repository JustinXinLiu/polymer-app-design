'use strict';

let flyoutTextBehaviors = Symbol('behaviors');
let _loaded;

class FlyoutText {
  get behaviors() {
    return this[flyoutTextBehaviors] || (this[flyoutTextBehaviors] = [
      Polymer.NeonAnimationRunnerBehavior
    ]);
  }

  set behaviors(value) {
    this[flyoutTextBehaviors] = value;
  }

  get listeners() {
    return {
      'neon-animation-finish': '_onNeonAnimationFinish'
    };
  }

  beforeRegister() {
    this.is = 'flyout-text';

    this.properties = {
      name: {
        type: String
      },

      animationConfig: {
        value: function() {
          return {
            'flyout': [
              {
                name: 'slide-up-animation',
                node: this.$.old
              }, {
                name: 'slide-up-animation',
                node: this.$.new
              }
            ]
          };
        }
      },

      text: {
        type: String,
        observer: '_textChanged'
      },

      oldText: {
        type: String,
        readonly: true
      },

      initialText: {
        type: String,
        value: 'welcome!'
      }
    };
  }

  ready() {
    this.oldText = this.initialText;
  }

  attached() {
    // restraint the height of this element
    let height = this.$.old.clientHeight;
    this.$.container.style.height = height + 'px';
  }

  _onNeonAnimationFinish() {
    this.oldText = this.text;
  }

  _textChanged() {
    let ms = 0;

    if (!_loaded) {
      ms = 2000;
      _loaded = true;
    }

    this.async(function() {
      this.playAnimation('flyout');
    }, ms);
  }
}

Polymer(FlyoutText);

