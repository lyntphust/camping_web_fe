import useMutation from "../useMutation";
import useQuery from "../useQuery";

interface Message {
  role: "bot" | "user";
  content: string | React.ReactNode;
}

export default function useChatBot(sessionId?: string) {
  const { data, refetch } = useQuery<Message[]>(`/chatbot/${sessionId}`);
  const { doMutate: sendMessage } = useMutation("/chatbot");

  return {
    history: data,
    refetch,
    sendMessage,
  };
}
