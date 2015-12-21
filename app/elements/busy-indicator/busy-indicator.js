class BusyIndicator {
  beforeRegister() {
    this.is = 'busy-indicator';
    
    this.properties = {
      active: {
        type: Boolean,
        reflectToAttribute: true
      }
    };
  }

  _onCancelTap() {
    this.async(() => this.active = false, 200);
  }
}

Polymer(BusyIndicator);
