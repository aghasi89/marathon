import keys from "../../services/Keys";

export default {
  stream: {
    baseUrl: 'https://video.bunnycdn.com/library/',
    authKey: '367b65ce-92d6-434c-8c2fd2f53d07-3b8d-413f',
    libraryId: 137533,
    hostname: 'vz-955741d1-a2f.b-cdn.net',
  },
  storage: {
    baseUrl: 'https://storage.bunnycdn.com',
    authKey: 'cf72be7a-d16b-4753-a56e7e391250-8885-4413',
    storageZoneName: 'marathon1',
    directoryName: keys.API_URL.startsWith('https://new.')?'dev':'prod',
    hostname: 'marathon.b-cdn.net',
  },
};

export enum BunnyAdministrativeDirectories{
  EQUIPMENT="/equipment"
}