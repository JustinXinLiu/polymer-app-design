let bottomPopupListBehaviors = Symbol('behaviors');

class BottomPopupList {
  get behaviors() {
    return this[bottomPopupListBehaviors] || (this[bottomPopupListBehaviors] = [
        Polymer.NeonAnimationRunnerBehavior,
        Polymer.NeonPageBehavior
      ]);
  }

  set behaviors(value) {
    this[bottomPopupListBehaviors] = value;
  }

  beforeRegister() {
    this.is = 'bottom-popup-list';

    this.properties = {
      name: {
        type: String
      },

      type: {
        type: String,
        reflectedToAttribute: true
      },

      opened: {
        type: Boolean,
        notify: true,
        observer: '_openedChanged'
      },

      selected: {
        type: Number,
        notify: true,
        observer: '_selectedChanged'
      },

      animationConfig: {
        value: function() {
          return {
            'entry': [
              {
                name: 'slide-down-animation',
                node: this.$.content
              }, {
                name: 'scale-up-animation',
                node: this.$.actions,
                timing: {duration: 300, delay: 400, easing: app.ANIMATION_EASE_OUT_BACK}
              }, {
                name: 'fade-in-animation',
                node: this.$.actions
              }
            ],

            'exit': [
              {
                name: 'slide-up-animation',
                node: this.$.content
              }, {
                name: 'scale-down-animation',
                node: this.$.actions,
                timing: {duration: 200, easing: app.ANIMATION_EASE_IN_BACK}
              }, {
                name: 'fade-out-animation',
                node: this.$.actions
              }
            ],

            'showActions': [
              {
                name: 'scale-up-animation',
                node: this.$.actions,
                timing: {duration: 300, easing: app.ANIMATION_EASE_OUT_BACK}
              }, {
                name: 'fade-in-animation',
                node: this.$.actions
              }
            ],

            'hideActions': [
              {
                name: 'scale-down-animation',
                node: this.$.actions,
                timing: {duration: 200, easing: app.ANIMATION_EASE_IN_BACK}
              }, {
                name: 'fade-out-animation',
                node: this.$.actions
              }
            ]
          };
        }
      }
    };
  }

  ready() {
    this.$.actions.style.display = 'none';
		
    // Sticky effect for the secondary heading
    //
		
    // let effect = new KeyframeEffect(this.$.heading, [
    // 	{ transform: 'rotateX(0)' }, 
    // 	{ transform: 'rotateX(180deg)' 
    // }], 400);
    // let animation = new Animation(effect, this.$.heading.ownerDocument.timeline);

    addEventListener('paper-header-transform', (e) => {
      var detail = e.detail;
      var heightDiff = detail.height - detail.condensedHeight;

      if (detail.y === heightDiff) {
        //animation.play();
        // this.async(()=> { 
        this.$.heading.first = false;
        this.sticky = 'sticky';
        // }, 0);
      } else {
        this.$.heading.first = true;
        this.sticky = '';
      }
    });
  }

  _selectedChanged(selected, oldSelected) {
    if (!oldSelected && selected >= 0) {
      this.$.actions.style.display = '';

      this.cancelAnimation();
      this.playAnimation('showActions', 'showActions');
    }
  }

  _openedChanged(opened) {
    console.log(opened);
  }

  _onGoUpTap() {

  }

  _onGoDownTap() {

  }

  _onSelectTap() {

  }
}

Polymer(BottomPopupList);
