const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)


$$('.search-tab').forEach($tab => {
  console.log($tab)
  $tab.onclick = function() {
    $$('.search-tab').forEach($tab => $tab.classList.remove('active')) //注意这 forEach 的{}可以省略不写
    this.classList.add('active') 
    searchType = this.dataset.type   //注意这步
  }
})

 //https://cn.bing.com/search?q=
 //https://www.baidu.com/s?wd=

 let searchType = 'baidu'
 
 let pageStatus = 'preview'  //声明一个变量表示页面处于某种状态，这里有2种：一种是setting，一种是preview

 let curModifyIdx = 1
 let $curModify = null


 const searchMap = {
  'baidu':'https://www.baidu.com/s?wd=' ,
  'bing' : 'https://cn.bing.com/search?q='
 }

 $('.search-icon').onclick = function() {
  search()
} //这里点击事件绑定的时候要注意，对于引入的symbol图标，不能用其原本就有的class="icon" 当作dom元素去绑定，使用原本的class会发现点击事件无效，需要另外加一个class才有效

document.onkeyup = function(e) {  //绑定enter 回车搜索事件
  // console.log(e.key)
  if(e.key === 'Enter'){
     search()
  }
}

function search() {   //这因为两个事件都用了同样的代码，所以写在一个函数里，简化代码
  let value = $('.search-input input').value //获取input中的输入内容，放在变量value中
  let url = searchMap[searchType] + value  //注意这里对于对象的使用 searchMap[searchType]
  const $link = document.createElement('a')
  $link.setAttribute('href', url)
  $link.setAttribute('target', '_blank')
  $link.click()   //注意这步，个人理解为激活a链接
}

  /*
  data = [{
    title: '常用网站'
    data: [
      {
        name: '百度' ,
        url : 'https://baidu.com'
      }
        
      {
        name: '知乎' ,
        url : 'http://zhihu.com'
      }
    ]

   },{
    title: '精品博客'
    data: [
      {
        name: '阮一峰' ,
        url : 'https://javascript.ruanyifeng.com'
      }
        
      {
        name: '若愚' ,
        url : 'http://zhuanlan.zhihu.com/study-fe'
      }
    ]
   }]
  */


   let data = []
  //  const  data  = [{
  //   title: '常用网站' ,
  //   data: [
  //     {
  //       name: '百度' ,
  //       url : 'https://baidu.com'
  //     },
        
  //     {
  //       name: '知乎' ,
  //       url : 'http://zhihu.com'
  //     }
  //   ]

  //  },{
  //   title: '精品博客' ,
  //   data: [
  //     {
  //       name: '阮一峰' ,
  //       url : 'https://javascript.ruanyifeng.com'
  //     },
        
  //     {
  //       name: '若愚' ,
  //       url : 'http://zhuanlan.zhihu.com/study-fe'
  //     }
  //   ]
  //  }]

   load()  //这里要放在render(data)前面,不然会出现报错！！！为什么？
   
   
  

   /*
   <li class="item">
    <h2>常用网站 <sapn></span></h2>
      <ul class="panel">
        <li class="tag "> <svg class="icon " aria-hidden="true"><use xlink:href="#icon-plus-square"></use></svg> <a href="" target="_blank">百度</a> </li> //在这新增了 a 链接
        <li class="tag "> <a href="" target="_blank">知乎</a> </li>
        <li class="tag icon-add "> <svg class="icon " aria-hidden="true"><use xlink:href="#icon-plus-square"></use></svg> </li>                   
       </ul>
    </li>
   */
   
   render(data)
   
    function render(data) {  //封装进函数，方便调用
      const $itemArr = data.map(obj => {
        const $item = document.createElement('li')
        $item.classList.add('item')
   
        const $h2 = document.createElement('h2')
        $h2.append(obj.title)  //注意这步是参数obj.title

        const  $iconSpan =document.createElement('span')//后续添加的
        
        $iconSpan.innerHTML= '<svg class="icon icon-delete" aria-hidden="true"><use xlink:href="#icon-delete"></use></svg> <svg class="icon icon-edit" aria-hidden="true"><use xlink:href="#icon-edit"></use></svg>'  //后续添加的

        $h2.append($iconSpan)  //后续      
   
        const $ul = document.createElement('ul')
        $ul.classList.add('panel')
   
        let $dataArray = obj.data.map(item => {
         const $tag = document.createElement('li')
         $tag.classList.add('tag')
         $tag.innerHTML = '<svg class="icon icon-remove" aria-hidden="true"><use xlink:href="#icon-delete"></use></svg>'
         const $a = document.createElement('a')
         $a.setAttribute('href',item.url)
         $a.setAttribute('target', '_blank')
         $a.append(item.name)
         $tag.append($a)  //把a链接放进li里
   
         return $tag   //注意这里要return 想要的值。可以理解为 map 最后需要返回（return）一个结果,这个结果是新的数组
        })
   
        $ul.append(...$dataArray)  //个人理解为因为$dataArray里面的是数组，放进$ul的时候要解构
        let $icon = document.createElement('li')  //后续
        $icon.classList.add('tag')
        $icon.classList.add('icon-add')
        $icon.innerHTML='<svg class="icon " aria-hidden="true"><use xlink:href="#icon-plus-square"></use></svg>'
        $ul.append($icon)
   
        $item.append($h2,$ul)
   
        return $item   //注意外部还有一个map,也需要return
      })       
   
      // console.log($itemArr)
   
      $('#websites .list').innerHTML = ''   //这儿的清空也可以用innerText吧？
      $('#websites .list').append(...$itemArr)
    }

  
  $('.icon-set').onclick = function() {
    pageStatus = 'setting'
    $('body').classList.remove('preview')
    $('body').classList.add('setting')
  } 

  $('.icon-back').onclick = function() {
    pageStatus = 'preview'
    $('body').classList.remove('setting')
    $('body').classList.add('preview')
  } 

  $('.icon-plus').onclick = function() {
    $('.modal-1').classList.add('show')
  }

  $('.modal-1 .cancle').onclick = function() {
    $('.modal-1').classList.remove('show')
  }

  $('.modal-2 .cancle').onclick = function() {
    $('.modal-2').classList.remove('show')
  }

  $('.modal-3 .cancle').onclick = function() {
    $('.modal-3').classList.remove('show')
  }  

  $('.modal-1 .confirm').onclick = function() {
    let value = $('.modal-1 input').value
    if(value === '') {
      alert('输入不能为空')
      return
    }
    let obj = {
      title: value,
      data: []     //思考什么要加这个 data:[]  个人理解为，先前构建的dom元素是按照[{},{},{}]数组里面为对象的结构构建，这里添加的{}对象应该和先前dom结构映射时候data[].data的结构相同。这里只是添加一个大的模块
    }

    data.push(obj)
    render(data)
    save()

    $('.modal-1').classList.remove('show')
    
  }

  
  $('.modal-2 .confirm').onclick = function() {
    let value = $('.modal-2 input').value
    if(value === '') {
      alert('输入不能为空')
      return
    }
    
    data[curModifyIdx].title = value
    render(data)
    save()

    $('.modal-2').classList.remove('show')
  }
  
  $('.modal-3 .confirm').onclick = function() {
    let name = $('.modal-3 .site-name').value
    let url = $('.modal-3 .site-url').value
    if(name === '' || url === '') {
      alert('输入不能为空')
      return
    }
    
    data[curModifyIdx].data.push({name,url})    //push一个对象，里面有2个属性:一个是属性为name,值也为name; 一个属性是url,值也是url
    render(data)
    save()

    $('.modal-3').classList.remove('show')
  }
  
  $('.list').onclick = function(e) {  //用事件代理，为什么要给.list绑定呢，因为如果单独给图标绑定，那么我们后续添加的模块都需要再绑定，会很麻烦。又因为添加的模块全都在 .list里所以可以对它绑定。
    //而且 .list 是实际写在html里的，而 .item 里面的是我们暂时用js写的dom结构
    console.log(e.path)

    let $delete = e.path.find($node => $node.classList&& $node.classList.contains('icon-delete') )  // 更改的①

    if($delete) {  //更改② （ 这里只加了if($delete){} ）  如果$delete 存在，就执行里面的代码
      let $result = e.path.filter($node => $node.classList&& $node.classList.contains('item') ) 

     if($result.length>0){
       let $item = $result[0]  //找到点击是哪一个
       let index = [...$$('.item')].indexOf($item) //选择所有dom元素 .item  并结构为数组，然后用.indexOf()查找当前点击获得的 .item 下标为多少（确认在数组中的位置）。为后面点击删除做准备
       console.log(index)

       data.splice(index,1)  //对data的值删除

       render(data)   /*思考为什么要在这再次调用render(data)函数？
                      注意观察我们在这次项目中调用render(data)函数的次数和时机以及为什么要调用？
                      个人理解为：相当于更新，重新渲染？不确定，后续再思考,一个函数中调用一次即可？*/
                                                                            
         save()                
     
      }
    
      console.log($result)

   }  //写完后你发现可以删除了，但是你也会发现，点击其它地方也会删除，有bug 并不精确。后面在里面加了①和② if($delete){} 解决了这个问题
    
    
    //下面是点击编辑标题
    let $edit = e.path.find($node => $node.classList&& $node.classList.contains('icon-edit') )
    
    if($edit) {  
      let $result = e.path.filter($node => $node.classList&& $node.classList.contains('item') ) 

     if($result.length>0){
       let $item = $result[0] 
       let index = [...$$('.item')].indexOf($item) 
       
       curModifyIdx = index  //这里index不能直接拿出去用，个人理解为是因为它在函数内部的变量
       $curModify = $item  //这步有啥用吗？

       console.log(curModifyIdx)

       $('.modal-2').classList.add('show')
       
       let title = $item.querySelector('h2').innerText  //注意这步innerText的用法

       $('.modal-2 input').value = title  //注意这步
            
    
      }
    
    } 

    //添加小模块
    let $add = e.path.find($node => $node.classList&& $node.classList.contains('icon-add') )

    if($add) {  
      let $result = e.path.filter($node => $node.classList&& $node.classList.contains('item') ) 

     if($result.length>0){
       let $item = $result[0] 
       let index = [...$$('.item')].indexOf($item) 
       
       curModifyIdx = index  //这里index不能直接拿出去用，个人理解为是因为它在函数内部的变量
       $curModify = $item  //这步有啥用吗？

       console.log(curModifyIdx)

       $('.modal-3').classList.add('show')
       
           
      }
    
    } 

    //移除小模块
    let $remove = e.path.find($node => $node.classList&& $node.classList.contains('icon-remove') )
    
    if($remove) { 

    let $tag = $remove.parentElement
    let tagArr = [...$tag.parentElement.children] //找到 .panel的子元素列表，解构为数组
    let tagIndex = tagArr.indexOf($tag)
    console.log(tagIndex)
    window.$remove = $remove  //为了能在后台写出$remove便于观察,不过需要先点击 icon-remove 
    let $result = e.path.filter($node => $node.classList&& $node.classList.contains('item') ) 

     if($result.length>0){
       let $item = $result[0]  
       let index = [...$$('.item')].indexOf($item) 
       
       data[index].data.splice(tagIndex,1)
                                         
         save()                
        $tag.remove()

      }
    
   }

  }
  

  //本地储存
  function save() {
    localStorage.setItem('website',JSON.stringify(data))
  }

  function load() {
    let localStorageData = localStorage.getItem('website')
    if(localStorageData) {   //为什么这里面要用if写
      data = JSON.parse(localStorageData)
    } else  {
      data = []
    }
    // data = localStorageData || []
  }

 

  