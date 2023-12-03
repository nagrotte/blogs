const neo4j = require('neo4j-driver');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // You can add more transports as needed
  ],
});

const driver = neo4j.driver('neo4j://neo4j:7687', neo4j.auth.basic('neo4j', 'Daylights#123'));

driver.onCompleted = () => {
  logger.info('Successfully connected to Neo4j');
};

driver.onError = (error) => {
  logger.error('Error connecting to Neo4j:', error);
};

module.exports = driver;
