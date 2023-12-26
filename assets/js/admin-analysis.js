//月別選擇
const selectMonth=document.querySelector("#selectMonth");
//統計列表
const productList=document.querySelector(".productList");
const totalContent=document.querySelector(".totalContent");
const chartContent=document.querySelector(".chartContent");

const _url="https://dealmealserver.onrender.com";
// const _url="http://localhost:3000";

//初始
init();

let monthSelectAllData = [];

function init(){
    axios.get(`${_url}/sales`)
    .then(function(res){
        monthSelectAllData = res.data;
        calculate(res.data);
    })
    .catch(function(err){
        console.log(err);
    })
}

let total;
//統計各月品項商品總額
function calculate(data){
    total={};
    //遍歷每份訂單
    data.forEach((order)=>{
        if(total[order.monthId] == undefined){
            total[order.monthId] ={};
        }
    })

    //列表資料
    //遍歷每份訂單 的每隻品項
    data.forEach((order)=>{
        order.products.forEach((item)=>{
            //create or edit
            //若該月中沒有這隻品項，則create
            if( total[order.monthId][item.name] == undefined){
                total[order.monthId][item.name] = {
                    "image": item.image,
                    "series": item.series,
                    "price": item.price,
                    "saleQuantity": item.saleQuantity,
                    "saleFigures": item.saleFigures
                }
            }else{
                //有的話則增加
                total[order.monthId][item.name].saleQuantity += item.saleQuantity;
                total[order.monthId][item.name].saleFigures += item.saleFigures;
            }
        })
    })

    //統計完後渲染
    render(total);
}

//資料取出渲染
function render(data){
    let str="";
    let totalQuantity=0;
    let totalFigures=0;
    //取出data內全部有的年月
    const monthAry = Object.keys(data);
    //圖表渲染內容
    chartContent.innerHTML="";

    //item 為月份物件
    monthAry.forEach((item)=>{

        //data[item]為該月份內的商品資料，productAry存放各商品名稱
        let productAry = Object.keys(data[item]);

        // 每個年月產生圖表
        let chartObj={}; //全部商品
        let figureAry=[]; //各個商品的業績

        //取出商品名稱的對應值
        productAry.forEach((product)=>{
            str+=`
            <tr class="align-middle border border-primary">
                <td>${item}</td>
                <td class="p-3" style="width: 110px;">
                  <div class="ratio ratio-1x1 ">
                    <img src="${data[item][product].image}" alt="${product}">
                  </div>
                </td>
                <td>${data[item][product].series}</td>
                <td>${product}</td>
                <td>${data[item][product].price}元</td>
                <td>${data[item][product].saleQuantity}份</td>
                <td>${data[item][product].saleFigures}元</td>
              </tr>
            `;
            totalQuantity += data[item][product].saleQuantity;
            totalFigures += data[item][product].saleFigures;

            //放入商品名稱、商品銷售額
            figureAry.push( [ product , data[item][product].saleFigures ] ) 

        })

        chartObj[item] = figureAry;

        chartContent.innerHTML += `
        <p class="mt-7">銷售月份：${item}</p>
        <div id="chart-${item}"></div>
        `;

        //渲染圖表
        let chart = c3.generate({
            bindto: `#chart-${item}`, // HTML 元素綁定
            data: {
                columns: chartObj[item],
                type: 'bar'
            },
            bar: {
                width: 100 // this makes bar width 100px
            }
        });

    })

    productList.innerHTML = str;
    totalContent.innerHTML =`
    <td>${totalQuantity}份</td>
    <td>${totalFigures}元</td>
    `;

}

//篩選月份
selectMonth.addEventListener("change",(e)=>{
    if( e.target.value == "全部"){
        calculate(monthSelectAllData);
    }else{
        axios.get(`${_url}/sales?monthId=${e.target.value}`)
        .then(function(res){
            calculate(res.data);
        })
        .catch(function(err){
            console.log(err);
        })
    }
})

