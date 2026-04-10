import { BASE_PROFILE_IMAGE_URL } from '../../utils/constants';

const formatTime = (time) => {
    if (!time) return "";
    return new Date(time).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
    });
};

const Message = ({ ownMsg, avatar, content, createdAt, showSeen }) => {
    return ownMsg ? (
        content === '❤️' ? (
            <div className="self-end flex flex-col items-end gap-1 max-w-xs">
                <span className="text-4xl">{content}</span>
                <span className="text-[11px] text-gray-400">{formatTime(createdAt)}</span>
                {showSeen && <span className="text-[11px] text-gray-500 font-medium">Seen</span>}
            </div>
        ) : (
            <div className="self-end flex flex-col items-end gap-1 max-w-xs">
                <span className="text-sm text-white bg-violet-600 px-4 py-3 rounded-3xl max-w-xs break-words">
                    {content}
                </span>
                <span className="text-[11px] text-gray-400">{formatTime(createdAt)}</span>
                {showSeen && <span className="text-[11px] text-gray-500 font-medium">Seen</span>}
            </div>
        )
    ) : content === '❤️' ? (
        <div className="flex flex-col items-start gap-1 max-w-xs">
            <div className="flex items-end gap-2 max-w-xs">
                <img
                    draggable="false"
                    className="w-7 h-7 rounded-full object-cover"
                    src={BASE_PROFILE_IMAGE_URL + avatar}
                    alt="avatar"
                />
                <span className="items-end text-4xl">{content}</span>
            </div>
            <span className="text-[11px] text-gray-400 ml-9">{formatTime(createdAt)}</span>
        </div>
    ) : (
        <div className="flex flex-col items-start gap-1 max-w-xs">
            <div className="flex items-end gap-2 max-w-xs">
                <img
                    draggable="false"
                    className="w-7 h-7 rounded-full object-cover"
                    src={BASE_PROFILE_IMAGE_URL + avatar}
                    alt="avatar"
                />
                <span className="px-4 py-3 text-sm bg-gray-200 rounded-3xl max-w-xs overflow-hidden break-words">
                    {content}
                </span>
            </div>
            <span className="text-[11px] text-gray-400 ml-9">{formatTime(createdAt)}</span>
        </div>
    );
};

export default Message;