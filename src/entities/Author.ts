import {Entity, PrimaryKey, Property} from "@mikro-orm/core";

@Entity()
export class Author {

    @PrimaryKey()
    name!: string;

    @Property()
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();

}