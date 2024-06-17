# Queue Management System (QMS)

## Overview

The Queue Management System (QMS) is a comprehensive application designed to manage client registrations, facilitate real-time updates, and provide administrative control over the queue. It features two types of users: Admins and Customers. Admins can manage the queue by adding, modifying, deleting, and messaging queue members, while Customers can register themselves into the queue and view their status.

## Architecture

### Components

1. **Frontend**:
    - React.js
    - Vite
    - Bootstrap 
    - AWS Amplify 
    - Admin Interface: Allows admins to manage the queue.
    - Customer Interface: Allows customers to register and view the queue.

3. **Backend**:
     -SST local development and infrastructure as a Code IaC. 
    - AWS Lambda Functions: Handle the business logic.
    - AWS API Gateway: Provides endpoints for interacting with the backend.
    - AWS DynamoDB: Stores queue data.
    - AWS SNS & Amazon Pinpoint: Handles messaging.
    - AWS Cognito: Manages authentication and authorization.
4. ### Backend Architecture Diagram
<p align="center">
   <img src="https://github.com/Farukh-AVA/QMS/blob/main/packages/frontend/src/assets/AWS%20QMS%20Diagram.png"
</p>




5. ### Communication:
    - WebSocket: Facilitates real-time updates between admin and customers.

### Workflow

1. **Customer Registration**:
    - The customer registers via the frontend, sending a POST request to the backend.
    - The backend updates DynamoDB with the customer's information.
    - The backend sends a WebSocket message to the admin interface, notifying it of the new registration.
    - The admin interface updates its UI to reflect the new customer.

2. **Admin Management**:
    - Admins can add, modify, and delete queue members.
    - Admins can send messages to customers via SNS and Amazon Pinpoint.
    - All admin actions are reflected in real-time on the customer interface via WebSocket.

## Features

- **Real-Time Updates**: WebSocket communication ensures that the admin and customer interface is updated in real time.
- **Authentication and Authorization**: Managed by AWS Cognito, ensuring secure access for admins and customers.
- **Scalable Storage**: DynamoDB provides scalable and reliable storage for queue data.
- **Messaging**: Integrated with SNS and Amazon Pinpoint for efficient customer communication via SMS messages.

## Setup Instructions

### Prerequisites

- Node.js and npm
- AWS CLI configured with appropriate permissions
- Serverless Stack (SST) CLI

### Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/farukh-ava/qms.git
    cd qms
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Deploy the Infrastructure**:
    ```bash
    npx sst deploy
    ```

### Configuration

1. **AWS Cognito**:
    - Set up a user pool for admins and customers.
    - Configure the user pool in the `AdminAPIStack` and `CustomerAPIStack`.

2. **DynamoDB**:
    - Ensure tables for storing queue data and connections are created.
    
3. **SNS and Amazon Pinpoint**:
    - Set up SNS topics and Pinpoint projects for messaging.

### Running the Application

- **Start the Local Development Environment**:
    ```bash
    npx sst start
    ```

- **Deploy to Production**:
    ```bash
    npx sst deploy --stage prod
    ```

### Contributions
Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.

### License
This project is licensed under the MIT License.


