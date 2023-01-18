import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ApiController } from './api/api.controller';
import { ApiModule } from './api/api.module';
import { EmailService } from './email/email.service';
import {ConfigModule} from "@nestjs/config";
import { EmailModule } from './email/email.module';

@Module({
  imports: [UsersModule, ApiModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env'
  }), EmailModule],
  controllers: [AppController, ApiController],
  providers: [AppService, EmailService],
})
export class AppModule {}
