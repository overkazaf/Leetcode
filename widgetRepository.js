/**
 * [widgetRepo Provide systematic widgets which will be built by the
 *             following datatructure, also allow user to define a 
 *             new widget json, and that will be built by my specific 
 *             scripts.]
 *             
 * @type {Object}
 */
var widgetRepo = {
	'row' : [
		{
			'seq' : 1,
			'id' : 'xxx',
			'className' : 'xxx',
			'stylesheet' : 'xxx.css', //早期实现， 只写几个固定的样式类， 不做以下的精细控制实现
			'script' : 'xxx.js',
			'name' : '导航',
			'width' : 'auto',  // auto / fixed
			'minWidth' : 80,
			'color' : '#fff',
			'fontSize' : 14,
			'background' : '#4198ce',
			'fontWeight' : 'normal',
			'fontItalic' : false,
			'underline' : false,
			'hovered' : {
				'color' : '#aaa',
				'fontSize' : 14,
				'fontWeight' : 'bold',
				'fontItalic' : false,
				'underline' : false,
			},
			'subNav' : {
				'dir' : 1, // 1 为水平， 2 为竖直, 当 1 为水平的情况下，可以选择水平排列
						   // 二级菜单水平排列时可以限制最大的个数
				'height' : 14,
				'lineHeight' : 14,
				'image' : 'sub.jpg',
				'color' : '#fff',
				'hovered' : {
					'fontWeight' : 'bold',
					'fontItalic' : true,
					'underline' : true
				},
				'bgColor' : '#eef'
			},
		}
	],
	'column' : [
		{
			'seq' : 1,
			'id' : 'xxx',
			'className' : 'xxx',
			'name' : '测试栏目块',
			'stylesheet' : '',  // 可以引用外部样式，如果指定的话下边的样式就统一由样式表管理,
								// 样式表的增加和删除采用引用标记，在部件被更新时触发样式表的变动
			'head' : {
				// 列容器的图标分为几块，标题部分图片，标题前小图标， 标题处的more图标，
				// 列表前的项目符号图标， 下划线图标， new图标， 底部more图标等
				'header' : {
					'height' : '20', // px
					'width' : '100%', // 
					'align' : 'center',  // left, center, right
					'verticalAlign' : 'middle',
					'lineHeight' : '20',
					'bgImage' : 'none',
					'fontSize' : '14px',
					'fontFamily' : 'Microsoft Yahei',
					'fontWeight' : 'normal',
					'fontItalic' : false,
					'color' : '#222'
				},
				// 标题的图标， 可指定路径和位置
				'headerIcon' : {
					'position' : 'before', // before / behind title
					'display' : 'block',
					'img' : 'aaa.jpg'
				},
				// more 图标
				'more' : {
					'display' : 'block', // 可指定是否显示
					'isImage' : true, // 可指定是否有图标
					'image' : 'aaa.jpg', // 图标路径
					'txt' : 'more', // more, 更多, more+, 更多>>, more>>, 随便定义
					'color' : '#eee'
				}
			},
			'body' : {
				'columns' : 1, // 可分为多栏目, 1, 2, 3, 4
				'lists' : {
					'ordered' : false, // 是否为有序列表
					'orderStyle' : 'decimal', // 分为 decimal, circle, square, preceding-decimal
					'height' : 14,
					'color' : '#000',
					'fontFamily' : 'Microsoft Yahei', // 默认字体
					'fontSize' : 12,
					'fontItalic' : false,
					'fontWeight' : 'normal',
					'decoration' : 'none',
					'new' : {
						'display' : 'none',
						'img' : 'new.jpg'
					},
					'hasUnderline' : true,
					'underLine' : {
						'type' : 'dotted'
					},
					'preIcon' : {
						'display' : 'block',
						'img' : 'xxx.jpg'
					},
					'date' : {
						'format' : 'yyyy-MM-dd'
					}
				}
			},
			'foot' : { // 底部配置信息， 可以配置是否有分页，是否有底部更多图标等
				'hasPagenation' : true, // 如果为false, 可在底部加入更多
				'pagenationStyle' : 1, // 预制几种样式的分页样式
				'more' : {
					'display' : 'none', //底部的更多， 注意要在head的more为display:none时候才启用
					'isImage' : false, // 可以使用图标或文字
					'img' : 'footer-more.jpg',
					'txt'  : '更多+'
				}
			},
			'headColumns' : 1, // 标题栏的分栏
			'isTabContainer' : false, // 是否为选项卡容器
			'tab' : { // 选项卡的配置信息
				'animation' : 'fade', // 选项卡切换效果 fade active
				'autoPlay' : false,	// 是否自动切换
				'autoPlayTimeout' : 1000, // 选项卡切换的时间间隔
				'counts' : 2,
				'style' : {
					'borders' : {
						'top' : {
							'borderWidth' : '1px',
							'borderStyle' : 'solid',
							'borderColor' : '#4198ce'
						}
					},
					'background' : {

					},
					'hovered' : {
						
					}
				},
			},
			'border' : {
				'display' : 'block',
				'borderStyle' : 'solid', // solid dashed dotted
				'borderWidth' : '1px',
				'borderColor' : '#ccc',
				'borders' : {
					'left' : true,
					'top' : true,
					'right' : true,
					'bottom' : true
				}
			}
		}
	],
	'mixed' : [
		{

		}
	],
	'scroll' : [
		{
			'seq' : 1,
			'dir' : 1, // 1, 2, 3, 4  indicates up down left right
			'script' : 'xxx/jquery.scroll.min.js',
		}
	],
	'video' : [
		{


		}
	],
	'custom' : [
		{

		}
	]
};

var widgetUpdatePreparationStrategies = {
	'row' : {

	},
	'column' : {
		'undefined' : function (json){
			return '';
		}
	},
	'scroll' : {

	},
	'mixed' : {

	},
	'video' : {

	},
	'custom' : {
		
	}
};

var widgetUpdatePreparation = function (json) {
	return widgetUpdatePreparationStrategies[json['type']](json);
};