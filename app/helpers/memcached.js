var memcached = require("memcached"),
    config = require("config"),
    client = new memcached(
        config.memcached.port,
        config.memcached.host,
        {}
    ),

    Q = require("q");

/**
 * {
 *    reject: function(){},
 *    resolve: function(){},
 *    promise: {
 *      state: "fulfilled" // rejected|fulfilled
 *    }
 * }
 */


/**
 * yield redis.get("asd");
 *
 * yield redis.set("asd", "qweqw", 3600);
 *
 * yield redis.delete("asd");
 *
 * @type {{get: Function, set: Function, delete: Function}}
 */
module.exports = {

    /**
     * Достает из редиса значение по указанному ключу
     * @param {string} key название ключа
     * @returns {promise}
     */
    get: function (key) {
        var deferred = Q.defer();

        client.get(key, function (err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(result);
            }
        });

        return deferred.promise;
    },

    /**
     * Устанавливает ключ с указанным значением в реди
     * @param {string} key название ключа
     * @param {string|number} value значение
     * @param {number} ttl время жизни в секундах
     * @returns {promise}
     */
    set: function (key, value, ttl) {
        var deferred = Q.defer();

        client.set(key, value,ttl, function (err, result) {
            console.log(err);
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(result);
            }
        });

        return deferred.promise;
    },

    /**
     * Удаляет ключ из редиса
     * @param {string} key название ключа
     * @returns {promise}
     */
    delete: function (key) {
        var deferred = Q.defer();

        client.del(key, function (err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(result);
            }
        });

        return deferred.promise;
    }
};