class SectionCard {
	beforeRegister() {
		this.is = 'section-card';
		this.properties = {
			name: {
				type: String
			},
			
			chartData: {
				type: Array
			},
			
			numberData: {
				type: Array
			}
		};
	}

	attached() {
	}
}

Polymer(SectionCard);