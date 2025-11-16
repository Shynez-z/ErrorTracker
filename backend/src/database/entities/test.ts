import { Entity, Property, Unique } from '@mikro-orm/core';

import { BaseEntity } from '../base-entity/base-entity.js';

import { IsAlpha, IsEmail } from 'class-validator';

@Entity()
export class Test extends BaseEntity {
  
  /*
  TODO: Añado una propiedad más por que si no al ser una  propiedad vacía que hereda del baseEntity, no es capaz de resolverlo dentro de 
  swagger y da un error de que no puede generar el PATH.200 al no contener nada.
  */ 
  
  @Property()
  @IsAlpha()
  name!: string;

  constructor() {
    super();
  }
}