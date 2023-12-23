import { Module, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FriendController } from './friend/friend.controller';
import { Friend } from './friend/friend.entity';
import { FriendService } from './friend/friend.service';
import { MailModule } from './mail/mail.module';
import { UsersController } from './users/users.controller';
import { Users } from './users/entity/users.entity';
import { UsersService } from './users/users.service';
import { Roles } from './users/entity/roles.entity';
import Post from './post/post.entity';
import FriendRequest from './friendRequest/friendRequest.entity';
import UserGroup from './userGroup/userGroup.entity';
import PostComment from './postComment/postConment.entity';
import PostEmotion from './postEmotion/postEmotion.entity';
import { Auth } from './auth/entity/auth.entity';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { RolesService } from './users/roles.service';
import { RolesController } from './users/roles.controller';


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
      isGlobal: true, // no need to import into other modules (env)
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'),
      }),
    })
  ],
  controllers: [ UsersController, FriendController, AuthController, RolesController],
  providers: [AppService, UsersService, FriendService, AuthService, RolesService],
})
export class AppModule {}
