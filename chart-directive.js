
angular.module('app', []).directive('metrics', function ($http, $log) {
   return {
       require : 'metrics',
       restrict : 'E',
       replace : true,
       scope : {
         metricData : '=?'  
       },
       controller : ['$scope', function ($scope) {
           $scope.changeMetric = function(metric) {
               $scope.$broadcast('current-metric', metric);
           }
           this.setMetrics = function (metrics) {
               $scope.metrics = metrics;
           };
       }],
       link : function (scope, element, attribute, metricController) {
           $log.info("metrics dir");
           scope.$watch('metricData', function(newVal, oldVal) {
               //metricController.currentMetric = newVal[0];
               metricController.setMetrics(newVal);
            }, true);
       },
       templateUrl : 'templates/metricTemplate.html'
   }
}).directive('iapChart', function ($http, $log) {
    return {
        //require: ['iapChart','^metrics'],
        restrict : 'E',
        replace : true,
        /*scope : {
            data : '@',
            chartConfig : '@'
        },*/
        controller : ['$scope', function ($scope) {
            $scope.labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
            $scope.chartData = [[100*Math.random(),  100*Math.random(), 100*Math.random(), 100*Math.random()]];            
            $scope.loadChart = function() {
                this.chartData = [[100*Math.random(),  100*Math.random(), 100*Math.random(), 100*Math.random()]];
            };
            $scope.colours = [{ // default
              "fillColor": "rgba(0, 180, 0, 0.5)",
              "strokeColor": "rgba(0, 180, 0, 1)",
              "pointColor": "rgba(220,0,0,1)",
              "pointStrokeColor": "#fff",
              "pointHighlightFill": "#fff",
              "pointHighlightStroke": "rgba(151,187,205,0.8)"
            }];
            $scope.$on('current-metric', function(e, currentMetric) {
                $log.info(currentMetric);
                $scope.loadChart();
            });
       }],
       link : function (scope, element, attribute, chartController) {
           $log.info("chart dir");
       },
       templateUrl : 'templates/chartTemplate.html'
    }
});