/*
 * @Author: Luoxd
 * @Description: 
 * @Date: 2020-01-10 15:37:27
 * @LastEditTime: 2020-03-08 11:29:45
 * @LastEditors: Luoxd
 */
const moment = require('moment');
const sequelize = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class PageList extends Model {}

PageList.init({
    componentId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    componentUrl: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '组件url'
    },
    componentLayout: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: '组件layout'
    },
    componentData: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: '组件数据'
    },
    componentDesc: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '组件描述'
    },
    componentName: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '组件名称'
    },
    createdTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '创建时间'
    },
    componentChildLayout: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: '子组件Layout'
    },
    componentChildIds: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '子组件id集合'
    },
    // isPosition: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //     comment: '是否定位组件'
    // },
    created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        get() {
          return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
        }
    }
}, {
    sequelize,
    modelName: 'page_list',
    tableName: 'page_list'
})
module.exports = {
    PageList
}
