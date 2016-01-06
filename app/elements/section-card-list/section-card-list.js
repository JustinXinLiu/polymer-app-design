'use strict';

let sectionCardListBehaviors = Symbol('behaviors');

class SectionCardList {
  get behaviors() {
    return this[sectionCardListBehaviors] || (this[sectionCardListBehaviors] = [
      Polymer.NeonSharedElementAnimatableBehavior,
      Polymer.NeonAnimationRunnerBehavior,
      Polymer.NeonPageBehavior
    ]);
  }

  set behaviors(value) {
    this[sectionCardListBehaviors] = value;
  }

  get listeners() {
    return {
      'entry-animation-start': '_onEntryStart',
      'entry-animation-finish': '_onEntryFinish',
      'exit-animation-start': '_onExitStart',
      'exit-animation-finish': '_onExitFinish'
    };
  }

  beforeRegister() {
    this.is = 'section-card-list';

    this.properties = {
      name: {
        type: String
      },

      cards: {
        type: Array
      },

      sharedData: {
        type: Object
      },

      sharedElementsSection: {
        type: Object,
      },

      animationConfig: {
        type: Object,
        value: function() {
          return {
            'entry': {
              name: 'slide-left-animation',
              node: this
            },

            'exit': {
              name: 'slide-from-left-animation',
              node: this
            },

            'cascade-in': [
              {
                name: 'cascaded-animation',
                animation: 'fade-in-animation',
                nodeDelay: 100
              }, {
                name: 'cascaded-animation',
                animation: 'slide-down-animation',
                nodeDelay: 100
              }
            ]
          };
        }
      },

      animationConfigSection: {
        type: Object,
        value: function() {
          return {
            'entry': [
              {
                name: 'hero-animation',
                id: 'hero',
                toPage: this
              }, {
                name: 'cascaded-animation',
                animation: 'fade-in-animation',
                nodeDelay: 0
              }
            ],

            'exit': [
              {
                name: 'hero-animation',
                id: 'hero',
                fromPage: this
              }, {
                name: 'cascaded-animation',
                animation: 'fade-out-animation',
                nodeDelay: 0
              }
            ]
          };
        }
      }
    };
  }

  get nodesExceptShared() {
    let nodes = Polymer.dom(this.root).querySelectorAll('section-card');
    let index = nodes.indexOf(this.sharedElementsSection.hero);
    nodes.splice(index, 1);

    return nodes;
  }

  _onEntryStart(e) {
    //console.log(' entry animation starts - from page ' + e.detail.from);
		
    // Set the nodes that need to apply cascaded animation before
    // navigating back to this page
    // this._setCascadedAnimationNodes();
		
    // When coming back from the detail page, do nothing
    if (e.detail.from === 'section' && this.cards) {
      return;
    }

    this.cards = [];
    app.showBusyIndicator();

    this.async(() => {
      this.cards = [
        { 
          name: 'section 1', 
          numberData: [
            {value: 37, desc: 'This Week', comparisonValue: 60, status: 'good'}, 
            {value: 23, desc: 'This Week', comparisonValue: 30, status: 'bad'}
          ] 
        }, { 
          name: 'section 2', 
          numberData: [
            {value: 25, desc: 'This Week', comparisonValue: 71, status: 'bad'}, 
            {value: 21, desc: 'This Week', comparisonValue: 34, status: 'bad'}
          ] 
        }, { 
          name: 'section 3', 
          numberData: [
            {value: 60, desc: 'This Week', comparisonValue: 92, status: 'bad'}, 
            {value: 19, desc: 'This Week', comparisonValue: 45, status: 'good'}
          ] 
        }, { 
          name: 'section 4', 
          numberData: [
            {value: 33, desc: 'This Week', comparisonValue: 73, status: 'good'}, 
            {value: 76, desc: 'This Week', comparisonValue: 96, status: 'good'}
          ] 
        },
      ];
			
      // Animate report cards in
      this.async(() => {
        let nodes = Polymer.dom(this.root).querySelectorAll('section-card');
        let cascadeAnimation = this.animationConfig['cascade-in'];
        cascadeAnimation[0].nodes = cascadeAnimation[1].nodes = nodes;

        this.playAnimation('cascade-in');
      });

      app.hideBusyIndicator();
    }, 1000);
  }

  _onEntryFinish() {
    //console.log(e + ' entry animation finished');
  }

  _onExitStart() {
    //console.log(e + ' exit animation starts');
		
    // Set the nodes that need to apply cascaded animation before
    // navigating away to section-detail page
    this._setCascadedAnimationNodes();
  }

  _onExitFinish() {
    //console.log(e + ' exit animation finished');
  }

  _setCascadedAnimationNodes() {
    let entryAnimation = this.animationConfigSection.entry;
    let exitAnimation = this.animationConfigSection.exit;
    entryAnimation[1].nodes = exitAnimation[1].nodes = this.nodesExceptShared;
  }

  _onCardTap(e) {
    var target = e.target;
		
    // Set shared elements
    while (target.nodeName !== 'SECTION-CARD') {
      target = target.parentNode;
    }

    this.sharedElementsSection = {
      'hero': target
    };

    this.animationConfigSection.exit[0].gesture = {
      x: event.x || event.pageX,
      y: event.y || event.pageY
    };	
		
    // Navigation
    app.pageAnimationForward();

    let item = this.$.cards.itemForElement(target);
    // TODO: is using iron-meta the best way to share data?
    this.sharedData = item;

    page(`${page.current}/${item.name}`);
  }
}

Polymer(SectionCardList);
