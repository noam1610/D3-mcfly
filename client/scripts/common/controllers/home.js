'use strict';
var controllername = 'home';
var d3 = require('d3');

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$window'];

    function controller($window) {
        var vm = this;
        vm.controllername = fullname;

        vm.width = $window.innerWidth;
        vm.height = $window.innerHeight;

        // vm.selectNumber = function(number) {
        //     switch (number) {
        //         case 1:
        //             // console.log(number)
        //             vm.redrawD3('1', [1]);
        //             break;
        //         case 2:
        //             // console.log(number)
        //             vm.redrawD3('2', [1, 1]);
        //             break;
        //         case 3:
        //             // console.log(number)
        //             vm.redrawD3('3', [1, 1, 1]);
        //             break;
        //         case 4:
        //             // console.log(number)
        //             vm.redrawD3('4', [1, 1, 1, 1]);
        //             break;
        //         case 5:
        //             // console.log(number)
        //             vm.redrawD3('5', [1, 1, 1, 1, 1]);
        //             break;
        //         case 6:
        //             // console.log(number)
        //             vm.redrawD3('6', [1, 1, 1, 1, 1, 1]);
        //             break;

        //     }
        // };
         vm.selectNumber = function(number) {
            switch (number) {
                case 1:
                    // console.log(number)
                    vm.redrawD3('1', [1, 0, 0, 0, 0, 0]);
                    break;
                case 2:
                    // console.log(number)
                    vm.redrawD3('2', [1, 1, 0, 0, 0, 0]);
                    break;
                case 3:
                    // console.log(number)
                    vm.redrawD3('3', [1, 1, 1, 0, 0, 0]);
                    break;
                case 4:
                    // console.log(number)
                    vm.redrawD3('4', [1, 1, 1, 1, 0, 0]);
                    break;
                case 5:
                    // console.log(number)
                    vm.redrawD3('5', [1, 1, 1, 1, 1, 0]);
                    break;
                case 6:
                    // console.log(number)
                    vm.redrawD3('6', [1, 1, 1, 1, 1, 1]);
                    break;

            }
        };

        vm.initiateD3 = function() {
            d3.select('svg').remove();

            vm.MAXwidth = vm.width - 20;
            vm.MAXheight = vm.height / 2.7;
            vm.rayonEXT = Math.min(vm.MAXwidth, vm.MAXheight) / 2;

            vm.svg = d3.select('#test')
                .append('svg')
                .attr('width', vm.MAXwidth)
                .attr('height', vm.MAXheight)
                .append('g');

            vm.color = d3.scale.linear()
                .domain(['0', '1', '2', '3', '4', '5', '6', '7'])
                .range(['#33C1E3', '#FF7E38', '#FF7E38', '#6b486b', '#33C1E3', '#f1124f', '#ff8c00', 'white']);
        };

        vm.drawD3 = function(text, arrayPeople) {

            vm.svg.selectAll("text").remove();
            vm.time = vm.svg.append("text")
                .attr("y", vm.MAXheight / 2)
                .attr("x", vm.MAXwidth / 2 - 40)
                .text(text);

            vm.minute = vm.svg.append("text")
                .attr("y", vm.MAXheight / 2 + 70)
                .attr("x", vm.MAXwidth / 2 - 60)
                .text('min');

            var color = d3.scale.category20();

            // construct default pie laoyut
            var pie = d3.layout.pie().value(function(d) {
                return d;
            }).sort(null);

            // construct arc generator
            var arc = d3.svg.arc()
                .outerRadius(vm.rayonEXT)
                .innerRadius(vm.rayonEXT / 1.35);

            // creates the pie chart container

            vm.g = vm.svg.append('g')
                .attr('transform', function() {
                    if (window.innerWidth >= vm.MAXwidth) vm.shiftWidth = vm.MAXwidth / 2;
                    if (window.innerWidth < vm.MAXwidth) vm.shiftWidth = vm.MAXwidth / 3;
                    return 'translate(' + vm.shiftWidth + ',' + vm.MAXheight / 2 + ')';
                });

            vm.path = vm.g.datum(arrayPeople).selectAll("path")
                .data(pie)
                .enter().append("path")
                .attr("class", "piechart")
                .attr("fill", function(d, i) {
                    return color(i);
                })
                .attr("d", arc)
                .each(function(d) {
                    this._current = d;
                });

        };

        vm.redrawD3 = function(text, arrayPeople) {
            console.log('arrayPeople', arrayPeople);

            vm.time = vm.svg.selectAll('text')
                .attr('y', vm.MAXheight / 2)
                .attr('x', vm.MAXwidth / 2 - 40)
                .text(text);

            vm.minute = vm.svg.append('text')
                .attr('y', vm.MAXheight / 2 + 70)
                .attr('x', vm.MAXwidth / 2 - 60)
                .text('min');

            var pie = d3.layout.pie().value(function(d) {
                return d;
            }).sort(null);

            var arc = d3.svg.arc()
                .outerRadius(vm.rayonEXT)
                .innerRadius(vm.rayonEXT / 1.35);
            // add transition to new path

            //Retirer l'un des élements
            console.log('vm.g.datum(arrayPeople).selectAll()', vm.g.datum(arrayPeople).selectAll('path'));
            //
            vm.data = vm.g.datum(arrayPeople).selectAll('path')[0];
            console.log('vm.data', vm.data);
            console.log('arrayPeople', arrayPeople);
            console.log('arrayPeople.length', arrayPeople.length);
            console.log('vm.data[arrayPeople.length-1]', vm.data[arrayPeople.length - 1]);
            //
            //vm.g.datum(arrayPeople).selectAll('path').remove();
            //

            vm.g.datum(arrayPeople).selectAll('path').data(pie).transition().duration(3000).attrTween('d', arcTween);

            // add any new paths
            vm.g.datum(arrayPeople).selectAll('path')
                .data(pie)
                .enter().append('path')
                .attr('class', 'piechart')
                .attr('fill', function(d, i) {
                    return vm.color(i);
                })
                .attr('d', arc)
                .each(function(d) {
                    this._current = d;
                });

            // Store the displayed angles in _current.
            // Then, interpolate from _current to the new angles.
            // During the transition, _current is updated in-place by d3.interpolate.
            function arcTween(a) {
                var i = d3.interpolate(this._current, a);
                this._current = i(0);
                return function(t) {
                    // console.log('---------------');
                    // console.log('t', t);
                    // console.log('i(t)', i(t));
                    return arc(i(t));
                };
            };
        };

        vm.initiateD3();

        vm.drawD3('4', [1, 1, 1, 1]);
        //------Exercice Cercle dynamique

        // d3.selectAll("div").style("color", function() {
        //     return "hsl(" + Math.random() * 360 + ",100%,50%)";
        // });

        // console.log(d3);
        // d3.selectAll("p").text("Alors qu'est que tu en dis");

        // d3.select("body")
        //     .append("span")
        //     .text('lol')
        //     .style('color', 'blue');

        // // Circles BIS

        // var data = [10, 12, 18, 30, 5, 15, 10, 1];
        // var r = 300;

        // var color = d3.scale.linear()
        //     .domain(['0', '1', '5', '10', '15', '20', '25', '30'])
        //     .range(["white", "#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        // var canvas = d3.select('span')
        //     .append('svg')
        //     .attr('width', 1000)
        //     .attr('height', 1000);

        // var group = canvas.append('g')
        //     .attr('transform', 'translate(300, 300)');

        // var p = 2 * Math.PI;

        // var arc = d3.svg.arc()
        //     .innerRadius(r - r / 2)
        //     .outerRadius(r);

        // var pie = d3.layout.pie()
        //     .value(function(d) {
        //         return d;
        //     });

        // var arcs = group.selectAll('.arc')
        //     .data(pie(data))
        //     .enter()
        //     .append('g')
        //     .attr('class', 'arc');

        // arcs.append('path')
        //     .attr('d', arc)
        //     .attr('fill', function(d) {
        //         return color(d.data / 2);
        //     })
        //     .transition()
        //     .duration(2000)
        //     .delay(200)
        //     .attr('fill', function(d) {
        //         return color(d.data);
        //     });
        // // .on('mouseover', function(d) {
        // //     return 'translate(' + d.data + ',' + d.data + ')';
        // // });

        // arcs.append('text')
        //     .attr('transform', function(d) {
        //         return 'translate(' + arc.centroid(d) + ')';
        //     })
        //     .text(function(d) {
        //         return (d.data);
        //     });

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
