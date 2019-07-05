
var wsUri = "ws://localhost:8080";
var websocket = null;

function debug(message) {
	$("#responseTextArea").prepend(message + "\n");
}

function send() {
	var msg = document.getElementById("inputText").value;
	if ( websocket != null )
	{
		document.getElementById("inputText").value = "";
		websocket.send( msg );
		console.log( "Message sent :", '"'+msg+'"' );
	}
}

function connect() {
	try {
		if (typeof MozWebSocket == 'function')
			WebSocket = MozWebSocket;

		if(websocket == null)
			websocket = new WebSocket( wsUri );

		websocket.onopen = function (evt) {
			debug("CONNECTED");
		};
		websocket.onclose = function (evt) {
			debug("DISCONNECTED");
		};
		websocket.onmessage = function (evt) {
			console.log( "Message received :", evt.data );
			debug( evt.data );
		};
		websocket.onerror = function (evt) {
			debug('ERROR: ' + evt.data);
		};
	} catch (exception) {
		debug('ERROR: ' + exception);
	}
}

function disConnect() {
	if (websocket)
		websocket.close();
	websocket = null;
}

function status() {
	if (websocket != null) {
		var stateStr;
		switch (websocket.readyState) {
			case 0: {
				stateStr = "CONNECTING";
				break;
			}
			case 1: {
				stateStr = "OPEN";
				break;
			}
			case 2: {
				stateStr = "CLOSING";
				break;
			}
			case 3: {
				stateStr = "CLOSED";
				break;
			}
			default: {
				stateStr = "UNKNOW";
				break;
			}
		}
		debug("WebSocket state = " + websocket.readyState + " ( " + stateStr + " )");
	} else {
		debug("WebSocket is not connected.");
	}
} 


$(function() {
	$("#connect").click(function() {
		connect();
	});	

	$("#send").click(function() {
		send();
	});

	$("#disConnect").click(function() {
		disConnect();
	});

	$("#status").click(function() {
		status();
	});

	doWebsocketBrowserSupport();
	
});

function doWebsocketBrowserSupport() {
	if ("WebSocket" in window) {
		document.getElementById("isWebsocketAvailable").innerHTML = 
			document.getElementById("isWebsocketAvailable").innerHTML + "<font color='green'><h2><strong>This browser supports WebSocket.</strong></h2></font>";
	} else {
		document.getElementById("isWebsocketAvailable").innerHTML = 
			document.getElementById("isWebsocketAvailable").innerHTML + "<font color='red'><h2><strong>Sorry! This browser does not supports WebSocket.</strong></h2></font>";
	}
}

