import React from 'react';
import {ActivityIndicator} from 'react-native';
import {primaryBlue} from '../../assets/styles/colors.styles';

export default function Loading() {
  return <ActivityIndicator size='large' color={primaryBlue} />;
}
