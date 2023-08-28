import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
  const params = useParams();
  const conversationId = useMemo(() => {
    const id = params?.conversationId as string;
    return id || "";
  }, [params]);
  const isOpen = useMemo(() => !!conversationId, [conversationId]);

  return {
    conversationId,
    isOpen,
  };
};
export default useConversation;
