class ValueCardChart {
	beforeRegister() {
		this.is = 'value-card-chart';
		this.properties = {
			name: {
				type: String
			},
			
			type: {
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
	
	_line(type) {
		return type === 'line';
	}
	
	_bar(type) {
		return type === 'bar';
	}
}

Polymer(ValueCardChart);