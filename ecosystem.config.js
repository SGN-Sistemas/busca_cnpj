// Configuração do PM2 — roda a versão compilada (dist/), gerada por `yarn build`
module.exports = {
  apps: [
    {
      name: 'busca-cnpj',
      script: 'dist/server.js',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',
      env: {
        NODE_ENV: 'production'
      },
      out_file: 'logs/out.log',
      error_file: 'logs/error.log',
      merge_logs: true,
      time: true
    }
  ]
};
