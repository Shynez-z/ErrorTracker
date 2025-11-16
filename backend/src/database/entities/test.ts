import { Entity, Property, Unique } from '@mikro-orm/core';

import { BaseEntity } from '../base-entity/baseEntity.js';

import { IsAlpha, IsEmail } from 'class-validator';

@Entity()
export class Test extends BaseEntity {
  
  constructor() {
    super();
  }
}