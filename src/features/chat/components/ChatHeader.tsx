import { useAppSelector } from '@/app/hooks';

import { selectSelectedChatId } from '../chatSlice';
import {
  selectParticipantById,
  selectParticipantsByChatId,
} from '@/features/participants/participantsSlice';
import { selectChatRoomById } from '@/features/chatRooms/chatRoomsSlice';

import { FaEllipsis } from 'react-icons/fa6';
import UserIcon from '@/components/general/UserIcon';
import IconButton from '@/components/general/IconButton';
import ChatTitle from '@/components/general/ChatTitle';
import useNonAuthUserIds from '@/hooks/useNonAuthUserParticipants';

const ChatHeader = () => {
  const selectedChatId = useAppSelector(selectSelectedChatId) as string;

  const chat = useAppSelector(selectChatRoomById(selectedChatId));
  const participants = useAppSelector(
    selectParticipantsByChatId(selectedChatId),
  );
  const nonAuthParticipants = useNonAuthUserIds(participants);
  const firstUser = useAppSelector(
    selectParticipantById(selectedChatId, nonAuthParticipants[0]),
  );

  return (
    <header className="flex items-center justify-between border-b p-4 shadow-[0_2px_4px_-2px_rgb(0,0,0,0.1)]">
      {firstUser && (
        <>
          <div className="flex items-center gap-2">
            <UserIcon
              isOnline={firstUser.is_online}
              src={firstUser.profile_image}
            />
            <div>
              {chat?.name && <ChatTitle title={chat.name} />}
              <p className="text-sm text-gray-500">
                {firstUser.is_online ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
          <IconButton aria-label="chat-options" className="text-sky-500">
            <FaEllipsis />
          </IconButton>
        </>
      )}
    </header>
  );
};

export default ChatHeader;
