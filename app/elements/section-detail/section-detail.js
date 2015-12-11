let sectionDetailBehaviors = Symbol('behaviors');

class SectionDetail {
	get behaviors() {
		return this[sectionDetailBehaviors] || (this[sectionDetailBehaviors] = [
			Polymer.NeonAnimatableBehavior,
			Polymer.NeonPageBehavior
		]);
	}

	set behaviors(value) {
		this[sectionDetailBehaviors] = value;
	}
	
	beforeRegister() {
		this.is = 'section-detail';
		this.properties = {
			name: {
				type: String
			},

			sticky: {
				type: String
			},
			
			drillDownType: {
				type: String,
				notify: true,
				observer: '_drillDownTypeChanged'
			},

			mainFigureValue: {
				type: Number
			},

			mainFigureAbbr: {
				type: String
			},

			mainFigureDesc: {
				type: String
			},

			mainFigureComparisonValue: {
				type: Number
			},
			
			opened: {
				type: Boolean,
				notify: true,
				reflectToAttribute: true			
			},
			
			animationConfigProducts: {
				type: Object		
			},
			
			animationConfigOrgunits: {
				type: Object		
			},
			
			animationConfig: {
				value: function () {		
					return {
						'entry': [{
							name: 'slide-from-right-animation',
							node: this.$.content
						}, {
							animatable: this.$.action,
							type: 'entry'
						}],
						
						'exit': [{
							name: 'slide-right-animation',
							node: this.$.content							
						}, {
							animatable: this.$.action,
							type: 'exit'
						}]										
					};
				}
			},
			
			_localHeroAnimationConfig: {
				value: function () {		
					return {
						'entry': [{
							name: 'hero-animation',
							id: 'hero',
							toPage: this
						}],
						
						'exit': [{
							name: 'hero-animation',
							id: 'hero',
							fromPage: this
						}]										
					};
				}
			},
			
			_localUpDownAnimationConfig: {
				value: function () {		
					return {
						'entry': [{
							name: 'slide-down-animation',
							node: this.$.content
						}, {
							animatable: this.$.action,
							type: 'entry'
						}],
						
						'exit': [{
							name: 'slide-up-animation',
							node: this.$.content
						}, {
							animatable: this.$.action,
							type: 'exit'
						}]										
					};
				}
			}
		};
	}

	ready() {
		this.animationConfigProducts = this.animationConfigOrgunits = this._localUpDownAnimationConfig;

		// Sticky effect for the secondary heading
		//
		
		// let effect = new KeyframeEffect(this.$.heading, [
		// 	{ transform: 'rotateX(0)' }, 
		// 	{ transform: 'rotateX(180deg)' 
		// }], 400);
		// let animation = new Animation(effect, this.$.heading.ownerDocument.timeline);

		addEventListener('paper-header-transform', (e) => {
			let detail = e.detail;
			let heightDiff = detail.height - detail.condensedHeight;

			if (detail.y === heightDiff) {
				//animation.play();
				// this.async(()=> { 
				this.$.heading.first = false;
				this.sticky = 'sticky';
				// }, 0);
			}
			else {
				this.$.heading.first = true;
				this.sticky = '';
			}
		});
	}
	
	_drillDownTypeChanged(type) {
		switch (type) {
			case 'product':
				app.pageAnimationForward();
				page(`${page.current}/products`);
				break;
			case 'org':
				app.pageAnimationForward();
				page(`${page.current}/orgunits`);
				break;
		}
	}	
}

Polymer(SectionDetail);