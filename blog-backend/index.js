const express = require('express');
const neo4j = require('./db'); // Import Neo4j connection
const winston = require('winston');

const port = 3001;
const cors = require('cors'); // Import the cors package

const app = express();

// Initialize Winston logger
const logger = winston.createLogger({
  level: 'info', // Set the log level
  format: winston.format.simple(), // Set log format
  transports: [
    new winston.transports.Console(), // Log to console
    new winston.transports.File({ filename: 'error.log', level: 'error' }), // Log errors to a file
    // You can add more transports as needed
  ],
});

// Enable CORS for all routes
app.use(cors());

// Define route to fetch posts and comments by users
app.get('/users/posts', async (req, res) => {
  try {
    const session = neo4j.session();

    const result = await session.run(
      `MATCH (u:User)-[:AUTHORED]->(p:Post)-[:HAS_COMMENT]->(c:Comment)
       RETURN u, p, c`
    );

    // Rest of your code with logging
    // For instance:
    logger.info('Successfully fetched posts and comments');

    await session.close();
  } catch (error) {
    console.error('Error fetching posts and comments:', error);
    logger.error('Error fetching posts and comments:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
