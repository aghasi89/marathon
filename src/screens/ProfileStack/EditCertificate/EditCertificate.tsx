import * as React from 'react';
import { Pressable, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import Icons from '../../../assets/icons/svg';
import { calcHeight } from '../../../assets/dimensions';
import AddCertificate from '../../../components/addCertificate/AddCertificate';
import UpploadButton from '../../../components/uploadbutton/UploadButton';
import { IUploadImage } from '../../../types/types';
import Toaster from '../../../components/toester/Toester';
import Header from '../components/Header/Header';
import EditCertificateHook from './EditCertificate-hook';
import styles from "./EditCertificate.style";

const EditCertificatesScreen: React.FC = () => {
  const {
    t,
    goBack,
    handleChangeDescription,
    showDocumentModal,
    handleAddFile,
    closeDocumentModal,
    handleSetFiles,
    certificates,
    handleSave,
    deleteCertificateItem,
    loader,
    onPressToDismiss
  } = EditCertificateHook();

  if (loader) return <ActivityIndicator style={styles.loading} size={'large'} />
  return (
    <Pressable style={styles.screenContainer} onPress={onPressToDismiss}>
      <Header goBack={goBack} title={t('editCertificate')} />
      <View style={styles.body}>
        <View>
          <AddCertificate
            t={t}
            description={certificates.description}
            image={certificates.certificate}
            handleDelete={() => deleteCertificateItem()}
            fileType={certificates.file_type}
            index={0}
            handleAddFile={() => handleAddFile()}
            handleChangeDescription={handleChangeDescription}
          />
        </View>

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
                  <Icons.Image />
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

export default EditCertificatesScreen;