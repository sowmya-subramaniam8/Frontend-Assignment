import gql from "graphql-tag";

export const typeDefs = gql`
  extend type Query {
    id:  [ID!]!
	type: String!
    required: Boolean!
    field: String!
    value: String!
  }
`;

export const resolvers = {};