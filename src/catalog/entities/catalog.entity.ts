import { Table, Column, Model, DataType, AllowNull } from "sequelize-typescript";

@Table({
    tableName: 'catalog',
    timestamps: true
})
export class Catalog extends Model<Catalog> {
    
    // Organizes books into categories for easy searching by users.

    @Column({
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true
    })
    catalog_id: number;

    @Column({
        type: DataType.STRING
    })
    description: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING   // Fiction or Science or Novel etc...
    })
    catagory: string;

}