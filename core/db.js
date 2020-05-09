/*
 * @Author: Luoxd
 * @Description: 
 * @Date: 2020-01-10 11:54:04
 * @LastEditTime : 2020-01-19 11:08:18
 * @LastEditors  : Luoxd
 */
const Sequelize = require('sequelize')
const {
    dbName,
    host,
    port,
    user,
    password
} = require('../config/config').database

const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    logging: false,
    define: {
      // create_time && update_time
      timestamps: true,
      // delete_time
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      // 把驼峰命名转换为下划线
      underscored: true,
      scopes: {
        bh: {
          attributes: {
            exclude: ['password', 'updated_at', 'deleted_at', 'created_at']
          }
        },
        iv: {
          attributes: {
            exclude: ['content', 'password', 'updated_at', 'deleted_at']
          }
        }
      }
    }
})
// 创建模型
sequelize.sync({
    force: false
})

module.exports = sequelize