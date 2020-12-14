# 架空のカフェサイト

![first_website](https://user-images.githubusercontent.com/49751604/102033846-cf5f0d80-3dff-11eb-83c0-f72421cca13a.png)

[実際のサイトはこちら](https://shimanamisan.github.io/first_website/)

## 概要

プログラミング学習を開始して 1 ヶ月ほど経過した後に、学習したことのアウトプットとして Web サイト作成しました。

## 使用技術

- HTML
- CSS
- jQuery（Ver 3.4.1）

## 工夫した点

- レスポンシブデザイン（スマホのみ）
- メニューリストの画像スライダーはプラグインを使用せず、jQurty を使用し自分で作成
- 画像スライダーは**this の向き先を意識し、クロージャーを使用**して作成

![shimanami_cafe](https://user-images.githubusercontent.com/49751604/102036772-0dabfb00-3e07-11eb-9529-39d85b732972.gif)

```js
// コード抜粋

let slider = (function () {
	// モーダルが display:none; で要素の幅取得できないので、即時関数内で一旦要素を表示させる
	let $modalMain = document.querySelector(".modal-main");
	// display:block; とする
	$modalMain.style.display = "block";

	// 各種スライダーに必要な要素を取得
	let $sliderContainer = $(".slider_container");
	let $sliderItem = $(".slider_item");

	// スライドさせる要素の個数を取得
	let sliderItemNum = $(".slider_item").length;

	// スライドさせる要素の幅を取得
	let sliderItemWidth = $(".slider_item").innerWidth();

	// スライドさせる要素の幅を個数から、トータルで移動させる幅を算出
	let sliderContainerWidth = sliderItemWidth * sliderItemNum;

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
			currentItemNum = num;
		},
		clearModalNum: function () {
			currentItemNum = 0;
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

// オブジェクト内の初期化用メソッドを呼び出す
slider.init();
```
