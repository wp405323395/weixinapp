const requestUrl = require('../../config').requestUrl
const duration = 2000
var products_from_web = {
  products:
  [
    { id: '100000', name: '苹果', price: 20, img: "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg", typeId: 1, typeName: "餐饮美食" },
    { id: '100001', name: '菠萝', price: 44, img: "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg", typeId: 1, typeName: "餐饮美食" },
    { id: '100002', name: '香蕉', price: 5, img: "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg", typeId: 2, typeName: "生鲜超市" },
    { id: '100003', name: '葡萄', price: 66, img: "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg", typeId: 2, typeName: "生鲜超市" },
    { id: '100004', name: '西瓜', price: 76, img: "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg", typeId: 2, typeName: "生鲜超市" },
    { id: '100005', name: '哈密瓜', price: 32, img: "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg", typeId: 2, typeName: "生鲜超市" },
    { id: '100006', name: '梨子', price: 8, img: "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg", typeId: 1, typeName: "餐饮美食" },
    { id: '100007', name: '香瓜', price: 4, img: "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg", typeId: 1, typeName: "餐饮美食" },
    { id: '100008', name: '柿子', price: 7, img: "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg", typeId: 1, typeName: "餐饮美食" }]

};



function getProducts() {
  var products = products_from_web.products;
  products.sort(function (a, b) {
    return b.typeId - a.typeId;
  });
  var typePriveId = -1;
  var differTypeIdIndex = new Array();
  for (var i = 0; i < products.length; i++) {
    var currentTypeId = products[i].typeId;
    if (currentTypeId != typePriveId) {

      differTypeIdIndex.push(i);
    }
    typePriveId = currentTypeId;
  }
  var sliceProducts = new Array();
  for (var j = 0; j < differTypeIdIndex.length; j++) {
    var slic = products.slice(differTypeIdIndex[j], differTypeIdIndex[j + 1]);
    sliceProducts.push({ typeId: products[differTypeIdIndex[j]].typeId, typeName: products[differTypeIdIndex[j]].typeName, products: slic });
  }
  return sliceProducts;

}


module.exports.getProducts = getProducts
//exports.sayGoodbye = sayGoodbye