import { ChatbotRole } from "@/types";
import useMutation from "../useMutation";
import useQuery from "../useQuery";

interface Message {
  role: ChatbotRole;
  content: string | React.ReactNode;
}

export default function useChatbot(sessionId?: string) {
  const { data, refetch } = useQuery<Message[]>(`/chatbot/${sessionId}`);
  const { doMutate: sendMessage } = useMutation("/chatbot");

  return {
    history: data,
    refetch,
    sendMessage,
  };
}
