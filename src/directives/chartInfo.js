'use strict';

import Color from '../services/color';

class ChartInfoController {
    constructor($scope, $element) {
        this.$ = $scope;
        this.$.color = Color;
        this.element = d3.select($element[0]);
    }
}

angular.module('chart').directive('chartInfo', function() {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            data: '='
        },
        templateUrl: './src/views/chartInfo.html',
        controller: ChartInfoController
    }
});
