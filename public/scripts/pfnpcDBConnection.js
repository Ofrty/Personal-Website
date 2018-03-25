/**********************************************************************************************************************
 * Author: Joe Kirkham
 * Date Created: 2018/03/11
 * Description:
 *********************************************************************************************************************/

var mysql = require('mysql');

var pool = mysql.createPool
({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_kirkhamj',
    password        : '7561',
    database        : 'cs340_kirkhamj'
});

module.exports.pool = pool;