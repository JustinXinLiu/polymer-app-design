class ModuleCard {
	beforeRegister() {
		this.is = 'module-card';
		this.properties = {
			name: {
				type: String
			},

			numberOfReports: {
				type: Number
			},
			
			desc: {
				type: String
			}
		};
	}

	created() { }
	ready() { }
	attached() { }
	detached() { }
	attributeChanged() { }
}

Polymer(ModuleCard);