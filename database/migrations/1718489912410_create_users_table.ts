import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('entra_id').notNullable()
      table.string('name').notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('nick_name').notNullable()
      table.string('avatar_url').nullable()
      table.string('display_name').nullable()
      table.string('job_title').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
