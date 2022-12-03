
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  documents: "src/graphql/**/*.graphql",
  generates: {
    "src/generated/": {
      preset: "client",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-urql"
      ],
      config: {
        namingConvention: {
          "enumValues": "change-case-all#upperCaseFirst"
        }
        
      }
      
    }
  }
};

export default config;
