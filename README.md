# Clone Achromatic Backend

This is the backend service for the Clone Achromatic project, built with [NestJS](https://nestjs.com/).

## Features

- User authentication and authorization
- API versioning (`api/v1`)
- User management
- Secure password handling with bcrypt
- JWT-based authentication

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd clone-achromatic-be
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following content:
   ```
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=postgres
   DATABASE_PASSWORD=postgres
   DATABASE_NAME=achromatic
   JWT_SECRET=secret
   ```

4. Run the application:
   ```bash
   npm run start
   ```

5. Run the application with Docker Compose (optional):
   ```bash
   docker-compose up
   ```

   > **Note:** The `docker-compose.yml` file uses the following hardcoded environment variables:
   ```
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=postgres
   POSTGRES_DB=achromatic
   ```
   Update these values in the `docker-compose.yml` file if needed.

## API Endpoints

- **Base URL:** `http://localhost:8000/api/v1`
- **User Endpoints:**
  - `GET /user/me` - Get current user information (requires authentication)

## Technologies Used

- **Framework:** NestJS
- **Database:** TypeORM with PostgreSQL
- **Authentication:** JWT
- **Other:** bcrypt, cookie-parser

## License

This project is licensed under the MIT License.
