import React from 'react';
import { Switch } from 'react-native-elements';
import { formFieldGrey, lightGray, primaryBlue, primaryWhite } from '../../assets/styles/colors.styles';

interface ISwitchComponenet {
  checked: boolean,
  setChecked: any
}
export default function SwitchComponenet(props: ISwitchComponenet) {
  const { checked, setChecked } = props
  return (
    <Switch
      value={checked}
      onValueChange={(value: boolean) => setChecked(value)}
      thumbColor={checked?primaryWhite:formFieldGrey}
      trackColor={{ true: primaryBlue, false: lightGray }}
    />
  );
};
