import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// The name provided here will be used as the table name in the db
@Entity({ name: "users" })
export class User {
    // This decorator indicates that field will be an auto-incrementing numeric value (auto-generated)
    // Equivalent to the primary key for a SQL table
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    // In order for the property to map to an actual column in SQL table, the @Column decorator must be used
    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    // If a unique constraint needs to be added, simply use @Column({ unique: true })
    @Column()
    password: string;

    // A default value can be set as follows @Column({ default: new Date() })
    // In the above example new Date() retrieves the current date)
    @Column()
    createdAt: Date;

    // A nullable property allows the field to be null as default if no value is passed (i.e. optional)
    @Column({ nullable: true })
    authStrategy: string;
}
