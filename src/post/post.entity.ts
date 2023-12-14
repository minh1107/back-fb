import { Common } from "src/common/common.entity";
import PostComment from "src/postComment/postConment.entity";
import PostEmotion, { emotion } from "src/postEmotion/postEmotion.entity";
import { Users } from "src/users/users.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Post extends Common {
    @PrimaryGeneratedColumn()
    post_id: number

    @Column()
    type: number

    @Column()
    title: string

    @Column()
    content: string

    @ManyToMany(() => Users, user => user.tagged_post)
    @JoinTable({ name: 'user_tagged' })
    tagged_user: Users[];

    @ManyToOne(() => Users, user => user.posts)
    owner: Users

    @OneToMany(() => PostComment, postComment => postComment.comment)
    post: PostComment

    @OneToOne(() => PostEmotion, postEmotion => postEmotion.post)
    emotion: PostEmotion
}