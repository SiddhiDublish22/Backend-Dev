const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    env: "development",
    port: 3000,
    db: process.env.DEV_DB,
    logLevel: "debug",
    envFile: ".env.dev"
  },
  staging: {
    env: "staging",
    port: 4000,
    db: process.env.STAGING_DB,
    logLevel: "info",
    envFile: ".env.staging"
  },
  production: {
    env: "production",
    port: 5000,
    db: process.env.PROD_DB,
    logLevel: "error",
    envFile: ".env.prod"
  }
};

module.exports = config[env];