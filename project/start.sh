#!/bin/sh

# Wait for database to be ready
echo "Waiting for database to be ready..."
/app/wait-for-it.sh db:3306 -t 60

# Run Prisma migrations/pull
echo "Running Prisma db pull..."
npx prisma db pull
echo "Generating Prisma client..."
npx prisma generate

# Start the application
echo "Starting the application..."
npm run dev