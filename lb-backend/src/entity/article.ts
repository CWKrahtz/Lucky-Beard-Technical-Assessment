import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Article{
    
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({length: 255})
    author: String = "Unknown";

    @Column({length: 255})
    title: String = "Blank";

    @Column()
    published_at: String = "dd/mm/yyyy";

    @Column({length: 255})
    category: String = "None";

    @Column({type: "text"})
    image: String = "";

    @Column({type: "text"})
    content: String = "No Content";

}