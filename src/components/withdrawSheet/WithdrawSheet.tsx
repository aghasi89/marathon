import React, { useCallback, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import { useTranslation } from 'react-i18next';
import { profileSelector } from '../../store/selectors/profile-selector';
import InputComponent from '../../screens/FeedStack/CreateFeed/components/InputComponent/InputComponent';
import { createWidraw, getFinances } from '../../store/actions/finansical-action';
import { myWalletsSelector } from '../../store/selectors/finansical-selector';
import { PrimeryButton } from '../buttons';
import styles from './WithdrawSheet.style';

const WithdrawSheet = ({ sheetId, payload }: SheetProps<any>) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user = useSelector(profileSelector);
  const userWallet = useSelector(myWalletsSelector)
  const { currency, onClose } = payload
  const [ammountValue, setAmmountValue] = useState<string>("")
  const [commentValue, setCommentValue] = useState<string>("")

  const handleCreateWidraw = useCallback(() => {
    const payload = {
      "coach": user?.id,
      "amount": parseInt(ammountValue),
      "user_wallet": userWallet && userWallet.filter((el) => el.currency_type.code === currency.code)[0].id,
      "comment": commentValue ? commentValue : null,
      "status": "requested"
    }
    dispatch(createWidraw(payload))
    setAmmountValue("")
    setCommentValue("")
    SheetManager.hide('withdrawSheet')
    onClose()
  }, [ammountValue, commentValue])

  return (
    <ActionSheet
      safeAreaInsets={{ bottom: 0, top: 0, left: 0, right: 0 }}
      id={sheetId}
      ref={actionSheetRef}
      initialSnapIndex={0}
      statusBarTranslucent
      drawUnderStatusBar={true}
      gestureEnabled={true}
      containerStyle={styles.containerStyle}
      defaultOverlayOpacity={0.3}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>{t(`withdrawals`)}</Text>
        <InputComponent
          onChange={setAmmountValue}
          value={ammountValue}
          label={t(`requiredAmount`) ?? ''}
          inputType="number-pad"
          multiline={false}
          labelStyle={styles.labelStyle}
          containerStyle={styles.commentInput}
        />
        <View style={styles.emptyView} />
        <InputComponent
          containerStyle={styles.commentInput}
          onChange={setCommentValue}
          value={commentValue}
          label={t(`addComment`) ?? ''}
          multiline={true}
          labelStyle={styles.labelStyle}
        />
        <PrimeryButton
          title={t('save') ?? ''}
          type="default"
          onPress={handleCreateWidraw}
          style={styles.applyButton}
          disable={!ammountValue.length}
        />
      </View>
    </ActionSheet>
  );
};
export default WithdrawSheet;
