import Vue from 'vue';
import { MessageBox, Message } from 'element-ui';

export default () => {
	// Vue.prototype.$confirm = MessageBox.confirm;
	Vue.prototype.$confirm = function () {
		const msg = arguments[0];
		let title, options;
		if (typeof arguments[1] === 'string') {
			title = arguments[1];
			options = arguments[2] || {};
		} else {
			options = arguments[1] || {};
		}
		options = Object.assign(
			{
				showClose: false,
				closeOnClickModal: false,
				type: 'warning',
			},
			options,
		);
		let ctx;
		const _beforeClose = options.beforeClose;
		options.beforeClose = function (action, instance, done) {
			ctx = instance;
			if (_beforeClose) {
				_beforeClose.apply(this, arguments);
			} else {
				done();
			}
		};
		const params = typeof arguments[1] === 'string' ? [msg, title, options] : [msg, options];
		return MessageBox.confirm.apply(this, params).catch((e) => {
			// 弹窗关闭时，重置确定按钮 loading 状态
			// 且如果不在这里写 catch，就要在每个 $confirm 调用处后面写
			ctx.confirmButtonLoading = false;
		});
	};
	Vue.prototype.$prompt = MessageBox.prompt;
	// Vue.prototype.$notify = Notification;
	Vue.prototype.$notify = function () {
		let options;
		if (typeof arguments[0] === 'string') {
			options = arguments[1] || {};
			Object.assign(options, { message: arguments[0] });
		} else {
			options = arguments[0] || {};
		}
		options = Object.assign(
			{
				title: '系统提示',
				type: 'warning',
			},
			options,
		);
		return Notification(options);
	};
	Vue.prototype.$message = Message;
};
