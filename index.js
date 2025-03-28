import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
//db
import db from "./_db.js";
//typeDefs
import { typeDefs } from "./schema.js";
import { GraphQLError } from "graphql";

const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    reviews() {
      return db.reviews;
    },
    authors() {
      return db.authors;
    },
    review(_, args) {
      if (args.id  === null || args.id  === undefined || args.id  == "") {
        throw new GraphQLError("Invalid review ID provided", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      var id = parseInt(args.id);
      return db.reviews.find((review) => review.id === id);
    },
    game(_, args) {
      if (args.id === null || args.id  === undefined || args.id  == "") {
        throw new GraphQLError("Invalid game ID provided", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      var id = parseInt(args.id);
      return db.games.find((game) => game.id === id);
    },
    author(_, args) {
      if (args.id  === null || args.id  === undefined || args.id  == "") {
        throw new GraphQLError("Invalid author ID provided", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      var id = parseInt(args.id);
      return db.authors.find((author) => author.id === id);
    }
  },
  Game: {
    reviews(parent) {
      return db.reviews.filter((r) => r.game_id === parent.id);
    }
  },
};

// server setup
const server = new ApolloServer({
  //typeDefs -- definitions of types of data
  //resolvers
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("Server ready at port: ", 4000);
