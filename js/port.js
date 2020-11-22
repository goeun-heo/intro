$(function () { /////////////jpb

	if ($(this).is(".nextbtn")) {}


	var pfview = $(".pfview")
	var pfwrap = $(".pfwrap")
	/////////////////포트폴리오 상세열기////////////
	pfview.hide();
	$(".back ,.nav li").click(function () {
		pfview.attr("style", "")


	}); //////////click

	$(".uiux").children("li").mousedown(function () { //섬네일클릭시

		var dragging = 0;
		$(".uiux").mousemove(function () { //마우스드래그시 클릭안되게
			dragging = 1;
		}); ///////////mousemove


		var pubAg = [

			{
				msbj: "The ordinary<br>UI/UX re-design.",
				sbj: "디 오디너리 리디자인",
				intro: "<p>최소한의 색상과 미니멀한 디자인으로 진정성과 투명성을 강조하는 브랜드의 아이덴티티를 나타낼 수 있도록 리 디자인 하였습니다.</p><p>100% 반응형 페이지로 어떤 디바이스에서도 사용에 불편함이 없도록 제작 하였습니다.</p>",
				color1: "#ffffff",
				color2: "#e8e8ea",
				color3: "#1c1b1a",
				color4: "#3e3837",
				bg: "images/uiux/pb1-1.jpg"
			},
			{
				msbj: "goeun, 2020 <br>Portfolio.",
				sbj: "goeun 개인 포트폴리오",
				intro: "<p>최소한의 색상과 미니멀한 디자인으로 진정성과 투명성을 강조하는 브랜드의 아이덴티티를 나타낼 수 있도록 리 디자인 하였습니다.</p><p>100% 반응형 페이지로 어떤 디바이스에서도 사용에 불편함이 없도록 제작 하였습니다.</p>",
				color1: "#F5F2F1",
				color2: "#F1EBE7",
				color3: "#AE7A72",
				color4: "#3E3837",
				bg: "images/uiux/pb2-1.jpg"
			},
			{
				msbj: "NEIRHERS<br>UI/UX re-design.",
				sbj: "네이더스 리디자인",
				intro: "<p>최소한의 색상과 미니멀한 디자인으로 진정성과 투명성을 강조하는 브랜드의 아이덴티티를 나타낼 수 있도록 리 디자인 하였습니다.</p><p>100% 반응형 페이지로 어떤 디바이스에서도 사용에 불편함이 없도록 제작 하였습니다.</p>",
				color1: "#FFFFFF",
				color2: "#EDEDED",
				color3: "#1936AA",
				color4: "#231F20",
				bg: "images/uiux/pb3-1.jpg"
			}

		] ////////////////////퍼블리싱 배열
		var desAg = [

			{
				msbj: "98도씨<br>detail page.",
				sbj: "디 오디너리 리디자인",
				intro: "<p>최소한의 색상과 미니멀한 디자인으로 진정성과 투명성을 강조하는 브랜드의 아이덴티티를 나타낼 수 있도록 리 디자인 하였습니다.</p><p>100% 반응형 페이지로 어떤 디바이스에서도 사용에 불편함이 없도록 제작 하였습니다.</p>",
				color1: "#ffffff",
				color2: "#e8e8ea",
				color3: "#1c1b1a",
				color4: "#3e3837",
				bg: "images/uiux/pb1-1.jpg"
			},


		] ////////////////////퍼블리싱 배열

		pubAg.forEach(function (el, index) {
			$(".publ").eq(index).click(function () { //드래그안하고 클릭시

				if (dragging == 0) {
					pfani();

					$(".clcp").eq(0).css({
						backgroundColor: el.color1
					}) ///css
					$(".clcp").eq(1).css({
						backgroundColor: el.color2
					}) ///css
					$(".clcp").eq(2).css({
						backgroundColor: el.color3
					}) ///css						
					$(".clcp").eq(3).css({
						backgroundColor: el.color4
					}) ///css

					$(".pftitle").html(el.msbj);
					////////////////////////////
					$('.pfbtn').hover(function () {
						$(this).css({ //오버시
							background: el.color3
						}) //css
					}, function () { //아웃시
						$(this).attr("style", "")
					}) ////사이트가기버튼색상변경

					$(".pfsbj h4").text(el.sbj) //제목변경
					$(".pfwrap .header").css({
						'background-image': 'url(' + el.bg + ')'
					})
					$(".pfintro span").html(el.intro);
					$('.pfbtn').css({
						display: "block"
					})	
					hex();
				} /////if
				else return false;
			}); ////////////click

		}); /////////////////퍼블리싱 foreach문		


		desAg.forEach(function (el, index) {
			$(".des").eq(index).click(function () { //드래그안하고 클릭시

				if (dragging == 0) {
					pfani();

					$(".clcp").eq(0).css({
						backgroundColor: el.color1
					}) ///css
					$(".clcp").eq(1).css({
						backgroundColor: el.color2
					}) ///css
					$(".clcp").eq(2).css({
						backgroundColor: el.color3
					}) ///css						
					$(".clcp").eq(3).css({
						backgroundColor: el.color4
					}) ///css

					$(".pftitle").html(el.msbj);
					////////////////////////////
					$('.pfbtn').css({
						display: "none"
					})
					$('.pfcte').text("Design")

					$(".pfsbj h4").text(el.sbj) //제목변경
					$(".pfwrap .header").css({
						'background-image': 'url(' + el.bg + ')'
					})
					$(".pfintro span").html(el.intro);

					hex();
				} /////if
				else return false;
			}); ////////////click

		}); /////////////////퍼블리싱 foreach문





	}); /////////click//////////////////////////
	////////////////////////////////////////////



	//////////////////////////////////////////////////////////////
	///////////////////포트폴리오 애니메이션효과//////////////////////

	function pfani() {
		pfwrap.animate({
			scrollTop: 0
		}, 0); //animate
		pfview.show();
		pfview.css({
			width: "30px",
			height: "30px",
		}) /////////css
		pfview.animate({
			width: "100%",
			height: "100%",
			borderRadius: "0px",
			top: "0",
			left: "0",
		}, 500, 'easeOutQuint'); /////animate

	}
	///////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////



	//////////////////////////////////////////////////////////////
	//////////////////////헥터방식 16진수변환////////////////////////

	function hex() {
		for (x = 0; x < 4; x++) {
			var test = $('.clcp').eq(x).css("backgroundColor");
			test = test.replace(/[^%,.\d]/g, "").split(",");
			var r = test[0];
			var g = test[1];
			var b = test[2];
			r = Number(r).toString(16);
			g = Number(g).toString(16);
			b = Number(b).toString(16);
			$(".clcp").children("span").eq(x).text("#" + r + g + b);
		} ////////for문
	} /////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////


}) ////////////////////////jpb
