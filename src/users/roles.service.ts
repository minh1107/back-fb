import { Injectable } from "@nestjs/common";
import { Roles } from "./entity/roles.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Roles)
        private readonly roleRepository: Repository<Roles>
    ) {}

    async create(roles: Partial<Roles>): Promise<Roles> {
        return this.roleRepository.create(roles)
    }

    async findAll() {
        return this.roleRepository.find()
    }
}