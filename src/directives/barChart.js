'use strict';

class BarChartController {
    constructor($scope, $element) {
        this.$ = $scope;
        this.element = d3.select($element[0]);
        this.margin = 20;
        this.setUpEnvironment();
    }

    setUpEnvironment() {
        //set up scale, axis
        this.xScale = d3.scaleLinear()
            .domain([0, this.$.config.data.length])
            .range([this.margin, this.$.config.svgSize.width - this.margin]);
        
        this.xAxis = d3.axisBottom(this.xScale)
            .ticks(3)
            .tickFormat(d => {
                return 'a';
            });

        this.yScale = d3.scaleLinear()
            .domain([0, d3.max(this.$.config.data.map(v => return v.value))])
            .range(this.margin, this.$config.svgSize.height - this.margin);

        this.yAxis = d3.axi

        this.drawXAxis();
    }

    drawXAxis() {
        const transFormValue = this.$.config.svgSize.height - this.margin;
        
        this.element
            .select('.x.axis')
            .attr("transform", `translate(0,${transFormValue})`)
            .call(this.xAxis);
    }
}

angular.module('chart').directive('barChart', function() {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            config: '='
        },
        
        templateUrl: './src/views/barChart.html',
        
        controller: BarChartController,
        
        link: function(scope, element, attr) {
                
        }
    }
});