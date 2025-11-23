import { Service } from 'typedi';
import { Test } from '../../database/entities/test.js';
import { CreateTestDto } from './dto/create-test.dto.js';
import { UpdateTestDto } from './dto/update-test.dto.js';
import { DatabaseService } from '../../services/database.service.js';

@Service()
export class TestService {
    constructor(private databaseService: DatabaseService) { }

    async findAll(): Promise<Test[]> {
        const em = this.databaseService.getEntityManager();
        return em.getRepository(Test).findAll();
    }

    async findById(id: number): Promise<Test | null> {
        const em = this.databaseService.getEntityManager();
        return em.getRepository(Test).findOne({ id });
    }

    async findByName(name: string): Promise<Test | null> {
        const em = this.databaseService.getEntityManager();
        return em.getRepository(Test).findOne({ name });
    }

    async create(dto: CreateTestDto): Promise<Test> {
        const em = this.databaseService.getEntityManager();
        const test = new Test();
        em.assign(test, dto);
        await em.persistAndFlush(test);
        return test;
    }

    async update(id: number, dto: UpdateTestDto): Promise<Test | null> {
        const em = this.databaseService.getEntityManager();
        const test = await em.getRepository(Test).findOne({ id });

        if (!test) return null;

        em.assign(test, dto);
        await em.flush();
        return test;
    }

    async delete(id: number): Promise<boolean> {
        const em = this.databaseService.getEntityManager();
        const test = await em.getRepository(Test).findOne({ id });

        if (!test) return false;

        await em.removeAndFlush(test);
        return true;
    }

    async count(): Promise<number> {
        const em = this.databaseService.getEntityManager();
        return em.getRepository(Test).count();
    }
}
