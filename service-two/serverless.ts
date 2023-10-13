import hello from "@functions/hello";
import type { AWS } from "@serverless/typescript";
import "dotenv/config";

console.log(
  "AKI",
  process.env.API_GATEWAY_REST_API_ID,
  process.env.API_GATEWAY_ROOT_REST_API_ID
);

const serverlessConfiguration: AWS = {
  service: "service-two",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      restApiId: process.env.API_GATEWAY_REST_API_ID,
      restApiRootResourceId: process.env.API_GATEWAY_ROOT_REST_API_ID,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  // import the function via paths
  functions: { hello },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
