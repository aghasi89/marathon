
import { MessageResponse } from 'stream-chat';

const generateChatGPTList = (list: MessageResponse[], attemptCount: number, id: number) => {
    const result = []
    let newList = [...list];
    do {
        const item = newList.pop()
        if (item?.text?.trim() !== '' || (item?.attachments && item?.attachments.length > 0)) {
            result.push(item);
        }
        if (item?.user?.id != id.toString()) {
            attemptCount--;
        } else {
            if (result.length === 1) {
                result.unshift({
                    user: {
                        id: id
                    },
                    text: "?"
                })
            }
        }
    } while (attemptCount && newList.length);
    return result
}
export default generateChatGPTList