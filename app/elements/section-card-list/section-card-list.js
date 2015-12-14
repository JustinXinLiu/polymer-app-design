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
				type: String,
				observer: '_onNameChange'
			},

			cards: {
				type: Array
			},
			
			sharedElementsSection: {
				type: Object,
			},
			
			animationConfig: {
				type: Object,
				value: function () {
					return {
						'entry': {
							name: 'slide-left-animation',
							node: this
						},
						
						'exit': {
							name: 'slide-from-left-animation',
							node: this
						},
						
						'cascade-in': [{
							name: 'cascaded-animation',
							animation: 'fade-in-animation',
							nodeDelay: 100
						}, {
							name: 'cascaded-animation',
							animation: 'slide-down-animation',
							nodeDelay: 100
						}]
					};
				}
			},
			
			animationConfigSection: {
				type: Object,
				value: function () {
					return {
						'entry': [{
							name: 'hero-animation',
							id: 'hero',
							toPage: this
						}, {
							name: 'cascaded-animation',
							animation: 'fade-in-animation',
							nodes: this.nodesExceptShared,
							nodeDelay: 100
						}],
						
						'exit': [{
							name: 'hero-animation',
							id: 'hero',
							fromPage: this
						}, {
							name: 'cascaded-animation',
							animation: 'fade-out-animation',
							nodes: this.nodesExceptShared,
							nodeDelay: 100
						}]
					};
				}
			}
		};
	}
	
	get nodesExceptShared () {
		let nodes = Polymer.dom(this.root).querySelectorAll('section-card');
		let index = nodes.indexOf(this.sharedElements);
		let nodesExceptShared = nodes.splice(index, 1);	
		return nodesExceptShared;
	}

	_onEntryStart(e) {
		console.log(' entry animation starts - from page ' + e.detail.from);
		
		// When coming back from the detail page, do nothing
		if (e.detail.from === 'section' && this.cards) {
			return;
		}
		
		this.cards = [];
		app.showBusyIndicator();
		
		this.async(() => {		
			this.cards = [
				{ 'name': app.params.report + ' ' + 'section 1', 'mainFigureValue': 37, 'mainFigureAbbr': 'V', 'mainFigureDesc': 'This Week', 'mainFigureComparisonValue': 60 },
				{ 'name': app.params.report + ' ' + 'section 2', 'mainFigureValue': 12, 'mainFigureAbbr': 'L', 'mainFigureDesc': 'This Week', 'mainFigureComparisonValue': 30 },
				{ 'name': app.params.report + ' ' + 'section 3', 'mainFigureValue': 3, 'mainFigureAbbr': 'K', 'mainFigureDesc': 'This Week', 'mainFigureComparisonValue': 40 },
				{ 'name': app.params.report + ' ' + 'section 4', 'mainFigureValue': -10, 'mainFigureAbbr': 'K', 'mainFigureDesc': 'This Week', 'mainFigureComparisonValue': 70 },
				{ 'name': app.params.report + ' ' + 'section 5', 'mainFigureValue': 7, 'mainFigureAbbr': 'Y', 'mainFigureDesc': 'This Week', 'mainFigureComparisonValue': 20 },
				{ 'name': app.params.report + ' ' + 'section 6', 'mainFigureValue': 23, 'mainFigureAbbr': 'O', 'mainFigureDesc': 'This Week', 'mainFigureComparisonValue': 10 },
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

	_onEntryFinish(e) {
		console.log(e + ' entry animation finished');
	}

	_onExitStart(e) {
		console.log(e + ' exit animation starts');
	}

	_onExitFinish(e) {
		console.log(e + ' exit animation finished');
	}

	_onNameChange(newValue) {
		console.log('name changed: ' + newValue);
	}

	_onCardTap(e) {
		var target = e.target;
		
		// Set shared elements
		while (target !== this && !target._templateInstance) {
			target = target.parentNode;
		}
		
		this.sharedElementsSection = { 
			'hero': target 
		};
		
		console.log('sharedElements', this.sharedElements);
		
		this.animationConfigSection['exit'][0].gesture = {
			x: event.x || event.pageX,
			y: event.y || event.pageY
		};
		
		// Retrieve other elements
// 		let nodes = Polymer.dom(this.root).querySelectorAll('section-card');
// 		let index = nodes.indexOf(target);
// 		let nodesExceptShared = nodes.splice(index, 1);
// 		
// 		let entryAnimation = this.animationConfigSection['entry'];
// 		entryAnimation[1].node = nodesExceptShared;
// 
// 		let exitAnimation = this.animationConfigSection['exit'];
// 		exitAnimation[1].node = nodesExceptShared;		
		
		// Navigation
		app.pageAnimationForward();

		let item = this.$.cards.itemForElement(target);
		page(`${page.current}/${item.name}`);
	}
}

Polymer(SectionCardList);