document.addEventListener("DOMContentLoaded", function () {
    // 初始化 FlipClock 時鐘
    const clock = $('.clock').FlipClock({
        clockFace: 'TwentyFourHourClock',  // 24小時制
        autoStart: true  // 自動開始計時
    });

    // 更新日期
    const currentDateElement = document.getElementById('current-date');
    function updateDate() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        currentDateElement.textContent = now.toLocaleDateString('zh-TW', options);
    }


    updateDate();  // 初始更新日期

    // 返回顶部按钮显示与隐藏
    const topBtn = document.getElementById("topBtn");

    // 監聽滾動事件
    $(window).scroll(function () {
        const scrollTop = $(this).scrollTop();  // 優化，避免多次調用
        const navbar = $(".navbar");

        // 更新導航欄背景顏色
        if (scrollTop > 50) {
            navbar.addClass("scrolled");
        } else {
            navbar.removeClass("scrolled");
        }

        // 控制返回頂部按鈕顯示與隱藏
        if (scrollTop > 300) {
            $(topBtn).fadeIn();
        } else {
            $(topBtn).fadeOut();
        }
    });

    // 點擊返回頂部按鈕
   

    $(topBtn).click(function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    

    // 頁面加載時將頁面滾動到頂部
    window.scrollTo(0, 0);

    // 返回頂部的平滑滾動函數
    window.scrollToTop = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});
function debounce(func, wait = 100) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

$(window).on('scroll', debounce(function () {
    const scrollTop = $(this).scrollTop();
    const navbar = $(".navbar");

    navbar.toggleClass("scrolled", scrollTop > 50);
    $(topBtn).toggle(scrollTop > 300);
}, 100));

$(topBtn).toggle(scrollTop > 300);

document.addEventListener("DOMContentLoaded", function () {
    let video = document.querySelector("video");
    video.muted = true;
});