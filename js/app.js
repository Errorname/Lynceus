
var app = {
	container: "#services",

	orange_time: 2000,
	red_time: 5000,

	addService: function(name, link) {
		var service = new Service(name,link);

		$(this.container).append(service.element);
	}
};

$(document).ready(function() {
	app.addService("ErrOrnAmE","http://errorna.me");
	app.addService("Tracetemp","http://tracetemp.com");
	app.addService("Cultures Pad","https://culturespad.fr");
	app.addService("Maâtura","https://maatura.fr");
});

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
	this.element = $($(this.template).html());
};

Service.prototype.setDescription = function() {
	this.element.find(".name").html(this.name);
	this.element.find(".link").html(this.link);
};

Service.prototype.setColor = function(color) {
	this.element.find(".color").removeClass("green orange red grey");
	this.element.find(".color").addClass(color);
};

Service.prototype.setTime = function(time) {
	this.element.find(".time").html(time+" ms");
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
        if (data.status != 200 || data.time > app.red_time) {
                this.setColor("red");
        } else if (data.time > app.orange_time) {
                this.setColor("orange");
        } else {
                this.setColor("green");
        }
};

