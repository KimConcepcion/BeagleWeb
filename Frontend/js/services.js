app.factory('BeagleInterface', function($interval, $location) {
    console.log("Starting BeagleInterface.");

    // Handle websocket connection
    var ws = new WebSocket("ws://10.20.0.10:8888/websocket");

    ws.onopen = function() {
        console.log("Websocket connection opened");
        ws.send("Hello my cold friend");
    };

    ws.onmessage = function(evt) {
        console.log("Message received on websocket: " + evt.data);
    };

    // ws.onclose = function() {
    //     console.log("Websocket connection closed");
    // };

    // test = function() {
    //     console.log("test...");
    // }
    // testPromise = $interval(test, 1000);

    return 0;
});
