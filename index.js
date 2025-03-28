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
      if (args.id === null || args.id === undefined || args.id == "") {
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
      if (args.id === null || args.id === undefined || args.id == "") {
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
      if (args.id === null || args.id === undefined || args.id == "") {
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
  Author: {
    reviews(parent) {
      return db.reviews.filter(r => r.author_id === parent.id);
    }
  },
  Review: {
    author(parent) {
      return db.authors.find((a) => a.id === parent.author_id);
    },
    game(parent) {
      return db.games.find((g) => g.id === parent.game_id);
    }
  },
  Mutation:{
    deleteGame(_, args){
      if (args.id === null || args.id === undefined || args.id == "") {
        throw new GraphQLError("Invalid game ID provided", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      var id = parseInt(args.id);
      db.games = db.games.filter((g) => g.id !== id)
      return db.games
    },
    addGame(_,args){
      let game ={
        ...args.game,
        id: Math.floor(Math.random() *10000)
      }
      db.games.push(game)
      return game
    },
    updateGame(_,args){
      if (args.id === null || args.id === undefined || args.id == "") {
        throw new GraphQLError("Invalid game ID provided", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      var id = parseInt(args.id);
      db.games = db.games.map((g)=>{
        if(g.id === id){
          g.platform = args.edits.platform 
          g.title = args.edits.title
          return {...g, ...args.edits}
        }
        return g
      })
    }
  }
}

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
