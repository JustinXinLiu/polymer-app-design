class NumbersPresenter {
	beforeRegister() {
		this.is = 'numbers-presenter';
		this.properties = {
			name: {
				type: String
			},
	
			numberData: {
				type: Array
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