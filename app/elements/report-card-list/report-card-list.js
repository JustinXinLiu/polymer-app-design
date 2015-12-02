/* global page */
/* global app */

let CompositeBehavior = [
	Polymer.NeonAnimationRunnerBehavior,
	Polymer.NeonPageBehavior
];

class ReportCardList {
	get behaviors() {
		return this._behaviors || (this._behaviors = [CompositeBehavior]);
	}
	
	set behaviors(behaviors) {
		this._behaviors = behaviors;
	}

	get listeners() {
		return {
			'entry-animation-start': '_onEntryStart',
			'entry-animation-finish': '_onEntryFinish',
			'exit-animation-start': '_onExitStart',
			'exit-animation-finish': '_onExitFinish',
			'neon-animation-finish': '_onNeonAnimationFinish'
		};
	}

	beforeRegister() {
		this.is = 'report-card-list';

		this.properties = {
			cards: {
				type: Array
			},

			animationConfig: {
				value: function () {
					return {
						'fade': {
							name: 'fade-in-animation',
							node: this
						}
					};
				}
			}
		};

		// this.listeners = {
		// 	'entry-animation-start': '_onEntryStart',
		// 	'entry-animation-finish': '_onEntryFinish',
		// 	'exit-animation-start': '_onExitStart',
		// 	'exit-animation-finish': '_onExitFinish',
		// 	'neon-animation-finish': '_onNeonAnimationFinish'
		// };
	}

	attached() {
		var keyItems1 = [{ abbr: 'L', desc: 'Weekly Lending outstanding', good: 'good' }, { abbr: 'D', desc: 'Weekly Deposite outstanding', good: 'bad' }, { abbr: 'F', desc: 'Weekly FUM outstanding', good: 'good' }, { abbr: 'I', desc: 'Weekly Insurance outstanding', good: 'good' }];
		var keyItems2 = [{ abbr: 'L', desc: 'Weekly Lending outstanding', good: '' }, { abbr: 'D', desc: 'Weekly Deposite outstanding', good: 'bad' }, { abbr: 'I', desc: 'Weekly Insurance outstanding', good: 'bad' }];
		var keyItems3 = [{ abbr: 'A', desc: 'Weekly Lending outstanding', good: 'good' }];
		var keyItems4 = [{ abbr: 'V', desc: 'Weekly Lending outstanding', good: 'bad' }, { abbr: 'C', desc: 'Weekly Deposite outstanding', good: '' }, { abbr: 'F', desc: 'Weekly FUM outstanding', good: 'good' }, { abbr: 'I', desc: 'Weekly Insurance outstanding', good: 'bad' }];
		var keyItems5 = [{ abbr: 'P', desc: 'Weekly Lending outstanding', good: 'good' }, { abbr: 'K', desc: 'Weekly Deposite outstanding', good: 'bad' }, { abbr: 'F', desc: 'Weekly FUM outstanding', good: 'good' }];
		var keyItems6 = [{ abbr: 'L', desc: 'Weekly Lending outstanding', good: 'bad' }, { abbr: 'D', desc: 'Weekly Deposite outstanding', good: 'bad' }];

		this.cards = [
			{ name: 'awesome report', 'mainFigureValue': 37, 'mainFigureAbbr': 'V', 'mainFigureDesc': 'This Week', 'mainFigureComparisonValue': 60, keyItems: keyItems1 },
			{ name: 'Some random report', 'mainFigureValue': 12, 'mainFigureAbbr': 'L', 'mainFigureDesc': 'This Week', 'mainFigureComparisonValue': 30, keyItems: keyItems2 },
			{ name: 'Another awesome report', 'mainFigureValue': 3, 'mainFigureAbbr': 'K', 'mainFigureDesc': 'This Week', 'mainFigureComparisonValue': 40, keyItems: keyItems3 },
			{ name: 'Another report', 'mainFigureValue': -10, 'mainFigureAbbr': 'K', 'mainFigureDesc': 'This Week', 'mainFigureComparisonValue': 70, keyItems: keyItems4 },
			{ name: 'Failed report', 'mainFigureValue': 7, 'mainFigureAbbr': 'Y', 'mainFigureDesc': 'This Week', 'mainFigureComparisonValue': 20, keyItems: keyItems5 },
			{ name: 'Final report', 'mainFigureValue': 23, 'mainFigureAbbr': 'O', 'mainFigureDesc': 'This Week', 'mainFigureComparisonValue': 10, keyItems: keyItems6 },
		];

		// this.async(() => this.playAnimation('fade'), 3000);
	}

	_onEntryStart(e) {
		console.log(e + ' entry animation starts');
	}

	_onEntryFinish(e) {
		// this.async(() => app.showBusyIndicator(), 3000);

		console.log(e + ' entry animation finished');
	}

	_onExitStart(e) {
		console.log(e + ' exit animation starts');
	}

	_onExitFinish(e) {
		console.log(e + ' exit animation finished');
	}

	_onCardTap(e) {
		app.pageAnimationForward();

		let item = this.$.cards.itemForElement(e.target);
		page(`${page.current}/${item.name}`);
	}

	_onNeonAnimationFinish(e, animation) {
		console.log('finished!' + e + animation);
	}
}

Polymer(ReportCardList);