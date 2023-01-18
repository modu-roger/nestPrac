import {BadRequestException, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {EmailService} from "../email/email.service";
import * as crypto from "crypto";
import {EmailVerifyDto} from "./dto/email.verify.dto";

@Injectable()
export class UsersService {
  constructor(private readonly emailService: EmailService) {
  }
  async create(createUserDto: CreateUserDto) {
    const {email, name, password} = createUserDto
    const signupVerifyToken = crypto.randomUUID()

    if (this.checkUserExists(email)){
      throw new BadRequestException('already exist email')
    }

    await this.saveUser(email, name, password, signupVerifyToken).catch((err) => {
        throw new BadRequestException(err)
      }
    )
    return 'This action adds a new user';
  }

  async verifyEmail(emailVerifyDto: EmailVerifyDto){
    const {signupVerifyToken} = emailVerifyDto

    return signupVerifyToken
  }


  private checkUserExists(email: string): boolean{
    return false
  }

  private async saveUser(email: string, name:string, password:string, signupVerifyToken: string){
    console.log('saveUser')
    await this.saveMemberJoinEmail(email, signupVerifyToken)
    return true
  }

  private async saveMemberJoinEmail(email: string, signupVerifyToken: string){
    await this.emailService.sendMemberJoinVerification(email, signupVerifyToken)
  }


  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
