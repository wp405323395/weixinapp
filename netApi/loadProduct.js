const requestUrl = require('../config').requestUrl
const duration = 2000
//couponstype 0:折扣，1.元 ，2.文字
var products_from_web = {
  products:
  [
    {
      id: '100000',
      storeName: '青青果果',
      imgUrl: "../../image/tickit_expire_supermarket1.png",
      storetype: 0,
      typeName: "生鲜超市",
      couponstype: 0,
      couponmemo: "8.8",
      usecondition:'全场通用'
    },
    {
      id: '100000',
      storeName: '小蔡水果铺',
      imgUrl: "../../image/tickit_supermarket2.png",
      storetype: 0,
      typeName: "生鲜超市",
      couponstype: 0,
      couponmemo: "8.8",
      usecondition: '全场通用'
    },
    {
      id: '100000',
      storeName: '青青果果',
      imgUrl: "../../image/tickit_supermarket2.png",
      storetype: 0,
      typeName: "生鲜超市",
      couponstype: 2,
      couponmemo: "10元3斤",
      usecondition: '仅限香蕉'
    },
    {
      id: '100000',
      storeName: '佳品店',
      imgUrl: "../../image/tickit_supermarket1.png",
      storetype: 0,
      typeName: "生鲜超市",
      couponstype: 1,
      couponmemo: "5",
      usecondition: '满50可用'
    },
    {
      id: '100000',
      storeName: '小重庆火锅',
      imgUrl: "../../image/tickit_restaurant1.png",
      storetype: 1,
      typeName: "餐饮美食",
      couponstype: 0,
      couponmemo: "9.8",
      usecondition: '全场通用'
    },
    {
      id: '100000',
      storeName: '农家菜馆',
      imgUrl: "../../image/tickit_expire_restaurant2.png",
      storetype: 1,
      typeName: "餐饮美食",
      couponstype: 0,
      couponmemo: "8.8",
      usecondition: '除酒水'
    },
    {
      id: '100000',
      storeName: '潜江油焖大虾',
      imgUrl: "../../image/tickit_restaurant2.png",
      storetype: 1,
      typeName: "餐饮美食",
      couponstype: 0,
      couponmemo: "8.8",
      usecondition: '除酒水'
    },
    {
      id: '100000',
      storeName: '好乐迪KTV',
      imgUrl: "../../image/tickit_game1.png",
      storetype: 2,
      typeName: "休闲娱乐",
      couponstype: 0,
      couponmemo: "6.0",
      usecondition: '18:00-24:00'
    },
    {
      id: '100000',
      storeName: '椰岛发型',
      imgUrl: "../../image/tickit_expire_game2.png",
      storetype: 2,
      typeName: "休闲娱乐",
      couponstype: 1,
      couponmemo: "10",
      usecondition: '14:00-17:00'
    },
    {
      id: '100000',
      storeName: '凯撒健身',
      imgUrl: "../../image/tickit_game1.png",
      storetype: 2,
      typeName: "休闲娱乐",
      couponstype: 2,
      couponmemo: "一周体验",
      usecondition: '仅限武胜路店'
    }
  ]
};



function getProducts(products) {
  if(products == null) {
    return ;
  }
  products.sort(function (a, b) {
    return a.storetype - b.storetype; 
  });
  var typePriveId = -1;
  var differTypeIdIndex = new Array();
  for (var i = 0; i < products.length; i++) {
    var currentTypeId = products[i].storetype;
    if (currentTypeId != typePriveId) {

      differTypeIdIndex.push(i);
    }
    typePriveId = currentTypeId;
  }
  var sliceProducts = new Array();
  for (var j = 0; j < differTypeIdIndex.length; j++) {
    var slic = products.slice(differTypeIdIndex[j], differTypeIdIndex[j + 1]);
    sliceProducts.push({ storetype: products[differTypeIdIndex[j]].storetype, typeName: products[differTypeIdIndex[j]].storetypename, products: slic });
  }
  return sliceProducts;

}



function getProductById(productId) {
  return {
    id: '100008',
    storeInstructions: "这是一个神奇的小店，这是一个神奇的小店，这是一个神奇的小店，这是一个神奇的小店，这是一个神奇的小店，这是一个神奇的小店，这是一个神奇的小店，这是一个神奇的小店，这是一个神奇的小店，这是一个神奇的小店，这是一个神奇的小店，这是一个神奇的小店",
    storeInstructionsImg: ["http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg", "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg", "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg"],
    storeName: '凯撒健身',
    imgUrl: "../../image/game.png",
    storetype: 2,
    typeName: "餐饮美食",
    couponmemo: "一周体验",
    isReceive: false,
    isUsed: false
  };
}

function getProductsByTypeId(storetype) {
  switch(storetype) {
    case 0:
      return supermarket;
    break;
    case 1:
      return restaurant;
    break;
    case 2:
      return game;
    break;
  }
   
}

var supermarket = [
 {
    id: '100000',
    storeName: '青青果果',
    imgUrl: "../../image/tickit_used_supermarket1.png",
    storetype: 0,
    typeName: "生鲜超市",
    couponstype: 0,
    couponmemo: "8.8",
    usecondition: '全场通用'
  }, {
    id: '100000',
    storeName: '小蔡水果铺',
    imgUrl: "../../image/tickit_used_supermarket2.png",
    storetype: 0,
    typeName: "生鲜超市",
    couponstype: 0,
    couponmemo: "8.8",
    usecondition: '全场通用'
  }, {
    id: '100000',
    storeName: '青青果果',
    imgUrl: "../../image/tickit_used_supermarket2.png",
    storetype: 0,
    typeName: "生鲜超市",
    couponstype: 2,
    couponmemo: "10元3斤",
    usecondition: '仅限香蕉'
  },{
    id: '100000',
    storeName: '佳品店',
    imgUrl: "../../image/tickit_used_supermarket1.png",
    storetype: 0,
    typeName: "生鲜超市",
    couponstype: 1,
    couponmemo: "5",
    usecondition: '满50可用'
  }, {
    id: '100000',
    storeName: '青青果果',
    imgUrl: "../../image/tickit_used_supermarket1.png",
    storetype: 0,
    typeName: "生鲜超市",
    couponstype: 0,
    couponmemo: "8.8",
    usecondition: '全场通用'
  }, {
    id: '100000',
    storeName: '小蔡水果铺',
    imgUrl: "../../image/tickit_used_supermarket2.png",
    storetype: 0,
    typeName: "生鲜超市",
    couponstype: 0,
    couponmemo: "8.8",
    usecondition: '全场通用'
  }, {
    id: '100000',
    storeName: '青青果果',
    imgUrl: "../../image/tickit_used_supermarket2.png",
    storetype: 0,
    typeName: "生鲜超市",
    couponstype: 2,
    couponmemo: "10元3斤",
    usecondition: '仅限香蕉'
  },
  {
    id: '100000',
    storeName: '佳品店',
    imgUrl: "../../image/tickit_used_supermarket1.png",
    storetype: 0,
    typeName: "生鲜超市",
    couponstype: 1,
    couponmemo: "5",
    usecondition: '满50可用'
  }
];

var restaurant = [
{
  id: '100000',
  storeName: '小重庆火锅',
  imgUrl: "../../image/tickit_used_restaurant1.png",
  storetype: 1,
  typeName: "餐饮美食",
  couponstype: 0,
  couponmemo: "9.8",
  usecondition: '全场通用'
},
{
  id: '100000',
  storeName: '农家菜馆',
  imgUrl: "../../image/tickit_used_restaurant2.png",
  storetype: 1,
  typeName: "餐饮美食",
  couponstype: 0,
  couponmemo: "8.8",
  usecondition: '除酒水'
},
{
  id: '100000',
  storeName: '潜江油焖大虾',
  imgUrl: "../../image/tickit_used_restaurant2.png",
  storetype: 1,
  typeName: "餐饮美食",
  couponstype: 0,
  couponmemo: "8.8",
  usecondition: '除酒水'
}];

var game = [{
  id: '100000',
  storeName: '好乐迪KTV',
  imgUrl: "../../image/tickit_used_game1.png",
  storetype: 2,
  typeName: "休闲娱乐",
  couponstype: 0,
  couponmemo: "6.0",
  usecondition: '18:00-24:00'
},{
  id: '100000',
  storeName: '椰岛发型',
  imgUrl: "../../image/tickit_used_game1.png",
  storetype: 2,
  typeName: "休闲娱乐",
  couponstype: 1,
  couponmemo: "10",
  usecondition: '14:00-17:00'
},{
  id: '100000',
  storeName: '凯撒健身',
  imgUrl: "../../image/tickit_used_game2.png",
  storetype: 2,
  typeName: "休闲娱乐",
  couponstype: 2,
  couponmemo: "一周体验",
  usecondition: '仅限武胜路店'
}, {
  id: '100000',
  storeName: '好乐迪KTV',
  imgUrl: "../../image/tickit_used_game2.png",
  storetype: 2,
  typeName: "休闲娱乐",
  couponstype: 0,
  couponmemo: "6.0",
  usecondition: '18:00-24:00'
},{
  id: '100000',
  storeName: '椰岛发型',
  imgUrl: "../../image/tickit_used_game1.png",
  storetype: 2,
  typeName: "休闲娱乐",
  couponstype: 1,
  couponmemo: "10",
  usecondition: '14:00-17:00'
},{
  id: '100000',
  storeName: '凯撒健身',
  imgUrl: "../../image/tickit_used_game1.png",
  storetype: 2,
  typeName: "休闲娱乐",
  couponstype: 2,
  couponmemo: "一周体验",
  usecondition: '仅限武胜路店'
}, {
  id: '100000',
  storeName: '好乐迪KTV',
  imgUrl: "../../image/tickit_used_game2.png",
  storetype: 2,
  typeName: "休闲娱乐",
  couponstype: 0,
  couponmemo: "6.0",
  usecondition: '18:00-24:00'
}
];


module.exports.getProductsByTypeId = getProductsByTypeId;
module.exports.getProducts = getProducts
module.exports.getProductById = getProductById;

//exports.sayGoodbye = sayGoodbye