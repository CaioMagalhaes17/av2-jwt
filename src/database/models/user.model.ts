import { Model, Table, Column, PrimaryKey, AutoIncrement } from "sequelize-typescript";
import { possiblePermissions } from "src/constants/permissions";

@Table({
  tableName: 'users',
  timestamps: false
})

export class User extends Model {
  @PrimaryKey
  @AutoIncrement

  @Column
  id: number

  @Column
  login: string

  @Column
  name: string

  @Column
  password: string

  @Column
  email: string

  @Column
  permissions: possiblePermissions
}