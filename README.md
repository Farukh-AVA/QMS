# QMS
Queue Management System for small businesses with messaging and database 

Code infrastructure


Customer Registration to the Queue:

The client registers to the queue via a frontend interface (e.g., a form on a website or a touchscreen interface on an iPad).
The client registration data is sent to backend server via a POST HTTP API.
Backend server processes the registration request, updates the DynamoDB database with the client's information, and sends a success response to the client.
WebSocket Notification to Admin:

After successfully updating the database with the client's registration, backend server sends a message over WebSocket to the admin frontend, notifying it of the update.
The WebSocket message contain information about the update, simply a generic "updates" notification.
Admin Frontend Update:

Upon receiving the WebSocket message, the admin frontend updates its UI accordingly to reflect the new client registration.
The admin frontend may uses an HTTP GET request to retrieve the updated queue information from DynamoDB and refresh its view.
Displaying Updated Queue Information:

The admin frontend displays the updated queue information, which now includes the newly registered client.
The admin can now see the client's details and manage the queue accordingly, such as calling the client for service or performing other administrative tasks.
This scenario effectively leverages a combination of HTTP APIs and WebSocket communication to facilitate real-time updates between the client and admin interfaces. 
The client initiates the registration process via an HTTP API, while the admin receives immediate notifications of updates through WebSocket messages, enabling quick and synchronized updates to the admin frontend. 