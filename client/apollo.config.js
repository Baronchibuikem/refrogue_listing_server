module.exports = {
    client: {
        includes: ['./imports/**/*.ts'],
        excludes: ['**/__tests__/**/*'],
        service: {
            name: 'client',
            url: 'https://localhost:9000/api',
            localSchemaFile: 'client/schema.json'
        }
    }
  };