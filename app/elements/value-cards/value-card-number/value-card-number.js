class ValueCardNumber {
	beforeRegister() {
		this.is = 'value-card-number';
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

Polymer(ValueCardNumber);