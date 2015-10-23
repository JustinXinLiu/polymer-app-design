class SectionCard {
	beforeRegister() {
		this.is = 'section-card';
		this.properties = {
			name: {
				type: String
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
			}
		};
	}

	attached() {
	}
}

Polymer(SectionCard);