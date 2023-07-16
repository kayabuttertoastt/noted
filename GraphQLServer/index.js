const { Neo4jGraphQL } = require("@neo4j/graphql");
const { ApolloServer, gql } = require("apollo-server");
const neo4j = require("neo4j-driver");

const typeDefs = gql`

type User {
    name: String
    email: String 
    reputation: Int
    read: [Article!]! @relationship(type: "READ", direction: OUT)
    likes: [Article!]! @relationship(type: "LIKED", direction: IN)
    likedNotes: [Notes!]! @relationship(type: "LIKEDBY", direction: IN)
    interests: [Interest!]! @relationship(type: "INTERESTED", direction: OUT)
    posted: [Notes!]! @relationship(type: "POSTER", direction: IN)
    written: [Article!]! @relationship(type: "WRITTEN", direction: IN)
    commentedby: [Comment!]! @relationship(type: "COMMENTEDBY", direction: OUT)
  }
  
    
    type Course {
        name: String
        notes: [Notes!]! @relationship(type: "NOTES", direction: IN)
    }
    
    type Notes {
        name: String
        address: String
        likeCount: Int
        likedNotes: [Notes!]! @relationship(type: "LIKEDBY", direction: IN)
        course: [Course!]! @relationship(type: "NOTES", direction: OUT) 
        author: [User!]! @relationship(type: "POSTER", direction: OUT)
        notesComment:[Comment!]! @relationship(type: "NOTESCOMMENT", direction: IN)
    }
    
    type Article {
        title: String
        summary: String
        address: String
        likeCount: Int
        likes: [User!]! @relationship(type: "LIKED", direction: OUT)
        read: [User!]! @relationship(type: "READ", direction: IN)
        includes: [Interest!]! @relationship(type: "INCLUDES", direction: IN)
        author: [User!]! @relationship(type: "WRITTEN", direction: OUT)
        related: [Article!]! @relationship(type: "RELATION", direction : OUT, queryDirection: DEFAULT_DIRECTED, properties: "Similarity")
    }
    
    type Interest {
        name: String
        interests: [User!]! @relationship(type: "INTERESTED", direction: IN)
        includes: [Article!]! @relationship(type: "INCLUDES", direction: OUT)
    }

    type Comment {
        content: String
        noteAddress: String
        commentAuthor: [User!]! @relationship(type: "AUTHOR", direction: OUT)
        notesComment:[Notes!]! @relationship(type: "NOTESCOMMENT", direction: OUT)
    }

    interface Similarity @relationshipProperties {
        score: Float
    }
`;

const driver = neo4j.driver(
    "neo4j+s://f68363e2.databases.neo4j.io",
    neo4j.auth.basic("neo4j", "CCE-9y4M1VWFvtaOIuli84-LhP6vMbniNQze5WrX7WE")
);

// const createApolloServer = async () => {
//     const neoSchema = new Neo4jGraphQL({ typeDefs, driver });
//     const schema = await neoSchema.getSchema();

//     return new ApolloServer({ schema });
//   };

// module.exports = createApolloServer;

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

neoSchema.getSchema().then((schema) => {
    const server = new ApolloServer({
        schema,
    });

    server.listen().then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    });
})
