'use strict';

class SecondaryHeading {
  beforeRegister() {
    this.is = 'secondary-heading';

    this.properties = {
      name: {
        type: String
      },

      first: {
        reflectToAttribute: true,
        type: Boolean
      }
    };
  }

  created() { }
  ready() { }
  attached() { }
  detached() { }
  attributeChanged() { }
}

Polymer(SecondaryHeading);
