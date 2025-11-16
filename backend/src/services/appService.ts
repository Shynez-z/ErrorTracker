import { Service } from 'typedi';
import { MikroORM, EntityManager } from '@mikro-orm/core';
import express from 'express';
import { DI } from '../di-container.js';

@Service()
export class AppService {
  getOrm(): MikroORM {
    return DI.orm;
  }
  getEntityManager(): EntityManager {
    return DI.orm.em.fork();
  }
  getServer(): express.Express {
    return DI.server;
  }
}