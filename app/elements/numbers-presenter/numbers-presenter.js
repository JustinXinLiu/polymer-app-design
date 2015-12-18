class NumbersPresenter {
	beforeRegister() {
		this.is = 'numbers-presenter';
		this.properties = {
			name: {
				type: String
			},
	
			data: {
				type: Array,
				value: () => { 
					return [ 
						{ value: 0, desc: '???', comparisonValue: 5 },
						{ value: 0, desc: '???', comparisonValue: 5 } ];}
			}
		};
	}

	created() { }
	ready() { }
	attached() { }
	detached() { }
	attributeChanged() { } 
}

Polymer(NumbersPresenter);