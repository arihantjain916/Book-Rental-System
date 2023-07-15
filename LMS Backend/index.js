const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const dotenv = require("dotenv");
const typeDefs = require("./components/graphql/typeDefs");
const resolvers = require("./components/graphql/resolvers");
require("./components/scripts/fineScheduler")
dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const connectDB = require("./components/db/conn");


(async () => {
  await connectDB();
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at: ${url}`);
})();
