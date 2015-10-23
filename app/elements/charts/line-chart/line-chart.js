/* global Chart */

class LineChart {
    beforeRegister() {
        this.is = 'line-chart';
        this.properties = {
            values: {
                type: Array,
                value: function () { return []; },
                observer: 'update'
            },

            labels: {
                type: Array,
                value: function () { return []; },
                observer: 'update'
            },

            colors: {
                type: Array,
                value: ['217, 194, 117', '68, 178, 161'],
                observer: 'update'
            }
        };
    }

    attached() {
        if (this.values === null || this.labels === null || this.colors === null) {
            return;
        }

        if (this.chart) {
            this.chart.destroy();
        }

        //console.log('values: ' + this.values);
        //console.log('labels: ' + this.labels);
        //console.log('colors: ' + this.colors);

        this.datasets = [];

        this.values.forEach(function (val, i) {
            this.datasets.push({
                fillColor: `rgba${this.colors[i]}, 0.6)`,
                strokeColor: `rgba${this.colors[i]}, 0.8)`,
                pointColor: '#fff',
                pointStrokeColor: `rgba${this.colors[i]}, 1)`,
                pointHighlightFill: `rgba${this.colors[i]}, 1)`,
                pointHighlightStroke: '#fff',
                data: this.values[i]
            });
        }, this);

        this.data = { labels: this.labels, datasets: this.datasets };

        this.ctx = this.$.canvas.getContext('2d');

        this.options = {
            responsive: true,
            maintainAspectRatio: false,

            showScale: false,
            scaleLineColor: 'rgba(255, 255, 255, 0.2)',
            scaleFontColor: 'rgba(255, 255, 255, 0.4)',

            tooltipFillColor: 'rgba(0, 0, 0, 0.8)',
            tooltipCornerRadius: 8,
            tooltipTitleFontStyle: 'normal',
            tooltipYPadding: 16,
            tooltipXPadding: 24,
            tooltipTitleFontFamily: '"Roboto", "San Francisco", "Helvetica Neue", Helvetica, Arial, sans-serif',

            pointDotRadius: 5,
            pointDotStrokeWidth: 3,
            datasetStrokeWidth: 3,
        };

        this.chart = new Chart(this.ctx).Line(this.data, this.options); // jshint ignore: line

        this.async(() => this.resize(), 2000);
        this.async(() => this.update(), 3000);
    }

    resize() {
        this.chart.resize(this.chart.render, true);
    }

    update() {
        if (this.chart) {
            this.chart.datasets[0].points[1].value = 50;
            //console.log('value: ' + this.chart.datasets[0].points[1].value);
            this.chart.update();
        }
    }
}

Polymer(LineChart);