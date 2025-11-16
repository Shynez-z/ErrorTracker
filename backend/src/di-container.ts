import { MikroORM } from '@mikro-orm/core';
import express from 'express';

export const DI = {} as {
  orm: MikroORM;
  server: express.Express;
};
