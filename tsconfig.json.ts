export default {
  compilerOptions: {
    target: "ES6",
    module: "commonjs",
    strict: true,
    esModuleInterop: true,
    skipLibCheck: true,
    forceConsistentCasingInFileNames: true,
    outDir: "./dist",
    rootDir: "./src",
    types: ["cypress"]
  },
  include: ["src", "cypress", "cypress/e2e", "cypress/support"],
  exclude: ["node_modules", "dist"]
};