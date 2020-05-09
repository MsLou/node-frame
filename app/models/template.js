/*
 * @Author: Luoxd
 * @Description: 
 * @Date: 2020-01-10 15:37:27
 * @LastEditTime: 2020-02-24 23:30:26
 * @LastEditors: Luoxd
 */
const moment = require('moment');
const sequelize = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class TemplateList extends Model {}

TemplateList.init({
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
    componentImgUrl: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '组件预览图地址'
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
    modelName: 'template_list',
    tableName: 'template_list'
})
module.exports = {
    TemplateList
}
