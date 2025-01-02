import gql from "graphql-tag";

export const typeDefs = gql`
  # Represents the counts of messages grouped by engagement and type
  type MessageCategoryCount {
    engagement: String! # Engagement level (e.g., Ignored, Opened, Starred)
    type: String!       # Message type (e.g., news, info)
    message_count: Int! # Count of messages
  }

  # Input type for creating a new message
  input MessageInput {
    id: Int!             # Unique identifier for the message
    userEmail: String!   # Email of the user
    text: String!        # Content of the message
    engagement: String!  # Engagement level (e.g., Ignored, Opened, Starred)
    type: String!        # Message type (e.g., news, info)
    sendTime: Int!       # Time the message was sent (in milliseconds)
  }

  # Response type for writing a message
  type WriteMessageResponse {
    success: Boolean!    # Indicates if the operation was successful
    message: String!     # Describes the result of the operation
  }

  # Queries available
  type Query {
    # Fetch counts of messages grouped by engagement and type within a time range
    getCategoryCounts(
      userEmail: String!   # Email of the user
      startTime: Int!      # Start time in milliseconds
      endTime: Int!        # End time in milliseconds
    ): [MessageCategoryCount!]!
  }
`;