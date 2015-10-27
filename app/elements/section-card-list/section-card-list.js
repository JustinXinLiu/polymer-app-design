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
			{ 'name': 'awesome report', 'mainFigureValue': 37, 'mainFigureAbbr': 'V', 'mainFigureDesc': 'This Week', 'mainFigureComparisonValue': 60 }, 
			{ 'name': 'Some random report', 'mainFigureValue': 12, 'mainFigureAbbr': 'L', 'mainFigureDesc': 'This Week', 'mainFigureComparisonValue': 30 }, 
			{ 'name': 'Another awesome report', 'mainFigureValue': 3, 'mainFigureAbbr': 'K', 'mainFigureDesc': 'This Week', 'mainFigureComparisonValue': 40 },
			{ 'name': 'Another report', 'mainFigureValue': -10, 'mainFigureAbbr': 'K', 'mainFigureDesc': 'This Week', 'mainFigureComparisonValue': 70 }, 
			{ 'name': 'Failed report', 'mainFigureValue': 7, 'mainFigureAbbr': 'Y', 'mainFigureDesc': 'This Week', 'mainFigureComparisonValue': 20 }, 
			{ 'name': 'Final report', 'mainFigureValue': 23, 'mainFigureAbbr': 'O', 'mainFigureDesc': 'This Week', 'mainFigureComparisonValue': 10 },  
		];
	}

	detached() { }
	attributeChanged() { }
	
	_onCardTap(e) {
		app.pageAnimationForward();

		var item = this.$.cards.itemForElement(e.target);
		page(`${page.current}/${item.name}`);
	}
	
	_onNameChange(newValue) {
		console.log('name changed: ' + newValue);
	}
}

Polymer(SectionCardList);