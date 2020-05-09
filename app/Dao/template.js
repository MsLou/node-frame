/*
 * @Author: Luoxd
 * @Description: 
 * @Date: 2020-01-10 15:37:16
 * @LastEditTime: 2020-02-25 16:59:13
 * @LastEditors: Luoxd
 */
const { TemplateList } = require('../models/template')
const { createKey } = require('../../core/utils')

class TemplateBo {
  static async list (ctx) {
    return TemplateList.findAll()
  }
  static async create (info) {
    const data = {
      component_id: info.id,
      componentUrl: info.url,
      componentLayout: info.layout,
      componentData: info.data,
      componentDesc: info.desc,
      componentName: info.name,
      componentImgUrl: '',
      createdTime: Date.now() / 1000,
    }
    const result = await TemplateList.create(data)
    return result.componentId
  }
  static async uploadComponentImg (id) {
    const result = await TemplateList.findOne({
      where: {
        componentId: id
      }
    })
    result.componentImgUrl = `${id}.png`
    result.save()
  }
  static async update (id, info) {
    const result = await TemplateList.findOne({
      where: {
        component_id: id
      }
    })
    if (result) {
      Object.assign(result, {
        componentUrl: info.url,
        componentLayout: info.layout,
        componentData: info.data,
        componentDesc: info.desc,
        componentName: info.name,
        componentImgUrl: '-',
        // createdTime: '2020-02-02 13:01:23',
      })
      result.save()
    }
  }
  static async findOne (id) {
    const data = await TemplateList.findOne({
      where: {
        component_id: id
      }
    })
    return data
  }
  static async deleteItem (id) {
    await TemplateList.destroy({
      where: {
        componentId: id
      }
    })
  }
}
module.exports = { TemplateBo }
