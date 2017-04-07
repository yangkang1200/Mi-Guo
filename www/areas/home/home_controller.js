
angular.module('home.controller', ['home.service'])
  .controller('HomeCtrl', function($scope,$http,$ionicScrollDelegate,GlobalVariable,$window,$state) {
    getHeaderSlideData();
    goTop();
    countdown();
    // 监听页面激活事件
    $scope.$on('$ionicView.enter',function(){
      initHeaderSlide();
      initToutiaoSlide();

    })


    // 头部滚动条数据
    function getHeaderSlideData(){
      $scope.obj_headerSlideData=[
        {
          alt:"双十一预热主场会",
          src:"http://gju3.alicdn.com/tps/i1/1000006005939263830/TB273JOjYXlpuFjy1zbXXb_qpXa_!!0-0-jupush.jpg"
        },
        {
          alt:"11月11天家电低价不停歇",
          src:"http://gju4.alicdn.com/tps/i1/1000006006414533623/TB2K.57jYXlpuFjy1zbXXb_qpXa_!!0-0-jupush.jpg"
        },
        {
          alt:"家具盛典 好货提前抢",
          src:"http://gju1.alicdn.com/tps/i1/1000006008870449222/TB2tRRXmrlmpuFjSZFlXXbdQXXa_!!0-0-jupush.jpg"
        }
      ];
    }


    // 初始化头部滚动条
    function initHeaderSlide(){
      var headerSwiper = new Swiper('#headerSlider', {
        slidesPerView: 1,
        paginationClickable: true,
        centeredSlides: true,
        autoplay: 2000,
        autoplayDisableOnInteraction: false,
        loop: true,
        // 如果需要分页器
        pagination: '.swiper-pagination',
        // 改变自动更新
        observer:true,
        observeParents:true
      });
    }
    // 初始化京东头条滚动条
    function initToutiaoSlide(){
      var toutiaoSwiper = new Swiper('#toutiaoSlider', {
        direction:'vertical',
        autoplay: 2000,
        loop: true
      });
    }
    $http.get('http://m.meguo.com/index/ajax-load-type?dataType=shijiu&cate_id=&order=default&page=1')
        .then(function(data){
          console.log(data)
          $scope.list = data.data
          $scope.lists = data.data.data
        })
        .catch(function(error){
          console.log(error)
    })
    var num = 2
    $scope.loading = function(){
      console.log('111111')
      var count = num++
      $http.get('http://m.meguo.com/index/ajax-load-type?dataType=shijiu&cate_id=&order=default&page=' + count)
      .then(function(data){
          console.log(data)
          $scope.list = data.data
          $scope.lists = data.data.data.concat(data.data.data)
        })
        .catch(function(error){
          console.log(error)
    })
  }
      $scope.func_goHome= function () {
      $state.go('tab.category');
    }
    $scope.func_godetail= function () {
      $state.go('goodsList');
    }
     $scope.func_gododetail= function () {
      $state.go('details');
    }
     $scope.func_gocard= function () {
      $state.go('cart');
    }
    //回到顶部
    function goTop(){
      var bg=window.document.getElementById('home-content');
      var goTop = document.querySelector(".back_top");

      bg.addEventListener('scroll',function(){
        var top = bg.scrollTop;
        if(top>200){
          goTop.style.opacity = 1;
        }else{
          goTop.style.opacity = 0;
        }
      },false);

      goTop.onclick = function(){
        bg.scrollTop = 0;
      }
    };


    // 秒杀计时器
    function countdown(){
      if($window.timer){
        clearInterval($window.timer);
      }
      // 倒计时
      var timeObj={
        h:1,
        m:37,
        s:13
      };

      var timeStr=toDouble(timeObj.h)+toDouble(timeObj.m)+toDouble(timeObj.s);
      var timeList=document.getElementsByClassName('time-text');
      for(var i=0;i<timeList.length;i++){
        timeList[i].innerHTML=timeStr[i];
      }
      function toDouble(num){
        if(num<10){
          return '0'+num;
        }else{
          return ''+num;
        }
      }

      $window.timer=setInterval(function(){
        timeObj.s--;
        if(timeObj.s==-1){
          timeObj.m--;
          timeObj.s=59;
        }
        if(timeObj.m==-1){
          timeObj.h--;
          timeObj.m=59;
        }
        if(timeObj.h==-1){
          timeObj.h=0;
          timeObj.m=0;
          timeObj.s=0;
          clearInterval($window.timer);
        }
        timeStr=toDouble(timeObj.h)+toDouble(timeObj.m)+toDouble(timeObj.s);
        for(var i=0;i<timeList.length;i++){
          timeList[i].innerHTML=timeStr[i];
        }
      },1000)
    }

  })
