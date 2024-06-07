import { Configuration, FrontendApi } from "@ory/client";

const baseUrl = `${process.env.EXPO_PUBLIC_KRATOS_URL}`;

export const kratosClient = new FrontendApi(
  new Configuration({
    basePath: baseUrl,
    baseOptions: {
      withCredentials: false,
    },
  })
);
