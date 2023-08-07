import { Module } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegrafOptions } from '../../options/telegraf.options';

@Module({
  imports: [TelegrafModule.forRootAsync({ useClass: TelegrafOptions })],
  providers: [TelegramBotService],
})
export class TelegramBotModule {}
