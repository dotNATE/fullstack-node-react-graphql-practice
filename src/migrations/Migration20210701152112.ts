import { Migration } from '@mikro-orm/migrations';

export class Migration20210701152112 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "author" ("name" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "author" add constraint "author_pkey" primary key ("name");');
  }

}
