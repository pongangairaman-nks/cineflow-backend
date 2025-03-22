//graphql schema language
// import { gql } from "apollo-server-express";
import gql from "graphql-tag";

//graphql schema definitions
const typeDefs = gql`
  #video type defines the structure of the video
  type Video {
    _id: ID!
    title: String!
    type: String
    genre: String
    url: String!
    posterUrl: String!
    aiDescription: String
    likes: Int
    likesBy: [Like]
    comments: [Comment]
  }

  type Like {
    _id: ID!
    userId: ID
    videoId: ID
    createdAt: String
  }

  type Comment {
    _id: ID!
    userId: ID
    videoId: ID
    text: String
    createdAt: String
  }

  #queries for fetching data
  type Query {
    getAllVideos: [Video!]!
    getVideoById(id: ID!): Video
    me: User
  }

  #modifying data
  type Mutation {
    addVideo(
      title: String!
      type: String
      genre: String
      url: String!
      posterUrl: String!
    ): Video

    deleteVideo(id: ID!): Video

    likeVideo(videoId: ID!, userId: ID!): Video

    addComment(videoId: ID!, userId: ID!, text: String!): Video
    
    register(name: String!, email: String!, password: String!): AuthPayload

    login(email: String!, password: String!): AuthPayload
  }

  type User {

    _id: ID!

    name: String!

    email: String!

  }
 
  type AuthPayload {

    token: String!

    user: User!

  }
`;

export default typeDefs;
