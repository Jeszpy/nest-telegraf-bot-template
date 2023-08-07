import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvEnum } from './enums';
import { getBotToken } from 'nestjs-telegraf';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  logger.verbose('Application launch start');

  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);
  const port = parseInt(configService.getOrThrow(EnvEnum.PORT), 10);
  const tgHookPath = configService.getOrThrow(EnvEnum.TELEGRAM_BOT_HOOK_PATH);

  const bot = app.get(getBotToken());
  app.use(bot.webhookCallback(tgHookPath));

  await app.listen(port, () => {
    logger.verbose(`App started at ${port} port`);
  });
}

bootstrap();
