import {
  IFilterResponse,
} from '../../../types/feedFilterTypes';
import googleApi from '../googleInstance';

class Administrative {
    getLocation = async (place_id?:string,key?:string,language?:string) => {
        try {
          const {data}: {data: IFilterResponse} = await googleApi.get(`json?place_id=${place_id}&fields=name,formatted_address&key=${key}&language=${language}`);
          if (data) return data;
        } catch (error: any) {
          throw error.response.data;
        }
      };
}

const administratives = new Administrative();
export default administratives;

