# Use the official PostgreSQL image
FROM postgres:15

# Set environment variables for PostgreSQL
ENV POSTGRES_USER=your_username
ENV POSTGRES_PASSWORD=your_password
ENV POSTGRES_DB=your_database

# Expose the default PostgreSQL port
EXPOSE 5432
