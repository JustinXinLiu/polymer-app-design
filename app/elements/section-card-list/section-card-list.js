class SectionCardList {
	beforeRegister() {
		this.is = 'section-card-list';
		this.properties = {
			name: {
				type: String,
				observer: '_onNameChange'
			},
			
			cards: {
				type: Array
			}
		};
	}

	created() { }
	ready() { }

	attached() {
		this.cards = [
			{ 'name': 'section 1', 'mainFigureValue': 37, 'mainFigureAbbr': 'V', 'mainFigureDesc': 'This Week', 'mainFigureComparisonValue': 60 }, 
			{ 'name': 'section 2', 'mainFigureValue': 12, 'mainFigureAbbr': 'L', 'mainFigureDesc': 'This Week', 'mainFigureComparisonValue': 30 }, 
			{ 'name': 'section 3', 'mainFigureValue': 3, 'mainFigureAbbr': 'K', 'mainFigureDesc': 'This Week', 'mainFigureComparisonValue': 40 },
			{ 'name': 'section 4', 'mainFigureValue': -10, 'mainFigureAbbr': 'K', 'mainFigureDesc': 'This Week', 'mainFigureComparisonValue': 70 }, 
			{ 'name': 'section 5', 'mainFigureValue': 7, 'mainFigureAbbr': 'Y', 'mainFigureDesc': 'This Week', 'mainFigureComparisonValue': 20 }, 
			{ 'name': 'section 6', 'mainFigureValue': 23, 'mainFigureAbbr': 'O', 'mainFigureDesc': 'This Week', 'mainFigureComparisonValue': 10 },  
		];
	}

	detached() { }
	attributeChanged() { }
	
	_onCardTap(e) {
		app.pageAnimationForward();

		let item = this.$.cards.itemForElement(e.target);
		page(`${page.current}/${item.name}`);
	}
	
	_onNameChange(newValue) {
		console.log('name changed: ' + newValue);
	}
}

Polymer(SectionCardList);