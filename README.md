# Room Administration Application

This project is a Room Administration application developed using Angular for the frontend and Spring Boot for the backend. The application allows users to create, read, update, and delete (CRUD) meeting rooms. It also includes a reservation system and a filter option to filter rooms by size.

## Table of Contents

- [Project Description](#project-description)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Backend (Spring Boot)](#backend-spring-boot)
- [Frontend (Angular)](#frontend-angular)
- [Database](#database)
- [Usage](#usage)

## Project Description

The Room Administration CRUD application is designed to manage meeting rooms with the following key features:

1. **CRUD Operations**: Users can perform Create, Read, Update, and Delete operations on meeting rooms.

2. **Reservation System**: Users can reserve a meeting room by specifying a start and end time. Rooms cannot be reserved for more than 2 hours.

3. **Availability Checking**: The system checks the availability of rooms before allowing a reservation. Rooms that are already reserved during the specified time cannot be booked.

4. **Automatic Release**: Meeting rooms are automatically released after the reservation end time, ensuring that rooms are not occupied when they should be available.

5. **Manual Release**: Users have the option to manually release a room before the reservation end time.

## Technologies Used

- **Backend (Spring Boot)**:
  - Java 17
  - Spring Boot 3.1.5
  - Spring Data JPA
  - MySQL
  - Lombok
  - Spring Boot DevTools
  - Spring Web
  - Spring Scheduled Tasks

- **Frontend (Angular)**:
  - Angular 16.1.0
  - Bootstrap 5.3.2
  - SweetAlert2
  - RxJS 7.8.0

## Getting Started

Follow these steps to set up the project locally:

1. Clone the repository to your local machine:

    ```git clone<repository-url>```

2. Set up the backend (Spring Boot) and configure the database connection in the `application.properties` file.

3. Set up the frontend (Angular) by navigating to the `rooms-client` directory and running:

    ```npm install```

4. Update the backend and frontend configuration files to match your environment and requirements.

5. Build and run the Spring Boot application.

6. Start the Angular development server.

7. Access the application in your web browser.

## Features

### Room Management (CRUD)

- **Create Room**: Users can add new meeting rooms, specifying their name, size, and other details.

- **Read Rooms**: Users can view a list of available meeting rooms. Reserved rooms are highlighted.

- **Update Room**: Existing room details can be modified, including name, size, and other attributes.

- **Delete Room**: Users can delete rooms that are no longer needed.

### Reservation System

- **Reserve Room**: Users can book a room by selecting a start and end time. The system ensures that rooms are available and that the reservation duration does not exceed 2 hours.

- **Automatic Release**: Reserved rooms are automatically released after the reservation end time.

- **Manual Release**: Users can release rooms manually before the end of the reservation period.

### Automatic Reservation Release

- The system automatically releases reserved rooms when the reservation end time is reached.

## Folder Structure

The project folder structure is as follows:

rooms-project/

├── backend/    # Spring Boot backend

├── frontend/   # Angular frontend

├── README.md   # Project documentation

## Backend (Spring Boot)

The Spring Boot backend is responsible for managing the business logic, database operations, and scheduled tasks. The key components include:

- **Controllers**: Define REST endpoints for room CRUD operations and reservations.

- **Services**: Implement business logic for room management and reservations.

- **Repositories**: Define JPA repositories for database operations.

- **Models**: Define data models for meeting rooms and reservations.

- **Scheduled Tasks**: Implement a scheduled task to automatically release reserved rooms when their end time is reached.

- **Database Configuration**: Configure the database connection in `application.properties`.

## Frontend (Angular)

The Angular frontend provides a user-friendly interface for managing meeting rooms and reservations. Key components include:

- **Components**: Angular components for room listing, room details, and reservation forms.

- **Services**: Angular services for making HTTP requests to the backend.

- **Routing**: Angular routing for navigating between different views.

- **Views**: HTML templates and styles for the application.

- **Interactions**: Interact with the backend API to perform CRUD operations and reservations.

- **Validation**: Implement input validation for reservation times.

## Database

The application uses a MySQL database to store information about meeting rooms and reservations. The database schema includes the following tables:

- `board_room`: Contains room details, such as `id_room`, `name`, `size`, `is_reserved`, `reservation_start_time`, and `reservation_end_time`.

## Usage

To use the Room Administration CRUD application:

1. Start the Spring Boot backend.

2. Start the Angular development server for the frontend.

3. Access the application in your web browser.

4. Perform CRUD operations on meeting rooms, make reservations, and observe the automatic release of reserved rooms.

