import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { NodeEnvEnum } from './enums';
import { TelegramBotModule } from './modules/telegram-bot/telegram-bot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid(
            NodeEnvEnum.PRODUCTION,
            NodeEnvEnum.DEVELOPMENT,
            NodeEnvEnum.TESTING,
          )
          .default(NodeEnvEnum.PRODUCTION),
        PORT: Joi.number().required(),
        TELEGRAM_BOT_TOKEN: Joi.string().required(),
        TELEGRAM_BOT_DOMAIN: Joi.string().required(),
        TELEGRAM_BOT_HOOK_PATH: Joi.string().required(),
      }),
    }),
    TelegramBotModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
