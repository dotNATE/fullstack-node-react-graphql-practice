import {Arg, Ctx, Mutation, Query, Resolver} from "type-graphql";
import {Author} from "../entities/Author";
import {MyContext} from "../types";

@Resolver()
export class AuthorResolver {
    @Query(() => [Author])
    authors(@Ctx() {em}: MyContext): Promise<Author[]> {
        return em.find(Author, {});
    }

    @Query(() => Author, { nullable: true })
    author(
        @Arg('name', () => String) name: string,
        @Ctx() { em }: MyContext
    ): Promise<Author | null> {
        return em.findOne(Author, { name });
    }

    @Mutation(() => Author)
    async createAuthor(
        @Arg('name', () => String) name: string,
        @Ctx() { em }: MyContext
    ): Promise<Author> {
        const post = em.create(Author, {name})
        await em.persistAndFlush(post)
        return post
    }
}
