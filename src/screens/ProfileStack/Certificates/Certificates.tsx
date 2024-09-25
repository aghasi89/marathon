import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icons from '../../../assets/icons/svg/index';
import {primaryBlue} from '../../../assets/styles/colors.styles';
import {calcHeight} from '../../../assets/dimensions';
import Toaster from '../../../components/toester/Toester';
import ActionModal from '../../../components/actionModal/ActionModal';
import Header from '../../ProfileStack/components/Header/Header';
import CertificateItem from '../components/CertificateItem/CertificateItem';
import CertificatesHook from './Certificates-hook';
import styles from './Certificates.style';
import ErrorMessageModal from '../../../components/errorMessageModal/ErrorMessageModal';

const Certificates: React.FC = () => {
  const {
    t,
    goBack,
    user,
    handlePressAddCertificate,
    deleteCertificateItem,
    loading,
    handleOpenShowMenu,
    handleCloseShowMenu,
    showMenu,
    handleDeleteModal,
    navigationToEdit,
    showDeletModal,
    setShowDeletModal
  } = CertificatesHook();

  return (
    <View style={styles.screenContainer}>
      <Header goBack={goBack} title={t('certificates')} />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={primaryBlue} />
        </View>
      ) : (
        <>
          <View
            style={
              user?.certificate && user?.certificate.length > 0
                ? styles.body
                : styles.emptyBody
            }>
            <FlatList
              data={user?.certificate}
              overScrollMode="never"
              numColumns={2}
              ListEmptyComponent={<View style={styles.emptyView}><Text style={styles.emptyText}>{t('noResultsFound')}</Text></View>}
              keyExtractor={item => item.id?.toString()}
              renderItem={({item}) => (
                <CertificateItem
                  item={item.certificate}
                  handleShowMenu={() =>
                    handleOpenShowMenu(item.id, item.certificate)
                  }
                />
              )}
            />
          </View>
          <Pressable
            onPress={handlePressAddCertificate}
            style={styles.createButton}>
            <Icons.Plus {...styles.plusIcon} />
          </Pressable>
          <Toaster
            height={calcHeight(170)}
            isVisible={showMenu}
            onClose={handleCloseShowMenu}
            Screen={
              <View style={styles.shhetContainer}>
                <TouchableOpacity
                  style={styles.sheetButtons}
                  onPress={navigationToEdit}>
                  <Icons.Edit width="16.446" height="18.269" />
                  <Text style={styles.sheetButtonText}>
                    {t('editCertificate')}
                  </Text>
                </TouchableOpacity>
                <View style={styles.emptyToasterView} />
                <TouchableOpacity
                  style={styles.sheetButtons}
                  onPress={() => {
                    handleDeleteModal(), handleCloseShowMenu();
                  }}>
                  <Icons.DeleteBlackIcon />
                  <Text style={styles.sheetButtonText}>
                    {t('removeCertificate')}
                  </Text>
                </TouchableOpacity>
              </View>
            }
          />
        </>
      )}
      <ActionModal
        visible={showDeletModal}
        onClose={deleteCertificateItem}
        onSubmit={() => {handleDeleteModal(), setShowDeletModal(false)}}
        description={t('areYouDeleteCertificate') ?? ''}
        closeButtonText={t('yes') ?? ''}
        submitButtonText={t('no') ?? ''}
      />
    </View>
  );
};

export default Certificates;
