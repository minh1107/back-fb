import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Users } from '../users/entity/users.entity';
import { createUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: Partial<Users>, url: string) {
    // const url = `example.com/auth/confirm?token=${token}`;
  const check =  await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './register', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        name: user.first_name + user.last_name,
        url,
      },
    });
    if(check) return check
    else return false
  }
}
