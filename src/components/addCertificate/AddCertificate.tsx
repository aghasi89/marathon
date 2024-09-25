import * as React from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { TFunction } from 'i18next';
import { calcHeight } from '../../assets/dimensions';
import SectionTitle from '../../screens/FeedStack/CreateFeed/components/SectionTitle/SectionTitle';
import LoginInput from '../../screens/AuthStack/components/loginInput';
import keys from '../../services/Keys';
import { primaryBlack } from '../../assets/styles/colors.styles';
import Icons from '../../assets/icons/svg';
import styles from './AddCertificate.style';

interface IProps {
    t: TFunction<"translation", undefined, "translation">,
    description: string,
    index: number,
    handleChangeDescription: (text: string, index: number) => void,
    handleDelete: () => void,
    handleAddFile: () => void,
    image: string,
    fileType: string
}

const AddCertificate: React.FC<IProps> = ({ t, description, index, handleChangeDescription, handleAddFile, fileType, image, handleDelete }) => {
    return (
        <>
            <SectionTitle
                containerStyle={styles.sectionTitles}
                title={t('title')}
            />
            <LoginInput
                value={description}
                onChangeValue={(value: string) => {
                    handleChangeDescription(value, index);
                }}
                placeholderText={t('typeTitleHere') ?? ''}
                style={styles.certificateInput}
            />
            <View style={[styles.container, { paddingTop: fileType === "" ? calcHeight(30) : 0, paddingBottom: fileType === "" ? calcHeight(70) : 0 }]}>
                {fileType ?
                    <>
                        <TouchableOpacity
                            style={styles.removeButton}
                            onPress={handleDelete}>
                            <Icons.DeleteBackground fill={primaryBlack} width="25.791" height="25.876"/>
                        </TouchableOpacity>
                        {fileType === "pdf" ? <Icons.PdfIcon /> : <Image style={styles.imageStyle} source={{ uri: `${keys.API_URL}${image}` }} />}
                    </>
                    :
                    <>
                        <Text style={styles.chooseText}>{t('chooseCertificate')}</Text>
                        <Pressable style={styles.button} onPress={handleAddFile}>
                            <Icons.Upload {...styles.buttonIcon} />
                            <Text style={[styles.buttonText, { marginVertical: calcHeight(8) }]}>
                                {t('browsefile')}
                            </Text>
                        </Pressable>
                    </>
                }
            </View>
        </>
    )
};
export default AddCertificate;