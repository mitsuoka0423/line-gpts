import { TextEventMessage, TextMessage } from "@line/bot-sdk";

export const execute = async (textEventMessage: TextEventMessage): Promise<TextMessage[]> => {
  return [{
    type: 'text',
    text: textEventMessage.text,
  }];
};
