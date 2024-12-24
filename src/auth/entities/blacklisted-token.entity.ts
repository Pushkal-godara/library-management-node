import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'blacklisted_tokens',
  timestamps: true,
})

export class BlacklistedToken extends Model {
  @Column({
    type: DataType.STRING(500),
    allowNull: false,
    unique: true,
  })
  token: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  blacklistedAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  expiresAt: Date;
}