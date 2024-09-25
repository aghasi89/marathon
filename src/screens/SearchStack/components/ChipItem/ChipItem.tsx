import React from "react";
import { Pressable, View, ViewStyle, Text } from "react-native";
import { ISelectedBucket } from "../../../../types/feedFilterTypes";
import Icons from "../../../../assets/icons/svg"
import styles from './ChipItem.style'
import { useTranslation } from "react-i18next";

type Props = {
    data: ISelectedBucket;
    containerStyle?: ViewStyle | ViewStyle[]
    closeIconPress: () => void
}
const ChipItem: React.VFC<Props> = ({
    data,
    closeIconPress,
    containerStyle
}) => {
    const {t} = useTranslation()
    return <View style={[styles.container, containerStyle]}>
        <View style={styles.chipContainer}>
            <Text style={styles.text}>{t(data.title) ? t(data.title) : data.title}</Text>
            <Pressable onPress={closeIconPress} style={styles.iconTouchContainer}>
                <Icons.Close {...styles.icon} />
            </Pressable>
        </View>
    </View>
}
export default ChipItem