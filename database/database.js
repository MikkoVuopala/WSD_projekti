import { Pool } from "../deps.js";
import { config } from "../config/config.js";

const CONCURRENT_CONNETIONS = 5;

const connectionPool = new Pool(config.database, CONCURRENT_CONNETIONS);

const executeQuery = async(query, ...args) => {
  const client = await connectionPool.connect();
  try {
    return await client.query(query, ...args);
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
  }
  return null;
};

export { executeQuery };