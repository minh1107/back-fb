import { Injectable } from "@nestjs/common";
import { Friend } from "./friend.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class FriendService {
    constructor(
        @InjectRepository(Friend)
        private readonly friendRepository: Repository<Friend>
    ) {}

    async getAllFriend(): Promise<Friend[]> {
        return this.friendRepository.find({relations: ['user_id', 'friend']})
    }
    
}