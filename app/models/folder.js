/*
 * @Author: Luoxd
 * @Description: 
 * @Date: 2020-01-10 15:37:27
 * @LastEditTime : 2020-01-21 10:47:14
 * @LastEditors  : Luoxd
 */
const moment = require('moment');
const sequelize = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class FolderList extends Model {}

FolderList.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '文件夹名称'
    },
    componentIds: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '组件ID集合'
    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        get() {
          return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
        }
    }
}, {
    sequelize,
    modelName: 'folder_list',
    tableName: 'folder_list'
})
module.exports = {
    FolderList
}
