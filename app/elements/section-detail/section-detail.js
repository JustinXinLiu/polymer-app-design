let sectionDetailBehaviors = Symbol('behaviors');

class SectionDetail {
	get behaviors() {
		return this[sectionDetailBehaviors] || (this[sectionDetailBehaviors] = [
			Polymer.NeonSharedElementAnimatableBehavior,
			Polymer.NeonAnimatableBehavior,
			Polymer.NeonPageBehavior
		]);
	}

	set behaviors(value) {
		this[sectionDetailBehaviors] = value;
	}
	
	get listeners() {
		return {
			'entry-animation-start': '_onEntryStart'
		};
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

			sharedData: {
				type: Object
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
			
			sharedElementsReport: {
				type: Object,
				value: function () {
					return { 
						'hero': this.$.sharedChart
					};
				}
			},
			
			animationConfig: {
				type: Object,
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
			
			animationConfigReport: {
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
							nodeDelay: 0
						}, {
							name: 'slide-down-animation',
							node: this.$.heading
						}, {
							animatable: this.$.action,
							type: 'entry'
						}],
						
						'exit': [{
							name: 'hero-animation',
							id: 'hero',
							fromPage: this
						}, {
							name: 'cascaded-animation',
							animation: 'fade-out-animation',
							nodes: this.nodesExceptShared,
							nodeDelay: 0
						}, {
							name: 'slide-up-animation',
							node: this.$.heading
						}, {
							animatable: this.$.action,
							type: 'exit'
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
	
	get nodesExceptShared () {
		var nodes = [];
		nodes.push(this.$.first);
		nodes.push(this.$.second);
		nodes.push(this.$.third);
		
		return nodes;
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
	
	_onEntryStart() {
		this.sharedData = this.$.meta.byKey('section-shared');
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