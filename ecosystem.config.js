module.exports = {
  apps : [{
    name: 'doc-server',
    script: 'server.js',
    watch: true,
    ignore_watch: ["logs"],
    env: {
    "NODE_ENV": "development",
    },
    env_production: {
    "NODE_ENV": "production",
    },
    env_staging: {
    "NODE_ENV": "staging",
    }
  }],

  deploy : {
    staging : {
      user : 'root',
      host : '192.117.146.217',
      ref  : 'origin/main',
      repo : 'git@github.com:RotemCarmon/pharma-soft-doctor-api.git',
      path : '/root/api-server',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env staging',
      'pre-setup': ''
    }
  }
};
