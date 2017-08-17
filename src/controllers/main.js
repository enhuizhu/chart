'use strict';

class Main {
    constructor($scope) {
        this.$ = $scope;        
        
        this.$.barChartConfig = {
            svgSize: {
                width: 600,
                height: 300 
            },
            
            data: [
                {name: 'Company A', value: 131},
                {name: 'Company B', value: 74},
                {name: 'Company C', value: 97}
            ]
        };


        this.$.dataStr = JSON.stringify(this.$.barChartConfig.data);
    }

    update() {
        this.$.barChartConfig.data = JSON.parse(this.$.dataStr);
    }
}

angular.module('chart').controller('main', Main);