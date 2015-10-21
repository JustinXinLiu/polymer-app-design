class SectionCard {
	beforeRegister() {
		this.is = 'section-card';
		this.properties = {
			name: {
				type: String,
				value: ''
			},

			mainFigureValue: {
				type: Number,
				value: 0
			},

			mainFigureAbbr: {
				type: String,
				value: ''
			},

			mainFigureDesc: {
				type: String,
				value: ''
			},
			
			mainFigureComparisonValue: {
				type: Number,
				value: 0				
			}
		};
	}

	created() { }
	ready() { }
	attached() { }
	detached() { }
	attributeChanged() { }
}

Polymer(SectionCard);