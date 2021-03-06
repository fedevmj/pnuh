$(document).ready(function () {
  // 모달창
  let modal_close = $(".modal-close");
  let modal = $(".modal");

  modal_close.click(function () {
    modal.hide();
  });

  // 배너
  let quick_banner = $(".quick-banner");
  let quick_day_close = $(".quick-day-close");

  // 하루동안 열지않기 버튼
  let quick_day_bt = $(".quick-day-bt");

  // checkbox 체크표시/미표시
  quick_day_bt.click(function () {
    let temp = $(this).hasClass("quick-day-bt-active");
    if (temp != true) {
      $(this).addClass("quick-day-bt-active");
    } else {
      $(this).removeClass("quick-day-bt-active");
    }
  });

  // 닫기 버튼을 클릭하면 배너가 그냥 사라지고
  quick_day_close.click(function () {
    quick_banner.fadeOut(300);

    // 사용자가 체크 박스를 체크했으면 쿠키를 생성.
    let temp = quick_day_bt.hasClass("quick-day-bt-active");
    if (temp == true) {
      setCookie("myCookie", "checked", 1);
    } else {
      delCookie("myCookie");
    }
  });

  // 쿠키 설정
  function setCookie(name, value, expiredays) {
    let date = new Date();
    date.setDate(date.getDate() + expiredays);
    date = date.toUTCString();

    // let theCookie = `${name} = ${value}; path=/;expires=${date}`;
    let theCookie = name + "=" + value + "; path=/ ; expires=" + date;
    document.cookie = theCookie;
    console.log(document.cookie);
  }

  // 쿠키 삭제하기
  function delCookie(name) {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    date = date.toUTCString();

    let theCookie = `${name} = ${value}; path=/;expires=${date}`;
    document.cookie = theCookie;
  }

  // 쿠키 확인하기
  function getCookie(name) {
    let cookies = document.cookie.split(";");
    let visited = false;
    for (let item in cookies) {
      // -1은 배열에 해당 문자열을 가진 요소가 존재하지 않는다는 의미.
      if (cookies[item].indexOf(name) > -1) {
        visited = true;
      }
    }

    if (visited) {
      quick_banner.hide();
    } else {
      quick_banner.show();
    }
  }

  getCookie("myCookie");

  // 빠른 서비스 기능
  let quick_link = $(".quick-link");
  let side_bar = $(".side-bar");
  let side_bar_close = $(".side-bar-close");

  quick_link.click(function () {
    side_bar.addClass("side-bar-active");
  });
  side_bar_close.click(function () {
    side_bar.removeClass("side-bar-active");
  });

  // language 기능
  let language = $("#language");
  let language_wrap = $(".language-wrap");

  language.click(function (event) {
    event.preventDefault();
    language_wrap.toggleClass("language-wrap-active");
  });

  language_wrap.mouseleave(function () {
    language_wrap.removeClass("language-wrap-active");
  });

  // 사이트 검색 기능 구현
  // 보기 버튼
  let site_search = $("#site-search");
  // 보여줄 form
  let site_search_wrap = $(".site-search-wrap");
  // form 닫기 버튼
  let site_search_bt = $(".site-search-bt");
  // form의 텍스트영역 저장
  let site_search_div = $(".site-search-div");
  // form의 텍스트 필드 저장
  let site_search_txt = $(".site-search-txt");

  // 버튼 클릭처리
  site_search.click(function (event) {
    // href를 막는다.
    event.preventDefault();
    // form 닫기 버튼을 보여준다.
    site_search_bt.show();
    // 텍스트 필드 넓이는 class 추가
    site_search_div.addClass("site-search-div-active");
    // 텍스트 필드 포커스 주기
    setTimeout(function () {
      site_search_txt.focus();
    }, 200);

    // 언어 목록 숨기기
    language_wrap.removeClass("language-wrap-active");
  });

  // 닫기 버튼 클릭 처리
  site_search_bt.click(function (event) {
    // form의 버튼을 클릭하면 갱신
    // 막아준다.
    event.preventDefault();
    // 닫기 버튼을 숨긴다.
    setTimeout(function () {
      site_search_bt.hide();
      // 텍스트 필드 내용을 제어 (돋보기버튼 닫았다가 다시 열면 내용 삭제)
      // val = value
      site_search_txt.val("");
    }, 200);
    // 텍스트 필드 넓이는 class 제거
    site_search_div.removeClass("site-search-div-active");
  });

  // 주메뉴 고정 기능
  let header = $(".header");
  let main = $(".main");

  // 고정시킬 위치
  let fix_y = $(".quick-menu").height();
  // console.log(fix_y);

  $(window).scroll(function () {
    let pos = $(window).scrollTop();
    if (pos >= fix_y) {
      header.addClass("header-fixed");
      main.addClass("main-acitve");
    } else {
      header.removeClass("header-fixed");
      main.removeClass("main-acitve");
    }
  });

  // 위로가기
  let gotop = $(".gotop");
  gotop.click(function () {
    $("html").animate(
      {
        scrollTop: 0,
      },
      500
    );
  });

  $(window).scroll(function () {
    let quick_menu_h = $(".quick-menu").offset().top;
    let window_h = $(window).scrollTop();

    if (window_h > quick_menu_h) {
      gotop.addClass("gotop-active");
    } else {
      gotop.removeClass("gotop-active");
    }
  });

  // 주메뉴 기능
  let gnb_a = $(".gnb li a");
  // 서브메뉴 영역을 담당하는 div
  let submenu_div = $(".submenu-div");
  // 서브메뉴들의 높이를 파악해서 슬라이드 높이값으로 사용한다.
  let sub_box = $(".submenu-box");
  $.each(sub_box, function () {
    let temp = $(this).height();
    // console.log(temp);
  });
  let submenu_height = [210, 434, 236, 302, 500, 269];
  // 주메뉴의 높이값
  let mainmenu_height = 100;
  // 각 주메뉴의 타이틀 들
  let submenu_title = $(".submenu-title");
  // 각 주메뉴의 서브메뉴들
  let submenu_box = $(".submenu-box");

  // 각 주메뉴의 포커스 유지
  let gnb_li = $(".gnb>li");

  // 배경 가림막
  let submenu_dim = $(".submenu-dim");

  // 마우스가 주메뉴에 롤 오버가 되면 submenu_div 를 늘여준다.
  $.each(gnb_a, function (index, item) {
    $(this).mouseenter(function () {
      // 배경을 늘려준다.
      submenu_div.css("height", submenu_height[index] + mainmenu_height);

      // index 에 해당하는 타이틀을 보여준다.
      submenu_title.hide();
      submenu_title.eq(index).show();

      // index에 해당하는 서브메뉴를 보여준다.
      submenu_box.hide();
      submenu_box.eq(index).show();

      // 포커스 유지
      gnb_li.removeClass("gnb-li-focus");
      gnb_li.eq(index).addClass("gnb-li-focus");

      // 서브메뉴 배경 보여주기
      submenu_dim.stop().fadeIn(200);
    });
  });

  // 서브메뉴를 선택하러 가는 동안에 롤아웃을 시킬지 말지 결정한다.
  let menu_timer;
  let menu_timer_delay = 100; // 0.5초

  // 마우스가 롤 아웃하면 메뉴 사라지기
  let nav = $(".nav");
  nav.mouseleave(function () {
    menu_timer = setTimeout(menu_up, menu_timer_delay);
  });
  nav.mouseenter(function () {
    clearTimeout(menu_timer);
  });

  function menu_up() {
    clearTimeout(menu_timer);
    submenu_div.css("height", mainmenu_height);

    // 포커스 유지 해제
    gnb_li.removeClass("gnb-li-focus");

    // 서브메뉴 배경 보여주기
    submenu_dim.stop().fadeOut(100);
  }

  // 서브메뉴를 선택하러 가면 사라진다.
  // 포커스도 유지한다.
  let submenu_wrap = $(".submenu-wrap .container");
  submenu_wrap.mouseleave(function () {
    clearTimeout(menu_timer);
    menu_timer = setTimeout(menu_up, menu_timer_delay);
  });
  // 서브메뉴로 이동하는 경우에 무조건 롤아웃을 처리 하지 않는다.
  submenu_wrap.mouseenter(function () {
    clearTimeout(menu_timer);
  });

  // PNUH 네트워크
  let pnuh_bt = $("#pnuh-bt");
  let pnuh_popup = $(".pnuh-popup");
  let pnuh_close = $(".pnuh-close");
  let pnuh_wrap = $(".pnuh-wrap");

  // 모션관련 (1000은 1초)
  let show_speed = 300;
  let hide_speed = 100;

  pnuh_bt.click(function (event) {
    event.preventDefault();
    pnuh_popup.fadeIn(show_speed);
  });

  pnuh_close.click(function () {
    pnuh_popup.fadeOut(hide_speed);
  });

  pnuh_wrap.click(function (event) {
    event.stopPropagation();
  });

  pnuh_popup.click(function (event) {
    pnuh_popup.fadeOut(hide_speed);
  });

  // 건강정보 관련
  let health_data = [
    "good.html@@ h_sample.png@@ 건강@@ 병원보@@ 2022년 생명사랑 겨울호",
    "#@@ image_01.png@@ 건강@@ 블로그-의료정보@@ 혹시 나도 우울증일까? 우울증 극복하기",
    "#@@ image_02.png@@ 건강@@ Youtube@@ 이동형 병원 진료 시스템? 그게 뭐예요?",
    "#@@ image_03.png@@ 건강@@ Youtube@@ 제7회 하모니카 콘서트",
    "#@@ image_04.png@@ 건강@@ Youtube@@ 열명 중 한 명? 건선관절염의 증상과 치료",
    "#@@ image_05.png@@ 건강@@ instagram@@ #로봇수술센터 #부울경최초 #다빈치로봇수술2000례",
    "#@@ image_06.png@@ 건강@@ Youtube@@ 35세 이상 고령임신 어떻게 준비 하나요?",
    "#@@ image_07.png@@ 건강@@ 블로그-의료정보@@ 아무도 알려주지 않은 폐암의 진실",
    "#@@ image_08.png@@ 건강@@ 블로그-의료정보@@ 유행성 이하선염, 아이들을 노리는 봄철 감염병",
    "#@@ image_09.png@@ 건강@@ Youtube@@ 올바른 코 세척 방법",
    "#@@ image_10.png@@ 건강@@ Youtube@@ [항암치료 식생활 2편]어떻게 먹어야 하나요?",
    "#@@ image_11.png@@ 건강@@ 블로그-의료정보@@ 파킨슨병은 무엇인가?! 증상부터 치료까지",
    "#@@ image_12.png@@ 건강@@ Youtube@@ Ocean View 맛집! PNUH 인재개발원",
    "#@@ image_13.png@@ 건강@@ Youtube@@ [포스트코로나 미래 발전 전략_3강] 언택트 테크놀로지",
    "#@@ image_14.png@@ 건강@@ Youtube@@ 키미x보미와 함께하는 코로나 극복 응원",
    "#@@ image_15.png@@ 건강@@ Youtube@@ [항암치료 식생활 1편]어떻게 먹어야 하나요?",
  ];
  let health_total = health_data.length;
  let health_list = $(".health-list");

  // 한 목록당 8개씩 출력하는 알고리즘.
  let page_per = 8; // 페이지당 8개;

  // 페이지에서 보여줄 범위
  let page_show_start = 0;

  // 실제로 보여줄 내용
  let page_html = "";

  // 페이지당 보여줄 범위 결정 함수
  function pageScope() {
    let start = page_show_start; // 0, 8
    let end = page_show_start + page_per; // 8, 16

    // 현재 페이지 숫자가 전체 페이지 숫자 보다 증가하면안된다.
    if (end > health_total) {
      return;
    }

    for (let i = start; i < end; i++) {
      page_html += parseData(health_data[i]);
      page_show_start += 1;
      // console.log(parseData(health_data[i]));
    }

    health_list.html(page_html);
  }

  // html 을 생성하는 함수 기능
  function parseData(_data) {
    // 글자를 @@ 으로 분리하여서 배열을 만든다.
    let temp_arr = _data.split("@@");

    // 각각의 요소들을 공백을 제거한다.
    let link = temp_arr[0].trim();
    let img = "images/" + temp_arr[1].trim();
    let alt = temp_arr[2].trim();
    let cate = temp_arr[3].trim();
    let title = temp_arr[4].trim();

    // 실제 html 로 사용할 글자를 만든다.
    let temp_html = `
        <div class="health-box" data-aos="fade-up" data-aos-duration="800">
            <a href="${link}" alt="${alt}">
                <span class="health-img"><img src="${img}"></span>
                <span class="health-cate">${cate}</span>
                <span class="health-tit">${title}</span>
            </a>
        </div>
        `;

    return temp_html;
  }

  pageScope();

  // 더보기 버튼 기능
  let health_more = $("#health-more");
  health_more.click(function (event) {
    event.preventDefault();
    pageScope();
  });
});

//모든 리소스 로딩 완료
window.onload = function () {
  AOS.init({
    once: true,
  });

  // 퀵링크 슬라이드
  let sw_quick = new Swiper(".sw-quick", {
    loop: true,
    autoplay: {
      delay: 1000,
      disableOninteraction: false,
    },
    speed: 500,
    navigation: {
      nextEl: ".sw-quick-next",
      prevEl: ".sw-quick-prev",
    },
    pagination: {
      el: ".sw-quick-pg",
      clickable: true,
    },
  });

  let sw_quick_pause = $(".sw-quick-pause");
  sw_quick_pause.click(function () {
    let temp = $(this).hasClass("sw-quick-pause-active");
    if (temp != true) {
      $(this).addClass("sw-quick-pause-active");
      sw_quick.autoplay.stop();
    } else {
      $(this).removeClass("sw-quick-pause-active");
      sw_quick.autoplay.start();
    }
  });

  // 비주얼 슬라이드
  let sw_visual = new Swiper(".sw-visual", {
    loop: true,
    autoplay: {
      delay: 2000,
      disableOninteraction: false,
    },
    navigation: {
      prevEl: ".sw-visual-prev",
      nextEl: ".sw-visual-next",
    },
    pagination: {
      el: ".sw-visual-pg",
      clickable: true,
    },
  });

  let sw_visual_pause = $(".sw-visual-pause");
  sw_visual_pause.click(function () {
    let temp = $(this).hasClass("sw-visual-pause-active");
    if (temp != true) {
      $(this).addClass("sw-visual-pause-active");
      sw_visual.autoplay.stop();
    } else {
      $(this).removeClass("sw-visual-pause-active");
      sw_visual.autoplay.start();
    }
  });

  // 공지사항 슬라이드
  let sw_notice = new Swiper(".sw-notice", {
    loop: true,
    autoplay: {
      delay: 2000,
      disableOninteraction: false,
    },
    navigation: {
      prevEl: ".sw-notice-prev",
      nextEl: ".sw-notice-next",
    },
    pagination: {
      el: ".sw-notice-pg",
      clickable: true,
    },
  });

  let sw_notice_pause = $(".sw-notice-pause");
  sw_notice_pause.click(function () {
    let temp = $(this).hasClass("sw-notice-pause-active");
    if (temp != true) {
      $(this).addClass("sw-notice-pause-active");
      sw_notice.autoplay.stop();
    } else {
      $(this).removeClass("sw-notice-pause-active");
      sw_notice.autoplay.start();
    }
  });
};
