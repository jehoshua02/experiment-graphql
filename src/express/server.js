var path = require('path');
var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
    type Query {
        hello: String
    }
`);

var root = {
    hello: () => {
        return 'Hello World!'
    }
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.use('/xhr', (req, res) => {
    res.sendFile(path.join(__dirname + '/../clients/xhr.html'));
});
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');