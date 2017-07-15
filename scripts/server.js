var http = require('http');
var querystring = require('querystring');
//创建一个服务器
server = http.createServer(function(req, res) {
	// 定义了一个body变量，用于暂存请求体的信息
	var body = "";
	// 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
	req.on('data', function(chunk) {
		body += chunk;
	});
	// 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
	req.on('end', function() {
		body = querystring.parse(body);
		res.writeHead(200, {
			'Content-Type': 'text/plain',
			"Access-Control-Allow-Origin": "http://localhost:8080"
		});
		res.write(body.name + "你好，我们已经收到你的提交了。感谢您对我们乐团的喜爱与支持！");
		res.end();
	});


});
//监听80端口
server.listen(8000, function() {
	console.log("kais");
});
// console.log('server started');