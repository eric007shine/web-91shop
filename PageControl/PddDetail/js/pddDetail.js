
function ajax(itemID){
    let body = {
    }
    let url = '/taoyou/pdd/product/detail/' + itemID + '/1.0'
    requestApi(url,body,doResponse)
}
function doResponse(res){
    if (res.code == 0){
        let data = res.data
        let bannerHtml = ''
        for (let img of data.smallImages) {
            bannerHtml += `<div class="swiper-slide">
                <img src="${img}" class="bannerImg">
            </div>`
        }
        document.getElementById('Swiper').innerHTML = bannerHtml
        initSwiper()
        document.getElementById('ProductTitle').innerHTML = data.title
        document.getElementById('ProductYouHuiPrice').innerHTML = changeFontNum(parseFloat(data.youhuiPrice).toFixed(1));
        if (data.youhuiPrice !== data.zkFinalPrice) {
            document.getElementById('ProductZKfinalPrice').innerHTML = '￥'+data.zkFinalPrice
        }
        if (parseFloat(data.volume) >= 10000) {
            document.getElementById('ProductHasBuyNumber').innerHTML = (parseFloat(data.volume) / 10000).toFixed(1) + '万人已买'
        }
        else{
            document.getElementById('ProductHasBuyNumber').innerHTML = data.volume+'人已买'
        }
        document.getElementById('ProductShopName').innerHTML = data.shopTitle
        document.getElementById('ProductFWscore').innerHTML = data.avgServ
        document.getElementById('ProductMSscore').innerHTML = data.avgDesc
        document.getElementById('ProductWLscore').innerHTML = data.avgLgst
        document.getElementById('ProductDescLabel').innerHTML = data.goodsDesc
        let pictureInnerHtml = ''
        for (let img of data.detailImages) {
            pictureInnerHtml += `<li  class="pictureImg">
                <img src="${img}" alt="" class="pictureImg">
            </li>`
        }
        document.getElementById('ProductPicUrl').innerHTML = pictureInnerHtml
        let productInnerHtml = ''
        for (let pro of data.products) {
            productInnerHtml += `<li class="OtherProduct">
                <div class="OtherProductBg">
                        <img src="${pro.pictUrl}" class="OtherProductImg">
                        <div class="OtherProductInfo">
                            <p class="OtherProductTitle">
                                <i class="OtherProductTitleIcon"></i>
                                <span>${pro.title}</span>
                             </p>
                            <div class="OtherProductMoney">
                                <span class="OtherProductYHmoneyExt">￥
                                    <span class="OtherProductYHmoney"> ${OtherProductYHmoneyFont(parseFloat(pro.youhuiPrice).toFixed(1))} 
                                    </span>
                                </span>`
            if (pro.youhuiPrice !== pro.zkFinalPrice) {
                productInnerHtml += `<span class="OtherProductZKmoney"> ￥${parseFloat(pro.zkFinalPrice).toFixed(1)} </span>`
            }
            productInnerHtml += `</div>`
            if (pro.hongbaoAmount !== null && pro.hongbaoAmount !== '0') {
                productInnerHtml += `<div class="OtherProductRedPacket">
                                <span class="OtherProductBackMoney"> 奖励${parseFloat(pro.hongbaoAmount).toFixed(2)}元 </span>
                            </div>`
            }
            if (pro.couponAmount !== null && pro.couponAmount !== '0') {
                productInnerHtml += `<div class="OtherProductCoupon">
                                <span class="OtherProductCouponOne"></span>
                                <span class="OtherProductCouponTwo">${pro.couponAmount}元</span>
                                <span class="OtherProductCouponThree"></span>
                                <span class="OtherProductHasBug">${OtherProductHasBuy(pro.volume)}</span>
                            </div>`
            }
            else{
                productInnerHtml += `<div class="OtherProductHasBugNoCoupon">${OtherProductHasBuy(pro.volume)}
                    </div>`
            }
            productInnerHtml += `</div>
                    </div>
                </li>`
        }
        document.getElementById('OtherProductID').innerHTML = productInnerHtml
    } 
    else{
        window.alert(res.message)
    }	
}
function initSwiper() {
    var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
  })
}
function changeFontNum(money){
	var integral = money.substring(0, money.indexOf('.')); //小数点前的数字
	var decimal = money.substring(money.indexOf('.')); //小数点后的数字
	const html = '<span class="integral">' + integral + '</span><span class="decimal">' + decimal + '</span>';
	return html;
}
function OtherProductYHmoneyFont(money){
    var integral = money.substring(0, money.indexOf('.')); //小数点前的数字
    var decimal = money.substring(money.indexOf('.')); //小数点后的数字
    const html = '<span class="OtherProductYHmoneyIntegral">' + integral + '</span><span class="OtherProductYHmoneyDecimal">' + decimal + '</span>';
    return html;
}
function OtherProductHasBuy(volume){
    if (parseFloat(volume) >= 10000) {
        return (parseFloat(volume) / 10000).toFixed(1) + '万人已买'
    }
    else{
        return volume + '人已买'
    }
} 
function feedBackClick(){
    // document.body.classList.add("notScroll")
    document.body.addEventListener('touchmove',bodyScroll,{passive:false})
    var box = document.getElementById('FeedBackBombox')
    var mask = document.getElementById('mask')
    var content = document.getElementById('FeedBackWhiteBg')
    content.classList.remove("FeedBackAddHideAnimate")
    mask.classList.remove("FeedBackBgAddHideAnimate")
    box.style.display = 'block'
}
function FeedBackBalckBgClick(){
    // document.body.classList.remove("notScroll");
    document.body.removeEventListener('touchmove',bodyScroll,{passive:false})
    var box = document.getElementById('FeedBackBombox')
    var mask = document.getElementById('mask')
    var content = document.getElementById('FeedBackWhiteBg')
    mask.classList.add('FeedBackBgAddHideAnimate')
    content.classList.add("FeedBackAddHideAnimate")
    setTimeout(() => {
        box.style.display = 'none'
    },500)
}
function bodyScroll(event){
    event.preventDefault();
}
function FeedBackBtnClick(event,typeString){
    console.log(typeString)
    // event.stopPropagation()
}
// 获取链接参数
function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
    if(r !== null) {
        return  unescape(r[2]);
    }
    else{
        return null;
    }      
}

window.onload = function () {
    var itemID = GetQueryString('itemID')
    ajax(itemID)
    // ajax('67083316')
    
}
