// 加入心跳
var lockReconnect = false // 避免重复连接
var ws = null
var wsUrl = 'ws://127.0.0.1:3000?t=test'

createWebSocket(wsUrl)

function createWebSocket(url) {
    try {
        if ('WebSocket' in window) {
            ws = new WebSocket(url);
        }
        initEventHandle();
    } catch (e) {
        reconnect(url);
        console.log(e);
    }
}

function initEventHandle() {
    ws.onclose = function () {
        console.log('onclose:', Date.now())
        reconnect(wsUrl)
    }
    ws.onerror = function () {
        console.log('onerror:', Date.now())
        reconnect(wsUrl)
    }
    ws.onopen = function () {
        console.log('onopen:', Date.now())
        $("#show").html("连接状态;" + ws.readyState + "</br>");
        heartCheck.reset().start(); //心跳检测重置
    }
    ws.onmessage = function (evt) {
        console.log('onmessage:', Date.now())
        $("#show").append(evt.data + "</br>");
        heartCheck.reset().start();
    }
}

function reconnect(url) {
    if (lockReconnect) return;
    lockReconnect = true;
    setTimeout(function () { // 没连上会一直重连，设置延迟避免请求过多
        createWebSocket(url)
        lockReconnect = false
    }, 2000)
}

// 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function() {
    ws.close();
}

// 心跳检测
var heartCheck = {
    timeout: 1000, // 一分钟
    timeoutObj: null,
    serverTimeoutObj: null,
    reset: function () {
        clearTimeout(this.timeoutObj);
        clearTimeout(this.serverTimeoutObj);
        return this;
    },
    start: function () {
        var self = this;
        this.timeoutObj = setTimeout(function () {
            //这里发送一个心跳，后端收到后，返回一个心跳消息，
            //onmessage拿到返回的心跳就说明连接正常
            // ws.send('ping')
            self.serverTimeoutObj = setTimeout(function () { // 如果超过一定时间还没重置，说明后端主动断开了
                ws.close(); //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
            }, self.timeout)
        }, this.timeout)
    }
}
