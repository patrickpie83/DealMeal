//篩選
const filterArea=document.querySelector(".filterArea");
const selectStatus=document.querySelector("#selectStatus");
const selectSeries=document.querySelector("#selectSeries");
//編輯按鈕
const editBtn=document.querySelector(".editBtn");
const finishBtn=document.querySelector(".finishBtn");
const finishContent=document.querySelector(".finishContent");
const finishConfirmBtn=document.querySelector(".finishConfirmBtn");
//商品列表
const productListContent=document.querySelector(".productListContent");

const _url="https://dealmealserver.onrender.com";
// const _url="http://localhost:3000";

//sweetalert2 timer=1000
const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: false,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

//初始
init();
let productListData = [];
let originData = [];

function init(){
    //取得所有商品
    axios.get(`${_url}/products`)
    .then(function(res){
        productListData = res.data;
        originData = productListData;
        renderProductsList(productListData);
    })
    .catch(function(err){
        console.log(err);
    })

    //清空暫存
    axios.get(`${_url}/productsEditTemp`)
    .then(function(res){
        res.data.forEach(function(item){

            axios.delete(`${_url}/productsEditTemp/${item.id}`)
            .then(function(res){
            })
            .catch(function(err){
                console.log(err);
            })
        })
    })
    .catch(function(err){
        console.log(err);
    })
}

//渲染-不可編輯模式
function renderProductsList(data){

    let str="";

    data.forEach(function(item){
        
        let productStateStr="";
        let productState = item.state;
        if(productState == "販售中"){
            productStateStr=`
            <td>
                <div class="form-check form-check-inline">
                    <input class="form-check-input ms-auto" type="radio" name="productState-${item.name}" id="onSale-${item.name}" checked disabled>
                    <label class="form-check-label" for="onSale-${item.name}">
                        販售中
                    </label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input ms-auto" type="radio" name="productState-${item.name}" id="soldOut-${item.name}"  disabled>
                    <label class="form-check-label" for="soldOut-${item.name}">
                        完售中
                    </label>
                </div>
            </td>
            `
        }else if(productState == "完售中"){
            productStateStr=`
            <td>
                <div class="form-check form-check-inline">
                    <input class="form-check-input ms-auto" type="radio" name="productState-${item.name}" id="onSale-${item.name}" disabled>
                    <label class="form-check-label" for="onSale-${item.name}">
                        販售中
                    </label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input ms-auto" type="radio" name="productState-${item.name}" id="soldOut-${item.name}" checked disabled>
                    <label class="form-check-label" for="soldOut-${item.name}">
                        完售中
                    </label>
                </div>
            </td>
            `
        }

        let storageStatusStr="";
        if(item.storage <= 0){
            storageStatusStr=`<span class="text-danger">庫存量：無</span>`;
        }else if(item.storage <= 10){
            storageStatusStr=`<span class="text-info">庫存量：低</span>`;
        }else if(item.storage <= 20){
            storageStatusStr=`<span class="text-success">庫存量：中</span>`;
        }else{
            storageStatusStr=`<span class="text-primary">庫存量：高</span>`;
        }

        str+=`
        <tr class="align-middle border border-primary">
            <td class="p-3" style="width: 110px;">
                <div class="ratio ratio-1x1 ">
                    <img src="${item.image}" alt="${item.name}">
                </div>
            </td>
            <td>${item.series}</td>
            <td>${item.name}</td>
            <td>${item.price}元</td>
            ${productStateStr}
            <td>
                <span>${item.storage}份，</span>
                ${storageStatusStr}
            </td>
            <td>
                <input type="number" disabled>
            </td>
            <td>
                <a href="admin-detail.html?id=${item.id}">詳細內容</a>
            </td>
        </tr>
        `
    })

    productListContent.innerHTML = str;
}

//編輯監聽
editBtn.addEventListener("click",function(e){
    //寫入暫存
    productListData.forEach(function(item){
        axios.post(`${_url}/productsEditTemp`,item)
        .then(function(res){

        })
        .catch(function(err){
            console.log(err);
        })

    })

    renderProductsEnableList(productListData);
    finishBtn.classList.remove("disabled");
    editBtn.classList.add("disabled");
    selectStatus.disabled = "ture";
    selectSeries.disabled = "ture";
})

//渲染-編輯模式
function renderProductsEnableList(data){
    let str="";

    data.forEach(function(item){
        
        let productStateStr="";
        let productState = item.state;
        if(productState == "販售中"){
            productStateStr=`
            <td>
                <div class="form-check form-check-inline">
                    <input class="form-check-input ms-auto" type="radio" name="productState-${item.name}" id="onSale-${item.name}" data-js="editState" data-js-id="${item.id}" data-js-name="${item.name}" data-js-state="販售中" checked>
                    <label class="form-check-label" for="onSale-${item.name}">
                        販售中
                    </label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input ms-auto" type="radio" name="productState-${item.name}" id="soldOut-${item.name}" data-js="editState" data-js-id="${item.id}" data-js-name="${item.name}" data-js-state="完售中">
                    <label class="form-check-label" for="soldOut-${item.name}">
                        完售中
                    </label>
                </div>
            </td>
            `
        }else if(productState == "完售中"){
            productStateStr=`
            <td>
                <div class="form-check form-check-inline">
                    <input class="form-check-input ms-auto" type="radio" name="productState-${item.name}" id="onSale-${item.name}" data-js="editState" data-js-id="${item.id}" data-js-name="${item.name}" data-js-state="販售中">
                    <label class="form-check-label" for="onSale-${item.name}">
                        販售中
                    </label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input ms-auto" type="radio" name="productState-${item.name}" id="soldOut-${item.name}" data-js="editState" data-js-id="${item.id}" data-js-name="${item.name}" data-js-state="完售中" checked>
                    <label class="form-check-label" for="soldOut-${item.name}">
                        完售中
                    </label>
                </div>
            </td>
            `
        }

        let storageStatusStr="";
        if(item.storage <= 0){
            storageStatusStr=`<span class="text-danger">庫存量：無</span>`;
        }else if(item.storage <= 10){
            storageStatusStr=`<span class="text-info">庫存量：低</span>`;
        }else if(item.storage <= 20){
            storageStatusStr=`<span class="text-success">庫存量：中</span>`;
        }else{
            storageStatusStr=`<span class="text-primary">庫存量：高</span>`;
        }

        str+=`
        <tr class="align-middle border border-primary">
            <td class="p-3" style="width: 110px;">
                <div class="ratio ratio-1x1 ">
                    <img src="${item.image}" alt="${item.name}">
                </div>
            </td>
            <td>${item.series}</td>
            <td>${item.name}</td>
            <td>${item.price}元</td>
            ${productStateStr}
            <td>
                <span>${item.storage}份，</span>
                ${storageStatusStr}
            </td>
            <td>
                <input type="number" min="0" data-js="editStorage" data-js-id="${item.id}">
            </td>
            <td>
                <a >詳細內容</a>
            </td>
        </tr>
        `
    })

    productListContent.innerHTML = str;
}

//狀態 修改監聽
productListContent.addEventListener("click",function(e){

    //如果修改 狀態
    if(e.target.getAttribute("data-js") == "editState"){

        let editProductId = e.target.getAttribute("data-js-id");
        let editProductState = e.target.getAttribute("data-js-state");

        axios.patch(`${_url}/productsEditTemp/${editProductId}`,{
            "state":editProductState
        })
        .then(function(res){
        })
        .catch(function(err){
            console.log(err);
        })
    }


})

//數量 修改監聽
productListContent.addEventListener("change",function(e){
    if(e.target.getAttribute("data-js") == "editStorage"){

        let editProductId = e.target.getAttribute("data-js-id");
        let addProductStorage = Number(e.target.value);

        axios.get(`${_url}/products/${editProductId}`)
        .then(function(res){
            //原始商品的數量
            let originProductStorage = res.data.storage;

            //修改後的數量
            axios.patch(`${_url}/productsEditTemp/${editProductId}`,{
                "storage":originProductStorage + addProductStorage
            })
            .then(function(res){
            })
            .catch(function(err){
                console.log(err);
            })

        })
        .catch(function(err){
            console.log(err);
        })
        
        
    }
})

let editAlertStr="";
//確認修改的內容
finishBtn.addEventListener("click",function(e){

    axios.get(`${_url}/productsEditTemp`)
    .then(function(res){

        editAlertStr="";
        let newProductData=[];

        //tempItem為每一筆暫存內的資料
        res.data.forEach(function(tempItem){

            // 跟原始資料比對
            productListData.forEach(function(originItem){
                if(tempItem.id == originItem.id){
                    if( tempItem.state != originItem.state || tempItem.storage != originItem.storage){
                        //若有異動到的商品記錄下來
                        newProductData.push(tempItem)
                        editAlertStr += 
                        `<span class="text-danger">${tempItem.name}</span> 的架上狀態修改為 <span class="text-danger">${tempItem.state}</span> ，所增加庫存量為 <span class="text-danger">${tempItem.storage - originItem.storage} 份</span><br>`;
                    }
                }
            })
            
        })

        if(!editAlertStr){
            finishContent.innerHTML = `
            無變更資料，確認後離開編輯模式
            `;
        }else{
            finishContent.innerHTML = `
            本次編輯的資料為<br>
            ${editAlertStr}
            `;
        }

    })
    .catch(function(err){
        console.log(err);
    })
})

//確認送出按鈕
finishConfirmBtn.addEventListener("click",function(e){
    if(!editAlertStr){
        location.reload();
    }else{
        //將暫存資料覆蓋至原始資料
        axios.get(`${_url}/productsEditTemp`)
        .then(function(res){
            let len=res.data.length;
            let count=0;

            res.data.forEach(function(item){
                
                axios.patch(`${_url}/products/${item.id}`,item)
                .then(function(res){
                    //確保資料完成後，重新整理頁面
                    count += 1;
                    if(count == len){
                        //sweetalert2
                        Toast.fire({
                            icon: "success",
                            title: "修改成功"
                        }).then((result) => {
                            location.reload();
                        });
                        
                    }
                })
                .catch(function(err){
                    console.log(err);
                })

            })
            

        })
        .catch(function(err){
            console.log(err);
        })


    }
})


let selectStatusFliter = "全部";
let selectSeriesFliter = "全部";
//篩選監聽
filterArea.addEventListener("change",function(e){
    let filterData = [];
    
    //若篩選狀態，則帶入狀態，若篩選系列，則帶入系列 ，如此可以同時進行兩種篩選
    if (e.target.getAttribute("id") == "selectStatus"){
        selectStatusFliter = e.target.value;
        
    }else if ( e.target.getAttribute("id") == "selectSeries" ){
        selectSeriesFliter = e.target.value;
        
    }
    console.log(selectStatusFliter)
    console.log(selectSeriesFliter)

    //篩選狀況
    if( selectStatusFliter == "全部" && selectSeriesFliter == "全部"){
        //若皆選擇全部
        //把原本資料倒回去
        productListData = originData;
        renderProductsList(productListData);

    }else if( selectSeriesFliter == "全部" ){
        //狀態有選擇、系列選全部
        originData.forEach(function(item){
            if(item.state == selectStatusFliter){
                filterData.push(item);
            }
        })
        //資料僅為篩選資料
        productListData = filterData;
        renderProductsList(productListData);

    }else if( selectStatusFliter == "全部" ){
        //系列有選擇、狀態選全部
        originData.forEach(function(item){
            if(item.series == selectSeriesFliter){
                filterData.push(item);
            }
        })
        //資料僅為篩選資料
        productListData = filterData;
        renderProductsList(productListData);

    }else{
        //皆有選擇
        originData.forEach(function(item){
            if((item.state == selectStatusFliter) && (item.series == selectSeriesFliter)){
                filterData.push(item);
            }
        })
        //資料僅為篩選資料
        productListData = filterData;
        renderProductsList(productListData);
    }

})

