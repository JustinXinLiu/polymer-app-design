var PageCompositionBehavior = [
	Polymer.NeonAnimationRunnerBehavior,
	Polymer.NeonPageBehavior
];

class SectionCardList {
	get behaviors() {
		return this._behaviors || (this._behaviors = PageCompositionBehavior);
	}

	set behaviors(behaviors) {
		this._behaviors = behaviors;
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
			
			animationConfig: {
				value: () => {
					return {
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
			}
		};
	}

	_onEntryStart(e) {
		console.log(e + ' entry animation starts: ' + app.params);

		if (this.cards) {
			return;
		}

		app.showBusyIndicator();
		this.async(() => {
			this.cards = [
				{ 'name': 'section 1', 'mainFigureValue': 37, 'mainFigureAbbr': 'V', 'mainFigureDesc': 'This Week', 'mainFigureComparisonValue': 60 },
				{ 'name': 'section 2', 'mainFigureValue': 12, 'mainFigureAbbr': 'L', 'mainFigureDesc': 'This Week', 'mainFigureComparisonValue': 30 },
				{ 'name': 'section 3', 'mainFigureValue': 3, 'mainFigureAbbr': 'K', 'mainFigureDesc': 'This Week', 'mainFigureComparisonValue': 40 },
				{ 'name': 'section 4', 'mainFigureValue': -10, 'mainFigureAbbr': 'K', 'mainFigureDesc': 'This Week', 'mainFigureComparisonValue': 70 },
				{ 'name': 'section 5', 'mainFigureValue': 7, 'mainFigureAbbr': 'Y', 'mainFigureDesc': 'This Week', 'mainFigureComparisonValue': 20 },
				{ 'name': 'section 6', 'mainFigureValue': 23, 'mainFigureAbbr': 'O', 'mainFigureDesc': 'This Week', 'mainFigureComparisonValue': 10 },
			];
			
			// animate report cards in
			this.async(() => {
				var nodes = Polymer.dom(this.root).querySelectorAll('section-card');
				var cascadeAnimation = this.animationConfig['cascade-in'];
				cascadeAnimation[0].nodes = cascadeAnimation[1].nodes = nodes;
				
				this.playAnimation('cascade-in');
			});

			app.hideBusyIndicator();
		}, 2000);
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
		app.pageAnimationForward();

		let item = this.$.cards.itemForElement(e.target);
		page(`${page.current}/${item.name}`);
	}
}

Polymer(SectionCardList);