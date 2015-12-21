class ModuleMenuItem {
  beforeRegister() {
    this.is = 'module-menu-item';

    this.properties = {
      content: {
        type: String
      },

      route: {
        type: String
      },

      path: {
        type: String
      },

      numberOfReports: {
        type: Number
      }
    };
  }

  created() { }
  ready() { }
  attached() { }
  detached() { }
  attributeChanged() { }
}

Polymer(ModuleMenuItem);
