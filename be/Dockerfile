# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
# COPY . /app
COPY exam/ /app/exam

# Install any needed packages specified in requirements.txt
# RUN pip install --no-cache-dir -r requirements.txt

# Make port 5000 available to the world outside the container
EXPOSE 8001

# Define environment variable (optional)
# ENV PYTHONUNBUFFERED=1

# Run the application when the container starts
# CMD ["python", "app.py"]
CMD ["python3", "-m", "http.server", "8001"]
