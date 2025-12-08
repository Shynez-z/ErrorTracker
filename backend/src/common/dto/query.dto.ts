import { IsString, IsOptional, IsNumber, Min } from 'class-validator';

export class QueryDto {
    @IsNumber()
    @IsOptional()
    @Min(1)
    page?: number;

    @IsNumber()
    @IsOptional()
    @Min(1)
    limit?: number;

    @IsString()
    @IsOptional()
    sortBy?: string;

    @IsString()
    @IsOptional()
    order?: 'ASC' | 'DESC';
}
