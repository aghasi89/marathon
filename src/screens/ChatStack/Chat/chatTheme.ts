import type { DeepPartial, Theme } from 'stream-chat-react-native';
import { cloudBlue, primaryWhite, readedGreen } from '../../../assets/styles/colors.styles';

export const myMessageTheme: DeepPartial<Theme> = {
    messageSimple: {
        content: {
            containerInner: {
                backgroundColor: cloudBlue,
                borderColor: cloudBlue
            },
        },
        status: {
            checkIcon: {
                pathFill: readedGreen
            },
            checkAllIcon: {
                pathFill: readedGreen
            },
            readByCount: {
                color: primaryWhite
            }
        },
    },
};
