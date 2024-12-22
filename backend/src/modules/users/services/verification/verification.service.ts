import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailService } from '../../../../common/services/mail/mail.service';

interface VerificationEntry {
  code: string;
  expiresAt: Date;
}

@Injectable()
export class VerificationService {
  private verificationCodes: Map<string, VerificationEntry> = new Map();

  constructor(private readonly mailService: MailService) {}

  // Generate a 3-digit verification code
  generateVerificationCode(): string {
    return Math.floor(100 + Math.random() * 900).toString();
  }

  // Store the code with the user's email and expiration time
  storeVerificationCode(email: string, code: string): void {
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
    this.verificationCodes.set(email, { code, expiresAt });
  }

  // Send the verification code to the user's email
  async sendVerificationCode(to: string, code: string): Promise<void> {
    this.mailService.sendEmail(
      'account-verification.html',
      { code },
      to,
      'Your Verification Code',
    );

    // await transporter.sendMail({
    //   from: 'your-email@gmail.com',
    //   to: email,
    //   subject: 'Your Verification Code',
    //   text: `Your verification code is: ${code}`,
    // });
  }

  // Verify the code entered by the user
  verifyCode(email: string, code: string): boolean {
    const entry = this.verificationCodes.get(email);

    if (!entry) {
      return false;
    }

    const { code: storedCode, expiresAt } = entry;

    if (new Date() > expiresAt) {
      this.verificationCodes.delete(email);
      return false;
    }

    return storedCode === code;
  }

  // Cron job to clean up expired codes
  @Cron(CronExpression.EVERY_MINUTE)
  handleCron() {
    const now = new Date();
    for (const [email, entry] of this.verificationCodes.entries()) {
      if (entry.expiresAt <= now) {
        this.verificationCodes.delete(email);
      }
    }
  }
}
