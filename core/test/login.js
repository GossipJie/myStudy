// 这个场景中我们有两个控制器对象，一个用来操作页面的登录表单，一个用来与服务器进行通信
// 父类
function Controller() {
    this.errors = []
}

Controller.prototype.showDialog = function (title, message) {
    // 显示标题和消息
}

Controller.prototype.success = function () {

}
