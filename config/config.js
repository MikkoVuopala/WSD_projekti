let config = {};

if (Deno.env.get('TEST_ENVIRONMENT')) {
  config.database = {};
} else {
  config.database = {
    hostname: "hattie.db.elephantsql.com",
    database: "	xafjpnem",
    user: "	xafjpnem",
    password: "k6sbqA_ZyzZHA-l_xG12WH307yRTxdu9",
    port: 5432
  };
}

export { config };