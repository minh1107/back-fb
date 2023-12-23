import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Common } from "../../common/common.entity";
import { Roles } from "./roles.entity";
import Post from "src/post/post.entity";
import { Friend } from "src/friend/friend.entity";
import FriendRequest from "src/friendRequest/friendRequest.entity";
import UserGroup from "src/userGroup/userGroup.entity";
import PostComment from "src/postComment/postConment.entity";
import PostEmotion from "src/postEmotion/postEmotion.entity";
import { Auth } from "src/auth/entity/auth.entity";

@Entity()
export class Users extends Common{  
    @PrimaryGeneratedColumn()
    user_id: number

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column({unique: true})
    email: string

    @Column({})
    password: string

    @Column({unique: true, nullable: true})
    phone: string

    @Column({nullable: true})
    avatar: string

    @Column({nullable: true})
    cover_image: string

    @Column({nullable: true})
    address: string

    @Column({nullable: true})
    school: string

    @Column({nullable: true})
    relation: boolean

    @Column({nullable: true})
    instagram: string

    @Column({nullable: true, type:"varchar"})
    website: string

    @Column({nullable: true})
    last_login: Date

    // Một user có nhiều session đăng nhập
    @OneToMany(() => Auth, auth => auth.user)
    session: Auth[]

    // mot nguoi nhiều role, 1 role có nhièu người
    @ManyToMany(() => Roles, role => role.users,  {
        onDelete: 'CASCADE',
      })
    @JoinTable()
    roles: Roles[]

    // bai viet co the gan the nhieu nguoi, nhieu nguoi co the gan the tren nhieu bai viet
    @ManyToMany(() => Post, post => post.tagged_user)
    @JoinTable()
    tagged_post: Post[];

    // user co nhieu bai viet 1 bai viet chi co 1 user
    @OneToMany(() => Post, post => post.owner) 
    @JoinTable({name: 'user_posts'})
    posts: Post[]

    // user co nhieu ban 1 ban, 1 ban co the thuoc nhieu user
    @ManyToMany(() => Friend, friend => friend.users)
    @JoinTable({name: 'users_friends'})
    friends: Friend[]

    // mot user co nhieu yeu cau ket ban, mot yeu cau ket ban chi thuoc  1 user
    @OneToMany(() => FriendRequest, user => user.users)
    @JoinTable({name: 'user_friendsRequests'})
    user_requested: FriendRequest[]

    // mot user co nhieu goup va mot goup co nhieu user
    @ManyToMany(() => UserGroup, group => group.users)
    @JoinTable({name: 'users_groups'})
    groups: UserGroup[]

    // quan he giua user va group: chủ group là ai?
    @OneToOne(() => UserGroup, group => group.owner)
    @JoinTable({name: 'user_group'})
    group: UserGroup

    // một user có thể comment nhiều comment - nhiều comment thuộc 1 user
    @OneToMany(() => PostComment, postComment => postComment.users)
    comments: PostComment[]

    // user co nhieu emotion, 1 emotion chi co the co 1 user
    @OneToMany(() => PostEmotion, postEmotion => postEmotion.users) 
    postEmotion: PostEmotion
}