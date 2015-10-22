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
			'name' : '导航',
			'width' : 'auto',  // auto / fixed
			'minWidth' : 80,
			'fontWeight' : 'bold',
			'fontItalic' : true,
			'underline' : true
			'subNav' : {
				'dir' : 1, // 1 为水平， 2 为竖直, 当 1 为水平的情况下，可以选择水平排列
				'height' : 14,
				'lineHeight' : 14,
				'image' : 'sub.jpg',
				'color' : '#fff',
				'hover' : {
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
			'name' : '栏目块',
			'stylesheet' : '',
			'headColumns' : 1,
			'columns' : 1, // 可分为多栏目
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
			},
			'icons' : {
				'header' : {
					'height' : '20', // px
					'width' : '100%', // 
					'align' : 'center',  // left, center
					'lineHeight' : '20',
					'bgImage' : 'none',
					'fontSize' : '14px',
					'fontFamily' : 'Microsoft Yahei',
					'fontWeight' : 'normal',
					'fontItalic' : false,
					'color' : '#222'
				},
				'title' : {
					'position' : 'before', // before / behind title
					'display' : 'block',
					'img' : 'aaa.jpg'
				},
				'more' : {
					'display' : 'block',
					'isImage' : true,
					'image' : 'aaa.jpg',
					'txt' : 'more', // more, 更多, more+, 更多>>, more>>, 随便定义
					'color' : '#eee'
				}
			},
			'lists' : {
				'height' : '',
				'lineHeight' : '',
				'new' : {
					'display' : 'none',
					'img' : 'new.jpg'
				},
				'dashedLine' : {
					'type' : 'dotted'
				},
				'item' : {
					'img' : 'xxx.jpg'
				},
				'date' : {
					'format' : 'yyyy-MM-dd'
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
	'column' : {
		'undefined' : function (json){
			return '';
		}
	}
};

var widgetUpdatePreparation = function (json) {
	return widgetUpdatePreparationStrategies[json['type']](json);
};