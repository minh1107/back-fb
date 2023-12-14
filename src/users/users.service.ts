import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "./users.entity";
import { MailService } from "../mail/mail.service";
import { getCurrentDate } from "src/utils/helper/getCurrentDate.helper";

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
    
    async create(token, user: Partial<Users>) {
        // await this.mailService.sendUserConfirmation(user, '123')
        user.created_on = getCurrentDate()
        user.updated_at = getCurrentDate()
        const userFound = await this.usersRepository.findOne({where: {user_id: user.user_id}})
        console.log(userFound)
        if(!userFound) {
            const newuser = this.usersRepository.create(user);
            return this.usersRepository.save(newuser);
        } else return null
    }
    
    async update(user_id: number, user: Partial<Users>): Promise<Users> {
        await this.usersRepository.update(user_id, user);
        return this.usersRepository.findOne({ where: { user_id } });
    }
    
    async delete(user_id: number): Promise<void> {
        await this.usersRepository.delete(user_id);
    }
}