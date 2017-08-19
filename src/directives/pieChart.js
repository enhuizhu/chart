'use strict';

import Color from '../services/color';

class PieChartController {
    constructor($scope, $element) {
        this.$ = $scope;
        
        this.$.size = {
        	width: 300
        };

        this.element = d3.select($element[0]).select('svg');
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
    	this.radius = this.$.size.width / 2;
    	this.padding = 10;
    	
    	this.pie = d3.pie()
    		.sort(null)
    		.value(d => {
    			return d.value;
    		});

    	this.path = d3.arc()
    		.outerRadius(this.radius - this.padding)
    		.innerRadius(this.radius / 2);
    }

    drawChart() {
	    let that = this;

    	const arcTween = function(a) {
		    const i = d3.interpolate(this._current, a);
		    this._current = i(0);
		    
		    return function(t) {
			    return that.path(i(t));
		    };
		};
    	
    	const arcs = this.element.select('.pie')
    		.attr('transform', `translate(${this.$.size.width/2}, ${this.$.size.width/2})`)
    		.selectAll('.arc')
    		.data(this.pie(this.$.config.data))
    		
		arcs
		.enter()
    		.append('path')
    		.attr('class', 'arc')
    		.each(function(d) { 
    			this._current = d; 
    		})
    	.merge(arcs)
    	    .transition()
    	    .duration(1000)	
	    		.attrTween("d", arcTween)
	    		.attr('fill', (d, i) => {
	    			return Color.getColor(i);
	    		});

    	arcs.exit().remove();
    }
}

angular.module('chart').directive('pieChart', function() {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            config: '='
        },
        templateUrl: './src/views/pieChart.html',
        controller: PieChartController,
    }
});