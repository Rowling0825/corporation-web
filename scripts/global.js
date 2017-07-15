// 文档加载后运行某个函数
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}
// 在之后插入节点
function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appenChild(newElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}
// 添加类的函数
function addClass(element, value) {
	if (!element.className) {
		element.className = value;
	} else {
		newClassName = element.className;
		newClassName += " ";
		newClassName += value;
		element.className = newClassName;
	}
}
// 循环添加here类
function highlightPage() {
	// 先判断DOM方法是否存在
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	var headers = document.getElementsByTagName('header');
	// 还要判断元素是否存在
	if (headers.length == 0) return false;
	var navs = headers[0].getElementsByTagName('nav');
	if (navs.length == 0) return false;
	// 取得链接并循环遍历
	var links = navs[0].getElementsByTagName('a');
	var linkurl;
	for (var i = 0; i < links.length; i++) {
		// 获取链接的url，获取当前页面的url用window.location.href
		linkurl = links[i].getAttribute("href");
		if (window.location.href.indexOf(linkurl) != -1) {
			links[i].className = "here";
			// 为当前body添加id
			var linktext = links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute("id", linktext);
		}
	}
}

// 调用
addLoadEvent(highlightPage)

// 幻灯片制作的moveElment函数
function moveElement(elementID, final_x, final_y, interval) {
	if (!document.getElementById) {
		return false;
	}
	if (!document.getElementById(elementID)) {
		return false;
	}
	var elem = document.getElementById(elementID);
	if (elem.movement) {
		clearTimeout(elem.movement);
	}
	if (!elem.style.left) {
		elem.style.left = "0px";
	}
	if (!elem.style.top) {
		elem.style.top = "0px";
	}
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	if (xpos == final_x && ypos == final_y) {
		return true;
	}
	if (xpos < final_x) {
		var dist = Math.ceil((final_x - xpos) / 10);
		xpos = xpos + dist;
	}
	if (xpos > final_x) {
		var dist = Math.ceil((xpos - final_x) / 10);
		xpos = xpos - dist;
	}
	if (ypos < final_y) {
		var dist = Math.ceil((final_y - ypos) / 10);
		ypos = ypos + dist;
	}
	if (ypos > final_y) {
		var dist = Math.ceil((ypos - final_y) / 10);
		ypos = ypos - dist;
	}
	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	var repeat = "moveElement('" + elementID + "'," + final_x + "," + final_y + "," + interval + ")";
	elem.movement = setTimeout(repeat, interval);
}
// 在intro段落后插入幻灯片
function prepareSlideshow() {
	if (!document.getElementById) {
		return false;
	}
	if (!document.getElementsByTagName) {
		return false;
	}
	if (!document.getElementById("intro")) {
		return false;
	}
	var intro = document.getElementById("intro");
	var slideshow = document.createElement("div");
	slideshow.setAttribute("id", "slideshow");
	var preview = document.createElement("img");
	preview.setAttribute("src", "images/slideshow.gif");
	preview.setAttribute("alt", "a glimpse of what awaits you");
	preview.setAttribute("id", "preview");
	slideshow.appendChild(preview);
	insertAfter(slideshow, intro);
	var links = document.getElementsByTagName("a");
	var destination;
	for (var i = 0; i < links.length; i++) {
		links[i].onmouseover = function() {
			destination = this.getAttribute("href");
			if (destination.indexOf("index.html") != -1) {
				moveElement("preview", 0, 0, 5);
			}
			if (destination.indexOf("about.html") != -1) {
				moveElement("preview", -200, 0, 5);
			}
			if (destination.indexOf("photos.html") != -1) {
				moveElement("preview", -400, 0, 5);
			}
			if (destination.indexOf("live.html") != -1) {
				moveElement("preview", -600, 0, 5);
			}
			if (destination.indexOf("contact.html") != -1) {
				moveElement("preview", -800, 0, 5);
			}
		}
	}
	// var frame = document.createElement("img");
	// frame.setAttribute("src", "images/frame.gif");
	// frame.setAttribute("alt", "");
	// frame.setAttribute("id", "frame");
	// slideshow.appendChild(frame);
}
// 循环遍历段落中的链接 根据当前所在链接移动prewiew元素的位置

addLoadEvent(prepareSlideshow);

// about.html 显示隐藏段落函数
function showSection(id) {
	var sections = document.getElementsByTagName("section");
	for (var i = 0; i < sections.length; i++) {
		if (sections[i].getAttribute("id") != id) {
			sections[i].style.display = "none";
		} else {
			sections[i].style.display = "block";
		}
	}
}

// 遍历nav中的链接 单击时调用showSection函数
function prepareInternalnav() {
	if (!document.getElementsByTagName) {
		return false;
	}
	if (!document.getElementById) {
		return false;
	}
	var articles = document.getElementsByTagName("article");
	if (articles.length == 0) {
		return false;
	}
	var navs = articles[0].getElementsByTagName("nav");
	if (navs.length == 0) {
		return false;
	}
	var nav = navs[0];
	var links = nav.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		var sectionId = links[i].getAttribute("href").split("#")[1]; //是个局部变量
		if (!document.getElementById(sectionId)) {
			continue;
		}
		document.getElementById(sectionId).style.display = "none";
		links[i].destination = sectionId;
		links[i].onclick = function() {
			showSection(this.destination);
			return false;
		}

	}
}
addLoadEvent(prepareInternalnav);

// 图片库 photos.html
function showPic(whichpic) {
	if (!document.getElementById("placeholder")) {
		return true;
	}
	var source = whichpic.getAttribute("href");
	console.log(source);
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src", source);
	if (!document.getElementById("description")) {
		return false;
	}
	if (whichpic.getAttribute("title")) {
		var text = whichpic.getAttribute("title");
	} else {
		var text = "";
	}
	var description = document.getElementById("description");
	if (description.firstChild.nodeType == 3) {
		description.firstChild.nodeValue = text;
	}
	return false;
}

function preparePlaceholder() {
	if (!document.createElement) {
		return false;
	}
	if (!document.createTextNode) {
		return false;
	}
	if (!document.getElementById) {
		return false;
	}
	if (!document.getElementById("imagegallery")) {
		return false;
	}
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id", "placeholder");
	placeholder.setAttribute("src", "images/placeholder.jpg");
	placeholder.setAttribute("alt", "my image gallery");
	var description = document.createElement("p");
	description.setAttribute("id", "description");
	var desctext = document.createTextNode("Choose an image");
	description.appendChild(desctext);
	var gallery = document.getElementById("imagegallery");
	insertAfter(description, gallery);
	insertAfter(placeholder, description);
}

function prepareGallery() {
	if (!document.getElementsByTagName) {
		return false;
	}
	if (!document.getElementById) {
		return false;
	}
	if (!document.getElementById("imagegallery")) {
		return false;
	}
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		links[i].onclick = function() {
			return showPic(this);
		}
	}
}
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);

// 增强表单
// 表单获得焦点
function focusLabels() {
	if (!document.getElementsByTagName) {
		return false;
	}
	var labels = document.getElementsByTagName("label");
	for (var i = 0; i < labels.length; i++) {
		if (!labels[i].getAttribute("for")) {
			continue;
		}
		labels[i].onclick = function() {
			var id = this.getAttribute("for");
			if (!document.getElementById(id)) {
				return false;
			}
			var element = document.getElementById(id);
			element.focus();
		}
	}
}
addLoadEvent(focusLabels);

// 占位符操作
function resetFields(whichform) {
	// 检查浏览器是否支持placeholder属性
	if (Modernizr.input.placeholder) {
		return;
	}
	for (var i = 0; i < whichform.length; i++) {
		var element = whichform.elements[i];
		if (element.type == submit) {
			continue;
		}
		var check = element.placeholder || element.getAttribute('placeholder');
		if (!check) {
			continue;
		}
		element.focus = function() {
			var text = this.placeholder || this.getAttribute('placeholder');
			if (this.value == text) {
				this.className = '';
				this.value = "";
			}
		}
		element.onblur = function() {
			if (this.value == "") {
				this.className = 'placeholder';
				this.value = this.placeholder || this.getAttribute('placeholder');
			}
		}
		element.onblur();
	}

}
// 表单验证
// 检查用户是否输入了什么内容
function isFilled(field) {
	// 检查去掉空格之后的value属性的length属性
	if (field.value.replace(' ', '').length == 0) {
		return false;
	}
	// 比较value属性和placeholder属性
	var placeholder = field.placeholder || field.getAttribute('placeholder');
	return (field.value != placeholder);
}
// 检查邮件输入
function isEmail(field) {
	return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}
// 循环检测required属性的元素
function validateForm(whichform) {
	for (var i = 0; i < whichform.elements.length; i++) {
		var element = whichform.elements[i];
		if (element.required == 'required') {
			if (!isFilled(element)) {
				alert("Please fill in the" + element.name + " field");
				return false;
			}
		}
		if (element.type == 'email') {
			if (!isEmail(element)) {
				alert("The " + element.name + " field must be a valid email address.");
				return false;
			}
		}
	}
	return true;
}

function prepareForms() {
	for (var i = 0; i < document.forms.length; i++) {
		var thisform = document.forms[i];
		resetFields(thisform);
		thisform.onsubmit = function() {
			if (!validateForm(this)) {
				return false;
			}
			var article = document.getElementsByTagName('article')[0];
			if (submitFormWithAjax(this, article)) {
				return false;
			}
			return true;
		}
	}
}
addLoadEvent(prepareForms);

//提交表单
//首先定义创建XHR对象的方法 需要兼容IE的早期版本
function getHTTPObject() {
	if (typeof XMLHttpRequest == 'undefined') {
		try {
			return new ActiveXObject('Msxml2.XMLHTTP.6.0');
		} catch (e) {}
		try {
			return new ActiveXObject('Msxml2.XMLHTTP.3.0');
		} catch (e) {}
		try {
			return new ActiveXObject('Msxml2.XMLHTTP');
		} catch (e) {}
		return false;
	} else {
		return new XMLHttpRequest();
	}
}
//该函数接受一个DOM元素作为参数，然后把所有的子元素都删除掉 然后追加gif图片
function displayAjaxLoading(element) {
	element.className = "response";
	while (element.hasChildNodes()) {
		element.removeChild(element.lastChild);
	}
	var content = document.createElement('img');
	content.setAttribute('src', 'images/loading.gif');
	content.setAttribute('alt', 'Loading^');
	element.appendChild(content);
}


/*function submitFormWithAjax(whichform, thetarget) {
	// s首先要检查是否存在有效的XMLHTTPRequest对象
	var request = getHTTPObject();
	if (!request) {
		return false;
	}
	displayAjaxLoading(thetarget);
	// 创建一个URL编码的表单字符串
	var dataParts = [];
	var element;
	for (var i = 1; i < whichform.elements.length - 1; i++) {
		element = whichform.elements[i];

		dataParts[i - 1] = element.name + '=' + encodeURIComponent(element.value);

	}
	// 把数组中的项用&链接起来
	var data = dataParts.join('&')

	// 向原始表单的action属性指定的处理函数发送Post请求,并添加头部
	request.open('get', whichform.getAttribute("action"), true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.onreadystatechange = function() {
		if (request.readyState == '4') {
			if (request.status == 200 || request.status == 0) {
				var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
				if (matches.length > 0) {
					thetarget.innerHTML = matches[1];
				} else {
					thetarget.innerHTML = '<p>Oops,there was an error.Sorry.</p>';
				}
			} else {
				thetarget.innerHTML = '<p>' + request.statusText + '</p>';
			}
		}
	};
	request.send(data);
	console.log(thetarget.innerHTML);
	return true;
}*/
function submitFormWithAjax(whichform, thetarget) {
	// s首先要检查是否存在有效的XMLHTTPRequest对象
	var request = getHTTPObject();//创建xhr对象
	if (!request) {
		return false;
	}
	displayAjaxLoading(thetarget);
	// 创建一个URL编码的表单字符串
	var dataParts = [];
	var element;
	for (var i = 1; i < whichform.elements.length - 1; i++) {
		element = whichform.elements[i];

		dataParts[i - 1] = element.name + '=' + encodeURIComponent(element.value);

	}
	// 把数组中的项用&链接起来
	var data = dataParts.join('&')

	// 向原始表单的action属性指定的处理函数发送Post请求,并添加头部
	//request.open('post', "http://localhost:8000/", true);
	// request.setRequestHeader("Access-Control-Allow-Origin", "*");
	// 在调用open之前指定onreadystatechange()事件处理程序才能保证跨浏览器兼容性
	request.onreadystatechange = function() {
		if (request.readyState == '4') {
			if (request.status == 200 || request.status == 0) {
				/*var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
				if (matches.length > 0) {
					thetarget.innerHTML = matches[1];
				} else {
					thetarget.innerHTML = '<p>Oops,there was an error.Sorry.</p>';
				}
			} else {*/
				thetarget.innerHTML = request.responseText;
			}
		}
	};
	request.open('post', "http://localhost:8000/", true);
	//设置头部信息要在open和send之间
	request.send(data);
	return true;
}