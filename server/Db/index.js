const knex = require('knex');

const db = knex.default({
  client: 'mysql2',
  connection: {
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: 'react_express',
    // timezone: '+00:00',
  },
});

const checkConnectMysql = async () => {
  try{
    const connect = await db.raw('SELECT 1');
    console.log('connect Mysql Success.')
  }catch(err){
    console.log('connect Mysql Fail !!', err)
  }
};
checkConnectMysql()

module.exports = db;