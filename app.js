/**
 * 
 * @authors John Nong (overkazaf@gmail.com)
 * @date    2015-04-17 17:15:40
 * @version $Id$
 *
 * update logs : 
 *      2015/10/15    new feature for previewing the ultimate effect using demo data instead
 *      2015/10/14    new feature for special tagged html deleting
 * 		2015/10/09    new feature for special tagged html replacement
 */
// A tiny seed id generator
var generatorId = function(len, radix, prefix, subfix) {
    var targetId = '';
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [],
        i;
    len = len || 32;
    radix = radix || chars.length;
    prefix = prefix || '';
    prefix = prefix == '' ? '' : prefix + '_';
    subfix = subfix || '';
    subfix = subfix == '' ? '' : '_' + subfix;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    targetId = uuid.join('');
    return prefix + targetId + subfix;
};

var HTMLCodeType;

function CodePredictor(htmlJSON) {
    //console.log(CodePredictor.prototype.getHTMLCodeType(htmlJSON));
    return (HTMLCodeType = CodePredictor.prototype.getHTMLCodeType(htmlJSON)) === 'static' ?
        new StaticCoder(htmlJSON) :
        new DraggedCoder(htmlJSON);
}
CodePredictor.prototype.isNullorEmpty = function(str) {
    return str === null || (str && $.trim(str) === '');
}
CodePredictor.prototype.getHTMLCodeType = function(htmlJSON) {
    // for testing
    var isNorE = CodePredictor.prototype.isNullorEmpty;
    if (isNorE(htmlJSON[0]) && isNorE(htmlJSON[1])) return 'dragged';
    if (!isNorE(htmlJSON[0]) && isNorE(htmlJSON[1])) return 'static';

    var type = 'dragged';
    $.each(htmlJSON, function(i, html) {
        var $dom = $(html),
            re = /(\s+frag\s+)|(\s+frag>)|(\s+frag\w+>)/gi;

        if (re.test(html) || $dom.attr('frag') || $dom.find('*[frag]').length > 0) {
            type = 'static';
        }
    });
    return type;
}

function StaticCoder(htmlJSON) {
    var code = htmlJSON[1];
    if (code === '' || $.trim(code) === '') {
        code = htmlJSON[0];
    }
    this.code = code;
};

StaticCoder.prototype.execute = function() {
    StaticCoder.prototype.embedTags(this.code);
    // alert(this.code);
    var callbacks = $.Callbacks('once');
    callbacks.add(initHeader);
    callbacks.add(initMainWrapper);
    // callbacks.add(initDragWidgets);
    // callbacks.add(initDragLayouts);
    callbacks.add(initWidgetFactory);
    // callbacks.add(highlightListener);
    callbacks.add(preloadCachedData);
    callbacks.fire();
};

StaticCoder.prototype.embedTags = function(code) {
    // tackle this case
    if (code && code.indexOf('main-wrapper') >= 0) {
        $('#main-wrapper').replaceWith(code);
    } else {
        $('#main-wrapper').html(code);
    }
    $('#main-wrapper').find('*[frag]').each(function() {
        var
            $this = $(this),
            // record the old position style, will save it back after mousing out
            _old_position = $(this).get(0).style.position;

        $(this).on('mouseenter', function() {
            _old_position = $(this).get(0).style.position;

            $this.css({
                'position': 'relative'
            });

            var $tookit = $(this).find('.widget-tookit');
            if (!$tookit.length) {
                var
                    $newTookit = $('<div>').attr({
                        'class': 'widget-tookit'
                    }),
                    $configItem = $('<a href="#" title="设置标签" alt="设置标签">').attr({
                        'class': 'icon-cog icon-white'
                    }),
                    $trashItem = $('<a href="#" title="移除标签" alt="移除标签">').attr({
                        'class': 'icon-trash icon-white'
                    });

                $configItem.on('click', function(ev) {
                    wfInstance.displayRawWidgets($this);
                    ev.preventDefault();
                    ev.stopPropagation();
                });

                $trashItem.on('click', function(ev) {
                    if (confirm('您确定要移除该区域？')) {
                        $this.remove();
                    }
                    ev.preventDefault();
                    ev.stopPropagation();
                });


                $newTookit.append($configItem).append($trashItem).appendTo($this).fadeIn();
            } else {
                $tookit.show();
            }

        }).on('mouseleave', function() {
            $(this).css({
                'position': _old_position
            }).find('.widget-tookit').hide();
        });
    });
};

function DraggedCoder(htmlJSON) {
    this.code = htmlJSON[1];
};
DraggedCoder.prototype.embedTags = function(code) {
    // tacle this case
    if (code && code.indexOf('main-wrapper') >= 0) {
        $('#main-wrapper').replaceWith(code);
    }

    $('#main-wrapper').find('*[frag]').each(function() {
        var $this = $(this);

        $(this).on('click', function() {
            wfInstance.displayRawWidgets($this);
        });
    });
}

DraggedCoder.prototype.execute = function() {
    DraggedCoder.prototype.embedTags(this.code);

    var callbacks = $.Callbacks('once');
    callbacks.add(initHeader);
    callbacks.add(initMainWrapper);
    callbacks.add(initDragWidgets);
    callbacks.add(initDragLayouts);
    callbacks.add(initWidgetFactory);
    callbacks.add(preloadCachedData);
    //callbacks.add(highlightListener);
    callbacks.fire();
};

/**
 * [loadHTMLCommand A command controller]
 * @param  {[type]} instance [Code predictor instance]
 * @return {[type]}          [description]
 */
function loadHTMLCommand(htmlJSON) {
    this.commands = [];
    this.instance = CodePredictor(htmlJSON);
}

/**
 * [prototype prototype injection for loadHTMLCommand class]
 * @type {Object}
 */
loadHTMLCommand.prototype = {
    constructor: loadHTMLCommand,
    execute: function() {
        this.instance.execute.call(this.instance);
    }
}

/**
 * [initModules This entry function will judge a strategy to init the current edit board]
 * @param  {[Array]} json [Pass an Array inside, which allow user to judge it's a dragged/static code template]
 * @return {[void 0]}       [void 0]
 *
 * update logs: 
 * 		2015/10/09   change the input param
 */
var command;

function initModules(htmlJSON) {
    Loading().load();

    setTimeout(function() {

        command = new loadHTMLCommand(htmlJSON);
        command.execute();

        Loading().unload();
    }, 3000);
}

var wFactory; // widget factory instance
var wfInstance;

function initWidgetFactory() {
    wFactory = WidgetFactory();
    wfInstance = wFactory.create();
}

function highlightListener() {
    EventUtils.add(document, 'mousemove', highLightLayouts);
    EventUtils.add(document, 'mousemove', highLightWidgets);
};

function removeHighlightListener() {
    EventUtils.remove(document, 'mousemove', highLightLayouts);
    EventUtils.remove(document, 'mousemove', highLightWidgets);
}

function getInstance(fn) {
    var div;
    return function() {
        return div || (div = fn.call(this));
    }
}


var Loading = function() {
    var $gif = $('<img width="400" id="loading" height="400">').attr({
        src: window.loadingGIFPath
    }).css({
        'position': 'relative',
        'display': 'block',
        'margin': '150px auto'
    }).hide().appendTo($(document.body));

    return {
        load: function() {
            $('#main-wrapper').prepend($gif);
            $gif.show();
        },
        unload: function() {
            $('#loading').remove();
        }
    };
};

function timeChunk(params) {
    var
        i,
        lists = params.lists || [],
        l = lists.length || 0,
        fn = params.fn || function() {},
        chunkCount = params.chunkCount || 8,
        intervalFn = params.intervalFn || function(index) {
            return (index + 1) * 300 + 33;
        },
        taskList = [],
        tempList = [];

    for (i = 0; i < l; i++) {
        if ((i + 1) % chunkCount === 0) {
            taskList.push(tempList.slice());
            tempList = [];
        }
        tempList.push(lists[i]);
    }
    // fix last task queue
    tempList.length && taskList.push(tempList);


    for (i = 0, l = taskList.length; i < l; i++) {
        (function(c, interval) {
            setTimeout(function() {
                var queue = taskList[c];
                for (var j = 0, len = queue.length; j < len; j++) {
                    fn.call(queue[j], queue[j]);
                }
            }, interval);
        })(i, intervalFn(i));
    }
}

/**
 * [LayzyImageLoader Load images using timechunk technology, ballance the speed from the server side]
 * @param {[type]} count        [indicates how many fn will be tackle in one single chunk]
 * @param {[type]} intervalFn [interval generator fn]
 */
function LayzyImageLoader(count, intervalFn) {
    var
        $aImages = $('*[data-src]'),
        $domList = [];

    $aImages.each(function() {
        $domList.push($(this));
    });

    var params = {
        lists: $domList,
        fn: function($dom) {
            var targetSrc = $dom.attr('data-src');
            $dom.attr('src', targetSrc);
        },
        chunkCount: count,
        intervalFn: intervalFn || function(index) {
            return index * 500 + 133;
        }
    };

    timeChunk(params);
}

function initHeader(callback) {
    var oHeader = $('.header'),
        oTool = oHeader.find('.tool-part'),
        oToolMenu = oTool.find('ul.tool-menu'),
        oToolMenuContainers = oTool.find("div.tool-container"),
        oMainWrapper = $('#main-wrapper'),
        oToggleContainer = $('.toggle-container');

    initPublish();
    LayzyImageLoader(8);

    oToolMenu.on('click', 'li', function(index, value) {
    	if (PREVIEWER && PREVIEWER.currStateString === 'preview'){
    		$('#btn-preview').trigger('click');
    	}

        if ($(this).index() == 1 || $(this).index() == 2 || $(this).index() == 3) {
            var cache = $(document).data('cachedWrapper');
            if (cache) {
                // backto edit mode
                oMainWrapper.replaceWith(cache);
                //rebind functions
                oMainWrapper.find('*[operable]').each(function() {
                    $(this).smartMenu(menuData);
                });
                var $cb = $.Callbacks('once');
                $cb.add(resetDragWidgets);
                $cb.add(initDragLayouts);
                var fnClean = function() {
                    $('#dragged-list').dragsort('destroy');
                    $('#dragged-list').dragsort();
                    $(document).removeData('cachedWrapper');
                };
                $cb.add(fnClean);
                $cb.fire();
            }

            $('#main-wrapper').find('.layout-cell').each(function() {
                $(this).removeClass('layout-decoration-padding-helper');
                var aWidgets = $(this).find('>div[class*=widget-]');
                if (aWidgets.length) {
                    aWidgets.css('visibility', 'visible');
                    $(this).removeClass('layout-has-widget');
                }
            }).end().find('.layout-container').each(function() {
                $(this).removeClass('layout-container-margin-helper');
            });
        } else {
            // removeDecorations
            //alert(oMainWrapper.find('.layout-cell').length);
            $('#main-wrapper').find('.layout-cell').each(function() {
                $(this).addClass('layout-decoration-padding-helper');
                var aWidgets = $(this).find('>div[class*=widget-]');
                if (aWidgets.length) {
                    aWidgets.css('visibility', 'hidden');
                    $(this).addClass('layout-has-widget');
                }
            }).end().find('.layout-container').each(function() {
                $(this).addClass('layout-container-margin-helper');
            });
        }


        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            oToggleContainer.hide().animate({
                height: 0
            }, 'slow', 'swing');
            //$(window).scrollTop(0);
            oMainWrapper.animate({
                'margin': '60px auto'
            }, 400, 'swing');
        } else {
            var index = $(this).index();
            $(this).addClass('selected').siblings().removeClass('selected');
            oToggleContainer.show().animate({
                height: '160px'
            }, 'slow', 'swing');
            oMainWrapper.animate({
                'margin': '260px auto'
            }, 500);
            oToolMenuContainers.hide().eq(index).show();
        }


    });
    //oToolMenuItems.eq(0).trigger('click');
    oToolMenuContainers.hide();
    oToggleContainer.hide().animate({
        height: 0
    });
    oMainWrapper.animate({
        'margin': '100px auto'
    }, 400);


    var callbacks = $.Callbacks('once');
    // Init Layout Element
    callbacks.add(initLayout);
    // Init radio btns
    callbacks.add(initWidgetRadioButton);
    // Init Theme Elemnet
    callbacks.add(initTheme);
    // Init Background Menu
    callbacks.add(initBackground);
    // Enable modal draggable
    callbacks.add(function() {
        $('#configModal').dragModal();
    });
    // Enable tool part to be slidable
    callbacks.add(initSlider);
    callbacks.fire();

    if (callback && $.isFunction(callback)) {
        callback();
    }
}

/**
 * [initSlider description]
 * @return {[type]} [description]
 *
 * comment : 
 *          Use slider to prevent conetent overflow
 */
function initSlider() {
    $.each(['home', 'list', 'cont'], function(i, subfix) {
        var aLi = $('#widget-tab-' + subfix).find('ul.widget-items-tab').children('li');
        var l = aLi.length;
        if (l) {
            var bigW = +$(window).width();
            bigW = (bigW - 50) >= 980 ? (bigW - 50) : 980;
            $('#widget-tab-container-' + subfix).css('width', bigW + 'px');
            $('#widget-tab-' + subfix).css('width', bigW + 'px');

            aLi.each(function() {
                $(this).css({
                    width: bigW / 10 + 'px'
                });
            });
            var opt1 = {
                'slider': '#widget-tab-' + subfix,
                movedItemClass: '.widget-items-tab',
                previousButton: 'a.prev',
                nextButton: 'a.next',
                hasSmallButton: !1,
                width: bigW,
                itemsPerPage: 10
            };

            $("#widget-tab-" + subfix).johnSlidable(opt1);
        }
    });

    $(".widget-content-slider").each(function(index) {
        var opt2 = {
            "slider": ".widget-content-slider:eq(" + index + ")",
            "movedItemClass": 'ul.widget-list',
            "previousButton": 'a.prev',
            "nextButton": 'a.next',
            "width": 980,
            hasSmallButton: !1,
            itemsPerPage: 980 / 98
        };
        $(this).johnSlidable(opt2);
    });

    var opt3 = {
        "slider": ".theme-content-slider",
        "movedItemClass": 'ul.theme-list',
        "previousButton": 'a.prev',
        "nextButton": 'a.next',
        "width": 980,
        hasSmallButton: !1,
        itemsPerPage: 5
    };
    $(".theme-content-slider").johnSlidable(opt3);
}

/**
 * [initLayout description]
 * @return {[type]} [description]
 *
 * comment : 
 * 			Binding click events in layout part
 */
function initLayout() {
    //init layout events
		var layoutList = $('.header').find('ul.layout-list');
		layoutList.find('li').each(function (){
		    $(this).attr({
                'data-toggle' : "tooltip",
                'data-original-title' : "将此布局拖拽至编辑区"
            }).tooltip({
                'placement' : 'right'
            });
		});
}

function initTheme() {
    var themeList = $('.theme-list');

    //Theme items use event delegation
    if (themeList.length) {
        themeList.on('click', 'li', function() {
            // Append a status flag to themeList
            if (!$(document).data('cachedWrapper')) {
                $(document).data('cachedWrapper', $('.wrapper').clone());
            }
            var url = $(this).data('theme-template');
            var themeType = url.indexOf("isModel=1") >= 0 ? 'code' : 'drag';
            $.ajax({
                cache: false,
                async: true,
                url: url,
                type: "GET",
                dataType: "html",
                success: function(data) {
                    var oWrapper = $('#main-wrapper');
                    $('#dragged-list').dragsort('destroy');
                    oWrapper.empty().html(data);
                    oWrapper.find('.layout-template').each(function() {
                        $(this).smartMenu(menuData);
                    });
                    oWrapper.find('*[operable]').each(function() {
                        $(this).smartMenu(menuData);
                    });
                    $('#dragged-list').dragsort();
                    resetDragWidgets();
                }
            });
        });
    }

    //This will get all the generated themes that have already been published
    //		$.ajax({
    //			url : "scan.php",
    //			cache : false,
    //			type : "GET",
    //			dataType : "JSON",
    //			success : function (d){
    //				if (d['success'] == true) {
    //					var fragment = '';
    //					var data = d['data'];
    //					$.each(data, function (i){
    //						var shortName = this.substring(0,this.indexOf('.html'));
    //						fragment += '<li class="theme-list-item" data-theme-template="'+shortName+'">主题'+(i)+'</li>';
    //					});
    //					themeList.html(fragment);
    //				}
    //			}
    //		});
}

function initBackground() {
    $('#rgb_diy').ColorPicker({
        onSubmit: function(hsb, hex, rgb, el) {
            $(el).val(hex);
            $(el).ColorPickerHide();
        },
        onBeforeShow: function() {
            $(this).ColorPickerSetColor(this.value);
        }
    }).on('keyup', function() {
        $(this).ColorPickerSetColor(this.value);
    });

    if ($("#bgUpload").length) {
        try {
            $("#bgUpload").uploadify('destroy');
        } catch (e) {};
    }

    $("#bgUpload").uploadify({
        height: 30,
        width: 200,
        buttonText: '<div class="row-fluid"><button class="btn btn-block btn-primary">选择图片</button></div>',
        swf: ctxUrl + '/cmskj/js/uploadify/uploadify.swf',
        uploader: ctxUrl + '/attachmentController/uploadReturnUrl.do?type=1',
        'removeCompleted': false,
        'onUploadSuccess': function(file, data, response) {
            //alert('The file ' + file.name + ' was successfully uploaded with a response of ' + response + ':' + data);
            var res = $.parseJSON(data);
            if (res.success === true) {
                $('#bg-url').val(res.url);
            }
        }
    });

    $('#clearBg').on('click', function() {
        var bgi = '';
        $('#bg-url').val('');
        $('.wrapper').css("background-image", "url(/" + bgi + ")");
    });

    $('.dropdown-menu').on('click', 'li', function() {
        var txt = $(this).children('a').text();
        //var type = $(this).attr('data-type');
        var btn = $(this).closest('.btn-group').children('button');
        //btn.attr('data-type', type);
        //log(btn.html(txt + "  <span class='caret'></span>"));
        //.text(txt);
    });

    // init cached width 
    var ctx = $('.tool-container').filter('.background-container');
    var bgw = ctx.find('input').eq(1);
    var backgroundWidth = $('.wrapper').attr('data-cached-width');
    if (backgroundWidth) {
        bgw.val(backgroundWidth);
        globalWidth = backgroundWidth;
        $('.wrapper').css(backgroundWidth);
    }
    $('#confirm-bg-btn').on('click', function() {
        var oWrapper = $('.wrapper');
        var ctx = $('.tool-container').filter('.background-container');

        var a = [];
        var aInps = ctx.find('input');
        aInps.each(function() {
            var val = $(this).val();
            a.push(val);
        });
        var bgc = a[0],
            bgw = a[1],
            bgi = a[2],
            position_x = a[3],
            position_y = a[4];
        bgi = $('#bg-url').val();
        var oRepeat = ctx.find('button.dropdown-toggle');
        var m = $.trim($(oRepeat).text());
        var repeat = 'no-repeat';
        if (m !== '') {
            if (m === 'Y-重复') {
                repeat = 'repeat-y';
            } else if (m === 'X-重复') {
                repeat = 'repeat-x';
            } else if (m === '重复') {
                repeat = 'repeat';
            } else if (m === '不重复') {
                repeat = 'no-repeat';
            }
        }

        bgc != '' && oWrapper.css("background-color", (bgc == 'transparent' ? bgc : '#' + bgc));

        if (bgw) {
            var oW = oWrapper.width();
            var testWidth;

            if (bgw.indexOf('%') >= 0) {
                testWidth = (parseInt(bgw) / 100) * oW;
            } else if (bgw.indexOf('px') >= 0) {
                testWidth = parseInt(bgw);
            } else {
                testWidth = parseInt(bgw);
            }


            if (testWidth < 680) {
                alert('默认布局最小宽度为680px,请重新设置比例');
                aInps[1].value = '100%';
                aInps[1].focus();
            } else if (testWidth > 1920) {
                alert('默认布局最大宽度为1920px,请重新设置比例');
                aInps[1].value = '100%';
                aInps[1].focus();
            } else {
                oWrapper.css("width", bgw);
                globalWidth = bgw;
            }
        }

        if (bgi) {
            oWrapper.css("background-image", "url(/" + bgi + ")");
            if (position_x && position_y) {
                oWrapper.css("background-position", position_x + " " + position_y);
            }
            oWrapper.css("background-repeat", repeat);
        }

    });
}

function initWrapperDraggable() {
    var oWrapper = $('.wrapper');
    var aOperable = oWrapper.find('*[operable]');
    aOperable.each(function() {
        var operType = $(this).attr('operable');
        if (operType) {
            if (operType.indexOf('layout') >= 0) {
                $(this).smartMenu(menuData);
            } else {
                if (operType.indexOf('text,href') >= 0) {
                    $(this).smartMenu(menuData);
                } else if ($(this).attr('id') && operType == 'navbar-list') {
                    $(this).smartMenu(menuData);
                    $(this).find('*[operable]').each(function() {
                        $(this).smartMenu(menuData);
                    });
                    var parentUl = $(this).children('ul.navlist');
                    var aLi = parentUl.children('.navlist-item');
                    aLi.smartMenu(menuData);
                }
            }
        }
    });

    var aDraggableWidgets = $('.wrapper').find('div[class^=widget]');
    aDraggableWidgets.each(function() {
        $(this).johnDraggable(draggableData);
    });
}

window.widgetCachedData = {};
window.layoutCachedData = {};
window.globalWidth = '';

function preloadCachedData() {
    var oWrapper = $('#main-wrapper');
    // for width
    //widgets
    oWrapper.find('div[class*=widget-]').each(function() {
        var _this = $(this);
        if (_this.attr('data-cache')) {
            var cache = _this.attr('data-cache'),
                cachedObj = $.parseJSON(cache),
                widget = cachedObj['id'];
            widgetCachedData[widget] = cachedObj['data'];
        }
    });

    //layouts
    oWrapper.find('div[class*=layout-container]').each(function() {
        var _this = $(this);
        if (_this.attr('data-cache')) {
            var cache = _this.attr('data-cache'),
                cachedObj = $.parseJSON(cache),
                layout = cachedObj['id'];
            layoutCachedData[layout] = cachedObj['data'];
        }
    });
}


// 页面需要加载的模块，升级版本会移动到模块加载器里统一管理调度
var
    hasJQ = !1, // jquery, 和应用的版本一致
    jsInjected = !1, // 用户自定义注入的脚本
    hasPPT = !1, // 幻灯插件
    hasShortcutPPT = !1, // 带缩略图的幻灯片插件
    hasVOTE = !1, // 投票模块
    hasMultiNav = !1, // 多级导航条
    hasTPSlider = !1, // 无缝轮轮播
    hasMultiPanel = !1, // 切换面板
    hasMarquee = !1, // 走马灯
    hasTab = !1; // 选项卡
hasDropdown = !1, // 下拉框
    hasShowtime = !1, // 时间插件
    hasWeather = !1, // 天气预报
    hasBotPPT = !1, // 底部缩略PPT
    hasEasySlides = !1, // 简易PPT
    hasSlideTop = !1, // 上下滑动PPT
    hasCountdown = !1, // 倒计时插件
    hasSlideNormal = !1, // PPT带文字说明
    hasScrollText = !1, // 上下滚动
    hasScrollLeft = !1, // 水平滚动图片
    hasNavBox = !1, // 手风琴导航
    hasHotList = !1; // 最新或热点新闻

var
    counterMapping = { // 用于统计的脚本映射字典
        'text': '<script>这里是需要嵌入的站点脚本<script>',
        'table': 'textUrl',
        'picture': 'textUrl',
        'undefined': 'textUrl'
    };


function doPublish(originHTML) {

    $('#dragged-list').dragsort("destroy");
    var returnValue = [];

    var oMainWrapper = $('#main-wrapper');
    var oWrapper = oMainWrapper.css({
        'position': 'relative',
        'margin': "0 auto",
        'height': '1000px',
        'min-height': '200px',
        'background-size': '100% 100%',
        'background-image': oMainWrapper.css('backgroundImage')
    });


    var tarHTML,
        styleSheets = '',
        appendScripts,
        tick = generatePreviewHTML(originHTML),
        targetHTML = oWrapper.html(tick).prop('outerHTML');

    if (HTMLCodeType === 'dragged') {
        oWrapper.find('.widgetHighLight').length && oWrapper.find('.widgetHighLight').each(function() {
            $(this).removeClass('widgetHighLight');
        });
        oWrapper.find('.highlight').length && oWrapper.find('.highlight').each(function() {
            $(this).removeClass('highlight');
        });
    }

    tarHTML = targetHTML ? targetHTML : '';

    styleSheets += '<link href="' + absUrl + '/cmskj/css/drag/css/' + 'layoutBuilder.css" type="text/css" rel="stylesheet">';
    styleSheets += '<link href="' + absUrl + '/cmskj/css/drag/css/' + 'ftlTransformer.css" type="text/css" rel="stylesheet">';
    // styleSheets += '<link href="'+absUrl + '/cmskj/css/drag/css/' + 'bootstrap.min.css" type="text/css" rel="stylesheet">';
    appendScripts = constructAppenddedScripts();

    targetHTML = '<!DOCTYPE html><html><head><meta charset="utf-8">' + styleSheets + '</head><body>' + tarHTML + '</body>' + appendScripts + '</html>';

    returnValue.push(encodeURI(targetHTML));
    returnValue.push(encodeURI($('#ftlName').val()));
    returnValue.push(encodeURI(originHTML));

    top.setPublishVal(returnValue);

    //window.returnValue = returnValue;
    //window.close();
    // Using dwz dialog to implement this

    // top.designRetValue = returnValue;
    // top.modelPublised = true;
    //$(window.top.document).trigger('design.published', returnValue[0], returnValue[1], returnValue[2]);
    alert('发布成功');
    top.designModelObj.close();
}

/**
 * [constructAppenddedScripts Check the status bit and return witch script should be loaded, base on their priorities]
 * @return {[String]} [script tags]
 */
function constructAppenddedScripts() {
    var scripts = '';

    if (hasJQ) {
        scripts += '<script type="text/javascript" src="' + absUrl + '/cmskj/js/drag/jquery-1.11.1.min.js" ><\/script>';
    }

    if (hasMultiNav) {
        scripts += '<script type="text/javascript" src="' + absUrl + '/cmskj/js/multiNav.js" ><\/script>';
    }

    if (hasMultiPanel) {
        scripts += '<script type="text/javascript" src="' + absUrl + '/cmskj/js/multiPanel.js" ><\/script>';
    }

    if (jsInjected) {
        scripts += '<script type="text/javascript" src="' + absUrl + '/cmskj/js/injectedJS.js" ><\/script>';
    }

    if (hasMarquee) {
        scripts += '<script type="text/javascript" src="' + absUrl + '/cmskj/js/drag/jquery-marquee.js" ><\/script>';
        scripts += '<script type="text/javascript" src="' + absUrl + '/cmskj/js/marquee.js" ><\/script>';
    }

    if (hasTab) {
        scripts += '<script type="text/javascript" src="' + absUrl + '/cmskj/js/tab.js" ><\/script>';
    }

    if (hasDropdown) {
        scripts += '<script type="text/javascript" src="' + absUrl + '/cmskj/js/dropdown.js" ><\/script>';
    }

    if (hasShowtime) {
        scripts += '<script type="text/javascript" src="' + absUrl + '/cmskj/js/drag/modules/showtime.js" ><\/script>';
    }

    if (hasWeather) {
        scripts += '<script type="text/javascript" src="' + absUrl + '/cmskj/js/drag/modules/weather.js" ><\/script>';
    }

    if (hasBotPPT) {
        scripts += '<script type="text/javascript" src="' + absUrl + '/cmskj/js/drag/modules/jquery.cycle.all.min.js" ><\/script>';
        scripts += '<script type="text/javascript" src="' + absUrl + '/cmskj/js/drag/modules/slide_bot.js" ><\/script>';
        scripts += '<script type="text/javascript" src="' + absUrl + '/cmskj/js/drag/modules/botppt.js" ><\/script>';
    }

    if (hasEasySlides) {
        scripts += '<script type="text/javascript" src="' + absUrl + '/cmskj/js/drag/modules/responsiveslides.min.js" ><\/script>';
        scripts += '<script type="text/javascript" src="' + absUrl + '/cmskj/js/drag/modules/easyslides.js" ><\/script>';
    }

    if (hasSlideTop) {
        scripts += '<script type="text/javascript" src="' + absUrl + '/cmskj/js/drag/modules/jquery.SuperSlide.2.1.1.js" ><\/script>';
        scripts += '<script type="text/javascript" src="' + absUrl + '/cmskj/js/drag/modules/slidetop.js" ><\/script>';
    }

    if (hasSlideNormal) {
        scripts += '<script type="text/javascript" src="' + absUrl + '/cmskj/js/drag/modules/jquery.img_silder.js" ><\/script>';
        scripts += '<script type="text/javascript" src="' + absUrl + '/cmskj/js/drag/modules/slidenormal.js" ><\/script>';
    }

    if (hasCountdown) {
        scripts += '<script type="text/javascript" src="' + absUrl + '/cmskj/js/drag/modules/countdown.js" ><\/script>';
    }

    if (hasScrollText) {
        scripts += '<script type="text/javascript" src="' + absUrl + '/cmskj/js/drag/modules/scrollText.js" ><\/script>';
    }

    if (hasScrollLeft) {
        scripts += '<script type="text/javascript" src="' + absUrl + '/cmskj/js/drag/modules/scrollLeft.js" ><\/script>';
    }

    if (hasPPT) {
        if (hasShortcutPPT) {
            scripts += '<script type="text/javascript" src="' + absUrl + '/cmskj/js/drag/jquery-multiSlider.js" ><\/script>';
            scripts += '<script type="text/javascript" src="' + absUrl + '/cmskj/js/sliderShortcutJS.js" ><\/script>';
        } else {
            scripts += '<script type="text/javascript" src="' + absUrl + '/cmskj/js/drag/jquery-johnSlidable.js" ><\/script>';
            scripts += '<script type="text/javascript" src="' + absUrl + '/cmskj/js/sliderJS.js" ><\/script>';
        }
    }


    if (hasVOTE) {
        scripts += '<script type="text/javascript" src="' + absUrl + '/js/jquery.form.js" ><\/script>';
        scripts += '<script type="text/javascript" src="' + absUrl + '/cmskj/js/voteJS.js" ><\/script>';
    }

    if (hasTPSlider) {
        scripts += '<script type="text/javascript" src="' + absUrl + '/cmskj/js/tpSlider.js" ><\/script>';
    }

    if (hasNavBox) {
        scripts += '<script type="text/javascript" src="' + absUrl + '/cmskj/js/drag/modules/navbox.js" ><\/script>';
    }

    if (hasHotList) {
        scripts += '<script type="text/javascript" src="' + absUrl + '/cmskj/js/drag/modules/hotlist.js" ><\/script>';
        scripts += '<script type="text/javascript" src="' + absUrl + '/cmskj/js/drag/modules/initHotlist.js" ><\/script>';
    }

    return scripts;
}

/**
 * [updateWidgetDependencies Update global vars which indicate the widget dependencies]
 * @param  {[String]} d [A given attribute value]
 * @return {[void]}   [Update global vars]
 */
function updateWidgetDependencies(d) {
    if (d.indexOf('hasjq') >= 0) {
        hasJQ = true;
    }

    //  Case 4: will Append injected JS scripts at the bottom
    if (d.indexOf('multi-nav') >= 0) {
        hasMultiNav = true;
    }

    if (d.indexOf('multi-panel') >= 0) {
        hasMultiPanel = true;
    }

    if (d.indexOf('jsinjected') >= 0) {
        jsInjected = true;
    }

    //  Case 5: mark the ppt flag
    if (d.indexOf('ppt') >= 0 && !(d.indexOf('bot_ppt') >= 0)) {
        hasPPT = true;
    }

    if (d.indexOf('multi-ppt') >= 0) {
        hasShortcutPPT = true;
    }

    if (d.indexOf('vote') >= 0) {
        hasVOTE = true;
    }

    if (d.indexOf('tp-slider') >= 0) {
        hasTPSlider = true;
    }

    if (d.indexOf('marquee') >= 0) {
        hasMarquee = true;
    }

    if (d.indexOf('tab') >= 0) {
        hasTab = true;
    }

    if (d.indexOf('dropdown') >= 0) {
        hasDropdown = true;
    }

    if (d.indexOf('showtime') >= 0) {
        hasShowtime = true;
    }

    if (d.indexOf('weather') >= 0) {
        hasWeather = true;
    }

    if (d.indexOf('bot_ppt') >= 0) {
        hasBotPPT = true;
    }

    if (d.indexOf('easyslides') >= 0) {
        hasEasySlides = true;
    }

    if (d.indexOf('slidetop') >= 0) {
        hasSlideTop = true;
    }

    if (d.indexOf('slidenormal') >= 0) {
        hasSlideNormal = true;
    }

    if (d.indexOf('countdown') >= 0) {
        hasCountdown = true;
    }

    if (d.indexOf('scroll-v') >= 0) {
        hasScrollText = true;
    }

    if (d.indexOf('scrollLeft') >= 0) {
        hasScrollLeft = true;
    }

    if (d.indexOf('navbox') >= 0) {
        hasNavBox = true;
    }
}

/**
 * [cleanHTMLTags description]
 * @param  {[type]}
 * @return {[HTML string]} 
 *
 * comment : Replace '<' and '>' flag so can review source code in previous edit panel
 */
function cleanHTMLTags(html) {
    while (html.indexOf('<') != -1) {
        html = html.replace('<', '[[');
    }
    while (html.indexOf('>') != -1) {
        html = html.replace('>', ']]');
    }
    return html;
}

/**
 * [generatePreviewHTML description]
 * @param  {[type]} html [description]
 * @return {[type]}      [Return a preview HTML, need to packed and unpacked some codes]
 */
function generatePreviewHTML(html) {
    var $dom = $(html);
    var extScripts = $dom.find('script');
    var extLinks = $dom.find('link');

    //======================================================================================
    //  There are some cases should be well handled
    //  
    //  Case 1: Prepend base.css file into the wrapper header
    //  Case 2: Flash plugins should do some reconstruction and resize jobs
    //  Case 3: Include jQuery library if needed
    //  Case 4: Append injected JS scripts at the bottom
    //  Case 5: Append slider JS scripts at the bottom
    //  Case 6: Wrap the img element when it has 'link' attribute in data-history config
    //  Case 7: Replace the 'contentShow' area of 'desc_ext' area
    //  Case 8: Replace the 'vote-body' area of vote template
    //=======================================================================================

    //  Case 0: Prepend charset into the wrapper header
    //$('<meta charset="GB2312">').prependTo($dom);
    //  Case 1: Prepend base.css file into the wrapper header
    $('<link>', {
        type: "text/css",
        href: absUrl + "/cmskj/css/base.css"
    }).prependTo($dom);

    //  Case 2: Widget should do some reconstruction handles
    var aOperables = $dom.find('*[operable]');
    aOperables.each(function() {
        var o = $(this).attr('operable');
        var oArray = o.split(',');

        if (oArray.length == 1) {
            var operType = oArray[0];
            if (operType == 'flash') {
                var iW = 200,
                    iH = 80,
                    sLink = '',
                    flashId = '',
                    flashHTML = '',
                    configString = $(this).attr('data-history-config');


                if (configString) {
                    var config = Utils.parseKV2Json(configString);
                    for (var attr in config) {
                        if (attr == 'width') {
                            iW = config[attr];
                        } else if (attr == 'height') {
                            iH = config[attr];
                        } else if (attr == 'link') {
                            sLink = config[attr];
                            var url = new String(sLink);
                            flashId = url.substring(0, url.lastIndexOf('.'));
                        }
                    }
                }
                flashHTML += '<object width="' + iW + '" height="' + iH + '" type="application/x-shockwave-flash" ';
                flashHTML += 'data="/' + sLink + '" id="flash_' + flashId + '" style="visibility:visible;">';
                flashHTML += '<param name="movie" value="/' + sLink + '" />';
                flashHTML += '<param name="allowScriptAccess" value="always" />';
                flashHTML += '<param name="wmode" value="transparent" />';
                flashHTML += '<param name="allowFullscreen" value="true" />';
                flashHTML += '<param name="quality" value="high" />';
                flashHTML += '</object>';
                $(this).replaceWith(flashHTML);
            } else if (operType == 'upload') {
                // For pictures
                var configString = $(this).attr('data-history-config');
                if (configString) {
                    var config = Utils.parseKV2Json(configString);
                    for (var attr in config) {
                        if (attr == 'width') {
                            iW = config[attr];
                        } else if (attr == 'height') {
                            iH = config[attr];
                        } else if (attr == 'link') {
                            sLink = config[attr];
                        }
                    }

                    // Case 6: Wrap the img element when it has 'link' attribute in data-history config
                    //wrapp the image with a link
                    $(this).css({
                        'width': iW + "!important;",
                        'height': iH + "!importaint;"
                    });
                    if (sLink) {
                        var oldHtml = $(this).prop('outerHTML');
                        var oA = '<a href="' + sLink + '" title="图片链接">' + oldHtml + '</a>';
                        $(this).replaceWith(oA);
                    }
                }
            }
        }

    });

    var aDependencies = $dom.find('*[data-widget-dependency]');
    aDependencies.each(function() {
        var d = $(this).data('widget-dependency').toLowerCase();
        //  Case 3: Include jQuery library if needed
        updateWidgetDependencies(d);
    });

    // update content-panel templates
    var tplCls = ['cont-tpl', 'cont-tpl1', 'cont-tpl2', 'cont-tpl3'];
    for (var i = 0, l = tplCls.length; i < l; i++) {
        var contTplCls = tplCls[i];
        var aContTpls = $dom.find('.' + contTplCls);
        aContTpls.each(function() {
            var ftlJson = {
                type: contTplCls
            };
            var ftlDom = ftlTransformer(ftlJson);
            var contentDom = contentTransformer(ftlJson);
            updateDomByTemplate($(this), contentDom, ftlDom, ftlJson);
        });
    }

    var contentSource = $dom.find('*[desc_ext]'),
        smContentSource = $dom.find('*[sm_desc_ext]'),
        contentSourceArray = [],
        contentShowArray = [],
        smContentSourceArray = [],
        smContentShowArray = [];

    contentSource.each(function() {
        var content = $(this).attr('desc_ext');
        var ctShow = $(this).find('[desc=contentShow]');
        contentShowArray.push(ctShow.html());
        contentSourceArray.push(content);
        $(this).removeAttr('desc_ext');
    });

    smContentSource.each(function() {
        var content = $(this).attr('sm_desc_ext');
        var ctShow = $(this).find('[desc=smContentShow]');
        smContentShowArray.push(ctShow.html());
        smContentSourceArray.push(content);
        $(this).removeAttr('sm_desc_ext');
    });

    $dom.find('[desc="articleContent"]').html('${nr.msgAll.msgcontent}');
    $dom.find('[desc="articleTitle"]').html('${nr.msgAll.msgTitle}');



    // Construct a brand new template
    var aTemplates = $dom.find('.layout-template');
    aTemplates.each(function() {
        $(this).removeAttr('style')
            .removeAttr('class')
            .removeAttr('data-type');
        //destroy data info
        //$(this).removeAttr('data-*');
    });

    //  Case 7: Replace the 'contentShow' area of 'desc_ext' area
    $dom.find('[desc=contentShow]').each(function(index) {
        var rep = contentSourceArray[index];
        if (rep) {
            rep = rep.replace(/^\S@([A-Z]+)\S|\S#([A-Z]+)\S/g, function(m) {
                return m.toLowerCase();
            });
        }
        $(this).text(rep);
        $(this).removeAttr('desc');
    });

    $dom.find('[desc=smContentShow]').each(function(index) {
        var rep = smContentSourceArray[index];
        if (rep) {
            rep = rep.replace(/^\S@([A-Z]+)\S|\S#([A-Z]+)\S/g, function(m) {
                return m.toLowerCase();
            });
        }
        $(this).text(rep);
        $(this).removeAttr('desc');
    });

    //  Case 8: Replace the 'vote-body' area of vote template
    var aVotes = $dom.find('[operable=vote]');
    aVotes.each(function() {
        //		    var vBody = $(this).find('.vote-body');
        //		    var template = buildVoteTemplate(CACHE.VOTE);
        //		    vBody.html(template);
    });


    var aOperables = $dom.find('*[operable]');
    aOperables.each(function() {
        //.removeAttr('id')
        //.removeAttr('data-widget-id')  
        $(this).removeAttr('data-layout-id')
            .removeAttr('data-layout-param')
            .removeAttr('data-history-config')
            .removeAttr('operable');
    });

    // Need to do the clean job after tackle all the corner cases
    $dom = removeDecorations($dom);

    var aLayers = $dom.find('*[data-layer]');
    aLayers.each(function() {
        $(this).removeAttr('data-layer').removeAttr('data-type');
    });

    var aCache = $dom.find('*[data-cache]');
    aCache.each(function() {
        $(this).removeAttr('data-cache');
    });


    var fragment = '';
    if (HTMLCodeType === 'dragged') {
        var aLi = $dom.find('li.drag-part');
        aLi.each(function() {
            var html = $(this).html();
            var oRow = '<div class="row">' + html + "</div>";
            fragment += oRow;
        });
    } else {
        var $cloneDom = $dom.clone();
        $cloneDom.find('script').remove()
            .find('link').remove();
        fragment = $cloneDom.html();

        $cloneDom = null;
    }


    // Append extra refference library
    $.each(extLinks, function() {
        fragment += $(this).prop('outerHTML').toString();
    });
    $.each(extScripts, function() {
        fragment += $(this).prop('outerHTML').toString();
    });

    var fixedWidth = globalWidth ? 'width : ' + globalWidth + ';' : 'width:1024px;';
    fixedWidth = fixedWidth.indexOf('px') >= 0 ? fixedWidth : (fixedWidth.indexOf('%') >= 0 ? fixedWidth : fixedWidth + 'px');
    fragment = '<div style="margin:0 auto;' + fixedWidth + '">' + fragment + '</div><div style="clear:both;"></div>';

    return fragment;
}

var removeDecorations = function($dom) {
	$dom.find('.highlight').removeClass('highlight');
    $dom.find('.widgetHighLight').removeClass('widgetHighLight');

    $dom.find('.layout-cell').each(function() {
        $(this).removeClass('layout-decoration')
            .removeClass('layout-decoration-padding-helper')
            .css({
                'border': 0
            });

        var pt = $(this).css('padding-top'),
            pb = $(this).css('padding-bottom'),
            pl = $(this).css('padding-left'),
            pr = $(this).css('padding-right'),
            string = '';

        string += 'pt:' + pt + ';';
        string += 'pb:' + pb + ';';
        string += 'pl:' + pl + ';';
        string += 'pr:' + pr + ';';

        var paddingJson = {
            'padding-top': pt,
            'padding-bottom': pb,
            'padding-left': pl,
            'padding-right': pr
        };

        $(this).css(paddingJson);
    });

    return $dom;
};

var Previewer = function() {
	this.currStateString = 'edit';
    this.currState = PreviewerFSM.edit; // 设置当前状态
    this.button = null;
};

	Previewer.prototype.init = function($btn) {
	var $button = $btn;
	var _this = this;

	$button.html('<span class="icon-eye-open icon-white"></span> 预览');
	this.button = $button;

	    $button.on('click', function() {
	    	// 把请求委托给FSM状态机
	        _this.currState.buttonWasPressed.call(_this);
	    });
	};

	/**
	 * [previewStatusFn 预览状态下要执行的函数]
	 * @return {[type]} [description]
	 */
	var previewStatusFn = function (){
		$('#main-wrapper')
				.find('.layout-decoration')
				.removeClass('layout-decoration')
				.removeClass('layout-decoration-padding-helper')
				.end()
				.find('.layout-container-margin-helper')
				.removeClass('layout-container-margin-helper');
	};

	/**
	 * [editStatusFn 编辑状态下要执行的函数]
	 * @return {[type]} [description]
	 */
	var editStatusFn = function (){
		$('#main-wrapper')
				.find('.layout-cell')
				.addClass('layout-decoration')
				.addClass('layout-decoration-padding-helper')
				.end()
				.find('.layout-container')
				.addClass('layout-container-margin-helper');
		$('.tool-menu>.active').trigger('click');
	};

	var PreviewerFSM = {
	    'edit': {
	        buttonWasPressed: function() {
	            this.button.html('<span class="icon-edit icon-white"></span> 编辑');
	            this.currState = PreviewerFSM.preview;
	            this.currStateString = 'preview';
	            previewStatusFn();
	        }
	    },
	    'preview': {
	        buttonWasPressed: function() {
	            this.button.html('<span class="icon-eye-open icon-white"></span> 预览');
	            this.currState = PreviewerFSM.edit;
	            this.currStateString = 'edit';
	            editStatusFn();
	        }
	    }
	};


        /**
         * [compose 用于组合子函数，FP居家度假旅行必备]
         * @param  {[type]} f [description]
         * @param  {[type]} g [description]
         * @return {[type]}   [description]
         */
        var compose = function(f, g) {
            return function() {
                return f(g());
            };
        };
        var $cachedDom;
        var prePublish = compose(cleanHelperDivs, back2EditStatus);
        var confirmPublish = compose(doPublish, prePublish);
        // var PreviewFSM = (function (){
        // 	var currentStatus = 'edit';
        // 	var json = {
        // 		'preview' : {
        // 			'html' : '<span class="icon-eye-open icon-white"></span>预览',
        // 			'onClick' : function (){
        // 				alert('切换到预览');
        // 			}
        // 		},
        // 		'edit' : {
        // 			'html' : '<span class="icon-edit icon-white"></span>编辑',
        // 			'onClick' : function (){
        // 				alert('切换到编辑');
        // 			}
        // 		}
        // 	};
        // 	return function ($dom){
        // 		return {
        // 			'edit' : function (){
        // 				$dom.html(json[currentStatus]['html']).off('click').on('click', json[currentStatus]['onClick']);
        // 				return currentStatus = 'preview';
        // 			},
        // 			'preview' : function (){
        // 				$dom.html(json[currentStatus]['html']).off('click').on('click', json[currentStatus]['onClick']);
        // 				return currentStatus = 'edit';
        // 			}
        // 		};
        // 	};
        // })();


        // var previewPublish = compose(function(){
        // 	$('#btn-preview').html('还原').off('click').on('click', function(){
        // 		$cachedDom && $('#main-wrapper').html($cachedDom);
        // 	});
        // }, function (){
        // 	$cachedDom = $('#main-wrapper').clone('true');
        // 	var $cleanedDom = removeDecorations($cachedDom);
        // 	$('#main-wrapper').html($cleanedDom);
        // });
        /**
         * [initPublish Binding publish event to Publish Button]
         * @return {[void]}
         * 	
         * comment: As the publish action will take 3 steps, so to devide and conquer it
         */
        var PREVIEWER;
        function initPublish() {
            var currentStatus = 'preview';

            $('#btn-publish').on('click', confirmPublish);
            
            // generate a previewer finite status machine instance
            PREVIEWER = new Previewer();
        	PREVIEWER.init($('#btn-preview'));
        }

        /**
         * [cleanHelperDivs This function will clean up all the helper class, and return a cleaned html string]
         * @return {[String]} [target wrapper outerHTML property]
         */
        function cleanHelperDivs() {
            var oWrapper = $('#main-wrapper');
            if (globalWidth) {
                globalWidth = globalWidth.indexOf('px') >= 0 ? globalWidth : (globalWidth.indexOf('%') >= 0 ? globalWidth : globalWidth + 'px');
                oWrapper.attr('data-cached-width', globalWidth);
            }
            oWrapper.find('div[data-emptydiv=true]').remove();
            oWrapper.find('.widget-tookit').remove();
            oWrapper.find('.highlight').removeClass('highlight');
            oWrapper.find('.widgetHighLight').removeClass('widgetHighLight');
            return oWrapper.prop('outerHTML');
        }
        /**
         * [initWidgetRadioButton description]
         * @return {[type]}
         *
         * comment : Change widget's contents automatically when user click the radio buttons under widget menu
         */
        function initWidgetRadioButton() {
            $.each(['home', 'list', 'cont'], function(i, cont) {
                var oTab = $('.widget-items-tab', $('#widget-tab-' + cont));
                var oWidget = $('#widget-tab-container' + '-' + cont).parent();
                var aRadios = oTab.find('input[type=radio]');
                var aWidgetContents = oWidget.find('.widget-content');
                aWidgetContents.hide();
                aRadios.each(function(index) {
                    $(this).on('click', function() {
                        aRadios.removeAttr('checked').eq(index).prop('checked', 'checked');
                        aWidgetContents.hide().eq(index).fadeIn();
                    });
                });
                if (aRadios.length) {
                    aRadios.eq(0).trigger('click');
                } else {
                    oWidget.closest('.tool-container').empty();
                }
            });
        }

        /**
         * [renderConfigPanel description]
         * @param  {[string]}
         * @return {[type]}
         *
         * comment : 
         */
        function renderConfigPanel(html) {
            var oModal = $('#configModal');
            var oBody = oModal.find('.modal-body');
            var oFooter = oModal.find('.modal-footer');
            oBody.html(html['body']);
            if (html['footer']) {
                oFooter.html(html['footer']);
                oFooter.find('.btn-primary').on('click', function() {
                    $.isFunction(html['buttonFn']['fnOK']) && html['buttonFn']['fnOK']();
                });
                oFooter.find('.btn-default').on('click', function() {
                    $.isFunction(html['buttonFn']['fnCancel']) && html['buttonFn']['fnCancel']();
                });
            }

            // Has render event
            if (typeof html['onRenderReady'] != 'undefined') {
                if ($.isFunction(html['onRenderReady']))
                    html['onRenderReady']();
                oBody.find('button.upload').on('click', html['buttonFn']['fnUpload']);
            }

            oModal.modal('show');
        }

        // add en easy DOM2 function for highlight function

        EventUtils = {
            add: function(obj, type, fn) {
                if (obj.addEventListener) {
                    addEvent = obj.addEventListener(type, fn, false);
                } else if (window.attachEvent) {
                    addEvent = obj.attachEvent('on' + type, fn);
                } else {
                    obj['on' + type] = fn;
                }
            },
            remove: function(obj, type, fn) {
                if (obj.removeEventListener) {
                    addEvent = obj.removeEventListener(type, fn);
                } else if (obj.detachEvent) {
                    addEvent = obj.detachEvent('on' + type, fn);
                } else {
                    obj['on' + type] = null;
                }
            }
        };

        //This panel is shown for layout configuration

        function renderLayoutConfigPanel(html) {
            var oModal = $('#configModal');
            var oBody = oModal.find('.modal-body');
            var oFooter = oModal.find('.modal-footer');
            oBody.html(html['body']);
            oFooter.html(html['footer']);

            if (typeof html['onRenderReady'] != 'undefined') {
                if ($.isFunction(html['onRenderReady']))
                    html['onRenderReady']();
            }
            oFooter.find('.btn-primary').on('click', function() {
                html['buttonFn']['fnOK']();
                //highlightListener();
            });
            oFooter.find('.btn-default').on('click', function() {
                html['buttonFn']['fnCancel']();
                //highlightListener();
            });

            oModal.modal('show');
        }

        /**
         * [initMainWrapper description]
         * @return {[type]} [description]
         *
         * comment : 
         * 			After Ajaxing template from remote server, 
         * 			init all the widget and layout events
         */
        function initMainWrapper(callback) {
            var draggedList = $('#dragged-list');
            draggedList.dragsort();

            /* highlight all widgets */
            var oWrapper = $('#main-wrapper');
            oWrapper.find('*[operable]').each(function() {
                $(this).addClass('widgetHighlight');
            });

            $('.layout-container').smartMenu(menuData);
            $('#main-wrapper, .layout-container').find('*[operable]').each(function() {
                $(this).smartMenu(menuData);
            });

            $('#main-wrapper').find('div[class*=widget-]').each(function (){
            	$(this).attr({
            		'data-toggle' : "tooltip",
					'data-original-title' : "右击对此部件进行操作"
            	}).tooltip({
            		'placement' : 'top'
            	});
            }).end().find('.layout-container').each(function (){
            	var title = '右击对此布局进行操作';
            	if ($(this).attr('data-type') !== 'layout-static') {
	            	$(this).attr({
	                    'data-toggle' : "tooltip",
	                    'data-original-title' : title
	                }).tooltip({
	                    'placement' : 'top'
	                });
            	}
				
            });

            if (HTMLCodeType === 'dragged') {
                $('*[data-widget-id]').each(function() {
                    if ($(this).attr('operable') && $(this).attr('operable') == 'panel') {
                        if ($(this).closest('.widget-chunk').length === 0) {
                            $(this).johnDraggable(draggableData);
                        }
                    } else {
                        $(this).johnDraggable(draggableData);
                    }
                });
            }

            var $navs = $('.widget-nav');
            $navs.each(function() {
                var $nav = $(this);
                $nav.johnDraggable(draggableData);
                var parentUl = $nav.children('ul.navlist');
                var parentAl = parentUl.children('li.navlist-item');


                if ($nav.hasClass('nav-vert')) {
                    parentUl.on('mouseover', 'li', function() {
                        var index = $(this).index();
                        var menuContents = $nav.find('.menu-content');
                        $(this).addClass('active').siblings().removeClass('active');
                        menuContents.hide();
                        menuContents.eq(index).show();
                    });
                } else {
                    parentAl.each(function() {
                        parentAl.smartMenu(menuData);
                    });
                    parentAl.on('mouseover', function() {
                        $(this).siblings().removeClass('active').children('ul.navlist').hide();;
                        $(this).addClass('active').children('ul.navlist').show();
                    });
                }
            });

            // topic slider
            var $tpSlider = $('.topic-slider');
            if ($tpSlider.length) {
                $tpSlider.each(function() {
                    var $dom = $(this);
                    var oTopicList = $dom.find('ul.topic-list'),
                        aTopicListItem = oTopicList.children('li'),
                        oBtnList = $dom.find('ul.btn-list'),
                        aBtnListItem = oBtnList.find('li.btn-list-item');

                    aBtnListItem.on('mouseover', function() {
                        var idx = $(this).index();
                        aBtnListItem.removeClass('active');
                        $(this).addClass('active');
                        aTopicListItem.css({
                            'z-index': -1
                        });
                        aTopicListItem.eq(idx).css({
                            'z-index': 0
                        });
                    });
                    $dom.johnDraggable(draggableData);
                });
            };


            //multi panel
            $('.multi-panel').each(function() {
                var aLi = $(this).find('.tab-list-item');
                var _this_ = $(this);

                var panels = _this_.find('.widget-panel');
                $(this).on('mouseover', '.tab-list-item', function() {
                    var index = $(this).index();
                    $(this).addClass('active').siblings().removeClass('active');
                    panels.hide().eq(index).show();
                })
                aLi.first().trigger('mouseover');
            });

            $('.navbox').each(function() {
                var that = this;
                $(this).on('mouseover', '.subNav', function() {
                    var index = $(this).index();
                    $(this).addClass('currentDd currentDt').siblings().removeClass('currentDd currentDt');
                    if ($(this).next().is(':visible') == 'true') {} else {
                        $(this).next().siblings().filter(function() {
                            return $(this).hasClass('navContent');
                        }).hide();
                        $(this).next().show('slow');
                    }
                });
            });


            $(document).on('click', function(e) {
                $.smartMenu.hide();
                $('.widgetHighLight').removeClass('widgetHighLight');
                $('.navlist[data-level="1"]').hide();
                $('.active').removeClass('active');
                $('.menu-content').hide();
                $('.active').removeClass('active');
            });
            $(window).on('scroll', function() {
                $.smartMenu.hide();
            });

            if (HTMLCodeType === 'dragged') {
                initWrapperDraggable();
                back2EditStatus();
            }


            if (callback && $.isFunction(callback)) {
                callback();
            }
        }

        function back2EditStatus() {
            var $btn = $('ul.tool-menu>li').eq(1);
            if (!$btn.hasClass('active')){
            	$btn.trigger('click');
            }
        }


        //=================================================================
        //
        // Mask Controll Start
        // 
        // comment : This part is a tiny mask util for simulate a static 
        // 			 modal, which should be combined with some DIY windows.
        //
        //
        //
        //=================================================================
        function mask() {
            var $body = $(document.body);
            var $win = $(window);
            if (!$body.find('.mask').length) {
                $body.append($('<div class="mask"></div>'));
            }
            var m = maxMask();
            if (!m.data('data-resize')) {
                $win.on('resize', function() {
                    throttle(m.get(0), maxMask());
                });
                m.data('data-resize', true);
            }
        }

        function maxMask() {
            var $doc = $(document);
            var $body = $(document.body);
            var oMask = $body.find('.mask');
            oMask.css({
                "z-index": 9999,
                "background-color": '#000',
                "position": "absolute",
                "left": 0,
                "top": 0,
                "width": $doc.width(),
                "height": $doc.height()
            }).fadeIn();

            var oPanel = $('#sourceCodePanel');
            if (oPanel.length) {
                var w = ($(window).width() - oPanel.width()) / 2;
                var h = ($(window).height() - oPanel.height()) / 2;

                w = w > 10 ? w : 10;
                h = h > 10 ? h : 10;
                oPanel.css({
                    left: w,
                    top: h
                });
            }
            return oMask;
        }

        function unmask() {
            var $doc = $(document);
            var oMask = $doc.find('.mask');
            if (oMask.length) {
                oMask.css({
                    'z-index': -1
                }).hide();
            }
        }

        function throttle(obj, fn) {
            clearTimeout(obj.timeoutId);
            obj.timeoutId = setTimeout(function() {
                if ($.isFunction(fn)) {
                    fn();
                }
            }, 50);
        }

        //=================================================================
        //
        // Mask Controll End
        // 
        //=================================================================

        /*
         *
         *	This allows user to drag and drop an explicit widget into layout-template,
         *	The callback function (fnDragEnd) points to a target widget witch has alreay been drop into a layout container	
         *
         */
        var draggableData = {
            context: 'body',
            targetWrapperClass: '.wrapper',
            targetClass: '.layout-cell',
            fnDragEnd: function(oTargetWidget) {
                //request html and append;
                //var html = $(this).html();

            }
        };

        function initDragWidgets() {
            var ctx = $('.widget-container');
            var aWidgets = ctx.find('.widget-list-item');
            aWidgets.each(function() {
                $(this).johnDraggable(draggableData);
                $(this).find('img').attr({
                    'data-toggle' : "tooltip",
                    'data-original-title' : "将部件拖拽至下方编辑区"
                }).tooltip({
                    'placement' : 'right'
                });
            });
        };

        function resetDragWidgets() {
            var ctx = $('.widget-container');
            var aWidgets = ctx.find('.widget-list-item');
            aWidgets.johnDraggable('destroy');

            initDragWidgets();
            initWrapperDraggable();
        }

        function initDragLayouts() {
            var ctx = $(".layouts-container");
            var aLayouts = ctx.find('.layout-list-item');
            aLayouts.johnDraggable('destroy').johnDraggable(draggableData);
        }


        //=================================================================================
        //
        //	There are some util functions
        //
        //==================================================================================


        function toCamelCase(str) {
            return str.replace(/\-(\w)/g, function(all, letter) {
                return letter.toUpperCase();
            });
        }

        function camel2HB(str) {
            return str.replace(/([A-Z])/g, "-$1").toLowerCase();
        }

        window.debug = true;

        function log(k, v) {
            if (window.debug && console && console.log) {
                k && (v ? console.log(k, v) : console.log(k));
            }
        }

        function dir(o) {
            if (window.debug && console && console.dir) {
                console.dir(o);
            }
        }

        function calcPosition(targetClass) {
            var arr = [];
            (function() {
                $(targetClass).each(function() {
                    var os = $(this).offset();
                    var w = $(this).outerWidth();
                    var h = $(this).outerHeight();
                    var offset = {
                        left: os.left,
                        top: os.top,
                        right: os.left + w,
                        bottom: os.top + h,
                        height: h
                    };
                    arr.push(offset);
                });
            })();
            return arr;
        };


        function highLightWidgets(ev) {
            ev = ev || window.event;
            // highlight widgets
            // widget highlight set to the priority
            var widgetElems = $('#main-wrapper').find('[class*=widget]'),
                posWidgets = calcPosition(widgetElems),
                targetIndex = -1,
                x = ev.pageX,
                y = ev.pageY;

            if (posWidgets.length) {
                for (var i = 0, l = posWidgets.length; i < l; i++) {
                    var c = posWidgets[i];
                    if (x >= c.left && x <= c.right && y >= c.top && y <= c.bottom) {
                        targetIndex = i;
                        break;
                    }
                }
            }
            $('.widgetHighLight').removeClass('widgetHighLight');
            if (targetIndex !== -1) {
                var tl = widgetElems.eq(targetIndex).closest('*[data-widget-id]');
                tl.addClass('widgetHighLight');
                $('.highlight').removeClass('highlight');
                return;
            }
        }

        /* this function is used to highlight layout and widgets when mouse point is over it */
        function highLightLayouts(ev) {
            ev = ev || window.event;
            // highlight targetted widget or layout
            // will be refactorred by highLightFn function

            // Layout var definitions
            var posLayout = calcPosition('.layout-cell'),
                x = ev.pageX,
                y = ev.pageY,
                preLayoutArray = [];


            // highlight widgets
            // widget highlight set to the priority
            // var widgetElems = $('#main-wrapper').find('[class*=widget]'),
            // 	posWidgets = calcPosition(widgetElems),
            // 	targetIndex = -1;
            // if (posWidgets.length) {
            // 	for (var i=0,l=posWidgets.length; i<l; i++) {
            // 		var c = posWidgets[i];
            // 		if(x >= c.left && x <= c.right && y >= c.top && y <= c.bottom){
            // 			targetIndex = i;
            // 			break;
            // 		}
            // 	}
            // }
            // $('.widgetHighLight').removeClass('widgetHighLight');
            // if(targetIndex !== -1){
            // 	var tl = widgetElems.eq(targetIndex).closest('*[data-widget-id]');
            // 	tl.addClass('widgetHighLight');
            // 	$('.highlight').removeClass('highlight');
            // 	return;
            // }




            if (posLayout.length) {
                for (var i = 0, l = posLayout.length; i < l; i++) {
                    var c = posLayout[i];
                    if (x >= c.left && x <= c.right && y >= c.top && y <= c.bottom) {
                        preLayoutArray.push(i);
                    }
                }
            }
            $('.highlight').removeClass('highlight');
            if (preLayoutArray.length) {
                var tl = -1,
                    t = -1,
                    layoutCells = $('.layout-cell');
                for (var j = 0, ll = preLayoutArray.length; j < ll; j++) {
                    var targetCell = layoutCells.eq(preLayoutArray[j]);
                    var pContainer = targetCell.closest('.layout-container');
                    var layer = +pContainer.attr('data-layer');
                    if (layer > t) {
                        t = layer;
                        tl = preLayoutArray[j];
                    }
                }

                if (t !== -1) {
                    var ctx = layoutCells.eq(tl).closest('.layout-container');
                    ctx.addClass('highlight');
                }
            }

            if (ev.stopPropagation) {
                ev.stopPropagation();
            } else {
                window.cancelBubble = true;
            }


        }

        $(function() {
            /**
             * [description]
             * @param  {[type]} ){      initModules();  } [description]
             * @return {[type]}                        [description]
             *
             * comment : 
             *          Global Main Entry
             */
            // $.holdReady(false);

            var param = [];
            param.push(top.ftlResource);
            param.push(top.ftlHtml);
            initModules(param);
        });
