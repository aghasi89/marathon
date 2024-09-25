import React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from './PreparationComponent.style';

type Props = {
  steps?: string[];
  containerStyle?: ViewStyle;
};

const PreparationComponent: React.VFC<Props> = ({ steps, containerStyle }) => {
  const { t } = useTranslation();
  return (
    <View style={containerStyle}>
      <Text style={styles.title}>{t('preparation')}</Text>
      {steps?.map((step, index) => {
        if (step.length > 0)
          return (
            <View
              key={index}
              style={
                steps && index === steps.length - 1
                  ? styles.lastItemContainer
                  : styles.itemContainer
              }>
              <Text style={styles.itemTitle}>{`${t('step')} ${index + 1}`}</Text>
              <Text style={styles.itemDescription}>{step}</Text>
            </View>
          );
      })}
    </View>
  );
};
export default PreparationComponent;
