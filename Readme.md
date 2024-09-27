# GamePlanR

Welcome to GamePlanR! This application is designed for sports enthusiasts who are eager to find and book venues for their favorite sports activities. It also provides a platform for venue administrators to list and manage their sports venues.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Features

### For Users

- **Account Creation and Sign-In**: Users can create an account and sign in to access the app.
- **Interest Selection**: Choose your favorite sports categories.
- **Venue Search**: Search for available sports venues based on your selected categories.
- **Booking Appointments**: Book appointments for your desired sports venues.

### For Admins

- **Account Creation**: Admins can create an account to access the admin panel.
- **Venue Management**: List and manage sports venues within the app.
- **Appointment Management**: View and manage bookings made by users.

## Installation

Follow these steps to set up the project locally.

### Prerequisites

- Node.js
- Python
- Django
- PostgreSQL

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ROW-ZEAL/GamePlanR.git
   ```
2. Navigate to the backend directory:
   ```bash
   cd gameplanr/backend
   ```
3. Create and activate a virtual environment:
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows use `env\Scripts\activate`
   ```
4. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Set up the PostgreSQL database and configure your database settings in `settings.py`.
6. Run migrations:
   ```bash
   python manage.py migrate
   ```
7. Start the Django server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```

## Usage

1. **Sign Up**: Create an account as a user or admin.
2. **Sign In**: Log in to your account.
3. **Select Interest**: Choose the sports categories you are interested in.
4. **Search Venues**: Look for sports venues that match your interests.
5. **Book Appointments**: Reserve your spot at the chosen venue.
6. **Admin Panel**: Admins can manage venues and view bookings.

## Contributing

We welcome contributions to improve the project! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a pull request.
