import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateUserOrders1616993082338 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },

          { name: 'user_id', type: 'uuid' },
          { name: 'game_id', type: 'uuid' },

          { name: 'amount', type: 'number' },
          { name: 'purchased', type: 'boolean', default: false },

          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        name: 'fk_users_orders',
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        columnNames: ['game_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'games',
        name: 'fk_games_orders',
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'orders',
      'fk_games_orders',
    );

    await queryRunner.dropForeignKey(
      'orders',
      'fk_users_orders',
    );

    await queryRunner.dropTable('orders');
  }
}
