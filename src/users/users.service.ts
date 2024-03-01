import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "./entity/users.entity";
import { MailService } from "../mail/mail.service";
import { getCurrentDate } from "src/utils/helper/getCurrentDate.helper";
import * as bcrypt from 'bcrypt'
import { Salt } from "src/utils/constant/bcrypt";
import { Roles } from "./entity/roles.entity";
import { RolesService } from "./roles.service";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        private readonly mailService: MailService,
        private readonly roleService: RolesService,
        @InjectRepository(Roles)
        private readonly rolesRepository: Repository<Roles>
    ) {}
    
    async getAllPolls(): Promise<Users[]> {
        return this.usersRepository.find();
    }

    async findOne(user_id: number): Promise<Users> {
        return this.usersRepository.findOne({ where: { user_id } });
      }

    async findByEmail(email: string):Promise<Users> {
        return this.usersRepository.findOne({where: {email}})
    }
    
    async create(user: Partial<Users>) {
        user.created_on = getCurrentDate()
        user.updated_at = getCurrentDate()
        const passwordHashed = await bcrypt.hash(user.password, Salt)
        const userFound = await this.usersRepository.findOne({where: {email: user.email}})
        if(!userFound) {
            const newUser = this.usersRepository.create({...user, password: passwordHashed, roles: []});
            const newRoles = this.rolesRepository.create({
                created_on: getCurrentDate(), updated_at: getCurrentDate(), role: 1, users: [newUser]
            }) 
            await this.rolesRepository.save(newRoles)
            newUser.roles = [newRoles]
            return await this.usersRepository.save(newUser)
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