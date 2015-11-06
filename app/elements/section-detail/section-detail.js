class SectionDetail {
	get behaviors() {
		return [ Polymer.NeonAnimatableBehavior ];
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
			
			animationConfig: {
				value: () => {
					console.log('here');
								
					return {
						'entry': [{
							name: 'fade-in-animation',
							node: this.$.action
						}, {
							name: 'scale-up-animation',
							node: this.$.action
						}],
						
						'exit': [{
							name: 'fade-out-animation',
							node: this.$.action
						}, {
							name: 'scale-down-animation',
							node: this.$.action
						}]						
					};
				}
			}
		};
	}

	ready() {

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
		console.log('type', type);
	}
}

Polymer(SectionDetail);