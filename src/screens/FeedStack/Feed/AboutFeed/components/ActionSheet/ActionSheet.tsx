import React from 'react';
import EditSheet from '../../../../../../components/editSheet/EditSheet';

type Props = {
  visibility: boolean;
  onClose: () => void;
  data: any;
  height: number
};

const ActionSheet: React.VFC<Props> = ({
  visibility,
  onClose,
  data,
  height
}) => {
  return <EditSheet height={height} isVisible={visibility} list={data} onClose={onClose} />;
};
export default ActionSheet;
