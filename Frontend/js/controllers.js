/* ============ MainView Controller ============ */
app.controller('MainViewController', function($scope, $route, $interval, BeagleInterface) {
    console.log("Main View Controller starting.");

});


/* ============ SystemStatus Controller ============ */
app.controller('SystemStatusController', function($scope, $route, $interval, BeagleInterface) {
    console.log("System Status Controller starting.");

    $scope.updateCnt = 0;

    // Generic graph settings.
    var height   = 400;
    var width    = 600;
    var autosize = false;
    var showLegend = true;
    
    // Colors
    var primary = '#3700b3';
    var variant = '#6200ee';
    var secondary = '#BB86FC';

    addTrace = function(data, pltName, pltType, pltOptions)
    {
        var pltObjKey = Object.keys(pltOptions)[0];
        var trace = {};
        trace['x']    = data['x'];
        trace['y']    = data['y'];
        trace['name'] = pltName;
        trace['type'] = pltType;
        trace[pltObjKey] = pltOptions[pltObjKey];
        return trace;
    };

    addLayout = function(title)
    {
        var layout = {};
        layout['autosize']   = autosize;
        layout['height']     = height;
        layout['width']      = width;
        layout['showLegend'] = showLegend;
        layout['legend']     = {x: 1, xanchor: 'right', y: 1};
        layout['title']      = title;
        return layout;
    };

    // CPU options
    cpuPltOptions = {line: {color: variant}};
    cpuData       = {x: [$scope.updateCnt], y: [Math.random()]};
    cpuTitle      = {text: 'CPU Load'};
    cpuTrace      = addTrace(cpuData, 'CPU Load', 'scatter', cpuPltOptions);
    cpuLayout     = addLayout(cpuTitle);
    // CPU graphs
    $scope.cpuData = [cpuTrace];
    $scope.cpuChartElement = document.getElementById('cpu_chart');
    Plotly.newPlot($scope.cpuChartElement, $scope.cpuData, cpuLayout);

    
    // Memory options
    memoryPltOptions = {marker: {color: variant}};
    memoryData       = {x: ['RAM', 'Heap', 'Swap'], y: [Math.random()]};
    memoryTitle      = {text: 'Memory Usage'};
    memoryTrace      = addTrace(memoryData, 'RAM Usage', 'bar', memoryPltOptions);
    memoryLayout     = addLayout(memoryTitle);
    // Memory graphs
    $scope.memoryData = [memoryTrace];
    $scope.memoryChartElement = document.getElementById('memory_chart');
    Plotly.newPlot($scope.memoryChartElement, $scope.memoryData, memoryLayout);


    // Disk graphs
    $scope.diskChartElement = document.getElementById('disk_chart');
    var disk_trace = 
    {
        values:[ Math.random(), Math.random()],
        labels: ['Free', 'Used'],
        type: 'pie',
        marker: {colors: [variant, secondary]}
    };
    var disk_layout = 
    {
        autosize: false,
        height: height,
        width: width,
        title: {text: 'Disk '}
    };
    $scope.disk_data = [disk_trace];
    Plotly.newPlot($scope.diskChartElement, $scope.disk_data, disk_layout);


    // poll data from Beaglebone.
    pollData = function()
    {
        // Update graphs.
        cpu_new_data = {x:[[ $scope.updateCnt ]], y:[[Math.random()]]};
        memory_new_data = {x:[['RAM', 'Heap', 'Swap']], y:[[Math.random(), Math.random(), Math.random()]]};
        disk_new_data = {labels:[['Free', 'Used']], values:[[Math.random(), Math.random()]]};

        Plotly.extendTraces($scope.cpuChartElement, cpu_new_data, [0]);
        Plotly.extendTraces($scope.memoryChartElement, memory_new_data, [0]);
        Plotly.extendTraces($scope.diskChartElement, disk_new_data, [0]);

        $scope.updateCnt++;
    };

    // Install interval method.
    var updatePeriod = 1000;
    var pollDataPromise = $interval(pollData, updatePeriod);
});


/* ============ PRU Controller ============ */
app.controller('PRUController', function($scope, $route, $interval, BeagleInterface) {
    console.log("PRU Controller starting.");

});


/* ============ HomeSensors Controller ============ */
app.controller('HomeSensorsController', function($scope, $route, $interval, BeagleInterface) {
    console.log("HomeSensors Controller starting.");

});


/* ============ Network Controller ============ */
app.controller('NetworkController', function($scope, $route, $interval, BeagleInterface) {
    console.log("Network Controller starting.");

});
