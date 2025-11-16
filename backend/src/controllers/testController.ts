import { Get, JsonController } from "routing-controllers";
import { ResponseSchema } from "routing-controllers-openapi";
import { Service } from "typedi";
import { AppService } from "../services/appService.js";
import { Test } from "../database/entities/test.js";
@JsonController('/tests')
@Service() 
export class TestController {
  constructor(public appService: AppService) {}
  
  @Get('/', { transformResponse: false })
  @ResponseSchema(Test)
  async getAll(): Promise<Test[]> {
    const em = this.appService.getEntityManager();
    const result = await (
      em.getRepository<Test>('Test').findAll()
    )
    return result;
  }


}