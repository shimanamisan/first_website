    
$(function(){
    $('.js-menu-trigger').on('click',function(){
        $(this).toggleClass('active');
        $('.sp-menu').toggleClass('sp-menu-Active');
    });

    // モーダルウィンドウ表示処理
    // var imageId = $('.js-modal-open').data('imageid');
    var $modalOpen = $('.js-modal-open');
    var $sliderItem = $('.slider_item');
    $modalOpen.on('click', function(e){
        var $imgTag = e.target;
        console.log($imgTag);
        $sliderItem.click();
        $('.modal-main').fadeIn();
    })
    $('.js-modal-close').on('click', function(){
        $('.modal-main').fadeOut();
    })
    $sliderItem.on('click', function(e){
        console.log(e.target);
    });

    var slider = (function(){
        // モーダルが display:none; で要素の幅取得できないので、即時関数内で一旦要素を表示させる
        var $modalMain =  document.querySelector('.modal-main');
        $modalMain.style.display="block";

        var currentItemNum = 1;
        var $sliderContainer = $('.slider_container');
        var $sliderItem = $('.slider_item');

        // スライドさせる要素の個数を取得
        var sliderItemNum = $('.slider_item').length;
        console.log('sliderItemNum: ' + sliderItemNum);

        // スライドさせる要素の幅を取得
        var sliderItemWidth = $('.slider_item').innerWidth();
        console.log('sliderItemWidth: ' + sliderItemWidth);

        // スライドさせる要素の幅を個数から、トータルで移動させる幅を算出
        var sliderContainerWidth = sliderItemWidth * sliderItemNum;
        console.log('slderContainer: ' + sliderContainerWidth);

        var DURATION = 500;

        // 要素の幅を取得したので、ここで非表示にしている
        $modalMain.style.display="none";

        return{
            // オブジェクトを返す
            sliderNext: function(){
                if(currentItemNum < sliderItemNum){
                    $sliderContainer.animate({
                        left: '-=' + sliderItemWidth + 'px'
                    }, DURATION);
                    currentItemNum++;
                }
            },
            slidePrev: function(){
                if(currentItemNum > 1){
                    $sliderContainer.animate({
                        left: '+=' + sliderItemWidth + 'px'
                    }, DURATION);
                    currentItemNum--;
                }
            },
            init: function(){
                // 計算したコンテナのコンテナアイテムの全幅をスタイル属性に埋め込む
                $sliderContainer.attr('style', 'width: ' + sliderContainerWidth + 'px');
                // スライドさせる要素の幅をスタイル属性に埋め込む（レスポンシブ対応にするため）
                $sliderItem.attr('style', 'width:' + sliderItemWidth + 'px');
                // ここでthisとすることで、thisのスコープがオブジェクト自体になる。変数に格納することでthisを保持できる
                var that = this;
                $('.js-slide-next').on('click', function(){
                    // thatがオブジェクトを指しているので、関数オブジェクトを呼ぶことができる
                    console.log('click!');
                    that.sliderNext();
                });
                $('.js-slide-prev').on('click', function(){
                    that.slidePrev();
                });
            }
        }
    })();

slider.init();

});

