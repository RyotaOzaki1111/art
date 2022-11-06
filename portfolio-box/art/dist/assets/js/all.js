document.addEventListener("DOMContentLoaded", function () {
	// opennavi_pc();
  // openmask_pc();
});

// const { on } = require("gulp");




// nodeList → 配列に変換
function convertArray(node) {
	const result = Array.prototype.slice.call(node)
	return result;
}

// Activeクラス保持判定
function isActive(element) {
	return element.classList.contains('active');
}



window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  const scroll = window.pageYOffset;
  if (scroll > 100) {      // ➃
    header.classList.add("active");
  }else header.classList.remove("active");
});






/*=================================================
  スムーススクロール
  ===================================================*/
  // ページ内リンクのイベント
  $('a[href^="#"]').click(function(){
    // リンクを取得
    let href= $(this).attr("href");
    // ジャンプ先のid名をセット
    let target = $(href == "#" || href == "" ? 'html' : href);
    // トップからジャンプ先の要素までの距離を取得
    let position = target.offset().top;
    // animateでスムーススクロールを行う
    // 600はスクロール速度で単位はミリ秒
    $("html, body").animate({scrollTop:position}, 600, "swing");
    return false;
  });


  $(window).scroll(function() {
    // スクロールした距離
    let scroll = $(window).scrollTop();
    
    if(window.innerWidth > 900) {
      $('.mainvisual img').css({
        'width': 100/3 + scroll/10  + '%'
      });
      } else {
        $('.mainvisual img').css({
          'width': 100 - scroll/10  + '%'
      });
      }
  });



  /* Begin  Inter Section Observer */

  // 着火点となる要素
const gallerys = document.querySelectorAll('.is-view');

// 関数を実行するタイミングtaiminngu(0~1の間で記述)

// 実行するよ
const observer = new IntersectionObserver(showElements);

// 各 .is-view に到達したら発動。複数あるから forEach 使うよ
 gallerys.forEach(gallery => {
  observer.observe(gallery);
});

// 要素が表示されたら実行する動作
function showElements(entries){
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 各 .is-biew に .active を加える
      entry.target.classList.add('active');
    }else {
      // 各 .is-biew から .active を外す
      entry.taget.classList.remove('active');
    }
  });
} 

/* END  Inter Section Observer */

// 着火点となる要素
const masks = document.querySelectorAll('.is-curtain');

// 関数を実行するタイミングtaiminngu(0~1の間で記述)
const options = {
  threshold: 1
};

// 実行するよ
const maskobserver = new IntersectionObserver(showElements);

// 各 .is-view に到達したら発動。複数あるから forEach 使うよ
 masks.forEach(mask => {
  observer.observe(mask);
});

// 要素が表示されたら実行する動作
function showElements(entries){
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 各 .is-biew に .active を加える
      entry.target.classList.add('active');
    }else {
      // 各 .is-biew から .active を外す
      entry.taget.classList.remove('active');
    }
  });
} 

/* END  Inter Section Observer */


$(window).on('load resize',function(){
  let scroll = $(window).scrollTop();
});

$(window).on('scroll',function(){

  let scroll = $(window).scrollTop();

  let access_position = $('#access').offset().top - $(window).height();

  let contact_position = $('#contact').offset().top - $(window).height();

  if(scroll > access_position) {
    if(scroll < contact_position){
      $('.bg').fadeIn(400);
      $('#access').addClass('active');
    } else {
      $('.bg').fadeOut(400);
      $('#access').removeClass('active');
    }
  } else {
    $('.bg').fadeOut(400);
    $('#access').removeClass('active');
  }
});






window.addEventListener('click', function(){
  $('.toggle-btn').on('click', function() {
    if ($('.toggle-btn').hasClass('active')) {
      $('.toggle-btn').removeClass('active');
      $('#navi').removeClass('active');
    } else {
      $('.toggle-btn').addClass('active');
      $('#navi').addClass('active');
    }
  });
});


// function opennavi_pc() {
//   const btn = document.querySelector('.js-btn-trigger');
//   const menu = document.querySelector('.js-menu-trigger');
//   const navi = document.querySelector('#navi');
//   const mask = document.querySelector('#mask');
//   btn.addEventListener('click', function(){
//     if (isActive(this)) {
//       this.classList.remove("active");
// 			menu.classList.remove("active");
//       navi.classList.remove("active");
//       mask.classList.remove("active");
//     } else {
//       this.classList.add("active");
//       menu.classList.add("active");
//       navi.classList.add("active");
//       mask.classList.add("active");
//     }
//   });
// }



// window.addEventListener('load', function(){
//   let elem = document.querySelector(".js-mv-swiper");
//   if (elem !== null) { //js-person-swiperがあれば…
//     let mySwiper = new Swiper(".js-mv-swiper", {
//       loop: true,
//       spaceBetween: 40,
//       loopAdditionalSlides: 1,
//       slidesPerView: 1.5,
//       initialSlide: 0,
//       centeredSlides : true,

//       breakpoints: {  
//         768: {
//           spaceBetween: 60,
//           slidesPerView: 3.5,
//           loopAdditionalSlides: 3,
//           initialSlide: 0,
//         }
//       },
//     })
//   } 
// });




// $(window).scroll(function() {
//   // fadeinクラスに対して順に処理を行う
//   $('.fade-in-up').each(function() {
//     // スクロールした距離
//     let scroll = $(window).scrollTop();
//     // fadeinクラスの要素までの距離
//     let target = $(this).offset().top;
//     // 画面の高さ
//     let windowHeight = $(window).height();
//     // fadeinクラスの要素が画面下にきてから200px通過した
//     // したタイミングで要素を表示
//     if (scroll > target - windowHeight + 200) {
//       $(this).addClass('active')
//     }  
//     else {
//       $(this).removeClass('active');
//    }
//   });
// });
