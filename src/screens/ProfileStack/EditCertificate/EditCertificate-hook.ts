import { useCallback, useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import moment from "moment";
import { NavigationParamList } from "../../../navigation/ProfileNavigation";
import { ICertificate, IUploadImage } from "../../../types/types";
import { editCertificate, getProfileInfo, postCertificate, setFiles } from "../../../store/actions/profile-action";

type Props = NativeStackScreenProps<NavigationParamList, 'ADDCERTIFICATES'>;
export default () => {
  const { t } = useTranslation();
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<any['route']>();
  const dispatch = useDispatch();
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [loader, setLoader] = useState(false)
  const [ certificateId, setCertificateId ] = useState<number | undefined>(undefined);
  const [certificates, setCertificates] = useState<ICertificate>({
    "description": "",
    "file": "",
    "title": "",
    "year": moment().year(),
    "file_type": "",
  });
  
  useEffect(() => {
    if (route.params) {
      const { certificateInfo } = route.params;
      setCertificateId(certificateInfo.id);
      let newArr: ICertificate = { ...certificates };
      newArr.file = certificateInfo.file;
      newArr.description = certificateInfo.description;
      newArr.file_type = certificateInfo.file_type;
      setCertificates(newArr);
    }
  }, [route])

  const onPressToDismiss = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const handleSave = useCallback(() => {
    if (certificates.file && certificates.description && certificateId) {
      setLoader(true);
      dispatch(editCertificate(certificates, certificateId, () => {
        dispatch(getProfileInfo(() => {
          setLoader(false);
          navigation.goBack();
        }));
      }));
    }
  }, [certificates, certificateId]);

  const handleChangeDescription = useCallback((text: string, index: number) => {
    let newArr: ICertificate = { ...certificates };
    newArr.description = text;
    setCertificates(newArr)
  }, [certificates])

  const handleAddFile = () => {
    setShowDocumentModal(true)
  }

  const closeDocumentModal = (value: boolean) => {
    setShowDocumentModal(value)
  }

  const handleSetFiles = useCallback((image: IUploadImage[]) => {
    dispatch(setFiles(image[0], (url: string) => {
      let newArr: ICertificate = { ...certificates };
      if (image[0].mime == 'application/pdf') {
        newArr.file = url
        newArr.file_type = 'pdf'
      } else {
        newArr.file = url
        newArr.file_type = image[0].mime
      }
      setCertificates(newArr)
    }))
  }, [certificates]);

  const deleteCertificateItem = useCallback(() => {
    let newArr: ICertificate = { ...certificates };
    newArr.file = "";
    newArr.file_type = "";
    setCertificates(newArr);
  }, [certificates])

  const goBack = () => {
    navigation.goBack();
  };

  return {
    t,
    goBack,
    onPressToDismiss,
    handleChangeDescription,
    showDocumentModal,
    handleAddFile,
    closeDocumentModal,
    handleSetFiles,
    certificates,
    handleSave,
    deleteCertificateItem,
    loader
  };
};