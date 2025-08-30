module.exports = {
  apps: [
    {
      name: "tovna-app",
      script: "./dist/app.js",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
}