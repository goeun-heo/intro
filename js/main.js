        ///// 전역변수 ///////////////////////////////

        // 1. 페이지번호
        var pno = 0;
        // 2. 전체 페이지수
        const totnum = 4;
        // const는 변수 var와 달리 변경불가한 상수를 말한다!
        // 3. 광스크롤방지
        var psts = 0; //(0-허용,1-불허용)
        

        /////////////////////////////////////////////
        history.scrollRestoration = "manual"
        $(function () { /// jQB //////////////////
       	$(document).on('click', 'a[href="#"]', function (e) {
   				e.preventDefault();
   			}); //////////a href 막기

            
            $("#nowpage").click(function () {
                pno--;
                if (pno < 0) pno=totnum-1;
                var pgpos = $("section").eq(pno).offset().top;
                $("html,body").stop().animate({
                    scrollTop: pgpos + "px"
                }, 600, "easeInOutQuint", function () {});
                afterLoad();
                scrollani();
                chgMenu();
            }) ////////////이전버튼클릭
            
            $("#maxpage").click(function () {
                pno++;
                if (pno > totnum-1) pno=0;
                var pgpos = $("section").eq(pno).offset().top;
                $("html,body").stop().animate({
                    scrollTop: pgpos + "px"
                }, 600, "easeInOutQuint", function () {});
                afterLoad();
                scrollani();
                chgMenu();
            }) ////////////다음버튼클릭
            

         
            
            $(".wrap").on("mousewheel DOMMouseScroll",
                function (e) {
                    /////// 광스크롤막기 /////////////////
                    if (psts === 1) return true; //돌아가!
                    psts = 1; //잠금(기존0값을 변경)
                    setTimeout(function () {
                        psts = 0;
                    }, 600);
                    e = window.event || e;
                    var delta = e.detail ? e.detail : e.wheelDelta;
                    // 음수일때 아랫방향
                    if (delta < 0) {
                        pno++; //1씩증가
                        // 한계페이지번호 마지막번호에 고정!
                        if (pno === totnum) pno = totnum - 1;
                    } /// if ///////////
                    // 양수일때 윗방향
                    else {
                        pno--; //1씩감소
                        // 한계페이지번호 첫번호에 고정!
                        if (pno === -1) pno = 0;
                    } /// else ////////

                    // 4. 해당순번 페이지 높이값 구하기(top값)
                    var pgpos = $("section").eq(pno).offset().top;

                    // 5. 페이지 이동 애니메이션
                    $("html,body").stop().animate({
                        scrollTop: pgpos + "px"
                    }, 600, "easeInOutQuint");

                    afterLoad();
                    scrollani();
                    chgMenu();
                }); //////////////// mousewheel ////////////////
            ////////////////////////////////////////////////////


            //메인메뉴 선택시 페이지 
			
            $(".nav a").not(":eq(0)").click(function (e) {
                e.preventDefault();
                var idx = $(this).parent().index();
                pno = idx - 1;
                var pid = $(this).attr("href");
                var pgpos = $(pid).offset().top;
                $("html,body").animate({
                    scrollTop: pgpos + "px"
                }, 600, "easeOutQuart");
                chgMenu();
				afterLoad();
                scrollani();
            }); //////////click//////////////
            
            ////////////////////////////////////////////////
            ////////스크롤애니메이션함수2//////////////////////
            function scrollani() {
                if (pno === 1) {
                    $(".titani").stop().animate({
                        top: "0px",
                    }, 800, 'easeInOutBack');

                    var li1li = $(".list").eq(0).children("li").length;
                    for (l = 0; l < li1li; l++) {
                        $(".list").eq(0).children("li").eq(l).animate({
                            top: "0px",
                        }, 1100 + (l * 400), 'swing')
                    }

                }else{
                    $(".titani").stop().animate({
                        top: "100px",
                    }, 500, 'easeInOutBack') 
                }; ////pno1

                if (pno === 2) {
                    $(".titani2").stop().animate({
                        top: "0px",
                    }, 800, 'easeInOutBack')
                    
                } ///pno2
                else{
                    $(".titani2").stop().animate({
                        top: "100px",
                    }, 500, 'easeInOutBack') 
                };
                
            };
            ///////////////////////////////////////////////
            
            ////////////////////////////////////////////////
            ////////스크롤 애니메이션 함수 ///////////////////
            function afterLoad() { 

                if (pno > 0) {
                    $("#toggle").stop().animate({
                        top: "90px"
                    }, 600);

                    $(".togglebtn > span").css({
                        background: "#3E3837"
                    });
                    $(".gauge").css({
                        background:"#3E3837"
                    })
                    $(".line").css({
                        background:"rgba(62, 56, 55, 0.3)"
                    })
                    $(".pagebar span").css({
                        color:"#3E3837"
                    })
                } 
                 else {
                    $("#toggle,.togglebtn > span,.gauge,.line,.pagebar span")
                    .attr("style","");

                };
            }//스크롤 애니메이션효과/////////////////////////
            //////////////////////////////////////////////
            $("#nowpage").html("0"+(pno+1))
            ////////////////////////////////////////////
            ///////메인메인 클릭및화면 이동 시 효과함수//////
            function chgMenu() {

                $(".nav a").eq(pno + 1).parent("li")
                    .addClass("on")
                    .siblings()
                    .removeClass("on");
                
                $("#nowpage").html("0"+(pno+1))
                $(".gauge").animate({width:25*(pno+1)+"%"})
            }
            ///////////////////////////////////////////

            
            /*메인메뉴 오버효과*/
            $(".togglebtn").on({
                mouseenter: function () {
                    $("#toggle, .togglebtn ,.nav,section").addClass("on");
                },
                click: function () {
                    $("#toggle, .togglebtn,.nav,section").toggleClass("on");
                }
            });//메인메뉴on,off
			$('section').click(function(){
				$("#toggle, .togglebtn,.nav,section").removeClass("on");
			})
				
            /*첫화면 페이드인효과*/
           $("#section1").css({
                opacity:".1"
            })
            $("#section1").animate({
               opacity:"1"
            },2000)

            photoGallery();
            ///////////////////////////////////////////////////////////////////
            // 갤러리 및 드래그
            ///////////////////////////////////////////////////////////////////
            function photoGallery() {
                //photoGallery 지역변수정리///////////////////////////
                var list = $('.list');
                var listLi = $('.list>li');
                var pcte = $('.pcte .ctenum');
                var ucte = $('.ucte .ctenum');
                var photo = $(".photo");
                var uiux = $(".uiux");
                //////////////////////////////////////

                
                //마우스 이동 유도 아이콘
                $(".con3").mousedown(function () {
                    $(".mouse").eq(1).animate({
                        opacity: "0",
                        zIndex: "-1"
                    }, 1700)
                });
                $(".con2").mousedown(function () {
                    $(".mouse").eq(0).animate({
                        opacity: "0",
                        zIndex: "-1"
                    }, 1700)
                });


                //포토 카테고리별 갤러리 설정///////////////////
                var arr2 = [
                    {lim: 13,forder: 'snap'},
                    {lim: 9,forder: 'scenery'},
                    {lim: 5,forder: 'idphoto'},
                    
                    ];

                arr2.forEach(function (el, index) {
                    for (var a = 0; a <= el.lim; a++) {
                        photo.append("<a href='images/gallery/" + el.forder + "/" + a + ".jpg' data-lightbox='image-1'><li class='"+el.forder+"'></li></a>")
                        $("."+el.forder).eq(a).css({
                            'background-image': 'url(images/gallery/' + el.forder + '/' + a + '.jpg)'
                        }); /////////css
                    } ///for문
                    
                    //카테고리별 사진 개수표시
                    pcte.eq(index+1).html($("."+el.forder).length);
                    pcte.eq(0).html(photo.children("a").length);
                    pcte.css({
                    fontSize: "14px",
                    width: "20px",
                    opacity: ".4"
                    }); //css  
                
                    //카테고리 클릭시 카테고리내에 사진만표시
                    $(".pcte li").eq(index+1).click(function(){
                        $(".photo > a").children("li").fadeOut(400);
                        $("."+el.forder).fadeIn(400);
                         listCss();
                         setTimeout(ybarCss,500);
                    });////click
                    $(".pcte li").eq(0).click(function(){
                        $(".photo > a").children("li").fadeIn(400);
                         listCss();
                         setTimeout(ybarCss,500);
                    });////click
                    
                }); ///for each문
                //////////////////////////////////////   
                
                
            
                //uiux 카테고리별 갤러리 설정///////////////////
                var ux = [
                    {class:"publ",sbj: "<b>Theordinary</b> 리디자인&퍼블리싱",img: 'url(images/uiux/pb1.jpg)'},
                    {class:"des",sbj: "<b>98도씨</b>상세페이지",img: 'url(images/uiux/des2.jpg)'},
					{class:"publ",sbj: "<b>goeun</b>개인 포트폴리오",img: 'url(images/uiux/pb2.jpg)'},
                    {class:"publ",sbj: "<b>NEITHERS</b> 리디자인&퍼블리싱",img: 'url(images/uiux/pb3.jpg)'},
                    

                    
                    ];//////////////publishing 배열
                
                ux.forEach(function (el, index) {
                    uiux.append("<li class='" + el.class + "'><span class='info'><h5>" + el.sbj + "</h5></span></li>")
                    
                    uiux.children("li").eq(index).css({
                        'background-image': el.img
                    }); /////////css
                    
                    //uiux 카테고리별 게시물 개수
                    ucte.eq(1).html($(".publ").length);
                    ucte.eq(2).html($(".des").length);
                    ucte.eq(0).html(uiux.children("li").length);
                    ucte.css({
                         fontSize: "14px",
                         width: "20px",
                         opacity: ".4"
                     }); //css
                    $(".ucte li").eq(index + 1).click(function () {
                        uiux.children("li").fadeOut(400);
                        $("." + el.class).fadeIn(400);
                        listCss();
                        setTimeout(ybarCss,500);
					
                    });
                    $(".ucte li").eq(0).click(function () {
                        uiux.children("li").fadeIn(400);
                        listCss();
                        setTimeout(ybarCss,500);
                    });
                }); ////uiux foreach문    
                
				
                //카테고리 클릭 애니메이션//////////////////////////////////
                $(".ctegory > li").click(function () {
                    $(this).addClass("on").siblings().removeClass("on");

                });//click
                
                listCss();
                ybarCss();

                ////// 리스트 길이조정 및 탑값조정////////
                function listCss() {
                    list.css({
                        top: "0",
                        height: "auto"
                    });////////////list.css										
                };/////////////////////////////////////
				$(window).resize(function() { 
				ybarCss();
				});
				
                ////// y 바 길이 조정 css//////////////////////////////////
                function ybarCss() {
                    var ulistHight = uiux.height();//uiux부분 전체길이
					var uHight = $(".con2").height();//uiux부모요소높이
                    var plistHight = photo.height();//포토갤러리부분 전체길이
                    var pHight = $(".con3").height();//포토갤러리 부모높이
					
                      $(".ybar").children("span").eq(0).stop().animate({
                        top: 0,
                        height: 100 / (ulistHight / uHight) + "%"
                    }, 200)  
                    
                    $(".ybar").children("span").eq(1).stop().animate({
                        top: 0,
                        height: 100 / (plistHight / pHight) + "%"
                    }, 200)   
					var maxTop = ulistHight-uHight;

                };/////////////y바 길이 조정 및 css/////////////////////////
                var list = $('.list');
                var listLi = $('.list>li');
				var dsts = 1 ;
			
				///////////////////////리스트 스크롤바 위치조정/////////////////////////////////
				////////////////////////////////////////////////////////////////////////////
				function ybar2() {
					for (x = 0; x < 2; x++) {
						var listHeight = list.eq(x).outerHeight(); //리스트 전체길이
						var listTop = list.eq(x).position().top; //현재 탑값
						var pHeight = list.eq(x).parent().height(); //부모요소 div높이값
						var maxList = pHeight - listHeight; //리스트 최대이동값
						var yBarMax = $(".ybar").eq(x).height() - $(".ybar>span").eq(x).height(); //ybar최대이동값
						var yBarTop = undefined;
						yBarTop = (yBarMax * listTop) / maxList;
						$(".ybar>span").eq(x).animate({
							top: yBarTop + "px"
						}, 0)
					} ////////for문
				} //////////////ybar2////////////////////////////////////////////////////////
				////////////////////////////////////////////////////////////////////////////				

				//리스트 드래그//
				
				list.draggable({
					scroll: false,
					axis: "y",
					cursor: "move",
					drag: function (event, ui) {
						ybar2();
						var listhi = $(this).height();
						var listWhi = $(this).parent().height();
						var maxTop = listhi - listWhi;
						ui.position.top = Math.min("0", ui.position.top);
						ui.position.top = Math.max(-maxTop, ui.position.top);
					}
				}); ////////////draggable

				} ///////////////////photoGallery 함수
					
            	////////////////////마우스커서////////////////////////
                /*마우스 따라다니는 도형*/
                $(document).mousemove(function (e) {
                    $('.pointer').css("top", e.pageY);
                    $('.pointer').css("left", e.pageX);
                });            
               /*마우스오버효과*/
                $("#nowpage").on({
                    mouseenter: function () {
                        $(".pointer p").html("Prev");
                        $(".pointer").css({
                            width: "70px",
                            height: "70px"
                        });
                    },
                    mouseleave: function () {
                        $(".pointer p").html("")
                        $(".pointer ").attr("style", "")
                    }
                });
                $("#maxpage").on({
                    mouseenter: function () {
                        $(".pointer p").html("Next");
                        $(".pointer").css({
                            width: "70px",
                            height: "70px"
                        });
                    },
                    mouseleave: function () {
                        $(".pointer p").html("")
                        $(".pointer ").attr("style", "")
                    }
                });
                $(".list").on({
                    mouseenter: function () {

                        $(".pointer").css({
                            width: "70px",
                            height: "70px"
                        });
                        $(".pointer span").eq(0).css({
                            borderBottom: "5px solid #FFF",
                            transform: "rotate(0deg) translateX(-50%)",
                            top: "-20px",
                            left: "50%"
                        });
                        $(".pointer span").eq(1).css({
                            borderBottom: "5px solid rgba(255, 255, 255, 0)",
                            borderTop: "5px solid #FFF",
                            transform: "rotate(0deg) translateX(-50%)",
                            top: "72px",
                            left:"50%"
                        });
                        $(".pointer p").html("Drag");
                    },
                    mousedown: function () {

                        $(".pointer").css({
                            border: "5px solid #AE7A72",
                            transition: "border .4s"
                        });

                    },
                    mouseup: function () {
                        $(".pointer").css({
                            border: "5px solid #fff"
                        });
                    },
                    mouseleave: function () {
                        $(".pointer").attr("style", "");
                        $(".pointer span").attr("style", "");
                        $(".pointer p").html("");

                    }
                }); 
            $(".overlay, .cbtn").on({
                        mouseenter: function () {
                            $(".pointer p").html("Close");
                            $(".pointer").css({
                            width: "70px",
                            height: "70px"
                        });
                },
                mouseleave: function(){
                     $(".pointer p").html("");
                     $(".pointer").attr("style", "");
                    
                }
            });
            
            /////////////////////////////////////////////////////////
            
            ////////////////콘택트 스크립트//////////////////////            
            $(".contact").hide();//콘택트 숨기기
            $(".cticon").children("li").eq(0).click(function(){
                $(".contact").fadeIn(500);
            });//click시 열기 

            $(".contact .cbtn,.overlay").click(function(){
                $(".contact").fadeOut(500)
            });//click시 닫기
            
            //이메일클릭효과
            $(".modal").hide();
            $(".mailbtn").click(function(){
                $(".contact").fadeIn(500);
            });//click시 열기 
            $(".email").on({
                 mousedown: function () {   
                     $(".email span b").css({
                         color:"#D13737",
                     });
                    }, 
                mouseup: function () {
                      $(".email span b").attr("style","");
                    },
            });
            $(".email").click(function () {
                $(".email input").select();
                document.execCommand('copy');
                $(".modal").fadeIn(400);
                $(".modal").delay(1000).fadeOut(400);
                
            }); //click
            $(".modalovl").click(function () {
                $(".modal").fadeOut(300);
            }); //click
            ///////////////////////////////////////////////////////
            
            
            /////////////이력서 스크립트///////////////////////////////
            $(".resume").hide();
            $(".resumebtn , .resum").click(function () {
                $(".resume").fadeIn(500);
                $(".c1").eq(0).animate({
                    strokeDashoffset: "205%"
                }, 1000); //animate
                $(".c1").eq(1).animate({
                    strokeDashoffset: "200%"
                }, 1000); //animate
                $(".c1").eq(2).animate({
                    strokeDashoffset: "210%"
                }, 1000); //animate
                $(".c1").eq(3).animate({
                    strokeDashoffset: "220%"
                }, 1000); //animate
                $(".adobe .bar span").eq(0).animate({
                    width:"99%"
                },1000); //animate
                $(".adobe .bar span").eq(1).animate({
                    width:"95%"
                },1000); //animate
                $(".adobe .bar span").eq(2).animate({
                    width:"85%"
                },1000); //animate
                $(".adobe .bar span").eq(3).animate({
                    width:"90%"
                },1000);   
            }); //click시 열기 
            
            $(".resume .cbtn,.overlay").click(function(){
                $(".resume").fadeOut(500)
                $(".c1").attr("style","");
                $(".adobe .bar span").attr("style","");
            });//click시 닫기 
            ////////////////////////////////////////////////////////
          

			
			
			
        }); ////// jQB //////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////
