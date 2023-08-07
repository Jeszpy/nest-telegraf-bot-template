import { TelegrafModuleOptions, TelegrafOptionsFactory } from 'nestjs-telegraf';
import { ConfigService } from '@nestjs/config';
import { EnvEnum, NodeEnvEnum } from '../enums';
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import ngrok from 'ngrok';

@Injectable()
export class TelegrafOptions
  implements TelegrafOptionsFactory, OnModuleDestroy
{
  constructor(private readonly configService: ConfigService) {}
  async onModuleDestroy() {
    const nodeEnv = this.configService.getOrThrow(EnvEnum.NODE_ENV);

    if (nodeEnv === NodeEnvEnum.DEVELOPMENT) {
      await ngrok.disconnect();
      return;
    }
  }
  async createTelegrafOptions(): Promise<TelegrafModuleOptions> {
    const defaultOptions = {
      token: this.configService.getOrThrow<string>(EnvEnum.TELEGRAM_BOT_TOKEN),
      launchOptions: {
        webhook: {
          domain: this.configService.getOrThrow<string>(
            EnvEnum.TELEGRAM_BOT_DOMAIN,
          ),
          hookPath: this.configService.getOrThrow<string>(
            EnvEnum.TELEGRAM_BOT_HOOK_PATH,
          ),
        },
      },
    };

    const nodeEnv = this.configService.getOrThrow(EnvEnum.NODE_ENV);

    if (nodeEnv === NodeEnvEnum.DEVELOPMENT) {
      const port = parseInt(this.configService.getOrThrow(EnvEnum.PORT), 10);
      defaultOptions.launchOptions.webhook.domain = await ngrok.connect({
        addr: port,
        region: 'eu',
      });
    }

    return defaultOptions;
  }
}
