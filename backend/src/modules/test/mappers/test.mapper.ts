import { Test } from '../../../database/entities/test.js';
import { TestResponseDto } from '../dto/test.response.dto.js';

export class TestMapper {
    static toDto(entity: Test): TestResponseDto {
        return {
            id: entity.id,
            name: entity.name,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }

    static toDtos(entities: Test[]): TestResponseDto[] {
        return entities.map(e => this.toDto(e));
    }

    static toPaginatedDto(result: {
        data: Test[];
        total: number;
        page?: number;
        limit?: number;
    }): {
        data: TestResponseDto[];
        total: number;
        page?: number;
        limit?: number;
    } {
        const mapped: any = {
            data: this.toDtos(result.data),
            total: result.total,
        };
        
        if (result.page !== undefined) {
            mapped.page = result.page;
        }
        
        if (result.limit !== undefined) {
            mapped.limit = result.limit;
        }
        
        return mapped;
    }
}
