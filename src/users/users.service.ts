import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "./users.entity";
import { MailService } from "../mail/mail.service";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        private readonly mailService: MailService
    ) {}
    
    async getAllPolls(): Promise<Users[]> {
        return this.usersRepository.find();
    }

    async findOne(user_id: number): Promise<Users> {
        return this.usersRepository.findOne({ where: { user_id } });
      }
    
    async create(user: Partial<Users>) {
        await this.mailService.sendUserConfirmation(user, '123')

        const newuser = this.usersRepository.create(user);
        return this.usersRepository.save(newuser);
    }
    
    async update(user_id: number, user: Partial<Users>): Promise<Users> {
        await this.usersRepository.update(user_id, user);
        return this.usersRepository.findOne({ where: { user_id } });
    }
    
    async delete(user_id: number): Promise<void> {
        await this.usersRepository.delete(user_id);
    }
}