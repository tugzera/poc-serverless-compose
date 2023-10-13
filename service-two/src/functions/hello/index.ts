import { handlerPath } from "@libs/handler-resolver";
import schema from "./schema";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "get",
        path: "v2/hello",
        request: {
          schemas: {
            "application/json": schema,
          },
        },
      },
    },
  ],
};
