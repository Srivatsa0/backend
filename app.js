const express = require('express');  // Use express module correctly
const { MongoClient } = require('mongodb');

const app = express();
const port = 8080;  // Set the port for the server
const url = 'mongodb://localhost:27017'; // MongoDB URL

// Define a route for '/users'
app.get('/users', async (req, res) => {
  try {
    // Create a new MongoClient instance and connect to MongoDB
    const client = new MongoClient(url);
    await client.connect(); // Ensure you're calling the connect() method
    console.log('Database connected successfully!');

    // Get the database and collection
    const db = client.db('varchai');
    const collection = db.collection('employees');

    // Fetch all documents from the collection
    const documents = await collection.find().toArray(); // Use .toArray() to get the documents

    // Send the documents as JSON response
    res.json(documents);

    // Close the connection
    await client.close();
  } catch (error) {
    res.status(500).send('Error connecting to the database');
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});