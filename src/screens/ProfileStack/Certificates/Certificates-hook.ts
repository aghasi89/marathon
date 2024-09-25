import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { NavigationParamList } from '../../../navigation/ProfileNavigation';
import { profileSelector } from '../../../store/selectors/profile-selector';
import { deleteCertificate, getProfileInfo } from '../../../store/actions/profile-action';
import { ICertificate } from '../../../types/types';
import moment from 'moment';

type Props = NativeStackScreenProps<NavigationParamList, 'CERTIFICATES'>;

export default () => {
  const { t } = useTranslation();
  const navigation = useNavigation<Props['navigation']>();
  const [loading, setLoading] = useState<boolean>(false);
  const [ showMenu, setShowMenu ] = useState<boolean>(false);
  const time = useRef<any|null>(null)
  const [showDeletModal,setShowDeletModal] = useState<boolean>(false)
  const [ showDeleteModal, setshowDeleteModal ] = useState<boolean>(false);
  const [ delCertificateId, setDelCertificateId ] = useState<number>(0);
  const [ editCertificateInfo, setEditCertificateInfo ] = useState<ICertificate>({
    "description": "",
    "certificate": "",
    "title": "",
    "year": moment().year(),
    "file_type": "",
  });
  const user = useSelector(profileSelector);
  const dispatch = useDispatch();

  const handlePressAddCertificate = useCallback(() => {
    navigation.navigate('ADDCERTIFICATES')
  }, []);

  const deleteCertificateItem = useCallback(() => {    
    setshowDeleteModal(false);
    setLoading(true);
    setShowDeletModal(false)
    dispatch(deleteCertificate(delCertificateId, () => {
      dispatch(getProfileInfo(() => {
        setLoading(false);
      }));
    }))
  }, [delCertificateId]);

  const goBack = () => {
    navigation.goBack();
  };

  const handleOpenShowMenu = (id: number, certificate: ICertificate) => {
    setEditCertificateInfo(certificate);
    setShowMenu(true);
    setDelCertificateId(id);
  };

  const handleCloseShowMenu = () => {
    setShowMenu(false);
  };

  const handleDeleteModal = useCallback(() => {
    setshowDeleteModal(!showDeleteModal);
  },[showDeleteModal]);

  const navigationToEdit = () => {
    setShowMenu(false);
    navigation.navigate("EDITCERTIFICATES", {certificateInfo : editCertificateInfo});
  };

  
    useEffect(() => {
      if(showDeleteModal)
     time.current = setInterval(()=>{
      setShowDeletModal(true)
     },500)
     return ()=>{
      clearTimeout(time.current)
     }
    }, [showDeleteModal, showMenu]);

  return {
    t,
    goBack,
    user,
    handlePressAddCertificate,
    deleteCertificateItem,
    loading,
    handleOpenShowMenu,
    handleCloseShowMenu,
    showMenu,
    showDeleteModal,
    handleDeleteModal,
    navigationToEdit,
    showDeletModal,
    setShowDeletModal
  };
};
