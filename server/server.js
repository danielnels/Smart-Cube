const express = require("express");
const path = require("path");
const db = require("./config/connection");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require("./schema");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
     context: authMiddleware,
});
server.start().then(() => {
    server.applyMiddleware({ app });
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "../../client/build/index.html"));
});

//start server and listen
db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(
            `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
        )
    })
})






