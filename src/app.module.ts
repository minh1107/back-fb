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


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'minh123',
      database: 'facebook',
      entities: [ Users, Friend],
      synchronize: true,
      autoLoadEntities: true
    }),
    TypeOrmModule.forFeature([Users, Friend]),
    MailModule,
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
  ],
  controllers: [ UsersController, FriendController],
  providers: [AppService, UsersService, FriendService],
})
export class AppModule {}
