'use strict';

class ValueCardChart {
  beforeRegister() {
    this.is = 'value-card-chart';

    this.properties = {
      name: {
        type: String
      },

      type: {
        type: String
      },

      chartData: {
        type: Array
      },

      numberData: {
        type: Array
      }
    };
  }

  attached() {
  }

  _line(type) {
    return type === 'line';
  }

  _bar(type) {
    return type === 'bar';
  }
}

Polymer(ValueCardChart);
