import { Start, Update } from 'nestjs-telegraf';
import { ITelegramContext } from '../../interfaces/i-telegram-context';

@Update()
export class TelegramBotService {
  @Start()
  async start(ctx: ITelegramContext) {
    const { from, chat } = ctx.update.message;
    console.log(from);
    console.log(chat);
    await ctx.reply('Hello from nest-telegraf-bot-template');
    return;
  }
}
