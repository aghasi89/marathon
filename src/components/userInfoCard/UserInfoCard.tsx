import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import Icons from '../../assets/icons/svg';
import {primaryBlack} from '../../assets/styles/colors.styles';
import Check from '../check/Check';
import styles from './UserInfoCard.styles';

interface IUserType {
  first_name: string;
  last_name: string;
  address?: string;
  isConnect: boolean;
  image_url: string;
}
type Props = {
  userData: IUserType;
  onSelectChat?: () => void;
  onConnect: () => void;
  onInvite?: () => void;
  selected?: boolean;
  isLeads?: boolean;
  isClose?: boolean;
  onClose?: () => void;
};
const UserInfoCard: React.FC<Props> = ({
  userData,
  onSelectChat,
  onConnect,
  onInvite,
  selected,
  isLeads,
  isClose,
  onClose,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image style={styles.image} source={{uri: userData.image_url}} />
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>
            {userData.first_name} {userData.last_name}
          </Text>
          {userData.address && (
            <Text style={styles.locationText}>
              <Icons.Location /> {userData.address}
            </Text>
          )}
        </View>
        <View style={styles.messageTouch}>
          {onSelectChat ? (
            <TouchableOpacity
              style={styles.messageTouch}
              onPress={onSelectChat}>
              <Icons.Message />
            </TouchableOpacity>
          ) : onInvite ? (
            <Check isSubmited={selected} onPress={onInvite} />
          ) : isClose ? (
            <Icons.PlusX fill={primaryBlack} onPress={onClose} />
          ) : null}
        </View>
      </View>
      {!isLeads && (
        <View
          style={
            userData.isConnect
              ? styles.connectedTouch
              : styles.disConnectedTouch
          }>
          {!userData.address && <Text style={styles.inPerson}>In Person</Text>}
          {onInvite ? (
            <>
              <Text style={styles.inPerson}>In Person</Text>
              {!selected && (
                <TouchableOpacity onPress={onConnect}>
                  <Text
                    style={[
                      userData.isConnect
                        ? styles.touchText
                        : styles.disSelectText,
                    ]}>
                    Joined To Marathon
                  </Text>
                </TouchableOpacity>
              )}
            </>
          ) : (
            <TouchableOpacity onPress={onConnect}>
              <Text
                style={[
                  userData.isConnect ? styles.touchText : styles.disSelectText,
                ]}>
                Connected Program Name
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};
export default UserInfoCard;
