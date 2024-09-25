import authApi from './mainInstance';

abstract class RestApi<IPayload> {
  abstract routeName: string;

  getAll = async () => {
    try {
      const response = await authApi.get(`/${this.routeName}`);
      return response.data;
    } catch (ex) {
      throw new Error(ex);
    }
  };

  create = async (payload: Partial<IPayload>) => {
    try {
      const response = await authApi.post(`/${this.routeName}`, payload);
      // returning response because in some cases we need to retrieve data from the response headers
      return response;
    } catch (ex) {
      throw new Error(ex);
    }
  };

  deleteById = async (id: string) => {
    try {
      const response = await authApi.delete(`/${this.routeName}(${id})`);
      return response.data;
    } catch (ex) {
      throw new Error(ex);
    }
  };

  getById = async (id: string) => {
    try {
      const response = await authApi.get(`/${this.routeName}/${id}`);
      return response.data;
    } catch (ex) {
      throw new Error(ex);
    }
  };

  putById = async (id: string, data: any) => {
    try {
      const response = await authApi.put(`/${this.routeName}(${id})`, data);
      return response.data;
    } catch (ex) {
      throw new Error(ex);
    }
  };
}

export default RestApi;
