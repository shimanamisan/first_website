$(function () {
  // ハンバーガーメニュー表示
  $(".js-menu-trigger").on("click", function () {
    $(this).toggleClass("active");
    $(".sp-menu").toggleClass("sp-menu-Active");
  });

  /****************************************
  モーダルウィンドウ表示処理
  *****************************************/
  // 画像を配列に格納
  let images = [
    "images/menuList/menu1.jpg",
    "images/menuList/menu2.jpg",
    "images/menuList/menu3.jpg",
    "images/menuList/menu4.jpg",
    "images/menuList/menu5.jpg",
    "images/menuList/menu6.jpg",
    "images/menuList/menu7.jpg",
    "images/menuList/menu8.jpg",
    "images/menuList/menu9.jpg",
  ];

  images.forEach((element, index) => {
    let images_id = index;
    let i = ++index;
    // img要素を作成
    let newImg = $("<img>", {
      src: images[images_id],
      class: `slider_item slider_item${i}`,
      "data-slider": i,
      alt: "テスト",
    });
    // 子要素として作成
    $(".slider_container").append(newImg);
  });
  /****************************************
  モーダル表示関係の処理
  *****************************************/
  let currentFlg = 0; // モーダルを閉じる際に処理が終わる前に連続クリック出来ないようにするためのフラグ
  let $modalOpen = $(".js-modal-open");
  let $sliderItem = $(".slider_item");
  $modalOpen.on("click", function (e) {
    if (currentFlg === 0) {
      let sliderItemWidth = $(".slider_item").innerWidth();
      // 画像のdata属性を取得
      let currentModalItem = $(this).children("img").data("id");
      console.log(currentModalItem);
      // 画像スライダーのクロージャーで管理している変数に、クリックした画像のdata属性の値をセット
      slider.setModalNum(currentModalItem);

      $sliderItem.each((index, element) => {
        if (currentModalItem === $(element).data("slider")) {
          // console.log("クリックしたモーダルの現在値 : " + currentModalItem);
          $(".slider_container").css({
            left: "-=" + sliderItemWidth * index + "px",
          });
          // console.log(sliderItemWidth * --currentModalItem);
          return false;
        }
      });
      $(".modal-main").fadeIn();
    }
  });
  /****************************************
  モーダルクローズ時の処理
  *****************************************/
  $(".js-modal-close").on("click", function () {
    if (currentFlg === 0) {
      currentFlg = 1;
      slider.clearModalNum(); // モーダルの画像スライダー現在値をクリア
      $(".modal-main").fadeOut();
      setTimeout(() => {
        currentFlg = 0;
        $(".slider_container").css({
          left: 0 + "px",
        });
      }, 400);
    }
  });

  let slider = (function () {
    // モーダルが display:none; で要素の幅取得できないので、即時関数内で一旦要素を表示させる
    let $modalMain = document.querySelector(".modal-main");
    $modalMain.style.display = "block";

    let $sliderContainer = $(".slider_container");
    let $sliderItem = $(".slider_item");

    // スライドさせる要素の個数を取得
    let sliderItemNum = $(".slider_item").length;
    // console.log("sliderItemNum: " + sliderItemNum);

    // スライドさせる要素の幅を取得
    let sliderItemWidth = $(".slider_item").innerWidth();
    // console.log("sliderItemWidth: " + sliderItemWidth);

    // スライドさせる要素の幅を個数から、トータルで移動させる幅を算出
    let sliderContainerWidth = sliderItemWidth * sliderItemNum;
    // console.log("slderContainer: " + sliderContainerWidth);

    let currentItemNum = 1;

    let DURATION = 500;

    // 要素の幅を取得したので、ここで非表示にしている
    $modalMain.style.display = "none";

    return {
      // オブジェクトを返す
      sliderNext: function () {
        if (currentItemNum < sliderItemNum) {
          $sliderContainer.animate(
            {
              left: "-=" + sliderItemWidth + "px",
            },
            DURATION
          );
          currentItemNum++;
          console.log(currentItemNum);
        }
      },
      slidePrev: function () {
        if (currentItemNum > 1) {
          $sliderContainer.animate(
            {
              left: "+=" + sliderItemWidth + "px",
            },
            DURATION
          );
          currentItemNum--;
        }
      },
      setModalNum: function (num) {
        // console.log("currentItemNumを呼び出してセットする（セット前）" + currentItemNum);

        currentItemNum = num;

        // console.log("currentItemNumを呼び出してセットする（セット後）" + currentItemNum);
      },
      clearModalNum: function () {
        currentItemNum = 0;

        // console.log("currentItemNumリセット後" + currentItemNum);
      },
      init: function () {
        // 計算したコンテナのコンテナアイテムの全幅をスタイル属性に埋め込む
        $sliderContainer.attr("style", "width: " + sliderContainerWidth + "px");
        // スライドさせる要素の幅をスタイル属性に埋め込む（レスポンシブ対応にするため）
        $sliderItem.attr("style", "width:" + sliderItemWidth + "px");
        // ここでthisとすることで、thisのスコープがオブジェクト自体になる。変数に格納することでthisを保持できる
        let that = this;

        $(".js-slide-next").on("click", function () {
          // thatがオブジェクトを指しているので、関数オブジェクトを呼ぶことができる
          that.sliderNext();
        });
        $(".js-slide-prev").on("click", function () {
          that.slidePrev();
        });

        // console.log("slider.init実行時 " + currentItemNum);
      },
    };
  })();

  slider.init();
});
