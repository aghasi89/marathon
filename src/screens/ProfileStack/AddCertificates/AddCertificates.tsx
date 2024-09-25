import * as React from 'react';
import { Pressable, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import Icons from '../../../assets/icons/svg';
import { calcHeight } from '../../../assets/dimensions';
import AddCertificate from '../../../components/addCertificate/AddCertificate';
import UpploadButton from '../../../components/uploadbutton/UploadButton';
import { IUploadImage } from '../../../types/types';
import Toaster from '../../../components/toester/Toester';
import Header from '../components/Header/Header';
import CertificatesHook from './AddCertificates-hook'
import styles from './AddCertificates.style';

const AddCertificatesScreen: React.FC = () => {
  const {
    t,
    goBack,
    handleChangeDescription,
    showDocumentModal,
    handleAddFile,
    closeDocumentModal,
    handleSetFiles,
    addCertificateLine,
    certificates,
    handleSave,
    deleteCertificateItem,
    loader,
    onPressToDismiss
  } = CertificatesHook();

  if(loader) return <ActivityIndicator style={styles.loading} size={'large'}/>
  return (
    <Pressable style={styles.screenContainer} onPress={onPressToDismiss}>
      <Header goBack={goBack} title={t('addCertificate')} />
      <View style={styles.body}>
          <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: "90%" }}>
            {certificates.map((el, index) => {
              return (
                <AddCertificate
                  key={"certificates" + index}
                  t={t}
                  description={el.description}
                  image={el.certificate ? el.certificate : ""}
                  handleDelete={() => deleteCertificateItem(index)}
                  fileType={el.file_type}
                  index={index}
                  handleAddFile={() => handleAddFile(index)}
                  handleChangeDescription={handleChangeDescription}
                />
              )
            })}
          </ScrollView>

        <Toaster
          height={calcHeight(150)}
          isVisible={showDocumentModal}
          onClose={() => closeDocumentModal(false)}
          Screen={
            <View style={styles.shhetContainer}>
              <UpploadButton
                imageSizeType={['16:9']}
                showCropperSizeConfig={false}
                goBackImage={(image: IUploadImage[]) => {
                  handleSetFiles(image);
                  closeDocumentModal(false)
                }}
                uploadMediaType="Photos"
              >
                <View style={styles.sheetButtons}>
                  <Icons.BlackImage/>
                  <Text style={styles.sheetButtonText}>{t('chooseMedia')}</Text>
                </View>
              </UpploadButton>
              <View style={styles.emptyView} />
              <UpploadButton
                goBackImage={(image: IUploadImage[]) => {
                  handleSetFiles(image);
                  closeDocumentModal(false)
                }}
                fileButtonAvailability={true}>
                <View style={styles.sheetButtons}>
                  <Icons.File />
                  <Text style={styles.sheetButtonText}>{t('chooseFile')}</Text>
                </View>
              </UpploadButton>
            </View>
          }
        />
        <View>
          <View style={styles.addContainer}>
            <Pressable style={styles.addButton} onPress={addCertificateLine}>
              <Icons.Plus {...styles.addIcon} />
              <Text style={[styles.addText, { marginVertical: calcHeight(8) }]}>
                {t('addCertificate')}
              </Text>
            </Pressable>
          </View>
          <Pressable onPress={handleSave} style={styles.saveContainer}>
            <Text style={styles.saveButton}>
              {t('save')}
            </Text>
          </Pressable>
        </View>
      </View>
    </Pressable >
  );
};

export default AddCertificatesScreen;