// components/chat/ConversationList.tsx
import { cn } from "@/lib/utils";
import { Conversation } from "@/schema/schema";

type Props = {
  conversations: Conversation[];
  currentUserName: string;
  selectedConversationId: number;
  onSelect: (conversationId: number) => void;
};

const ConversationList = ({
  conversations,
  currentUserName,
  selectedConversationId,
  onSelect,
}: Props) => {
  return (
    <div className="w-full md:w-1/3 border-r border-muted h-full overflow-y-auto">
      {conversations.map((conversation) => {
        const isCreator = conversation.helpCreatorName === currentUserName;
        const displayName = isCreator
          ? conversation.offererName
          : conversation.helpCreatorName;
        const displayImage = isCreator
          ? conversation.offererImageUrl
          : conversation.helpCreatorImageUrl;

        const isSelected =
          conversation.conversationId === selectedConversationId;

        return (
          <div
            key={conversation.conversationId}
            onClick={() => onSelect(conversation.conversationId)}
            className={cn(
              "cursor-pointer p-4 flex items-center gap-4 hover:bg-muted transition",
              isSelected && "bg-muted"
            )}
          >
            <img
              src={displayImage}
              alt={displayName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">{displayName}</p>
              <p className="text-sm text-muted-foreground truncate">
                {conversation.helpTitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ConversationList;
