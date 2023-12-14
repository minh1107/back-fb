import { Module, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { FriendController } from './friend/friend.controller';
import { Friend } from './friend/friend.entity';
import { FriendService } from './friend/friend.service';
import { MailModule } from './mail/mail.module';
import { UsersController } from './users/users.controller';
import { Users } from './users/users.entity';
import { UsersService } from './users/users.service';
import { Roles } from './users/roles.entity';
import Post from './post/post.entity';
import FriendRequest from './friendRequest/friendRequest.entity';
import UserGroup from './userGroup/userGroup.entity';
import PostComment from './postComment/postConment.entity';
import PostEmotion from './postEmotion/postEmotion.entity';
import { Auth } from './auth/entity/auth.entity';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'minh123',
      database: 'facebook',
      entities: [ Users, Friend,Auth, Roles, Post, FriendRequest ,UserGroup, PostComment, PostEmotion],
      synchronize: true,
      autoLoadEntities: true
    }),
    TypeOrmModule.forFeature([Users,Auth,  Friend, Roles, Post, FriendRequest, UserGroup, PostComment, PostEmotion]),
    MailModule,
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
  ],
  controllers: [ UsersController, FriendController, AuthController],
  providers: [AppService, UsersService, FriendService, AuthService],
})
export class AppModule {}
