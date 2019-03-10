const {
    MongoClient
} = require('mongodb');
const connectUrl = 'mongodb://localhost:27017';
const sql = {
    //增
    insert: (dbName, collectionName, insertData) => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(connectUrl, (error, client) => {
                if (error) throw error;
                const db = client.db(dbName);
                const collection = db.collection(collectionName);
                collection.insert(insertData, (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    };
                    client.close();
                })
            })
        })
    },
    //删
    remove: (dbName, collectionName, removeData) => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(connectUrl, (error, client) => {
                if (error) throw error;
                const db = client.db(dbName);
                const collection = db.collection(collectionName);
                collection.remove(removeData, (error) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve()
                    }
                    client.close();
                })
            })
        })
    },
    //改
    update: (dbName, collectionName, updateType, whereData, updateData) => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(connectUrl, (error, client) => { //连接数据库
                if (error) throw error;
                const db = client.db(dbName); //选择数据库
                const collection = db.collection(collectionName); //选择集合
                collection[updateType](whereData, updateData, (error) => { //改动类型，在什么地方改，改成什么
                    if (error) {
                        reject(error); //发生错误时交给reject处理
                    } else {
                        resolve()
                    }
                    client.close(); //关闭数据库
                })
            })
        })
    },
    //查
    find: (dbName, collectionName, whereData) => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(connectUrl, (error, client) => { //连接数据库
                if (error) throw error; //如果连接失败，抛出错误提示
                const db = client.db(dbName); //设置数据库名称
                const collection = db.collection(collectionName); //设置集合
                collection.find(whereData).toArray((error, data) => { //依据条件查询数据库，并且将查询到的数据以数组方式导出
                    if (error) { //发生错误时交由reject处理
                        reject(error);
                    } else { //没有发生错误时交由resolve处理
                        resolve(data);
                    }
                    client.close();
                })
            })
        })
    },
    //分类
    distinct(dbName, collectionName, type) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(connectUrl, (error, client) => {
                if (error) throw error;
                const db = client.db(dbName);
                const collection = db.collection(collectionName);
                //查询所有数据并且按照条件进行过滤，返回符合条件的数据
                collection.distinct(type, (error, data) => {
                    if (error) reject(error);
                    resolve(data);
                    client.close();
                })
            })
        })
    },
    //排序
    sort(database, collectionName, sortData) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(connectUrl, (error, client) => {
                if (error) reject(error);
                const db = client.db(database);
                const collection = db.collection(collectionName)
                collection.find({}).sort(sortData).toArray((error, data) => {
                    if (error) reject(error);
                    resolve(data);
                    client.close();
                })
            })
        })
    }
};

module.exports = sql;