# Uber Clone (MERN Stack)

A full-stack ride-booking app inspired by Uber. Users can search locations, see fare estimates, and request a ride, while captains (drivers) receive requests in real time, accept them, verify the ride with an OTP, and complete the trip with live tracking.

## Features

**User**
- Register, login, and logout with JWT authentication
- Location search with Google Maps autocomplete suggestions
- Fare estimates for auto, car, and moto based on distance and time
- Request a ride and get live updates when a captain accepts
- Live tracking on Google Maps during the ride

**Captain**
- Separate captain registration with vehicle details (color, plate, capacity, type)
- Receive new ride requests instantly via Socket.io
- Confirm rides and start them using a 6-digit OTP
- End ride and view ride details

**General**
- Real-time communication between users and captains using Socket.io
- Protected routes with token blacklisting on logout
- Input validation with express-validator
- Smooth animated UI with GSAP

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS, React Router, GSAP, Axios |
| Maps | Google Maps API (`@react-google-maps/api`) |
| Real-time | Socket.io, Socket.io Client |
| Backend | Node.js, Express 5, MongoDB, Mongoose |
| Auth | JSON Web Tokens (JWT), bcrypt, cookie-parser |
| Validation | express-validator |

## Project Structure

```
Uber-Clone-Project/
├── frontend/     # React client (user + captain interfaces)
└── backend/      # Express API + Socket.io server
```

## Getting Started

### Prerequisites
- Node.js installed
- A MongoDB database (local or Atlas)
- A Google Maps API key (Geocoding, Distance Matrix, Places, and Maps JavaScript APIs enabled)

### 1. Clone the repository
```bash
git clone https://github.com/Umar-Farooq-Afridi/Uber-Clone-Project.git
cd Uber-Clone-Project
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```
PORT=3000
DB_Connect=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_MAPS_API=your_google_maps_api_key
```

Run the backend:
```bash
npm run dev
```

### 3. Frontend setup
```bash
cd ../frontend
npm install
```

Create a `.env` file in `frontend/`:
```
VITE_API_URL=http://localhost:3000
VITE_BASE_URL=http://localhost:3000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

Run the frontend:
```bash
npm run dev
```

## API Endpoints

| Route | Method | Description | Auth |
|---|---|---|---|
| /users/register | POST | Register a new user | Public |
| /users/login | POST | Login user | Public |
| /users/profile | GET | Get logged-in user's profile | User |
| /users/logout | GET | Logout user | User |
| /captains/register | POST | Register a new captain with vehicle details | Public |
| /captains/login | POST | Login captain | Public |
| /captains/profile | GET | Get logged-in captain's profile | Captain |
| /captains/logout | GET | Logout captain | Captain |
| /maps/get-coordinates | GET | Get coordinates for an address | User |
| /maps/get-distance-time | GET | Get distance and travel time between two places | User |
| /maps/get-suggestions | GET | Location autocomplete suggestions | User |
| /rides/create | POST | Create a new ride request | User |
| /rides/get-fare | GET | Get fare estimate for all vehicle types | User |
| /rides/confirm | POST | Captain accepts a ride | Captain |
| /rides/start-ride | GET | Start ride after OTP verification | Captain |
| /rides/end-ride | POST | End the ride | Captain |

## Author

**Umar Farooq: Software Engineer | Web Developer | MERN Stack Developer**
- GitHub: [@Umar-Farooq-Afridi](https://github.com/Umar-Farooq-Afridi)
- Portfolio: [umar-farooq-portfolio.vercel.app](https://umar-farooq-portfolio.vercel.app)


## Backend API Documentation

## `/users/register` Endpoint

### Description

Registers a new user by creating a user account with the provided information.

### HTTP Method

`POST`
### Request Body

The request body should be in JSON format and include the following fields:

- `fullname` (object):
  - `firstname` (string, required): User's first name (minimum 3 characters).
  - `lastname` (string, optional): User's last name (minimum 3 characters).
- `email` (string, required): User's email address (must be a valid email).
- `password` (string, required): User's password (minimum 6 characters).

### Example Response
- `user` (object):
  - `fullname` (object).
    - `firstname` (string): User's first name (minimum 3 characters).
    - `lastname` (string): User's last name (minimum 3 characters).   
  - `email` (string): User's email address (must be a valid email).
  - `password` (string): User's password (minimum 6 characters).
- `token` (String): JWT Token

## `/users/login` Endpoint

### Description
Authenticates a user using their email and password, returning a JWT token upon successful login.

### HTTP Method

`POST`

### Endpoint

`/users/login`

### Request Body
The request body should be in JSON format and include the following fields:

- `email` (string, required): User's email address (must be a valid email).
- `password` (string, required): User's password (minimum 6 characters).

### Example Response
- `user` (object):
  - `fullname` (object).
    - `firstname` (string): User's first name (minimum 3 characters).
    - `lastname` (string): User's last name (minimum 3 characters).   
  - `email` (string): User's email address (must be a valid email).
  - `password` (string): User's password (minimum 6 characters).
- `token` (String): JWT Token

## `/users/profile` Endpoint

### Description
Retrieves the profile information of the currently authenticated user.

### HTTP Method

`GET`

### Authentication
Requires a valid JWT token in the Authorization header:
`Authorization: Bearer <token>`

### Example Response
- `user` (object):
  - `fullname` (object).
    - `firstname` (string): User's first name (minimum 3 characters).
    - `lastname` (string): User's last name (minimum 3 characters).   
  - `email` (string): User's email address (must be a valid email).



## `/users/logout` Endpoint

### Description
Logout the current user and blacklist the token provided in cookie or headers

### HTTP Method

`GET`

### Authentication
Requires a valid JWT token in the Authorization header or cookie:
- `user` (object):
  - `fullname` (object).
    - `firstname` (string): User's first name (minimum 3 characters).
    - `lastname` (string): User's last name (minimum 3 characters).   
  - `email` (string): User's email address (must be a valid email).
  - `password` (string): User's password (minimum 6 characters).
- `token` (String): JWT Token## `/captains/register` Endpoint

### Description
Registers a new captain by creating a captain account with the provided information.

### HTTP Method

`POST`

### Request Body
The request body should be in JSON format and include the following fields:
- `fullname` (object):
  - `firstname` (string, required): Captain's first name (minimum 3 characters)
  - `lastname` (string, optional): Captain's last name
- `email` (string, required): Captain's email address (must be a valid email)
- `password` (string, required): Captain's password (minimum 6 characters)
- `vehicle` (object):
  - `color` (string, required): Vehicle color (minimum 3 characters)
  - `plate` (string, required): Vehicle plate number (minimum 3 characters)
  - `capacity` (number, required): Vehicle passenger capacity (minimum 1)
  - `vehicleType` (string, required): Type of vehicle (must be 'car', 'motorcycle', or 'auto')

### Example Response


## `/captains/register` Endpoint

### Description
Registers a new captain by creating a captain account with the provided information.

### HTTP Method

`POST`

### Request Body
The request body should be in JSON format and include the following fields:
- `fullname` (object):
  - `firstname` (string, required): Captain's first name (minimum 3 characters).
  - `lastname` (string, optional): Captain's last name (minimum 3 characters).
- `email` (string, required): Captain's email address (must be a valid email).
- `password` (string, required): Captain's password (minimum 6 characters).
- `vehicle` (object):
  - `color` (string, required): Vehicle color (minimum 3 characters).
  - `plate` (string, required): Vehicle plate number (minimum 3 characters).
  - `capacity` (number, required): Vehicle passenger capacity (minimum 1).
  - `vehicleType` (string, required): Type of vehicle (must be 'car', 'motorcycle', or 'auto').

### Example Response
- `captain` (object):
  - `fullname` (object).
    - `firstname` (string): Captain's first name (minimum 3 characters).
    - `lastname` (string): Captain's last name (minimum 3 characters).   
  - `email` (string): Captain's email address (must be a valid email).
  - `password` (string): Captain's password (minimum 6 characters).
  - `vehicle` (object):
    - `color` (string): Vehicle color.
    - `plate` (string): Vehicle plate number.
    - `capacity` (number): Vehicle passenger capacity.
    - `vehicleType` (string): Type of vehicle.
- `token` (String): JWT Token

## `/captains/login` Endpoint

### Description
Authenticates a captain using their email and password, returning a JWT token upon successful login.

### HTTP Method

`POST`

### Endpoint

`/captains/login`

### Request Body
The request body should be in JSON format and include the following fields:
- `email` (string, required): Captain's email address (must be a valid email).
- `password` (string, required): Captain's password (minimum 6 characters).

### Example Response
- `captain` (object):
  - `fullname` (object).
    - `firstname` (string): Captain's first name (minimum 3 characters).
    - `lastname` (string): Captain's last name (minimum 3 characters).   
  - `email` (string): Captain's email address (must be a valid email).
  - `password` (string): Captain's password (minimum 6 characters).
  - `vehicle` (object):
    - `color` (string): Vehicle color.
    - `plate` (string): Vehicle plate number.
    - `capacity` (number): Vehicle passenger capacity.
    - `vehicleType` (string): Type of vehicle.
- `token` (String): JWT Token

## `/captains/profile` Endpoint

### Description
Retrieves the profile information of the currently authenticated captain.

### HTTP Method

`GET`

### Authentication
Requires a valid JWT token in the Authorization header:
`Authorization: Bearer <token>`

### Example Response
- `captain` (object):
  - `fullname` (object).
    - `firstname` (string): Captain's first name (minimum 3 characters).
    - `lastname` (string): Captain's last name (minimum 3 characters).   
  - `email` (string): Captain's email address (must be a valid email).
  - `vehicle` (object):
    - `color` (string): Vehicle color.
    - `plate` (string): Vehicle plate number.
    - `capacity` (number): Vehicle passenger capacity.
    - `vehicleType` (string): Type of vehicle.

## `/captains/logout` Endpoint

### Description
Logout the current captain and blacklist the token provided in cookie or headers.

### HTTP Method

`GET`

### Authentication
Requires a valid JWT token in the Authorization header or cookie.

### Example Response
- `message` (string): Logout successfully.


## `/maps/get-coordinates` Endpoint

### Description
Retrieves the coordinates (latitude and longitude) for a given address.

### HTTP Method

`GET`

### Request Parameters
- `address` (string, required): The address for which to retrieve coordinates.

### Example Request
GET `/maps/get-coordinates?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA`

### Example Response
```json
{
  "ltd": 37.4224764,
  "lng": -122.0842499
}
```

### Error Response
- `400 Bad Request`: If the address parameter is missing or invalid.
- `404 Not Found`: If the coordinates for the given address could not be found.

```json
{
  "message": "Coordinates not found"
}
```

## `/maps/get-distance-time` Endpoint

### Description
Retrieves the distance and estimated travel time between two locations.

### HTTP Method

`GET`

### Request Parameters
- `origin` (string, required): The starting address or location.
- `destination` (string, required): The destination address or location.

### Example Request
```
GET /maps/get-distance-time?origin=New+York,NY&destination=Los+Angeles,CA
```

### Example Response
```json
{
  "distance": {
    "text": "2,789 miles",
    "value": 4486540
  },
  "duration": {
    "text": "1 day 18 hours",
    "value": 154800
  }
}
```

### Error Response
- `400 Bad Request`: If the origin or destination parameter is missing or invalid.
- `404 Not Found`: If the distance and time for the given locations could not be found.

```json
{
  "message": "No routes found"
}
```

## `/maps/get-suggestions` Endpoint

### Description
Retrieves autocomplete suggestions for a given input string.

### HTTP Method

`GET`

### Request Parameters
- `input` (string, required): The input string for which to retrieve suggestions.

### Example Request
```
GET /maps/get-suggestions?input=1600+Amphitheatre
```

### Example Response
```json
[
  "1600 Amphitheatre Parkway, Mountain View, CA, USA",
  "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA"
]
```

### Error Response
- `400 Bad Request`: If the input parameter is missing or invalid.
- `500 Internal Server Error`: If there is an error retrieving suggestions.

```json
{
  "message": "Unable to fetch suggestions"
}
```

## `/rides/create` Endpoint

### Description
Creates a new ride with the provided information.

### HTTP Method

`POST`

### Authentication
Requires a valid JWT token in the Authorization header:
`Authorization: Bearer <token>`

### Request Body
The request body should be in JSON format and include the following fields:
- `pickup` (string, required): The pickup address (minimum 3 characters).
- `destination` (string, required): The destination address (minimum 3 characters).
- `vehicleType` (string, required): The type of vehicle (must be 'auto', 'car', or 'moto').

### Example Response
- `ride` (object):
  - `user` (string): User ID.
  - `pickup` (string): Pickup address.
  - `destination` (string): Destination address.
  - `fare` (number): Fare amount.
  - `status` (string): Ride status.
  - `duration` (number): Duration in seconds.
  - `distance` (number): Distance in meters.
  - `otp` (string): OTP for the ride.

### Error Response
- `400 Bad Request`: If any required field is missing or invalid.
- `500 Internal Server Error`: If there is an error creating the ride.

```json
{
  "message": "Error message"
}
```


## `/rides/get-fare` Endpoint

### Description
Retrieves the fare estimate for a ride between the provided pickup and destination addresses.

### HTTP Method

`GET`

### Authentication
Requires a valid JWT token in the Authorization header:
`Authorization:
 Bearer <token>`

### Request Parameters
- `pickup` (string, required): The pickup address (minimum 3 characters).
- `destination` (string, required): The destination address (minimum 3 characters).

### Example Request
```
GET /rides/get-fare?pickup=1600+Amphitheatre+Parkway,+Mountain+View,+CA&destination=1+Infinite+Loop,+Cupertino,+CA
```

### Example Response
```json
{
  "auto": 50.0,
  "car": 75.0,
  "moto": 40.0
}
```

### Error Response
- `400 Bad Request`: If any required parameter is missing or invalid.
- `500 Internal Server Error`: If there is an error calculating the fare.

```json
{
  "message": "Error message"
}
```
