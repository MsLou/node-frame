/*
 * @Author: Luoxd
 * @Description: 
 * @Date: 2020-01-10 15:37:16
 * @LastEditTime: 2020-03-08 11:28:43
 * @LastEditors: Luoxd
 */
const { ComponentList } = require('../models/component')
const { MetaComponent } = require('../models/metaComponent')
const { PageList } = require('../models/page')

class ComponentBo {
  static async list (ctx) {
    return (await ComponentList.findAll()).reverse()
  }
  static async findOne (id) {
    const result = await ComponentList.findOne({
      where: {
        component_id: id
      }
    })
    // if (result)
    return result
  }
  static async update (id, info) {
    const result = await ComponentList.findOne({
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
        componentChildLayout: info.childLayout,
        componentChildIds: info.childIds,
        // createdTime: '2020-02-02 13:01:23',
      })
      result.save()
    }
  }
  static async create (info) {
    const data = {
      component_id: info.id,
      componentUrl: info.url,
      componentLayout: info.layout,
      componentData: info.data,
      componentDesc: info.desc,
      componentName: info.name,
      componentImgUrl: '-',
      componentChildLayout: info.childLayout,
      componentChildIds: info.childIds,
      createdTime: Date.now() / 1000,
    }
    const result = await ComponentList.create(data)
    return result.componentId
  }
  static async getImgList () {
    const list = await ComponentList.findAll({
      attributes: ['componentId', 'componentImgUrl', 'componentName']
    })
    return list.reverse()
  }
  static async uploadComponentImg (id) {
    const result = await ComponentList.findOne({
      where: {
        componentId: id
      }
    })
    result.componentImgUrl = `${id}.png`
    result.save()
  }
  static async deleteItem (id) {
    await ComponentList.destroy({
      where: {
        componentId: id
      }
    })
  }
}

class PageBo {
  static async list (ctx) {
    return (await PageList.findAll()).reverse()
  }
  static async findOne (id) {
    const result = await PageList.findOne({
      where: {
        component_id: id
      }
    })
    return result
  }
  static async update (id, info) {
    console.log(PageList)
    const result = await PageList.findOne({
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
        componentChildLayout: info.childLayout,
        componentChildIds: info.childIds,
      })
      result.save()
    }
  }
  static async create (info) {
    const data = {
      component_id: info.id,
      componentUrl: info.url,
      componentLayout: info.layout,
      componentData: info.data,
      componentDesc: info.desc,
      componentName: info.name,
      componentChildLayout: info.childLayout,
      componentChildIds: info.childIds,
      createdTime: Date.now() / 1000,
    }
    const result = await PageList.create(data)
    return result.componentId
  }
  static async deleteItem (id) {
    await PageList.destroy({
      where: {
        componentId: id
      }
    })
  }
}

class MetaComponentBo {
  static async findImgAll () {
    const list = await MetaComponent.findAll({
      attributes: ['componentUrl']
    })
    return list
  }
  static async findAll () {
    const list = await MetaComponent.findAll()
    return list
  }
  static async save (info) {
    const data = {
      componentData: info.data,
      componentUrl: '',
      createAt: '2020-02-09'
    }
    await MetaComponent.create(data)
  }
}
module.exports = { ComponentBo, MetaComponentBo, PageBo }
