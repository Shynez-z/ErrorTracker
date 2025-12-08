import {
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    JsonController,
    HttpCode,
    NotFoundError,
    QueryParams
} from 'routing-controllers';
import { ResponseSchema, OpenAPI } from 'routing-controllers-openapi';
import { Service } from 'typedi';
import { TestService } from './test.service.js';
import { CreateTestDto } from './dto/create-test.dto.js';
import { UpdateTestDto } from './dto/update-test.dto.js';
import { TestResponseDto } from './dto/test.response.dto.js';
import { TestMapper } from './mappers/test.mapper.js';
import { QueryDto } from '../../common/dto/query.dto.js';

@JsonController('/tests')
@Service()
export class TestController {
    constructor(private testService: TestService) { }

    @Get('/')
    @OpenAPI({ summary: 'Get all tests', description: 'Retrieve a list of all test entities' })
    @ResponseSchema(TestResponseDto, { isArray: true })
    async getAll(): Promise<TestResponseDto[]> {
        const tests = await this.testService.findAll();
        return TestMapper.toDtos(tests);
    }

    @Get('/filtered')
    @OpenAPI({ summary: 'Get filtered tests', description: 'Retrieve tests with filtering, pagination and sorting' })
    async getFiltered(@QueryParams() query: QueryDto): Promise<any> {
        const result = await this.testService.filteredResults(query);
        return TestMapper.toPaginatedDto(result);
    }

    @Get('/:id')
    @OpenAPI({ summary: 'Get test by ID', description: 'Retrieve a single test entity by its ID' })
    @ResponseSchema(TestResponseDto)
    async getById(@Param('id') id: number): Promise<TestResponseDto> {
        const test = await this.testService.findById(id);
        if (!test) {
            throw new NotFoundError(`Test with id ${id} not found`);
        }
        return TestMapper.toDto(test);
    }

    @Post('/')
    @HttpCode(201)
    @OpenAPI({ summary: 'Create a new test', description: 'Create a new test entity' })
    @ResponseSchema(TestResponseDto)
    async create(@Body() dto: CreateTestDto): Promise<TestResponseDto> {
        const createdTest = await this.testService.create(dto);
        return TestMapper.toDto(createdTest);
    }

    @Put('/:id')
    @OpenAPI({ summary: 'Update a test', description: 'Update an existing test entity' })
    @ResponseSchema(TestResponseDto)
    async update(
        @Param('id') id: number,
        @Body() dto: UpdateTestDto
    ): Promise<TestResponseDto> {
        const test = await this.testService.update(id, dto);
        if (!test) {
            throw new NotFoundError(`Test with id ${id} not found`);
        }
        return TestMapper.toDto(test);
    }

    @Delete('/:id')
    @HttpCode(204)
    @OpenAPI({ summary: 'Delete a test', description: 'Delete a test entity by its ID' })
    async delete(@Param('id') id: number): Promise<void> {
        const deleted = await this.testService.delete(id);
        if (!deleted) {
            throw new NotFoundError(`Test with id ${id} not found`);
        }
    }
}
