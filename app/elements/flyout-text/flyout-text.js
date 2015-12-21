class FlyoutText {
  get behaviors() {
    return [Polymer.NeonAnimationRunnerBehavior];
  }

  beforeRegister() {
    this.is = 'flyout-text';
    this.properties = {
      animationConfig: {
        value: () => {
          return {
            'flyout': [
              {
                name: 'fade-out-animation',
                node: this
              }, {
                name: 'fade-in-animation',
                node: this
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
        type: String
      }
    };
  }

  ready() {
    // console.log('ironanimation1', new Polymer.IronMeta({type: 'animation'}));
  }

  _textChanged(newText) {
    this.oldText = newText;

    this.async(() => {
      console.log('start animation');

      this.cancelAnimation();
      this.playAnimation('flyout');
			
      // console.log('ironanimation2', new Polymer.IronMeta({type: 'animation'}));
			
    }, 2000);
  }
}

Polymer(FlyoutText);
