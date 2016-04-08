var app = angular.module('myApp', ['chart.js', 'app']);

app.controller("myController",[function () {
    this.metricList1 = ["Metric 1", "Metric 2", "Metric 3"];
    this.metricList2 = ["Metric 4", "Metric 5", "Metric 6", "Metric 7"];
}]);