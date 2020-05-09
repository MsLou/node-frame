/*
 * @Author: Luoxd
 * @Description: 
 * @Date: 2020-01-10 15:37:27
 * @LastEditTime: 2020-03-06 18:34:44
 * @LastEditors: Luoxd
 */
const moment = require('moment');
const sequelize = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class MetaComponent extends Model {}

MetaComponent.init({
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
    componentData: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: '组件数据'
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
    modelName: 'component_list_meta',
    tableName: 'component_list_meta'
})
module.exports = {
    MetaComponent
}
