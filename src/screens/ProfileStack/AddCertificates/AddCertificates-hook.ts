import { useCallback, useState } from "react";
import { Keyboard } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import moment from "moment";
import { NavigationParamList } from "../../../navigation/ProfileNavigation";
import { ICertificate, IUploadImage } from "../../../types/types";
import { getProfileInfo, postCertificate, setFiles } from "../../../store/actions/profile-action";

type Props = NativeStackScreenProps<NavigationParamList, 'ADDCERTIFICATES'>;

export default () => {
  const { t } = useTranslation();
  const navigation = useNavigation<Props['navigation']>();
  const dispatch = useDispatch();
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [loader, setLoader] = useState(false)
  const [certificates, setCertificates] = useState<ICertificate[]>([{
    "description": "",
    "certificate": "",
    "title": "",
    "year": moment().year(),
    "file_type": "",
  }]);
  const [selectedCertificateIndex, setSelectedCertificateIndex] = useState<number>();  

  const onPressToDismiss = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const handleSave = useCallback(() => {
    let newCertificatesList: ICertificate[] = [];
    certificates.map((el) => {
      if (el.certificate && el.description) {
        newCertificatesList.push(el)
      }
    });
    newCertificatesList?.map((item, index) => {
      setLoader(true);
      if (newCertificatesList.length !== index + 1) {
        dispatch(postCertificate(item));
      } else {
        dispatch(postCertificate(item, () => {
          dispatch(getProfileInfo(() => {
            setLoader(false);
            navigation.goBack();
          }));
        }));
      }
    })
  }, [certificates]);

  const handleChangeDescription = useCallback((text: string, index: number) => {
    let newArr: ICertificate[] = [...certificates]
    newArr.map((el: ICertificate, i: number) => {
      if (index == i) {
        el.description = text
        el.title = text
      }
    })
    setCertificates(newArr)
  }, [certificates])

  const handleAddFile = (index: number) => {
    setShowDocumentModal(true)
    setSelectedCertificateIndex(index)
  }

  const closeDocumentModal = (value: boolean) => {
    setShowDocumentModal(value)
  }

  const handleSetFiles = useCallback((image: IUploadImage[]) => {
    dispatch(setFiles(image[0], (url: string) => {
      let newArr: ICertificate[] = [...certificates]
      newArr.map((el, i) => {
        if (selectedCertificateIndex == i) {
          if (image[0].mime == 'application/pdf') {
            el.certificate = url
            el.file_type = 'pdf'
          } else {
            el.certificate = url
            el.file_type = image[0].mime
          }
        }
      })
      setCertificates(newArr)
    }))
  }, [certificates, selectedCertificateIndex]);

  const addCertificateLine = useCallback(() => {
    let newArr: ICertificate[] = [...certificates]
    newArr.push({
      "description": "",
      "certificate": "",
      "title": "",
      "year": moment().year(),
      "file_type": "",
    })
    setCertificates(newArr)
  }, [certificates]);

  const deleteCertificateItem = useCallback((index: number) => {
    const newArr = [...certificates];
    newArr.splice(index, 1);
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
    addCertificateLine,
    certificates,
    handleSave,
    deleteCertificateItem,
    loader
  };
};
