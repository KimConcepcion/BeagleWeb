app.controller('MainViewController', function($scope, $route, $interval) {
    console.log("Main View Controller starting.");

});

app.controller('SystemStatusController', function($scope, $route, $interval) {
    console.log("System Status Controller starting.");


    // CPU graphs
    $scope.cpuChartElement = document.getElementById('cpu_chart');
    var cpu_trace = {
        y:[ Math.random() ],
        name: 'CPU Load',
        type: 'scatter',
        line: {
            color: 'rgb(219, 64, 82)'
        }
    };
    var cpu_layout = {
        showLegend: true,
        legend: {
            x: 1, 
            xanchor: 'right', 
            y: 1},
        title: {
            text: 'CPU Load' 
        }
    };

    $scope.cpu_data = [cpu_trace];
    Plotly.newPlot($scope.cpuChartElement, $scope.cpu_data, cpu_layout);

    // Memory graphs
    $scope.memoryChartElement = document.getElementById('memory_chart');
    var memory_trace = {
        y:[Math.random()],
        name: 'RAM Usage',
        type: 'scatter'
    };
    var memory_layout = {
        showLegend: true,
        legend: {
            x: 1,
            xanchor: 'right',
            y: 1
        },
        title: {
            text: 'RAM Usage'
        }
    };

    $scope.memory_data = [memory_trace];
    Plotly.newPlot($scope.memoryChartElement, $scope.memory_data, memory_layout);


    // poll system data from Beaglebone.
    pollData = function()
    {
        // Update graphs.
        cpu_new_data = {y:[[ Math.random() ]]};
        memory_new_data = {y:[[ Math.random() ]]};

        Plotly.extendTraces($scope.cpuChartElement, cpu_new_data, [0]);
        Plotly.extendTraces($scope.memoryChartElement, memory_new_data, [0]);
    };

    // Install interval method.
    var updatePeriod = 1000;
    var pollDataPromise = $interval(pollData, updatePeriod);
});