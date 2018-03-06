/*require the ibm_db module*/
var ibmdb = require('ibm_db');

console.log("Things don't get lost if they don't have value. You don't miss what you don't care about.");


var Pool = require("ibm_db").Pool,
    pool = new Pool(),
    cn = "DATABASE=bludb;HOSTNAME=dashdb-xxxxxxxx.services.eu-gb.bluemix.net;PORT=50000;PROTOCOL=TCPIP;UID=xxxxxx;PWD=xxxxxxxxj";

var ret = pool.init(1, cn);
if (ret != true) {
    console.log(ret);
    return false;
}
console.log(ret);
pool.setMaxPoolSize(100);
pool.open(cn, function(err, db) {
    if (err) {
        return console.log(err);
    }

    //db is now an open database connection and can be used like normal
    //but all we will do now is close the whole pool
    db.query("SELECT *  FROM SCHEMA.TABLE limit 10", function(err, db2data, moreResultSets) {
        if (err) {
            return console.log(err);
        }
        for (var i = 0; i < db2data.length; i++) {
            console.log(db2data[i]);
        }
        console.log("-----------------------");
    });

    pool.close(function() {
        console.log("all connections in the pool are closed for sure");
    });
});