var express = require('express');
var cheerio = require('cheerio'); //npm install cheerio
var request = require('request');	//npm install request
var exphbs = require('express-handlebars'); //npm install express-handlebars
var app = express();

//from express handlebars doc....
var hbs = exphbs.create({});
//register engine
app.engine('handlebars', hbs.engine);
//set view engine
app.set('view engine', 'handlebars');

//facebook access token
var access_token= 'CAACEdEose0cBAA9nHoCkOFhxpo14mXyh6tqr6DsXFsSmG8U8BtxBjqdkxFqLtXlThEpsFMZBhFjAqqP8ZCJ5nyFSercwAZAotZCaVwBSwN5mfCJBOYFKdFkZAXxU9049CyMdjOwotitb9vqC0FezRjINXh4akQvvBX2WAh9Sd1hQgWdQRyryvL5D8BjKxASsWJWowR6jyprYBYcgqyRgJ';

var products = [];

//GADGETS in Nepal
request.post({
	url: 'http://www.gadgetsinnepal.com.np/',
	form: {
		action: 'et_recent_module_add_posts',
		category: 'all',
		number: 5,
		offset: 5,
		et_hb_nonce: 'f60ac3574d'
	}
}, function(err, res, body) {

	var $ = cheerio.load(body);

	var productcolxn = {
		source: "Gadgets in Nepal",
		link: 'http://www.gadgetsinnepal.com.np/',
		items: []
	};

	$('.recent-post').each(function(i, obj) {

		var title = $(obj).find('h2 a').text();
		var link = $(obj).find('h2 a').attr('href');
		var date = $(obj).find('.post-meta span').text();

		var item = {
			title: title,
			link: link,
			date: date
		};

		productcolxn.items.push(item);

	});

	products.push(productcolxn);
});


//GADGET BYTE IN NEPAL
request('http://www.gadgetbytenepal.com/page/1/', function(err,res,body){
	var $ = cheerio.load(body);

	var productcolxn = {
		source:'Gadget Byte Nepal',
		link: 'http://www.gadgetbytenepal.com/page/1/',
		items:[]
	};

	$('.infinite-post').each(function(i, obj){
		var title = $(obj).find('.widget-full-list-text a').text();
		var link = $(obj).find('.widget-full-list-text a').attr('href');
		var date = $(obj).find('.widget-post-date').text();
		var picture = $(obj).find('img').attr('src');

		var item = {
			title: title,
			link:link,
			date: date,
			picture: picture || null
		};
		productcolxn.items.push(item);
	});


	request('http://www.gadgetbytenepal.com/page/2/', function(err,res,body){
		$ = cheerio.load(body);

		$('.infinite-post').each(function(i, obj){
			var title = $(obj).find('.widget-full-list-text a').text();
			var link = $(obj).find('.widget-full-list-text a').attr('href');
			var date = $(obj).find('.widget-post-date').text();

			var item = {
				title: title,
				link:link,
				date: date
			};
			productcolxn.items.push(item);
		});
	});
	products.push(productcolxn);
});


//facebook samsung mobile nepal
request('https://graph.facebook.com/v2.3/SamsungMobile.NP?access_token='+access_token+'&debug=all&fields=posts.limit(30)&format=json&method=get&pretty=0&suppress_http_code=1', function(err,res,body){
	var data = JSON.parse(body);
	data = data.posts.data;

	var productcolxn = {
		source:'Samsung Mobile Nepal',
		link: 'https://facebook.com/SamsungMobile.NP',
		items:[]
	};

	data.forEach(function(post){

		var item = {
			title: post.message,
			link:post.link,
			date: (new Date(post.created_time)).toDateString(),
			picture: post.picture || null
		};

		productcolxn.items.push(item);
	});

	products.push(productcolxn);
});


//facebook intex nepal
request('https://graph.facebook.com/v2.3/IntexNepal?access_token='+access_token+'&debug=all&fields=posts.limit(30)&format=json&method=get&pretty=0&suppress_http_code=1', function(err,res,body){
	var data = JSON.parse(body);
	data = data.posts.data;

	var productcolxn = {
		source:'Intex Nepal',
		link: 'https://facebook.com/IntexNepal',
		items:[]
	};

	data.forEach(function(post){
		var item = {
			title: post.message,
			link:post.link,
			date: (new Date(post.created_time)).toDateString(),
			picture: post.picture || null
		};

		productcolxn.items.push(item);
	});

	products.push(productcolxn);
});

//facebook asus nepal
request('https://graph.facebook.com/v2.3/AsusNepalOfficial?access_token='+access_token+'&debug=all&fields=posts.limit(30)&format=json&method=get&pretty=0&suppress_http_code=1', function(err,res,body){
	var data = JSON.parse(body);
	data = data.posts.data;

	var productcolxn = {
		source:'Asus Nepal Official (facebook)',
		link: 'https://www.facebook.com/AsusNepalOfficial',
		items:[]
	};

	data.forEach(function(post){
		var item = {
			title: post.message,
			link:post.link,
			date: (new Date(post.created_time)).toDateString(),
			picture: post.picture || null
		};

		productcolxn.items.push(item);
	});

	products.push(productcolxn);
});


// facebook huaweidevicenepal
request('https://graph.facebook.com/v2.3/huaweidevicenepal?access_token='+access_token+'&debug=all&fields=posts.limit(30)&format=json&method=get&pretty=0&suppress_http_code=1', function(err,res,body){
	var data = JSON.parse(body);
	data = data.posts.data;

	var productcolxn = {
		source:'Huawei Device Nepal (facebook)',
		link: 'https://www.facebook.com/huaweidevicenepal',
		items:[]
	};

	data.forEach(function(post){
		var item = {
			title: post.message,
			link:post.link,
			date: (new Date(post.created_time)).toDateString(),
			picture: post.picture || null
		};

		productcolxn.items.push(item);
	});

	products.push(productcolxn);
});

// facebook micromax
request('https://graph.facebook.com/v2.3/micromaxnepal?access_token='+access_token+'&debug=all&fields=posts.limit(30)&format=json&method=get&pretty=0&suppress_http_code=1', function(err,res,body){
	var data = JSON.parse(body);
	data = data.posts.data;

	var productcolxn = {
		source:'Micromax Nepal (facebook)',
		link: 'https://www.facebook.com/micromaxnepal',
		items:[]
	};

	data.forEach(function(post){
		var item = {
			title: post.message,
			link:post.link,
			date: (new Date(post.created_time)).toDateString(),
			picture: post.picture || null
		};

		productcolxn.items.push(item);
	});

	products.push(productcolxn);
});

//facebook hyuindai nepal
request('https://graph.facebook.com/v2.3/hyundainepal?access_token='+access_token+'&debug=all&fields=posts.limit(30)&format=json&method=get&pretty=0&suppress_http_code=1', function(err,res,body){
	var data = JSON.parse(body);
	data = data.posts.data;

	var productcolxn = {
		source:'Hyundai Nepal (facebook)',
		link: 'https://www.facebook.com/hyundainepal',
		items:[]
	};

	data.forEach(function(post){
		var item = {
			title: post.message,
			link:post.link,
			date: (new Date(post.created_time)).toDateString(),
			picture: post.picture || null
		};

		productcolxn.items.push(item);
	});

	products.push(productcolxn);
});

//tatamotorsnepal
request('https://graph.facebook.com/v2.3/tatamotorsnepal?access_token='+access_token+'&debug=all&fields=posts.limit(30)&format=json&method=get&pretty=0&suppress_http_code=1', function(err,res,body){
	var data = JSON.parse(body);
	data = data.posts.data;

	var productcolxn = {
		source:'Tata Motors (facebook)',
		link: 'https://www.facebook.com/tatamotorsnepal',
		items:[]
	};

	data.forEach(function(post){
		var item = {
			title: post.message,
			link:post.link,
			date: (new Date(post.created_time)).toDateString(),
			picture: post.picture || null
		};

		productcolxn.items.push(item);
	});

	products.push(productcolxn);
});

//HondaNepal
request('https://graph.facebook.com/v2.3/HondaNepal?access_token='+access_token+'&debug=all&fields=posts.limit(30)&format=json&method=get&pretty=0&suppress_http_code=1', function(err,res,body){
	var data = JSON.parse(body);
	data = data.posts.data;

	var productcolxn = {
		source:'Honda Nepal (facebook)',
		link: 'https://www.facebook.com/HondaNepal',
		items:[]
	};

	data.forEach(function(post){
		var item = {
			title: post.message,
			link:post.link,
			date: (new Date(post.created_time)).toDateString(),
			picture: post.picture || null
		};

		productcolxn.items.push(item);
	});

	products.push(productcolxn);
});


//CGMotocorp
request('https://graph.facebook.com/v2.3/CGMotocorp?access_token='+access_token+'&debug=all&fields=posts.limit(30)&format=json&method=get&pretty=0&suppress_http_code=1', function(err,res,body){
	var data = JSON.parse(body);
	data = data.posts.data;

	var productcolxn = {
		source:'Honda Nepal (facebook)',
		link: 'https://www.facebook.com/CGMotocorp',
		items:[]
	};

	data.forEach(function(post){
		var item = {
			title: post.message,
			link:post.link,
			date: (new Date(post.created_time)).toDateString(),
			picture: post.picture || null
		};

		productcolxn.items.push(item);
	});

	products.push(productcolxn);
});

///lavasmartphone
request('https://graph.facebook.com/v2.3/lavasmartphone?access_token='+access_token+'&debug=all&fields=posts.limit(30)&format=json&method=get&pretty=0&suppress_http_code=1', function(err,res,body){
	var data = JSON.parse(body);
	data = data.posts.data;

	var productcolxn = {
		source:'lavasmartphone',
		link: 'https://www.facebook.com/lavasmartphone',
		items:[]
	};

	data.forEach(function(post){
		var item = {
			title: post.message,
			link:post.link,
			date: (new Date(post.created_time)).toDateString(),
			picture: post.picture || null
		};

		productcolxn.items.push(item);
	});

	products.push(productcolxn);
});

//KarbonnMobileNepal
request('https://graph.facebook.com/v2.3/KarbonnMobileNepal?access_token='+access_token+'&debug=all&fields=posts.limit(30)&format=json&method=get&pretty=0&suppress_http_code=1', function(err,res,body){
	var data = JSON.parse(body);
	data = data.posts.data;

	var productcolxn = {
		source:'KarbonnMobileNepal',
		link: 'https://www.facebook.com/KarbonnMobileNepal',
		items:[]
	};

	data.forEach(function(post){
		var item = {
			title: post.message,
			link:post.link,
			date: (new Date(post.created_time)).toDateString(),
			picture: post.picture || null
		};

		productcolxn.items.push(item);
	});

	products.push(productcolxn);
});

//https://www.facebook.com/gioneenepal
request('https://graph.facebook.com/v2.3/gioneenepal?access_token='+access_token+'&debug=all&fields=posts.limit(30)&format=json&method=get&pretty=0&suppress_http_code=1', function(err,res,body){
	var data = JSON.parse(body);
	data = data.posts.data;

	var productcolxn = {
		source:'gioneenepal',
		link: 'https://www.facebook.com/gioneenepal',
		items:[]
	};

	data.forEach(function(post){
		var item = {
			title: post.message,
			link:post.link,
			date: (new Date(post.created_time)).toDateString(),
			picture: post.picture || null
		};

		productcolxn.items.push(item);
	});

	products.push(productcolxn);
});

//laptoppriceinnepal
request('https://graph.facebook.com/v2.3/laptoppriceinnepal?access_token='+access_token+'&debug=all&fields=posts.limit(30)&format=json&method=get&pretty=0&suppress_http_code=1', function(err,res,body){
	var data = JSON.parse(body);
	data = data.posts.data;

	var productcolxn = {
		source:'laptoppriceinnepal',
		link: 'https://www.facebook.com/laptoppriceinnepal',
		items:[]
	};

	data.forEach(function(post){
		var item = {
			title: post.message,
			link:post.link,
			date: (new Date(post.created_time)).toDateString(),
			picture: post.picture || null
		};

		productcolxn.items.push(item);
	});

	products.push(productcolxn);
});

//Mktradeline
request('https://graph.facebook.com/v2.3/Mktradeline?access_token='+access_token+'&debug=all&fields=posts.limit(30)&format=json&method=get&pretty=0&suppress_http_code=1', function(err,res,body){
	var data = JSON.parse(body);
	data = data.posts.data;

	var productcolxn = {
		source:'Mktradeline',
		link: 'https://www.facebook.com/Mktradeline',
		items:[]
	};

	data.forEach(function(post){
		var item = {
			title: post.message,
			link:post.link,
			date: (new Date(post.created_time)).toDateString(),
			picture: post.picture || null
		};

		productcolxn.items.push(item);
	});

	products.push(productcolxn);
});


/*==================== TO THE ROUTE =========================*/

app.get('/', function (req,res){

	res.render('index', {products: products}); //index.handlebars viwes.

});


var server = app.listen(3000);