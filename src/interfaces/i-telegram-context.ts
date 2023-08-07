interface IUpdateMessageFrom {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
}
interface IUpdateMessageChat {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  type: string;
}

interface IUpdate {
  update_id: number;
  message: {
    message_id: number;
    from: IUpdateMessageFrom;
    chat: IUpdateMessageChat;
    date: number;
    text: string;
    entities: any;
  };
}

export interface ITelegramContext {
  update: IUpdate;

  reply(text: string): Promise<void>;
}
