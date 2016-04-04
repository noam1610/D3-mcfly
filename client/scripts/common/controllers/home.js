'use strict';
var controllername = 'home';
var d3 = require('d3');

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = [];

    function controller() {
        var vm = this;
        vm.controllername = fullname;
        d3.selectAll("div").style("color", function() {
            return "hsl(" + Math.random() * 360 + ",100%,50%)";
        });

        console.log(d3);
        d3.selectAll("p").text("Alors qu'est que tu en dis");

        d3.select("body")
            .append("span")
            .text('lol')
            .style('color', 'blue');

        // Circles BIS

        var data = [10, 12, 18, 30, 5, 15, 10, 1];
        var r = 300;

        var color = d3.scale.linear()
            .domain(['0', '1', '5', '10', '15', '20', '25', '30'])
            .range(["white", "#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        var canvas = d3.select('span')
            .append('svg')
            .attr('width', 1000)
            .attr('height', 1000);

        var group = canvas.append('g')
            .attr('transform', 'translate(300, 300)');

        var p = 2 * Math.PI;

        var arc = d3.svg.arc()
            .innerRadius(r - r / 2)
            .outerRadius(r);

        var pie = d3.layout.pie()
            .value(function(d) {
                return d;
            });

        var arcs = group.selectAll('.arc')
            .data(pie(data))
            .enter()
            .append('g')
            .attr('class', 'arc');

        arcs.append('path')
            .attr('d', arc)
            .attr('fill', function(d) {
                return color(d.data / 2);
            })
            .transition()
            .duration(2000)
            .delay(200)
            .attr('fill', function(d) {
                return color(d.data);
            });
        // .on('mouseover', function(d) {
        //     return 'translate(' + d.data + ',' + d.data + ')';
        // });

        arcs.append('text')
            .attr('transform', function(d) {
                return 'translate(' + arc.centroid(d) + ')';
            })
            .text(function(d) {
                return (d.data);
            });

        //-------Circles-------
        // var canvas = d3.select('span')
        //     .append('svg')
        //     .attr('width', 500)
        //     .attr('height', 500);

        // var group = canvas.append('g')
        //     .attr('transform', 'translate(100, 100)');

        // var r = 100;

        // var p = 2 * Math.PI;

        // var arc = d3.svg.arc()
        //     .innerRadius(r - 20)
        //     .outerRadius(r)
        //     .startAngle(p/4)
        //     .endAngle(p/2);

        // group.append('path')
        //     .attr('d', arc);

        //-----------Path
        // var canvas = d3.select('span')
        //     .append('svg')
        //     .attr('width', 500)
        //     .attr('height', 500);
        // var data = [{
        //     x: 10,
        //     y: 10
        // }, {
        //     x: 10,
        //     y: 100
        // }, {
        //     x: 100,
        //     y: 100
        // },{
        //     x: 100,
        //     y: 10
        // }];

        // var line = d3.svg.line()
        //     .x(function(d){return d.x})
        //     .y(function(d){return d.y});

        // var group = canvas.append('g')
        //             .attr('transform', 'translate(100, 100)');

        // group.selectAll('path')
        //     .data([data])
        //     .enter()
        //     .append("path")
        //     .attr("d", line);

        //--------transition

        // var canvas = d3.select('span')
 //     .append('svg')
 //     .attr('width', 500)
 //     .attr('height', 500)
 //     .append('g');

 // var circle = canvas.append("circle")
 //     .attr('cx', 100)
 //     .attr('cy', 100)
 //     .attr('r', 50);

        // circle.transition()
        //     .duration(2000)
        //     .delay(2000)
        //     .attr('cx', 400)
        //     .transition()
        //     .duration(2000)
        //     .attr('cy', 400)
        //     .transition()
        //     .duration(2000)
        //     .attr('cx', 100)
        //     .transition()
        //     .duration(2000)
        //     .attr('cy', 100);

        //--------------------------

        // var widthScale = d3.scale.linear()
        //     .domain([0, 10])
        //     .range([0, 100]);

        // var axis = d3.svg.axis()
        //     .scale(widthScale);

        // var color = d3.scale.linear()
        //     .domain([0, 100])
        //     .range(['white', 'red']);

        // var canvas = d3.select('span')
        //     .append('svg')
        //     .attr('width', 500)
        //     .attr('height', 500)
        //     .append('g')
        //     .attr('transform', 'translate(100, 0)')
        //     .call(axis);

        // var data = [20, 30, 40, 100];

        // var bars = canvas.selectAll("rect")
        //     .data(data)
        //     .enter()
        //     .append('rect')
        //     .attr('width', function(d) {
        //         return d;
        //     })
        //     .attr('height', 50)
        //     .attr('y', function(d, index) {
        //         return index * 100;

        //     })
        //     .attr('fill', function(d) {
        //         return color(d);
        //     });

        // console.log(d3);

        // var circle = canvas.append("circle")
        //     .attr('cx', 100)
        //     .attr('cy', 100)
        //     .attr('r', 100);

        // var rect = canvas.append("rect")
        //     .attr('width', 100)
        //     .attr('height', 100)
        //     .attr('fill', 'red');

        // var line = canvas.append('line')
        //     .attr('x1', 40)
        //     .attr('y1', 100)
        //     .attr('x2', 240)
        //     .attr('y2', 140)
        //     .attr('stroke', 'green')
        //     .attr('stroke-width', 10);
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
