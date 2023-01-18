import {Controller, Get} from '@nestjs/common';

@Controller({host: 'api.example.com'})
export class ApiController {
  @Get()
  getExample(){
    return 'api.example.com'
  }
}
