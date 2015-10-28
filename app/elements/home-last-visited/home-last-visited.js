class HomeLastVisited {
	beforeRegister() {
		this.is = 'home-last-visited';
		this.properties = {
			module: {
				type: Object
			},
			report: {
				type: Object
			}
		};
	}

	ready() { 
		this.module = { name: 'module 1', numberOfReports: 10, 
			desc: 'The description of this module will be displayed inside this box' };
		
		this.report = { name: 'awesome report', mainFigureValue: 34, mainFigureAbbr: 'B',
			mainFigureDesc: 'This Week', mainFigureComparisonValue: 12 };
	
		this.section = { name: 'section 1', mainFigureValue: 34, mainFigureAbbr: 'B',
			mainFigureDesc: 'This Week', mainFigureComparisonValue: 12 };	
	}
	
	_onModuleTap() {
		app.pageAnimationForward();
		page(`/${this.module.name}`);
	}
	
	_onReportTap() {
		app.pageAnimationForward();
		page('/sections');
	}
	
	_onSectionTap() {
		app.pageAnimationForward();
		page('/');
	}
}

Polymer(HomeLastVisited);