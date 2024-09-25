import {StyleSheet} from 'react-native';
import {primaryWhite} from '../../../../../../../assets/styles/colors.styles';
import {calcHeight, calcWidth} from '../../../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container:{
    maxHeight:calcHeight(200)
  },
  inputStyle: {
    flex: 1,
    borderBottomRightRadius: calcHeight(16),
    borderBottomLeftRadius: calcHeight(16),
    paddingHorizontal: calcWidth(16),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  richTextToolbarStyle: {
    backgroundColor: primaryWhite,
    alignItems: 'flex-start',
  },
  richTextEditorStyle: {
    borderBottomRightRadius: calcHeight(16),
    borderBottomLeftRadius: calcHeight(16),
    borderBottomWidth: calcHeight(1),
    borderBottomColor: 'transparent',
    backgroundColor: primaryWhite,
    maxHeight:calcHeight(144)
  },
  editorContainer: {
    borderBottomRightRadius: calcHeight(16),
    borderBottomLeftRadius: calcHeight(16),

  },
});

export default styles;
