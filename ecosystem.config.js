module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name      : "baochelian",
      script    : "./bin/www",
      node_args : "--harmony --use-strict",
      env: {
        NODE_ENV: "dev",
        PORT: 3000
      },
      env_production : {
        NODE_ENV: "production",
        PORT: 3000
      },
      env_test: {
        NODE_ENV: "test",
        PORT: 13002
      },
      env_dev: {
        NODE_ENV: "dev",
        PORT: 13001
      },
    }
  ]
};
