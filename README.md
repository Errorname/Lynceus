# Lynceus

Website monitoring dashboard

![Screenshot](https://github.com/ErrOrnAmE/Lynceus/raw/master/screenshot.png)

### Installation

Execute the following command

```
$ composer install
```

Then, register your websites in js/app.js

```javascript
[...]

$(document).ready(function() {

	app.addService("Your Website","https://errorna.me");

});

[...]
```
