const { gql } = require('apollo-server');

module.exports = gql`
    type Task {
        id: ID!
        title: String!
        username: String!
    }
    type User {
        id: ID!
        username: String!
        token: String!
    }
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
    }
    type Query{
        getTasks: [Task]
    }
    type Mutation{ 
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createTask(title: String!): Task!
        deleteTask(taskId: ID!): String!
    }
`