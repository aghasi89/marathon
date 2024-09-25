import { Cloudinary } from '@cloudinary/url-gen';
import { IUploadImage } from '../types/types';
import { Delivery } from '@cloudinary/url-gen/actions';

type CloudinaryTypes = {
  url?: string,
  public_id?: string,
  resource_type?: string
}

export const sendMadiaFileToCloudinary = async (media: IUploadImage, cb?: (data: CloudinaryTypes, status?: 'success' | 'reject') => void) => {
  try {
    const formData = new FormData();
    const picture = { name: media.mime.split('/').join('.'), uri: media.path, type: media.mime, size: media.size }
    formData.append('file', picture);
    formData.append('upload_preset', 'rhnptcxk');
    formData.append('cloud_name', 'dk7jrqkjv');
    formData.append('public_id', `${media.mime + Date.now().toString(36)}`);
    const response = await fetch(`https://api.cloudinary.com/v1_1/dk7jrqkjv/${media.mime.split('/')[0]}/upload`, {
      method: "POST",
      body: formData,
    });
    const jsonData = await response.json();
    cb && cb(jsonData, 'success')
  } catch (er) {
    cb && cb({}, 'reject')
    console.log(er, 'Cloudinary---------------------------');
  }
}

export default (id?: string, type?: string, format?: string) => {
  const config = {
    cloudName: 'dk7jrqkjv',
    apiSecret: 'YXwoffernPTL9yAxodCHez44ptg',
    apiKey: '291816738215212',
    uploadPreset: 'rhnptcxk',
  };
  const cld = new Cloudinary({
    cloud: config,
  });
  if (type === 'video') {
    const video = cld.video(id);
    if (format) {
      video.delivery(Delivery.quality('auto')).format(format)
      // video.resize(fill().gravity(autoGravity())).format(format)
    }
    return video.toURL();
  } else {
    const img = cld.image(id);
    return img.toURL()
  }
};
