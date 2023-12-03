// Create User nodes
CREATE (:User {id: 'user1', username: 'john_doe', email: 'john@example.com'})
CREATE (:User {id: 'user2', username: 'jane_smith', email: 'jane@example.com'})

// Create Post nodes
CREATE (:Post {id: 'post1', title: 'First Post', content: 'This is my first blog post.', timestamp: timestamp()})
CREATE (:Post {id: 'post2', title: 'Second Post', content: 'Another post on my blog.', timestamp: timestamp()})

// Create Comment nodes
CREATE (:Comment {id: 'comment1', content: 'Great post!', timestamp: timestamp()})
CREATE (:Comment {id: 'comment2', content: 'Interesting thoughts.', timestamp: timestamp()})

// Connect User nodes to Post nodes (User authored Post)
MATCH (u:User {id: 'user1'}), (p:Post {id: 'post1'})
CREATE (u)-[:AUTHORED]->(p)

MATCH (u:User {id: 'user2'}), (p:Post {id: 'post2'})
CREATE (u)-[:AUTHORED]->(p)

// Connect Post nodes to Comment nodes (Post has Comment)
MATCH (p:Post {id: 'post1'}), (c:Comment {id: 'comment1'})
CREATE (p)-[:HAS_COMMENT]->(c)

MATCH (p:Post {id: 'post2'}), (c:Comment {id: 'comment2'})
CREATE (p)-[:HAS_COMMENT]->(c)
