(function (Q, $, window, document, undefined) {


/**
 * Plugin that adds action icons that appear over elements and allow the user to perform some action, and display correctly on both desktop and mobile.
 * @module Q
 * @submodule Plugins
 * @class jQuery
 * @namespace Q
 * @method actions
 * @param {Object} [options] , object for an options
 * @param {Array} [options.actions] actions an array of name:function pairs
 * @default {}
 * @param {String} [options.containerClass] containerClass any class names to add to the actions container
 * @default ''
 * @param {Number} [options.zIndex] zIndex z-index from style
 * @default null
 * @param {String} [options.position] position one of 't', 'm', 'b' followed by one of 'l', 'c', 'r'
 * @default 'mr'
 * @param {Number} [options.size] size number for css class basic , example 32 for basic32 class
 * @default 32
 * @param {Boolean} [options.alwaysShow] alwaysShow
 * @default Q.info.isTouchscreen
 * @param {Boolean} [options.horizontal] horizontal if true, show actions horizontally
 * @default true
 * @param {Boolean} [options.reverse] reverse if true, show in reverse order
 * @default false
 * @param {Boolean} [options.clickable] clickable use clickable plugin
 * @default true
 * @param {Object} [options.context] context any context to pass to the actions
 * @default {}
 * @param {Number} [options.repositionMs] repositionMs how many milliseconds between repositioning
 * @default 200
 * @param {Event} [options.onShow] onShow , event that triggering after action show
 * @default new Q.Event()
 * @param [Event] [options.beforeHide] beforeHide , event that triggering before action close
 * @default new Q.Event()
 * @param [Event] [options.onClick] onClick , event that triggering on action click
 * @default new Q.Event()
*/
Q.Tool.jQuery('Q/actions',

function (options) {
	var container = $('<div class="Q_actions_container" />').css({
		'position': 'absolute',
		'zIndex': options.zIndex
	});
	var interval = null;
	if (options.containerClass) {
		container.addClass(options.containerClass);
	}
	var size = options.size;
	if (options.horizontal) {
		cw = 0;
		ch = size;
	} else {
		cw = size;
		ch = 0;
	}
	var buttons = {};
	Q.each(options.actions, function (action, callback) {
		var button = $("<div class='Q_actions_action basic"+size+"' />")
			.addClass('Q_actions_'+action)
			.addClass('basic'+size+'_'+action)
			.attr('action', action)
			.on(Q.Pointer.fastclick, function () {
				Q.handle(callback, this, [action, options.context], {
					fields: {
						action: action,
						context: options.context
					}
				});
			}).on(Q.Pointer.start, function () {
				$(this).addClass('Q_discouragePointerEvents');
				$(window).on([Q.Pointer.end, '.Q_actions'], function () {
					$(this).removeClass('Q_discouragePointerEvents');
					$(window).off([Q.Pointer.end, '.Q_actions']);
				});
			});
		buttons[action] = button;
		if (options.reverse) {
			button.prependTo(container);
		} else {
			button.appendTo(container);
		}
		if (options.horizontal) {
			cw += size/16*17;
		} else {
			ch += size/16*17;
		}
	});
	return this.each(function (i) {
		var $this = $(this);
		var state = $this.state('Q/actions');
		if (state.container) {
			return;
		}
		state.container = container;
		state.buttons = {};
		Q.each(options.actions, function (action, callback) {
			state.buttons[action] = buttons[action];
		});
		if ($this.css('position') === 'static') {
			$this.css('position', 'relative');
		}
		if (state.alwaysShow) {
			_show($this, state, container);
		} else {
			$this.off('mouseenter.Q_actions mouseleave.Q_actions');
			$this.on('mouseenter.Q_actions', function () {
				_show($this, state, container);
			});
			$this.on('mouseleave.Q_actions', function () {
				_hide($this, state, container);
			});
		}
	});
	
	function _show($this, state, container) {
		container.appendTo($this);
		if (state.horizontal) {
			$('.Q_actions_action', container).css({
				'display': 'inline-block',
				'zoom': 1
			});
		}
		container.css({
			'width': cw+'px',
			'height': ch+'px',
			'line-height': ch+'px'
		});
		if (state.clickable) {
			$('.Q_actions_action', container).plugin('Q/clickable', {}, function () {
				if (state.horizontal) {
					$('.Q_clickable_container', container).css({'display': 'inline-block', 'zoom': 1});
				}
			}).width(0);
		}
		_position($this, state.position, container);
		interval = setInterval(function () {
			_position($this, state.position, container);
		}, state.repositionMs);
		state.onShow.handle.apply($this, [state, container]);
	}
	
	function _hide($this, state, container) {
		interval && clearInterval(interval);
		if (false === state.beforeHide.handle.apply($this, [state, container])) {
			return false;
		}
		container.detach();
	}

},

{	// default options:
	actions: {}, // an array of name:function pairs
	containerClass: '', // any class names to add to the actions container
	zIndex: null,
	position: 'mr', // one of 't', 'm', 'b' followed by one of 'l', 'c', 'r'
	size: 32, // could be 16
	alwaysShow: Q.info.isTouchscreen,
	horizontal: true, // if true, show actions horizontally
	reverse: false, // if true, show in reverse order
	clickable: true, // use clickable plugin
	context: {}, // any context to pass to the actions
	repositionMs: 200, // how many milliseconds between repositioning
	onShow: new Q.Event(),
	beforeHide: new Q.Event(),
	onClick: new Q.Event()
}

);


function _position($this, position, container) {
	var cw = container.width(), ch = container.height(), left, top;
	switch (position[0]) {
		case 'b':
			top = ($this.innerHeight()-ch)+'px';
			break;
		case 'm':
			top = ($this.innerHeight()/2-ch/2)+'px';
			break;
		case 't':
		default:
			top = $this.css('margin-left');
			break;
	}
	switch (position[1]) {
		case 'l':
			left = 0;
			break;
		case 'c':
			left = (+$this.innerWidth()/2-cw/2)+'px';
			break;
		case 'r':
		default:
			left = ($this.innerWidth()-cw)+'px';
			break;
	}
	container.css('top', top);
	container.css('left', left);
}

})(Q, jQuery, window, document);