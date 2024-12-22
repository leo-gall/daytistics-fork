import { Inject, Injectable } from '@nestjs/common';
import nodemailer, { SendMailOptions } from 'nodemailer';
import * as fs from 'node:fs';
import { join } from 'node:path';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class MailService {
  private defaultHydrationData = {
    imprintLink: '',
    discordLink: '',
    githubLink: '',
    currentYear: new Date().getFullYear(),
    logoUrl: '',
  };

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  /**
   * Replaces placeholders in the given email template with corresponding values from the provided data object.
   *
   * @param template - The email template containing placeholders in the format `{{ key }}`.
   * @param data - An object containing key-value pairs where the key corresponds to the placeholder in the template.
   * @returns The email template with placeholders replaced by corresponding values from the data object.
   * @example
   * ```ts
   * const template = 'Hello, {{ name }}!';
   * const data = { name: 'John' };
   * const email = emailService.hydrateEmailTemplate(template, data);
   */
  private hydrateEmailTemplate(
    template: string,
    data: Record<string, any>,
  ): string {
    return template.replace(/{{\s*([^}]+)\s*}}/g, (match, key) => {
      return data[key] || match;
    });
  }

  async sendEmail(
    template: string,
    data: Record<string, any>,
    to: string,
    subject: string,
  ) {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Reads the file asynchronously and returns a promise
    const templatePath = join(__dirname, 'templates', template);
    const templateContent = await fs.promises.readFile(templatePath, 'utf8');

    const hydrationData = { ...this.defaultHydrationData, ...data };

    const email = this.hydrateEmailTemplate(templateContent, hydrationData);

    const mailOptions: SendMailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html: email,
    };

    return transporter.sendMail(mailOptions);
  }
}
