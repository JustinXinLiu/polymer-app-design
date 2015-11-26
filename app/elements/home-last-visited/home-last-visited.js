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
		
		var keyItems1 = [{ abbr: 'L', desc: 'Weekly Lending outstanding', good: 'good' }, { abbr: 'D', desc: 'Weekly Deposite outstanding', good: 'bad' }, { abbr: 'F', desc: 'Weekly FUM outstanding', good: 'good' }, { abbr: 'I', desc: 'Weekly Insurance outstanding', good: 'good' }];
		this.report = { name: 'awesome report', keyItems: keyItems1, mainFigureValue: 34, mainFigureAbbr: 'B',
			mainFigureDesc: 'This Week', mainFigureComparisonValue: 12 };
	
		this.section = { name: 'section 1', mainFigureValue: 34, mainFigureAbbr: 'B',
			mainFigureDesc: 'This Week', mainFigureComparisonValue: 12 };	
	}
	
	_onModuleTap() {
		app.pageAnimationForward();
		
		page(`/${this.module.name}`);
	}
	
	_onReportTap() {
		// app.pageAnimationForward();
		// 
		// page(`${page.current}/${this.report.name}`);
	}
	
	_onSectionTap() {
		// app.pageAnimationForward();
		// 
		// page(`${page.current}/${this.section.name}`);
	}
}

Polymer(HomeLastVisited);