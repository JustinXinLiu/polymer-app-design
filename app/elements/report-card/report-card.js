'use strict';

class ReportCard {
  beforeRegister() {
    this.is = 'report-card';
    
    this.properties = {
      name: {
        type: String
      },

      keyItems: {
        type: Array
      },

      mainFigureValue: {
        type: Number
      },

      mainFigureAbbr: {
        type: String
      },

      mainFigureDesc: {
        type: String
      },

      mainFigureComparisonValue: {
        type: Number
      }
    };
  }

  attached() {
  }

  _multiItemDesign(keyItems) {
    return keyItems.length > 1;
  }

  _singleItemDesign(keyItems) {
    return keyItems.length === 1;
  }
}

Polymer(ReportCard);
