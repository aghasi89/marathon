import { TextStyle } from 'react-native';

export type EnCodeSansWeight = 'bold' | 'regular' | 'semibold' | 'medium';

export type EnCodeSansSize = 'headline' | 'subtitle' | 'body' | 'form-field' | 'legal' | 'little' | 'subLittle' | 'headline1' | 'subText' | 'headline2';
;

export interface EnCodeSansParams {
  size: EnCodeSansSize,
  weight: EnCodeSansWeight,
};

export function EnCodeSans({
  size,
  weight,
}: EnCodeSansParams): TextStyle {
  const fontSizePx = sizePx[size];
  return {
    ...paramsByWeight[weight],
    fontSize: fontSizePx,
    letterSpacing: -(fontSizePx * 0.02),
  };
}

const paramsByWeight: Record<EnCodeSansWeight, TextStyle> = {
  'bold': {
    // fontFamily: 'EnCodeSans-Bold',
    fontWeight: '700',
    fontStyle: 'normal',
  },
  'regular': {
    //fontFamily: 'EnCodeSans-Regular',
    fontWeight: '400',
    fontStyle: 'normal',
  },
  'semibold': {
    //  fontFamily: 'EnCodeSans-ExtraBold',
    fontWeight: '600',
    fontStyle: 'normal',
  },
  'medium': {
    //fontFamily: 'EnCodeSans-Medium',
    fontWeight: '500',
    fontStyle: 'normal',
  },
};

const sizePx: Record<EnCodeSansSize, number> = {
  'headline': 20,
  'subtitle': 15,
  'body': 16,
  'form-field': 18,
  'legal': 14,
  'little': 13,
  'subLittle': 10,
  'headline1': 26,
  'subText': 12,
  'headline2': 24

};
