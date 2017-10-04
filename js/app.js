
var app = {
	container: "#services",
	container_featured: "#service-featured",

	featured: null,

	orange_time: 2000,
	red_time: 5000,

	addService: function(name, link) {
		var service = new Service(name,link);

		$(this.container).append(service.element);
	},

	setFeatured: function(service) {
		this.featured = service;
		if (service) {
			$(this.container_featured).html(service.element.html());
			var self = this;
			this.setFeaturedImage(service);
			$(this.container_featured).find(".close").on("click",function() {
				self.setFeatured(null);
			});
			$(this.container_featured).find(".show").on("click",function() {
				$(self.container_featured).find(".content").toggle();
			});
		} else {
			$(this.container_featured).html(null);
		}
	},

	setFeaturedImage: function(service) {
		$(this.container_featured).find(".screen").attr("src","");
		$(this.container_featured).find(".screen").attr("src","screener.php?w="+service.link);
	}
};

var Service = function(name, link) {
	this.template = "#service";

	this.name = name;
	this.link = link;

	this.loadDOM();
	this.setDescription();

	var self = this;
	var callback = function(data) {
		self.printStatus(data);
		setTimeout(function() {
			self.checkStatus(callback);
		},55*1000 + Math.floor(Math.random()*11)); // Every minute +/- 5 seconds
	};
	this.checkStatus(callback);
};

Service.prototype.loadDOM = function() {
	var self = this;
	this.element = $($(this.template).html());
	this.element.find(".card").on("click",function() {
		app.setFeatured(self);
	});
};

Service.prototype.setDescription = function() {
	this.element.find(".name").html(this.name);
	this.element.find(".link").html(this.link);
};

Service.prototype.setColor = function(color) {
	this.color = color;
	this.element.find(".color").removeClass("green orange red grey");
	this.element.find(".color").addClass(color);
};

Service.prototype.setTime = function(time) {
	this.time = time;
	this.element.find(".time").html(time+" ms");
};

Service.prototype.setHeaders = function(headers) {
	this.headers = headers;
	var text = "";
	for(i in headers) {
		text += headers[i]+"\n";
	}
	this.element.find(".headers").text(text);
};

Service.prototype.setContent = function(content) {
	this.content = content;
	this.element.find(".content").text(content);
};

Service.prototype.checkStatus = function(callback) {
	$.ajax("checker.php",{
		method: "POST",
		data: {
			link: this.link
		},
		dataType: "json",
		error: function(xhr, status, err) {
			console.log(status);
			console.log(err);
		},
		success: function(data) {
			callback(data);
		}
	});
};

Service.prototype.printStatus = function(data) {
	this.setTime(data.time);
        if (data.status != 200 || data.time >= app.red_time) {
                this.setColor("red");
        } else if (data.time >= app.orange_time) {
                this.setColor("orange");
        } else {
                this.setColor("green");
        }
	this.setHeaders(data.headers);
	this.setContent(data.content);
	if (this == app.featured) {
		app.setFeatured(this);
	}
};
