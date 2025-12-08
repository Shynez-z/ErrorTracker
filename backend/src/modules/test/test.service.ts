import { Service } from 'typedi';
import { Test } from '../../database/entities/test.js';
import { CreateTestDto } from './dto/create-test.dto.js';
import { UpdateTestDto } from './dto/update-test.dto.js';
import { DatabaseService } from '../../services/database.service.js';
import { BaseService } from '../../common/abstractions/base.service.js';

@Service()
export class TestService extends BaseService<Test, CreateTestDto, UpdateTestDto> {
    constructor(databaseService: DatabaseService) {
        super(databaseService, Test);
    }

    async findByName(name: string): Promise<Test | null> {
        const em = this.databaseService.getEntityManager();
        return em.getRepository(Test).findOne({ name });
    }

    
}
