class ValueCardNumber {
  beforeRegister() {
    this.is = 'value-card-number';
    
    this.properties = {
      name: {
        type: String
      },

      data: {
        type: Array
      }
    };
  }

  created() { }
  ready() { }
  attached() { }
  detached() { }
  attributeChanged() { }
}

Polymer(ValueCardNumber);
