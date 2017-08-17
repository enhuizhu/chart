'use strict';

class BarChartController {
    constructor($scope, $element) {
        this.$ = $scope;
        this.element = d3.select($element[0]);
        this.margin = 20;
        this.barWidth = 20;
        this.setUpWatcher();
        this.setUpEnvironment();
        this.drawChart();
    }

    setUpWatcher() {
        this.$.$watch('config.data', (newV, oldV) => {
            if (!_.isEmpty(newV)) {
               this.setUpEnvironment();
               this.drawChart(); 
            }
        });
    }

    setUpEnvironment() {
        //set up scale, axis
        this.xScale = d3.scaleLinear()
            .domain([0, this.$.config.data.length + 1])
            .range([this.margin, this.$.config.svgSize.width - this.margin]);
        
        const tickValues = this.$.config.data.map(v => {
            return v.name;
        });
        
        this.xAxis = d3.axisBottom(this.xScale)
            .ticks(this.$.config.data.length)
            .tickFormat(d => {                
                if (d > 0) {
                    return tickValues[d - 1]
                }

                return '';
            });

        const maxData = d3.max(this.$.config.data.map(v => {return v.value;}));
        
        this.yScale = d3.scaleLinear()
            .domain([0, maxData])
            .range([this.margin, this.$.config.svgSize.height - this.margin]);

        this.yAxis = d3.axisLeft(this.yScale)
            .tickFormat(d => {
                return maxData - d;
            });
    }

    drawChart() {
        this.drawXAxis();
        this.drawYAxis();
        this.drawBars();
    }

    drawXAxis() {
        const transFormValue = this.$.config.svgSize.height - this.margin;
        
        this.element
            .select('.x.axis')
            .attr("transform", `translate(0,${transFormValue})`)
            .call(this.xAxis);
    }

    drawYAxis() {
        const transFormValue = this.margin;
        
        this.element
            .select('.y.axis')
            .attr('transform', `translate(${transFormValue}, 0)`)
            .call(this.yAxis);
    }

    drawBars() {
       const reacts =  this.element
            .select('.rects')
            .selectAll('rect')
            .data(this.$.config.data);

       const setHeight = (d, i) => {
           return this.yScale(d.value) - this.margin;
       };

       const setX = (d, i) => {
           return this.xScale(i + 1) - this.barWidth / 2;           
       };

       const setY = (d, i) => {
           return this.$.config.svgSize.height - this.yScale(d.value);
       };
            
       reacts.enter()
           .append('rect')
           .attr('width', this.barWidth)
           .attr('fill', '#03a9f4')
           .attr('y', () => {return this.$.config.svgSize.height - this.margin})
       .merge(reacts)
           .attr('x', setX)
           .transition()
           .duration(1000)
           .attr('y', setY)   
           .attr('height', setHeight);
        
       reacts.exit().remove();
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