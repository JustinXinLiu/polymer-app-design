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
		console.log('type1', type);
		return type === 'line';
	}
	
	_bar(type) {
		console.log('type2', type);
		return type === 'bar';
	}
}

Polymer(ValueCardChart);