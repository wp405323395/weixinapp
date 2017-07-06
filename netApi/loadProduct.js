const requestUrl = require('../config').requestUrl
const duration = 2000
//promotionStrategy 0:折扣，1.元 ，2.文字
var products_from_web = {
  products:
  [
    {
      id: '100000',
      name: '青青果果',
      img: "../../image/red_tickit.png",
      typeId: 0,
      typeName: "生鲜超市",
      promotionStrategy: 0,
      productInstructions: "8.8",
      constraint:'全场通用'
    },
    {
      id: '100000',
      name: '小蔡水果铺',
      img: "../../image/red_tickit.png",
      typeId: 0,
      typeName: "生鲜超市",
      promotionStrategy: 0,
      productInstructions: "8.8",
      constraint: '全场通用'
    },
    {
      id: '100000',
      name: '青青果果',
      img: "../../image/tickit_blue.png",
      typeId: 0,
      typeName: "生鲜超市",
      promotionStrategy: 2,
      productInstructions: "10元3斤",
      constraint: '仅限香蕉'
    },
    {
      id: '100000',
      name: '佳品店',
      img: "../../image/tickit_violet.png",
      typeId: 0,
      typeName: "生鲜超市",
      promotionStrategy: 1,
      productInstructions: "5",
      constraint: '满50可用'
    },
    {
      id: '100000',
      name: '小重庆火锅',
      img: "../../image/tickit_blue.png",
      typeId: 1,
      typeName: "餐饮美食",
      promotionStrategy: 0,
      productInstructions: "9.8",
      constraint: '全场通用'
    },
    {
      id: '100000',
      name: '农家菜馆',
      img: "../../image/red_tickit.png",
      typeId: 1,
      typeName: "餐饮美食",
      promotionStrategy: 0,
      productInstructions: "8.8",
      constraint: '除酒水'
    },
    {
      id: '100000',
      name: '潜江油焖大虾',
      img: "../../image/tickit_blue.png",
      typeId: 1,
      typeName: "餐饮美食",
      promotionStrategy: 0,
      productInstructions: "8.8",
      constraint: '除酒水'
    },
    {
      id: '100000',
      name: '好乐迪KTV',
      img: "../../image/red_tickit.png",
      typeId: 2,
      typeName: "休闲娱乐",
      promotionStrategy: 0,
      productInstructions: "6.0",
      constraint: '18:00-24:00'
    },
    {
      id: '100000',
      name: '椰岛发型',
      img: "../../image/tickit_blue.png",
      typeId: 2,
      typeName: "休闲娱乐",
      promotionStrategy: 1,
      productInstructions: "10",
      constraint: '14:00-17:00'
    },
    {
      id: '100000',
      name: '凯撒健身',
      img: "../../image/red_tickit.png",
      typeId: 2,
      typeName: "休闲娱乐",
      promotionStrategy: 2,
      productInstructions: "一周体验",
      constraint: '仅限武胜路店'
    }
  ]
};



function getProducts() {
  var products = products_from_web.products;
  products.sort(function (a, b) {
    return a.typeId - b.typeId; 
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



function getProductById(productId) {
  return {
    id: '100008',
    storeInstructions: "这是一个神奇的小店，这是一个神奇的小店，这是一个神奇的小店，这是一个神奇的小店，这是一个神奇的小店，这是一个神奇的小店，这是一个神奇的小店，这是一个神奇的小店，这是一个神奇的小店，这是一个神奇的小店，这是一个神奇的小店，这是一个神奇的小店",
    storeInstructionsImg: ["http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg", "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg", "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg"],
    name: '柿子',
    price: 7,
    img: "../../image/red_tickit.png",
    typeId: 1,
    typeName: "餐饮美食",
    productInstructions: "全场满十元减五元",
    deadline: "2017.6.18-2017.9.18",
    isReceive: false,
    isUsed: false
  };
}

function getProductsByTypeId(typeId) {
  switch(typeId) {
    case 0:
      return canyin;
    break;
    case 1:
      return shenghuochaoshi;
    break;
    case 2:
      return xiuxianyule;
    break;
  }
   
}

var canyin = [
 {
    id: '100000',
    name: '青青果果',
    img: "../../image/red_tickit.png",
    typeId: 0,
    typeName: "生鲜超市",
    promotionStrategy: 0,
    productInstructions: "8.8",
    constraint: '全场通用'
  }, {
    id: '100000',
    name: '小蔡水果铺',
    img: "../../image/red_tickit.png",
    typeId: 0,
    typeName: "生鲜超市",
    promotionStrategy: 0,
    productInstructions: "8.8",
    constraint: '全场通用'
  }, {
    id: '100000',
    name: '青青果果',
    img: "../../image/tickit_blue.png",
    typeId: 0,
    typeName: "生鲜超市",
    promotionStrategy: 2,
    productInstructions: "10元3斤",
    constraint: '仅限香蕉'
  },{
    id: '100000',
    name: '佳品店',
    img: "../../image/tickit_violet.png",
    typeId: 0,
    typeName: "生鲜超市",
    promotionStrategy: 1,
    productInstructions: "5",
    constraint: '满50可用'
  }, {
    id: '100000',
    name: '青青果果',
    img: "../../image/red_tickit.png",
    typeId: 0,
    typeName: "生鲜超市",
    promotionStrategy: 0,
    productInstructions: "8.8",
    constraint: '全场通用'
  }, {
    id: '100000',
    name: '小蔡水果铺',
    img: "../../image/red_tickit.png",
    typeId: 0,
    typeName: "生鲜超市",
    promotionStrategy: 0,
    productInstructions: "8.8",
    constraint: '全场通用'
  }, {
    id: '100000',
    name: '青青果果',
    img: "../../image/tickit_blue.png",
    typeId: 0,
    typeName: "生鲜超市",
    promotionStrategy: 2,
    productInstructions: "10元3斤",
    constraint: '仅限香蕉'
  },
  {
    id: '100000',
    name: '佳品店',
    img: "../../image/tickit_violet.png",
    typeId: 0,
    typeName: "生鲜超市",
    promotionStrategy: 1,
    productInstructions: "5",
    constraint: '满50可用'
  }
];

var shenghuochaoshi = [{
  id: '100000',
  name: '佳品店',
  img: "../../image/tickit_violet.png",
  typeId: 0,
  typeName: "生鲜超市",
  promotionStrategy: 1,
  productInstructions: "5",
  constraint: '满50可用'
},
{
  id: '100000',
  name: '小重庆火锅',
  img: "../../image/tickit_blue.png",
  typeId: 1,
  typeName: "餐饮美食",
  promotionStrategy: 0,
  productInstructions: "9.8",
  constraint: '全场通用'
},
{
  id: '100000',
  name: '农家菜馆',
  img: "../../image/red_tickit.png",
  typeId: 1,
  typeName: "餐饮美食",
  promotionStrategy: 0,
  productInstructions: "8.8",
  constraint: '除酒水'
},
{
  id: '100000',
  name: '潜江油焖大虾',
  img: "../../image/tickit_blue.png",
  typeId: 1,
  typeName: "餐饮美食",
  promotionStrategy: 0,
  productInstructions: "8.8",
  constraint: '除酒水'
}];

var xiuxianyule = [{
  id: '100000',
  name: '好乐迪KTV',
  img: "../../image/red_tickit.png",
  typeId: 2,
  typeName: "休闲娱乐",
  promotionStrategy: 0,
  productInstructions: "6.0",
  constraint: '18:00-24:00'
},
{
  id: '100000',
  name: '椰岛发型',
  img: "../../image/tickit_blue.png",
  typeId: 2,
  typeName: "休闲娱乐",
  promotionStrategy: 1,
  productInstructions: "10",
  constraint: '14:00-17:00'
},
{
  id: '100000',
  name: '凯撒健身',
  img: "../../image/red_tickit.png",
  typeId: 2,
  typeName: "休闲娱乐",
  promotionStrategy: 2,
  productInstructions: "一周体验",
  constraint: '仅限武胜路店'
}, {
  id: '100000',
  name: '好乐迪KTV',
  img: "../../image/red_tickit.png",
  typeId: 2,
  typeName: "休闲娱乐",
  promotionStrategy: 0,
  productInstructions: "6.0",
  constraint: '18:00-24:00'
},
{
  id: '100000',
  name: '椰岛发型',
  img: "../../image/tickit_blue.png",
  typeId: 2,
  typeName: "休闲娱乐",
  promotionStrategy: 1,
  productInstructions: "10",
  constraint: '14:00-17:00'
},
{
  id: '100000',
  name: '凯撒健身',
  img: "../../image/red_tickit.png",
  typeId: 2,
  typeName: "休闲娱乐",
  promotionStrategy: 2,
  productInstructions: "一周体验",
  constraint: '仅限武胜路店'
}, {
  id: '100000',
  name: '好乐迪KTV',
  img: "../../image/red_tickit.png",
  typeId: 2,
  typeName: "休闲娱乐",
  promotionStrategy: 0,
  productInstructions: "6.0",
  constraint: '18:00-24:00'
},
{
  id: '100000',
  name: '椰岛发型',
  img: "../../image/tickit_blue.png",
  typeId: 2,
  typeName: "休闲娱乐",
  promotionStrategy: 1,
  productInstructions: "10",
  constraint: '14:00-17:00'
},
{
  id: '100000',
  name: '凯撒健身',
  img: "../../image/red_tickit.png",
  typeId: 2,
  typeName: "休闲娱乐",
  promotionStrategy: 2,
  productInstructions: "一周体验",
  constraint: '仅限武胜路店'
}, {
  id: '100000',
  name: '好乐迪KTV',
  img: "../../image/red_tickit.png",
  typeId: 2,
  typeName: "休闲娱乐",
  promotionStrategy: 0,
  productInstructions: "6.0",
  constraint: '18:00-24:00'
},
{
  id: '100000',
  name: '椰岛发型',
  img: "../../image/tickit_blue.png",
  typeId: 2,
  typeName: "休闲娱乐",
  promotionStrategy: 1,
  productInstructions: "10",
  constraint: '14:00-17:00'
},
{
  id: '100000',
  name: '凯撒健身',
  img: "../../image/red_tickit.png",
  typeId: 2,
  typeName: "休闲娱乐",
  promotionStrategy: 2,
  productInstructions: "一周体验",
  constraint: '仅限武胜路店'
}];


module.exports.getProductsByTypeId = getProductsByTypeId;
module.exports.getProducts = getProducts
module.exports.getProductById = getProductById;

//exports.sayGoodbye = sayGoodbye