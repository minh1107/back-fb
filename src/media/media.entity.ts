import { Common } from "src/common/common.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum typeMedia{
    IMAGE = 1,
    MP4 = 2,
    MP3 = 3
}

export enum beLongUser {
    user_post = 1,
    blog_post = 2,
    user_profile = 3
}

@Entity()
export default class Media extends Common{
    @PrimaryGeneratedColumn()
    media_id: number

    @Column({type: 'enum', enum: typeMedia})
    type: typeMedia

    @Column({type: 'enum', enum: beLongUser})
    belong: beLongUser

    @Column()
    link: string

    @Column()
    alt: string
}