
/*================================  update log: 2015-10-22  begin  ==============================*/

/* For new widget interfaces adapting and developing */
var dev = true;

var defaultData = {
	'modalId' : 'widgetSettingModal',
	'sites' : [],
	'siteColumns' : {}
};
var settingCache = {

};

var 
	siteUrl = ctxUrl + '/siteController/getSite.do?t=' + Math.random(),
	columnUrl = ctxUrl + '/siteColumnController/getSiteColumn.do';

var 
	ConfigController = {
		'tpl' : {
			'dataSource' : function (){

				var html = '',
					sites = ConfigController['sites'](),
					columns = ConfigController['columns'](),
					limits = ConfigController['limits']();

					html += '<div class="row">';
					html += '<h5>模块定义</h5>';
					html += '<div class="input-prepend offset1">' +
							  '<span class="add-on">模块名称</span>' +
							  '<input class="span4" type="text" placeholder="Username">' +
							'</div>';
					html += '</div>';

					html += '<div class="row">';
					html += '<h5>内容绑定</h5>';

					html += sites;

					html += columns;

					html += '</div>';
					html += '<div class="row">';
					html += '<h5>内容设置</h5>';
					html += limits;

					
				return html;
			},
			'styles' : function () {
				var systemStyle = 'sss',
					customStyle = 'bbb';

				var html = '';
					html = '<div class="accordion" id="accordion2">' +
							  '<div class="accordion-group">' +
							    '<div class="accordion-heading">' +
							      '<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">' +
							        '系统默认' +
							      '</a>' +
							    '</div>' +
							    '<div id="collapseOne" class="accordion-body collapse">' +
							      '<div class="accordion-inner">' +
							        systemStyle +
							      '</div>' +
							    '</div>' +
							  '</div>' +
							  '<div class="accordion-group">' +
							    '<div class="accordion-heading">' +
							      '<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo">' +
							        '定制样式' +
							      '</a>' +
							    '</div>' +
							    '<div id="collapseTwo" class="accordion-body collapse">' +
							      '<div class="accordion-inner">' +
							       customStyle +
							      '</div>' +
							    '</div>' +
							  '</div>' +
							'</div>';	

				return html;
			},
			'effects' : function (){

			}
		},
		'initEvents' : function (){
			var $modal = SettingsUtil.getModal(),
				columns = defaultData['columns'],
				$modalBody = $modal.find('.modal-body'),
				$dropdown = $modalBody.find('.dropdown-menu'),
				$collapse = $modalBody.find('.collapse');

				$dropdown.on('click', 'li', function (){
					var $ul = $(this).closest('ul'),
						$btn = $ul.prev('button'),
						dropdownType = $ul.attr('data-type'),
						txt = $(this).text(),
						val = $(this).attr('data-value');

					if (dropdownType) {
						$(this).addClass('active').siblings().removeClass('active');
						if (dropdownType === 'site-dropdown') {
							$btn.text(txt)
								.attr('data-value', val);

							if (val) {
								if (val in defaultData['siteColumns']) {
									var columns = defaultData['siteColumns'][val];
									buildSiteColumnDropdowns(columns);
								} else {
									// 另发ajax请求数据
									$.ajax({
										url : columnUrl + '?&t=' + Math.random(),
										cache : false,
										async : true,
										type : 'GET',
										data : {
											siteId : val
										},
										dataType : 'json',
										success : function (columns){
											buildSiteColumnDropdowns(columns);
										}
									});
								}
							} else {
								var $sibBtn = $('.dropdown-menu[data-type="column-dropdown"]').prev('button');
									$sibBtn.html('选择栏目 <span class="caret"></span>')
									.removeAttr('data-value');

									$btn.html('选择站点 <span class="caret"></span>')
									.removeAttr('data-value');
							}
							
						}
					}
				});

				$collapse.collapse();
		},
		'limits' : function (){
			var html = '';
				

				html += '<div class="input-prepend offset1">' +
						  '<span class="add-on">内容数量</span>' +
						  '<input class="span4" id="prependedInput" type="text" placeholder="Username">' +
						'</div>';

				html += '<div class="input-prepend offset1">' +
						  '<span class="add-on">标题长度</span>' +
						  '<input class="span4" id="prependedInput" type="text" placeholder="Username">' +
						'</div>';

				html += '<div class="input-prepend offset1">' +
						  '<span class="add-on">内容长度</span>' +
						  '<input class="span4" id="prependedInput" type="text" placeholder="Username">' +
						'</div>';

				html += '<div class="input-prepend offset1">' +
						  '<span class="add-on">子栏目数</span>' +
						  '<input class="span4" id="prependedInput" type="text" placeholder="Username">' +
						'</div>';

				html += '<div class="input-prepend offset1">' +
						  '<span class="add-on">时间格式</span>' +
						  '<input class="span4" id="prependedInput" type="text" placeholder="Username">' +
						'</div>';

				html += '<div class="input-prepend offset1">' +
						  '<span class="add-on">事件名称</span>' +
						  '<input class="span4" id="prependedInput" type="text" placeholder="Username">' +
						'</div>';

				html += '<div class="input-prepend offset1">' +
						  '<span class="add-on">结束时间</span>' +
						  '<input class="span4" id="prependedInput" type="text" placeholder="Username">' +
						'</div>';


			return html;
		},
		'sites' : function () {
			var sites = defaultData['sites'];

			var html = '';
				html += '<div class="btn-group span3 offset1">';
				html += '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
				html += '选择站点 <span class="caret"></span>';
				html += '</button>';
				html += '<ul data-type="site-dropdown" class="dropdown-menu">';
				html += '<li><a href="#">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>';
				$.each(sites, function (i, siteObj){
					html += '<li data-value="'+ siteObj['siteId'] +'"><a href="#">'+ siteObj['siteName'] +'</a></li>';
				});

				html += '</ul>';
				html += '</div>';

			return html;
		},
		'columns' : function () {
			
			var html = '';
				html += '<div class="btn-group span3">';
				html += '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
				html += '选择栏目 <span class="caret"></span>';
				html += '</button>';
				html += '<ul data-type="column-dropdown" class="dropdown-menu">';
				html += '<li><a href="#">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>';
				// $.each(columns, function (i, columnObj){
				// 	html += '<li data-value="'+ columnObj['columnId'] +'"><a href="#">'+ columnObj['columnName'] +'</a></li>';
				// });

				html += '</ul>';
				html += '</div>';

			return html;
		}
	};

// 根据给定的columns数据， 生成columns下拉框
function buildSiteColumnDropdowns (columnArray) {
	var 
		$ul = $('.dropdown-menu[data-type="column-dropdown"]'),
		liHtml = '<li><a href="#">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>',
		$btn = $ul.prev('button');

		$.each(columnArray, function (i, column){
			liHtml += '<li data-value="'+ column['columnId'] +'"><a href="#">'+ column['columnName'] +'</a></li>';
		});
		
		$btn.html('选择栏目 <span class="caret"></span>').removeAttr('data-value');

	$ul.empty()
	   .html(liHtml)
	   .on('click', 'li', function (){
			var val = $(this).attr('data-value'),
				txt = $(this).text();

				if(txt){
					$btn.text(txt)
						.attr('data-value', val);

					$(this).addClass('active').siblings().removeClass('active');
				} else {
					$btn.html('选择栏目 <span class="caret"></span>').removeAttr('data-value');
					$ul.empty();
				}
		});
}

var SettingsUtil = {
	init : function (timeout){
		$.ajax({
			url : siteUrl,
			type : 'GET',
			cache : false,
			async : true,
			dataType : 'json',
			success : function (data){
				defaultData['sites'] = data;

				SettingsUtil['timechunkFetchColumns'](data, timeout);


			},
			error : function (e){
				console && console.log(e);
			}
		});
	},
	timechunkFetchColumns : function (siteArray, timeout){
		$.each(siteArray, function (i, siteObj){
			var siteId = siteObj['siteId'];
			setTimeout(function (){
				$.ajax({
					url : columnUrl + '?t=' + Math.random(),
					type : 'GET',
					cache : false,
					async : true,
					data : {
						siteId : siteId
					},
					dataType : 'json',
					success : function (data){
						if (!SettingsUtil['siteColumns']) {
							SettingsUtil['siteColumns'] = {};
						}
						
						SettingsUtil['siteColumns']['siteId'] = data;
						
						if (i >= siteArray.length-1) {
							SettingsUtil.initModalData();
						}
					},
					error : function (e){
						console && console.log(e);
					}
				});
			}, timeout || 800);
		});
	},
	initModalData : function (){
		var 
			$modal = SettingsUtil.getModal(),
			$modalBody = $modal.find('.modal-body'),
			$container = $modalBody.find('.row'),
			$tabA = $container.eq(0),
			$tabB = $container.eq(1),
			$tabC = $container.eq(2),
			$tabD = $container.eq(3);

		// dataSource :
		var dataSource = ConfigController.tpl['dataSource']();
		$tabA.html(dataSource);


		var styles = ConfigController.tpl['styles']();
		$tabB.html(styles);

		ConfigController.initEvents();
	},
	getModalId : function () {
		return defaultData.modalId;
	},
	getModal : function (){
		return $('#' + SettingsUtil.getModalId());
	}
};

// 初始化， 先分时取到站点和栏目的所有数据
SettingsUtil.init(1200);

var CacheUtil = {
	write : function (elementId, json) {
		if (elementId) {
			settingCache[elementId] = json;
		}
	},
	read : function (elementId){
		if (!elementId) {
			return settingCache;
		}

		return settingCache[elementId];
	}
};

var compose = function (f, g){
	return function (){
		return f(g());
	};
};


var buildWidgetConfigModel = function (json) {


	return {
		// 初始json
		srcJson : json,
		// 数据源
		dataSource : {

		},
		styles : {

		},
		effects : {

		},
		custom : {

		}
	};
};


/**
 * [configWidgetModel 为部件生成一个配置模型， 并展示在模态对话框中]
 * @param  {[type]} json [基部件的初始信息]
 * @return {[type]}      [组装后的json]
 */
var configWidgetModel = function (json){

	var 
		widgetType 		= json.type,
		widgetId 		= json.id,
		currentTarget 	= json.currentTarget;

		return buildWidgetConfigModel(json);
};

var buildWidget = function (json){
	var html = '';
		html += '<table class="table table-condensed table-striped">';
		html += '<thead>';
		html += '<th>i</th>';
		html += '<th>title</th>';
		html += '<th>more</th>';
		html += '</thead>';

		html += '<tbody>';
		
		for (var i = 0; i < 5; i++) {
			html += '<tr>';

			html += '<td><span class="icon-eye-open"></span></td>';
			html += '<td>title</td>';
			html += '<td>date</td>';

			html += '</tr>';
		}

		html += '</tbody>'


		html += '</table>';


	return html;
};

/**
 * [updateWidgetWithSettings 对部件进行更新]
 * @param  {[type]} json [description]
 * @return {[type]}      [description]
 */
var updateWidgetWithSettings = function (json){
	var srcJson = json['srcJson'],
		widgetId = srcJson['id'],
		$widget = $('#' + widgetId);

	var staticHtml = buildWidget(json);
	$widget.empty().html($(staticHtml));

};
/**
 * [writeWidgetSettingCache 配置完后写入cache, 以备后期读取]
 * @param  {[type]} json [部件的配置json数据结构]
 * @return {[type]}      [description]
 */
var writeWidgetSettingCache = function (json) {
	var 
		src      = json['srcJson'],
		cacheId  = src['id'];

		CacheUtil.write(cacheId, json);
};

var applyWidgetSetting = function (json) {
	writeWidgetSettingCache(json);
	updateWidgetWithSettings(json);
};


var isWidgetSettingValid = function (json){
	return true;
};

// 解析部件的配置参数
var parseWidgetParam = function ($dom){
	var $panel = $dom.find('.row'),
		$a = $panel.eq(0),
		$b = $panel.eq(1),
		$c = $panel.eq(2),
		$d = $panel.eq(3);

	// dataSource : 


	// 


	// styles : 
	// 
	// 
	// 
	
	// effects :
	// 
	// 
	// 
	
	// custom : 
	// 
	// 
	// 
	

	return {
		dataSource : {},
		styles : {},
		effects : {},
		custom : {}
	};
};


var constructWidgetByParams = function (param) {
	return {};
};

var displayWidgetSettings = function (json){
	var 
		modalId = SettingsUtil.getModalId(),
		$modal = SettingsUtil.getModal(),
		$modalBody = $modal.find('.modal-body'),
		$modalFooter = $modal.find('.modal-footer'),
		$btnConfirm = $modalFooter.find('.btn-primary');
	
	// 收集部件参数
	var collection = parseWidgetParam($modalBody);
	var params = {
		dataSource : collection.dataSource,
		styles : collection.styles,
		effects : collection.effects,
		custom : collection.custom
	};

	var targetJson = constructWidgetByParams(params);
	$btnConfirm.on('click', function (){
		if (isWidgetSettingValid(params)) {
			applyWidgetSetting(targetJson);
			$modal.modal('hide');
		}
	});

	$modal.modal('show');

	return void 0;
};

var initWidgetSetting = function (json){
	var decorateJson = configWidgetModel(json);
	displayWidgetSettings(decorateJson);
};


/*================================  update log: 2015-10-22  end  ==============================*/
