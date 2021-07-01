import { MikroORM } from '@mikro-orm/core';
import { Author } from "./entities/Author";
import config from './mikro-orm.config';

const main = async () => {
    const orm = await MikroORM.init(config);
    await orm.getMigrator().up();

    // const post = orm.em.create(Author, {name: 'my second author'});
    // await orm.em.persistAndFlush(post);

    const posts = await orm.em.find(Author, {});
    console.log(posts);
}

main().catch(err => {
    console.error(err);
});

