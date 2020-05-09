/*
 * @Author: Luoxd
 * @Description: 
 * @Date: 2020-01-10 15:37:16
 * @LastEditTime : 2020-01-26 23:06:35
 * @LastEditors  : Luoxd
 */
const { FolderList } = require('../models/folder')
const { createKey } = require('../../core/utils')

class FolderBo {
    static async list (ctx) {
        return FolderList.findAll()
    }
    static async create (name) {
        const data = {
            name,
            componentIds: createKey(),
        }
        const list = Object.assign(new FolderList(), data)
        list.save()
    }
}
module.exports = { FolderBo }
