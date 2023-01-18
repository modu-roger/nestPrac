import { Module } from '@nestjs/common';
import {EmailService} from "./email.service";
import {ConfigService} from "@nestjs/config";

@Module({
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}
