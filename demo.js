
var client; 

 

function startConnect() {

    var clientID = "clientID-" + parseInt(Math.random() * 100);

    var host = document.getElementById("host").value.trim();

    var port = parseInt(document.getElementById("port").value);

    var userId = document.getElementById("username").value;

    var password = document.getElementById("password").value;

 

    

    if (host === "" || isNaN(port)) {

        alert("Please enter a valid MQTT broker hostname or IP address and port.");

        return;

    }

 

    // Create an MQTT client instance

    client = new Paho.MQTT.Client(host, port, clientID);

 

    // Set callback functions

    client.onConnectionLost = onConnectionLost;

    client.onMessageArrived = onMessageArrived;

 

   

    var connectOptions = {

        onSuccess: onConnect,

        userName: userId,

        password: password

    };

 



    client.connect(connectOptions);

}

 

function onConnect() {

    var topic = document.getElementById("topic_s").value;

    document.getElementById("messages").innerHTML += "<span>Subscribing to topic " + topic + "</span><br>";

    client.subscribe(topic);

}

 

function onConnectionLost(responseObject) {

    if (responseObject.errorCode !== 0) {

        document.getElementById("messages").innerHTML += "<span>ERROR: Connection is lost. " + responseObject.errorMessage + "</span><br>";

    }

}

 

function onMessageArrived(message) {

    console.log("Message Arrived: " + message.payloadString);

    document.getElementById("messages").innerHTML += "<span>Topic: " + message.destinationName + " | Message: " + message.payloadString + "</span><br>";

}

 

function startDisconnect() {

    if (client.isConnected()) {

        client.disconnect();

        document.getElementById("messages").innerHTML += "<span>Disconnected.</span><br>";

    }

}

 

function publishMessage() {

    if (client.isConnected()) {

        var msg = document.getElementById("Message").value;

        var topic = document.getElementById("topic_p").value;

        var message = new Paho.MQTT.Message(msg);

        message.destinationName = topic;

        client.send(message);

        document.getElementById("messages").innerHTML += "<span>Message to topic " + topic + " is sent</span><br>";

    } else {

        alert("Not connected to the MQTT broker.");

    }

}