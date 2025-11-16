import { IsAlphanumeric, IsEmail, IsNotEmpty } from 'class-validator';

export class TestPost {
  @IsNotEmpty()
  id!: number;
}

