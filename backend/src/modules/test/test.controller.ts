import {
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    JsonController,
    HttpCode,
    NotFoundError
} from 'routing-controllers';
import { ResponseSchema, OpenAPI } from 'routing-controllers-openapi';
import { Service } from 'typedi';
import { TestService } from './test.service.js';
import { Test } from '../../database/entities/test.js';
import { CreateTestDto } from './dto/create-test.dto.js';
import { UpdateTestDto } from './dto/update-test.dto.js';

@JsonController('/tests')
@Service()
export class TestController {
    constructor(private testService: TestService) { }

    @Get('/')
    @OpenAPI({ summary: 'Get all tests', description: 'Retrieve a list of all test entities' })
    @ResponseSchema(Test, { isArray: true })
    async getAll(): Promise<Test[]> {
        return this.testService.findAll();
    }

    @Get('/:id')
    @OpenAPI({ summary: 'Get test by ID', description: 'Retrieve a single test entity by its ID' })
    @ResponseSchema(Test)
    async getById(@Param('id') id: number): Promise<Test> {
        const test = await this.testService.findById(id);
        if (!test) {
            throw new NotFoundError(`Test with id ${id} not found`);
        }
        return test;
    }

    @Post('/')
    @HttpCode(201)
    @OpenAPI({ summary: 'Create a new test', description: 'Create a new test entity' })
    @ResponseSchema(Test)
    async create(@Body() dto: CreateTestDto): Promise<Test> {
        return this.testService.create(dto);
    }

    @Put('/:id')
    @OpenAPI({ summary: 'Update a test', description: 'Update an existing test entity' })
    @ResponseSchema(Test)
    async update(
        @Param('id') id: number,
        @Body() dto: UpdateTestDto
    ): Promise<Test> {
        const test = await this.testService.update(id, dto);
        if (!test) {
            throw new NotFoundError(`Test with id ${id} not found`);
        }
        return test;
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
