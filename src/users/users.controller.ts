import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Users } from "./users.entity";
import { createUserDto } from "./dto/create-user.dto";
import { MailService } from "../mail/mail.service";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Get()
    getAllUser() {
        return this.usersService.getAllPolls()
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Users> {
      const user = await this.usersService.findOne(id);
      if (!user) {
        throw new NotFoundException('User does not exist!');
      } else {
        return user;
      }
    }
    //create user
    // @Post()
    // async create(@Body() user: createUserDto) {
    //   return this.usersService.create(user);
    // }
  
    //update user
    @Put(':id')
    async update (@Param('id') id: number, @Body() user: Users): Promise<any> {
      return this.usersService.update(id, user);
    }
  
    //delete user
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
      //handle error if user does not exist
      const user = await this.usersService.findOne(id);
      if (!user) {
        throw new NotFoundException('User does not exist!');
      }
      return this.usersService.delete(id);
    }
  }
    