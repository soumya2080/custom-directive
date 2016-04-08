angular.module('app').directive('metrics', function ($http, $log) {
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
           scope.$watch('metricData', function(newVal, oldVal) {
               //metricController.currentMetric = newVal[0];
               metricController.setMetrics(newVal);
            }, true);
       },
       templateUrl : 'templates/metricTemplate.html'
   }
});

angular.module('app').directive('iapChart', function ($http, $log) {
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
            $scope.$on('current-metric', function(e, currentMetric) {
                $log.info(currentMetric);
                $scope.loadChart();
            });
       }],
       /*link : function (scope, element, attribute, chartController) {
           
       },*/
       templateUrl : 'templates/chartTemplate.html'
    }
});