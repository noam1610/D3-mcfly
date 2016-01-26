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

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
