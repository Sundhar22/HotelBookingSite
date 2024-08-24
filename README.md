**Hotel Booking Site**

Welcome to the Hotel Booking Site repository! This project is a web application designed for users to search for hotels, view details, and make bookings. The site provides a seamless and intuitive interface for both hotel owners and customers.

**Features**

User Registration and Authentication: Allows users to create an account, log in, and manage their bookings.
Hotel Search and Filtering: Users can search for hotels based on location, price, rating, and amenities.
Booking System: Enables users to book rooms and manage their reservations.
Admin Dashboard: Hotel owners and admins can add, edit, or remove hotel listings and manage bookings.
Responsive Design: The website is fully responsive, providing a great experience on both desktop and mobile devices.

**Tech Stack**

Frontend: HTML, CSS, JavaScript, Bootstrap
Backend: Node.js, Express.js
Database: MongoDB
Authentication: Passport.js for user authentication
Other Tools: Mongoose for MongoDB object modeling, EJS for templating

**Installation**

To get a local copy of the project up and running, follow these steps:
Prerequisites

Node.js (v14 or above)
MongoDB

Steps

Clone the repository:


    git clone https://github.com/Sundhar22/HotelBookingSite.git

Navigate to the project directory:

    cd HotelBookingSite

Install dependencies:

    npm install

Set up environment variables:

Create a .env file in the root directory and add your environment variables. Here’s an example:


    PORT=3000
    MONGODB_URI=your_mongodb_uri
    SESSION_SECRET=your_secret

Run the application:


    npm start

    Visit the application:

    Open your browser and go to http://localhost:3000.

**Usage**

Register or log in to explore the hotel listings.
Search for hotels using the search bar and filters.
View hotel details and choose a room to book.
Manage your bookings through the user dashboard.
Admin users can manage hotels and bookings through the admin dashboard.

