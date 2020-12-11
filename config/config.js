let config = {};

if (Deno.env.get('TEST_ENVIRONMENT')) {
  config.database = {};
} else {
  config.database = {
    hostname: "XXXX",
    database: "XXXX",
    user: "XXXX",
    password: "XXXX",
    port: 5432
  };
}

export { config };