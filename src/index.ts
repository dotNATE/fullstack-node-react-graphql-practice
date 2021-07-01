import { MikroORM } from '@mikro-orm/core';
import config from './mikro-orm.config';
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';
import {HelloResolver} from "./resolvers/hello";
import {AuthorResolver} from "./resolvers/author";

const main = async () => {
    const orm = await MikroORM.init(config);
    await orm.getMigrator().up();

    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, AuthorResolver],
            validate: true
        }),
        context: () => ({ em: orm.em })
    });

    apolloServer.applyMiddleware({ app } )

    app.listen(4000, () => {
        console.log('Server running');
    })
};

main().catch(err => {
    console.error(err);
});