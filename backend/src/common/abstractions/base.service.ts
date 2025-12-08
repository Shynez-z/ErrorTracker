import { EntityClass, EntityRepository } from "@mikro-orm/postgresql";
import { DatabaseService } from "../../services/database.service";
import { QueryDto } from "../dto/query.dto";


export abstract class BaseService<T extends object, CreateDto = any, UpdateDto = any> {

    protected repository!: EntityRepository<T>;

    constructor(
        protected databaseService: DatabaseService,
        protected entity: EntityClass<T>
    ){}

    async findAll(): Promise<T[]> {
        const em = this.databaseService.getEntityManager();
        return em.getRepository(this.entity).findAll() as Promise<T[]>;
    }

    async findById(id: number): Promise<T | null> {
        const em = this.databaseService.getEntityManager();
        return em.getRepository(this.entity).findOne({ id } as any) as Promise<T | null>;
    }

    async create(dto: CreateDto): Promise<T> {
        const em = this.databaseService.getEntityManager();
        const entity = em.create(this.entity, dto as any);
        await em.persistAndFlush(entity);
        return entity;
    }

    async update (id: number, dto: UpdateDto): Promise<T> {
        const em = this.databaseService.getEntityManager();
        const repository = em.getRepository(this.entity);
        const entity = await repository.findOne({ id } as any);
        if (!entity) {
            throw new Error('Entity not found');
        }
        em.assign(entity, dto as any);
        await em.persistAndFlush(entity);
        return entity;
    }

    async delete(id: number): Promise<boolean> {
        const em = this.databaseService.getEntityManager();
        const repository = em.getRepository(this.entity);
        const entity = await repository.findOne({ id } as any);
        if (!entity) {
            return false;
        }
        await em.removeAndFlush(entity);
        return true;
    }

    async pagedResults(page: number, limit: number): Promise<{ data: T[]; total: number; page: number; limit: number }> {
        const em = this.databaseService.getEntityManager();
        const repository = em.getRepository(this.entity);
        const [data, total] = await repository.findAndCount({}, {
            limit,
            offset: (page - 1) * limit,
        });
        return { data, total, page, limit };
    }

    async filteredResults(
        query: QueryDto,
        filters?: Record<string, any>
    ): Promise<{ data: T[]; total: number; page?: number; limit?: number }> {
        const em = this.databaseService.getEntityManager();
        const repository = em.getRepository(this.entity);

        const options: any = {};
        const orderBy: any = {};

        if (query.sortBy) {
            orderBy[query.sortBy] = query.order || 'ASC';
        }

        if (query.page && query.limit) {
            options.limit = query.limit;
            options.offset = (query.page - 1) * query.limit;
        }

        if (Object.keys(orderBy).length > 0) {
            options.orderBy = orderBy;
        }
        
        const [data, total] = await repository.findAndCount(filters || {}, options);

        const result: any = {
            data,
            total,
        };

        if (query.page && query.limit) {
            result.page = query.page;
            result.limit = query.limit;
        }

        return result;
    }


}