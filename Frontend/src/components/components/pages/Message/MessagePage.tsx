// Updated MessagePage.tsx
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useQuery } from "@tanstack/react-query";
import { getAllConversations } from "@/services/apiService";
import { MessageCircleOff } from "lucide-react";
import NoHelpOfferFound from "../MyDetailHelpRequests/NoHelpOfferFound";
import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";
import Error from "../../Error";
import { useMediaQuery } from "@/hooks/useMediaQuery";

function MessagePage() {
  useAuth();
  const user = useCurrentUser();
  const isMdUp = useMediaQuery("(min-width: 768px)");

  const {
    data: conversations,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["message", user?.id],
    queryFn: getAllConversations,
    enabled: !!user,
  });

  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    if (!isMdUp) return; // 👈 important: skip on mobile
    if (conversations && conversations.length > 0 && selectedId === null) {
      setSelectedId(conversations[0].conversationId);
    }
  }, [conversations, selectedId, isMdUp]);

  if (isLoading) return <p>Loading</p>;
  if (!conversations || isError) return <Error onRetry={() => {}} />;
  if (!user) return null;

  if (conversations.length === 0) {
    return (
      <>
        <div className="flex flex-col items-center justify-center pt-4 text-center space-y-4">
          <MessageCircleOff className="text-muted-foreground h-20 w-20" />
        </div>
        <NoHelpOfferFound
          title="No Messages Yet"
          message="You haven't received any messages yet. Once someone reaches out, their messages will appear here."
          classname="pt-4"
        />
      </>
    );
  }

  const selectedConversation = conversations.find(
    (c) => c.conversationId === selectedId
  );

  const helpTitle = selectedConversation?.helpTitle ?? "";
  const isCreator = selectedConversation?.helpCreatorName === user.name;
  const chatPartnerName = isCreator
    ? selectedConversation?.offererName
    : selectedConversation?.helpCreatorName;

  if (!isMdUp) {
    return (
      <div className="flex flex-col h-[calc(100vh-6rem)] border rounded-lg shadow-sm overflow-hidden">
        {!selectedId ? (
          <ConversationList
            conversations={conversations}
            currentUserName={user.name}
            selectedConversationId={selectedId ?? -1}
            onSelect={(id) => setSelectedId(id)}
          />
        ) : (
          <ChatWindow
            conversationId={selectedId}
            helpTitle={helpTitle}
            chattingWith={chatPartnerName ?? ""}
            onBack={() => setSelectedId(null)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-6rem)] border rounded-lg shadow-sm overflow-hidden">
      <ConversationList
        conversations={conversations}
        currentUserName={user.name}
        selectedConversationId={selectedId ?? -1}
        onSelect={(id) => setSelectedId(id)}
      />
      {selectedId !== null && selectedConversation ? (
        <ChatWindow
          conversationId={selectedId}
          helpTitle={helpTitle}
          chattingWith={chatPartnerName ?? ""}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          Select a conversation
        </div>
      )}
    </div>
  );
}

export default MessagePage;
