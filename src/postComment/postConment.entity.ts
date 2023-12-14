import Post from "src/post/post.entity";
import { Users } from "src/users/users.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class PostComment {
    @PrimaryGeneratedColumn()
    post_comment_id: number

    @Column()
    comment: string

    @Column()
    image: string

    @Column()
    video: string

    @ManyToOne(() => Users, (user) => user.comments)
    users: Users

    @ManyToOne(() => Post, Post => Post.post)
    comments: PostComment[]
}