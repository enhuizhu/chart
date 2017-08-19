'use strict';

require('./css/style.scss');

window._ = require('lodash');
window.jQuery = require('jquery');
window.d3 = require('d3');

require('bootstrap/dist/js/bootstrap.min.js');
require('angular/angular');

angular.module('chart', []);

//controllers
require('./controllers/main');

//directives
require('./directives/chartInfo');
require('./directives/barChart');
require('./directives/pieChart');