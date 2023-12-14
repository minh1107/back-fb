import Post from "src/post/post.entity";
import PostComment from "src/postComment/postConment.entity";
import { Users } from "src/users/users.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum emotion {
    like= 0,
    love = 1,
    love_love = 2,
    ha_ha = 3,
    wow = 4,
    sad = 5,
    angry = 6
}

@Entity()
export default class PostEmotion {
    @PrimaryGeneratedColumn()
    post_emotion_id: number

    @Column({type: 'enum', enum: emotion})
    type: number

    // nhieu post emotion thuoc 1 post co nhieu user
    @ManyToOne(() => Users, user => user.postEmotion)
    users: PostEmotion[]

    // mot 
    @OneToOne(() => Post, Post => Post.emotion)
    post: PostComment
}

// Một post sẽ gồm một emotion của 1 user 