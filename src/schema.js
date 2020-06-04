const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar DateTime

  type Note {
    id: ID!
    title: String
    desc: String
    rule:String
    prize:String
    time: String
    platform: String
    category: String
    maxPlayers: String
    author: User!
    favoriteCount: Int!
    favoritedBy: [User]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    avatar: String
    notes: [Note!]!
    favorites: [Note!]!
    isAdmin: Boolean
  }

  type Image {
    id: ID!
    imageName: String
    imageData: String 
  }
  
  type ImageList{
    images: [Image] 
  }
  
  type NoteFeed {
    notes: [Note]!
    cursor: String!
    hasNextPage: Boolean!
  }

  type Query {
    notes: [Note!]!
    images: [Image]
    note(id: ID): Note!
    user(username: String!): User
    users: [User!]!
    me: User!
    noteFeed(cursor: String): NoteFeed
    notesByCat(category:String): [Note]
  } 

  type Mutation {
    newNote(note: TournamentInput!): Note
    updateNote(note: TournamentInput!, id:ID!): Note!
    updateProfile(username: String!, id:ID!): User!
    deleteNote(id: ID!): Boolean!
    toggleFavorite(id: ID!): Note!
    signUp(username: String!, email: String!, password: String!): String!
    signIn(username: String, email: String, password: String!): String!
  }
  
  input TournamentInput{
    title: String
    desc: String
    rule: String
    prize: String
    time: String
    platform: String
    maxPlayers: String
    category:String
  }
`;
