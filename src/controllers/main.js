'use strict';

class main {
    constructor($scope) {
        this.$ = $scope;        
        
        this.$.chartConfig = {
            svgSize: {
                width: 400,
                height: 300 
            },
            
            data: [
                {name: 'Company A', value: 131},
                {name: 'Company B', value: 74},
                {name: 'Company C', value: 97}
            ]
        };


        this.$.dataStr = JSON.stringify(this.$.chartConfig.data);
    }

    update() {
        this.$.chartConfig.data = JSON.parse(this.$.dataStr);
    }
}

angular.module('chart').controller('main', ['$scope', main]);