import React from "react";
import { View, ViewStyle, FlatList } from "react-native";
import { ISelectedBucket } from "../../../../types/feedFilterTypes";
import ChipItem from "../ChipItem/ChipItem";
import styles from './ChipsList.style'
type Props = {
    data: Array<ISelectedBucket>;
    containerStyle?: ViewStyle | ViewStyle[]
    deleteChip?: (item: ISelectedBucket) => void
}
const ChipsList: React.VFC<Props> = ({
    data,
    deleteChip,
    containerStyle
}) => {
    return <View style={[styles.container,containerStyle]}>
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => item + index.toString()}
            data={data}
            renderItem={({ item, index }) => (
                <ChipItem data={item} closeIconPress={() => deleteChip && deleteChip(item)} containerStyle={styles.chipItem} />
            )}
        />
    </View>
}
export default ChipsList