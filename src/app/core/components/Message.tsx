// components/useMessage.tsx
import { message } from "antd";

export type MessageType = 'success' | 'error' | 'warning';

export function useGlobalMessage() {
  const [messageApi, contextHolder] = message.useMessage();

  const openMessage = (type: MessageType, content: string) => {
    messageApi.open({ type, content });
  };

  return { openMessage, contextHolder };
}
