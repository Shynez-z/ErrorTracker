import { Property } from '@mikro-orm/core';
import { IsAlpha, IsAlphanumeric, IsEmail, IsNotEmpty } from 'class-validator';

export class TestPost {
    @Property()
    @IsAlpha()
    name!: string;
}

