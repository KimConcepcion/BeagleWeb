app.factory('BeagleInterface', function($interval, $location) 
{
    console.log("Starting BeagleInterface.");

    // Handle websocket connection
    var ws = new WebSocket("ws://192.168.1.10:8888/websocket");

    ws.onopen = function() 
    {
        console.log("Websocket connection opened");
        ws.send("Hello my cold friend");
    };

    ws.onmessage = function(evt) 
    {
        console.log("Message received on websocket: " + evt.data);
    };

    ws.onclose = function() 
    {
        console.log("Websocket connection closed");
    };

    // ----- Websocket update
    websocketUpdater = function()
    {
        
    }

    websocketUpdater();
    websocketUpdaterPromise = $interval(websocketUpdater, 500);

    var data = {
        systemMonitorData : {}
    };

    // Returned factory object
    return {
        getLive: function() {
            return data;
        },
    
        getSystemMonitoringData: function() {
            ws.send("GetSystemMonitoringData");
        }
    };
});
