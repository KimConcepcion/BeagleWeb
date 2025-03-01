app.controller('systemMonitorController', function($scope, $interval, BeagleInterface)
{
    console.log('system monitor controller Starting');

    updateCPU = function()
    {
        var cpuUsageData = [
            {
              type: 'indicator',
              mode: 'gauge+number',
              number: { suffix: '%' },
              value: $scope.systemMonitorData.cpu_data.total_cpu_usage,
              gauge: {
                axis: { range: [null, 100], tickwidth: 1, tickcolor: 'lightsteelblue' },
                bar: { color: 'lightsteelblue' },
                bgcolor: 'white',
                borderwidth: 2,
                bordercolor: 'gray',
                threshold: {
                  line: { color: 'red', width: 4 },
                  thickness: 0.75,
                  value: 80
                }
              }
            }
          ];
          
          var cpuUsagelayout = {
            width: 500,
            height: 400,
            paper_bgcolor: '#202727',
            title: 'Total Average Load',
            font: { color: 'lightsteelblue',  family: 'Arial', size: 24 }
          };

        Plotly.react('cpuUsageChart', cpuUsageData, cpuUsagelayout);


    };

    updateCpuCores = function()
    {
        // Loop through CPU cores
        var cpuCoresValues = Object.values($scope.systemMonitorData.cpu_data.cpu_usage_per_core);
        var cpuCoresNames  = Object.keys($scope.systemMonitorData.cpu_data.cpu_usage_per_core);

        for (var idx in cpuCoresNames)
            cpuCoresNames[idx] = 'core' + ' ' + cpuCoresNames[idx];

        var cpuCoresValuesPercent = [];
        for (var idx in cpuCoresValues)
            cpuCoresValuesPercent[idx] = cpuCoresValues[idx] + '%';

        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                x: cpuCoresValues,
                y: cpuCoresNames,
                // text: cpuCoresValues.map(String),
                text: cpuCoresValuesPercent,
                textposition: 'auto',
                textfont: { color: 'darkblue', weight: 100 },
                hoverinfo: 'none',
                type: 'bar',
                orientation: 'h',
                marker: {
                    color: 'lightsteelblue',
                    line: {
                        color: 'darkblue',
                        width: 1.5
                    }
                }
            }
        ];

        var layout = { 
            width: 500, 
            height: 400,
            paper_bgcolor: '#202727',
            xaxis: {visible: false},
            yaxis: {
                title: { font: {size: 20, weight: 50}}
            },
            title: 'CPU Cores Load',
            font: { color: 'lightsteelblue',  family: 'Arial', size: 24 }
        };
        
        Plotly.react('cpuCoresChart', data, layout);
    };

    updateMemory = function()
    {
        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                x: [$scope.systemMonitorData.memory_data.available_memory],
                y: ['Free'],
                type: "bar",
                orientation: 'h'
            }
        ];
        var layout = { width: 400, height: 200};
        Plotly.react('memoryAvailableChart', data, layout);

        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                x: [$scope.systemMonitorData.memory_data.total_memory],
                y: ['Total'],
                type: "bar",
                orientation: 'h'
            }
        ];
        var layout = { width: 400, height: 200};
        Plotly.react('memoryTotalChart', data, layout);

        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                x: [$scope.systemMonitorData.memory_data.used_memory],
                y: ['Used'],
                type: "bar",
                orientation: 'h'
            }
        ];
        var layout = { width: 400, height: 200};
        Plotly.react('memoryUsedChart', data, layout);
    };

    updateStorage = function()
    {
        var data = [
            {
                values: [20, 15],
                labels: ['Total', 'Free'],
                hole: .4,
                type: "pie"
            }
        ];
        var layout = { width: 400, height: 300};
        Plotly.react('storageChart', data, layout);
    };

    // -------------------- PROMISE --------------------
    // Poll every two second
    updateService3000ms = function()
    {
        BeagleInterface.getSystemMonitoringData();
        $scope.live = BeagleInterface.getLive();
        $scope.systemMonitorData = $scope.live.systemMonitorData;

        if ($scope.live.logged_in && Object.keys($scope.systemMonitorData).length != 0 )
        {
            // Update graphs
            // updateCPU();
            // updateCpuCores();
            // updateMemory();
            // updateStorage();
        }
    };
    var pollServicePromise = $interval(updateService3000ms, 3000);

    /**
     * Tear down controller.
     */
    $scope.$on('$destroy', function () {
        if (angular.isDefined(pollServicePromise)) {
            $interval.cancel(pollServicePromise);
            pollServicePromise = undefined;
            console.log("system monitor controller Stopped");
        }
    });
});
