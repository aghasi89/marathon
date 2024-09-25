import React, { useState } from 'react';
import { Text, View } from 'react-native';
import styles from './Status.style'
import { calcHeight } from '../../../../assets/dimensions';
import { useTranslation } from 'react-i18next';
import { primaryBlue } from '../../../../assets/styles/colors.styles';

interface IProps {
  text: string
}

const Status: React.FC<IProps> = (props) => {

  const { text } = props

  const { t } = useTranslation();
  const [moreInfoShow, setMoreInfoShow] = useState<boolean>(false);

  const textBrakeIndex = (text: string, startIndex: number) => {
    const dotIndex = text.indexOf('.', startIndex),
      sungIndex = text.indexOf(',', startIndex),
      spaceIndex = text.indexOf(' ', startIndex);
    if (dotIndex < sungIndex && dotIndex < spaceIndex) {
      if (text[dotIndex + 1] === ' ') {
        return dotIndex + 2;
      } else {
        return dotIndex + 1;
      }
    } else if (sungIndex < dotIndex && sungIndex < spaceIndex) {
      if (text[sungIndex + 1] === ' ') {
        return sungIndex + 2;
      } else {
        return sungIndex + 1;
      }
    } else {
      return spaceIndex + 1;
    }
  }

  const shortText = text.slice(
    0,
    moreInfoShow ? textBrakeIndex(text, 60) : 60,
  );
  const longText = text.slice(textBrakeIndex(text, 60), -1);

  return (
    <View>
      <Text
        style={[
          styles.status,
          { marginTop: calcHeight(20) }
        ]}>
        {shortText}
        <Text
          onPress={() => setMoreInfoShow(true)}
          style={[
            styles.status,
            { color: primaryBlue }
          ]}>
          {text.length > 60 ? (!moreInfoShow ? `... ${t(`readMore`)}` : '') : ''}
        </Text>
      </Text>
      {moreInfoShow && (
        <View>
          <Text
            style={[
              styles.status,
              { marginTop: calcHeight(-5) }
            ]}>
            {longText}
            <Text
              onPress={() => setMoreInfoShow(false)}
              style={[
                styles.status,
                { color: primaryBlue }
              ]}>
              {moreInfoShow ? ` ... ${t(`hideText`)}` : ''}
            </Text>
          </Text>
        </View>
      )}
    </View>
  );
};

export default Status;