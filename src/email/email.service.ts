import {Inject, Injectable} from '@nestjs/common';
import * as nodemailer from 'nodemailer'
import * as process from "process";
import {ConfigService} from "@nestjs/config";
import Mail from "nodemailer/lib/mailer";
import {MailOptions} from "nodemailer/lib/sendmail-transport";

@Injectable()
export class EmailService {
  private transporter: Mail
  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: configService.get('email'),
        pass: configService.get('pass')
      }
    })
  }

  async sendMemberJoinVerification(emailAddress: string, signupVerifyToken: string) {
    const baseURL = this.configService.get('URL')
    const url = `${baseURL}/users/email-verify?signupVerifyToken=${signupVerifyToken}`

    const mailOptions: MailOptions = {
      to: emailAddress,
      subject: 'mail auth',
      html: `<form action=${url} method="POST">
                <button>확인</button>
            </form>`
    }

    await this.transporter.sendMail(mailOptions)
  }
}
