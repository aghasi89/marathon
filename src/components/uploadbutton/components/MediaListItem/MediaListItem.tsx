import React from 'react'
import { View, Text, Pressable,Image } from 'react-native'
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll'
import { useTranslation } from 'react-i18next'
import Icons from '../../../../assets/icons/svg'
import styles from './MediaListItem.style'

type Props ={
    item:string|PhotoIdentifier
    handleOpenCamera?:()=>void;
    galleryImageSize:number;
    imageSelectHandle?:(image:PhotoIdentifier)=>void
    formatDuration?:(duration?:number|undefined)=>string|undefined
    numberOfMember?:number
}
const MediaListItem:React.VFC<Props> = ({
    item,
    handleOpenCamera,
    galleryImageSize,
    imageSelectHandle,
    formatDuration,
    numberOfMember
}) => {
const {t}=useTranslation()
    return (
    <View>
        {typeof item === 'string' ? (
                  <Pressable
                    onPress={handleOpenCamera}
                    style={[
                      {height: galleryImageSize, width: galleryImageSize},
                      styles.imageContainer,
                      styles.cameraButton,
                    ]}>
                    <Icons.CameraIcon />
                    <Text style={styles.cameraIconText}>{t('camera')}</Text>
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => imageSelectHandle&&imageSelectHandle(item)}
                    style={[styles.imageContainer]}>
                    {numberOfMember?
                    <View  style={[styles.numberContainer,{
                        height: galleryImageSize??0,
                        width: galleryImageSize??0,
                      }]}>
                        <Text style={styles.numberText}>{numberOfMember}</Text>
                      </View>:null}
                    <Image
                      style={{
                        height: galleryImageSize,
                        width: galleryImageSize,
                      }}
                      source={{uri: item?.node.image.uri??''}}
                    />
                    {item?.node.type.startsWith('video') && (
                      <View style={styles.videoDurationConatainer}>
                        <Text style={styles.videoDurationText}>
                          {formatDuration?formatDuration(item.node.image.playableDuration):''}
                        </Text>
                      </View>
                    )}
                  </Pressable>
                )}
    </View>
)}

export default MediaListItem