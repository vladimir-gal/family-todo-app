import axios from "axios";

export type Api = {
  get: <TResponse, TParams extends Record<string, string | number>>(
    endpoint: string,
    params?: TParams
  ) => Promise<TResponse>;
  post: <TResponse, TBody extends Record<string, unknown>>(
    endpoint: string,
    body: TBody
  ) => Promise<TResponse>;
  put: <TResponse, TBody extends Record<string, unknown>>(
    endpoint: string,
    body: TBody
  ) => Promise<TResponse>;
  delete: <TResponse>(endpoint: string) => Promise<TResponse>;
  patch: <TResponse, TBody extends Record<string, unknown>>(
    endpoint: string,
    body: TBody
  ) => Promise<TResponse>;
};

const api = (): Api => {
  const baseUrl = "http://localhost:3001";

  const headers = {
    "Content-Type": "application/json",
  };

  const buildUrl = <TParams extends Record<string, string | number>>(
    endpoint: string,
    params?: TParams
  ) => {
    const url = new URL(endpoint, baseUrl);

    if (params) {
      Object.keys(params).forEach((key) => {
        url.searchParams.append(key, String(params[key]));
      });
    }

    return url.toString();
  };

  return {
    get: async <TResponse, TParams extends Record<string, string | number>>(
      endpoint: string,
      params?: TParams
    ): Promise<TResponse> => {
      try {
        const res = await axios({
          method: "GET",
          url: buildUrl(endpoint, params),
          headers,
        });

        return Promise.resolve(res?.data);
      } catch (err) {
        return Promise.reject(err);
      }
    },
    post: async (endpoint: string, body: unknown) => {
      try {
        const response = await fetch(baseUrl + endpoint, {
          method: "POST",
          headers,
          body: JSON.stringify(body),
        });

        return response.json();
      } catch (err) {
        return Promise.reject(err);
      }
    },
    put: async (endpoint: string, body: unknown) => {
      const response = await fetch(baseUrl + endpoint, {
        method: "PUT",
        headers,
        body: JSON.stringify(body),
      });

      return response.json();
    },
    delete: async (endpoint: string) => {
      const response = await fetch(baseUrl + endpoint, {
        method: "DELETE",
        headers,
      });

      return response.json();
    },
    patch: async (endpoint: string, body: unknown) => {
      const response = await fetch(baseUrl + endpoint, {
        method: "PATCH",
        headers,
        body: JSON.stringify(body),
      });

      return response.json();
    },
  };
};

export default api;
