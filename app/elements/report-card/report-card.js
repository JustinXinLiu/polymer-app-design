class ReportCard {
	beforeRegister() {
		this.is = 'report-card';
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

	created() { }
	ready() { }
	attached() { }
	detached() { }
	attributeChanged() { }
}

Polymer(ReportCard);