'use strict';

class DataGrid {
  beforeRegister() {
    this.is = 'data-grid';
    this.properties = {
      name: {
        type: String
      }
    };
  }
}

Polymer(DataGrid);
