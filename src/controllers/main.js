'use strict';

class Main {
    constructor($scope) {
        this.$ = $scope;
        this.$.msg = 'hello, the world!';
        
        this.$.barChartConfig = {
            svgSize: {
                width: 600,
                height: 300 
            },
            
            data: [
                {name: 'a', value: 10}
                {name: 'b', value: 20}
                {name: 'c', value: 30}
            ]
        };

        this.init();
    }

    init() {
        console.log('init has been called');
    }
}

angular.module('chart').controller('main', Main);