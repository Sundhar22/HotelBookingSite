Welcome to the Hotel Booking Site project! This application allows users to browse, select, and book hotel rooms seamlessly. Built with user experience and functionality in mind, this project provides a complete solution for hotel booking management.
Table of Contents

    Features
    Technologies Used
    Installation
    Usage
    Contributing
    License
    Contact

Features

    User Authentication: Secure login and registration for users.
    Room Browsing: View available rooms with details such as price, amenities, and images.
    Booking Management: Book rooms and manage existing bookings.
    Admin Dashboard: Admin can manage rooms, view bookings, and handle user inquiries.
    Responsive Design: Optimized for both desktop and mobile devices.

Technologies Used

    Frontend: HTML, CSS, JavaScript, React
    Backend: Node.js, Express
    Database: MongoDB
    Authentication: JSON Web Tokens (JWT)
    Payment Gateway: Stripe API (if applicable)
    Deployment: Docker, Kubernetes (if applicable)

Installation

To run this project locally, follow these steps:

    Clone the repository:

    bash

git clone https://github.com/Sundhar22/HotelBookingSite.git
cd HotelBookingSite

Install dependencies:

bash

npm install

Set up environment variables:

Create a .env file in the root directory and add your environment variables (example provided below):

env

PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key

Run the application:

bash

    npm start

    The application will run on http://localhost:3000.

Usage

    Register or Log in: Create an account or log in with existing credentials.
    Browse Rooms: Explore the available rooms and select your preferred one.
    Make a Booking: Choose your dates, provide necessary details, and confirm the booking.
    Manage Bookings: View and manage your bookings from the user dashboard.


License

This project is licensed under the MIT License - see the LICENSE file for details.
Contact
