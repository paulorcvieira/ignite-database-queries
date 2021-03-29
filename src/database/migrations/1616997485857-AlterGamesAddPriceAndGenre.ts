import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export default class AlterGamesAddPriceAndGenre1616997485857
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'games',
      new TableColumn({
        name: 'price',
        type: 'decimal',
        precision: 10,
        scale: 2,
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'games',
      new TableColumn({
        name: 'genre_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'games',
      new TableForeignKey({
        columnNames: ['genre_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'genres',
        name: 'fk_genres_games',
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'games',
      'fk_genres_orders',
    );

    await queryRunner.dropColumn('games', 'genre_id');

    await queryRunner.dropColumn('games', 'price');
  }
}
