class WheelMenuButton {
	get listeners() {
		return { 'iron-select': '_onIronSelect' };
	}
	
	beforeRegister() {
		this.is = 'wheel-menu-button';
		
		this.properties = {	
			opened: {
				type: Boolean,
				notify: true,
				observer: '_openedChanged'				
			},
			
			openAnimationConfig: {
				type: Array,
				value: function() {
					return [{
					name: 'fade-in-animation',
					timing: {
						delay: 100,
						duration: 200
					}}];
				}
			},
			
			closeAnimationConfig: {
				type: Array,
				value: function() {
					return [{
					name: 'fade-out-animation',
					timing: {
						duration: 150
					}}];
				}
			}
		};
	}

	created() { }
	ready() { }
	attached() { }
	
	_openedChanged(opened) {
		if (opened) {
			this.fire('paper-dropdown-open');
		}
		else {
			this.fire('paper-dropdown-close');
		}
	}
	
	open() {
		this.$.dropdown.open();
	}
	
	close() {
		this.$.dropdown.close();
	}
	
	_onTriggerOnTap() {
		this.open();
	}
	
	_onTriggerOffTap() {
		this.close();
	}
	
	_onIronSelect() {
		this.close();
	}
}

Polymer(WheelMenuButton);