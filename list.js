var activity = Titanium.Android.currentActivity;
 activity.finish();
var vars={}; var arr = [];
function chanelsData(queryIndexCat){
var xhr = Titanium.Network.createHTTPClient();
xhr.onload = function() {
var select = soupselect.select;
var body=xhr.responseText;
var handler = new htmlparser.DefaultHandler(function(err, dom) {
if (err) {
alert('Error: ' + err);
} else {
vars.data=select(dom,'.post-listing ul li');

function getObjects(obj, key, val) {
var objects = [];
for (var i in obj) {
if (!obj.hasOwnProperty(i)) continue;
if (typeof obj[i] == 'object') {
objects = objects.concat(getObjects(obj[i], key, val));
} else
//if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
if (i == key && obj[i] == val || i == key && val == '') { //
objects.push(obj);
} else if (obj[i] == val && key == ''){
//only add if the object is not already in the array
if (objects.lastIndexOf(obj) == -1){
objects.push(obj);
}
}
}
return objects;
}
//return an array of values that match on a certain key
function getValues(obj, key) {
var objects = [];
for (var i in obj) {
if (!obj.hasOwnProperty(i)) continue;
if (typeof obj[i] == 'object') {
objects = objects.concat(getValues(obj[i], key));
} else if (i == key) {
objects.push(obj[i]);
}
}
return objects;
}
//return an array of keys that match on a certain value
function getKeys(obj, val) {
var objects = [];
for (var i in obj) {
if (!obj.hasOwnProperty(i)) continue;
if (typeof obj[i] == 'object') {
objects = objects.concat(getKeys(obj[i], val));
} else if (obj[i] == val) {
objects.push(i);
}
}
return objects;
}
vars.images=(getObjects(vars.data,'class','attachment-thumbnail wp-post-image'));
vars.links=(getObjects(vars.data,'rel','bookmark'));

for(var i=0;i<vars.images.length;i++){
	var iImage=vars.images[i].src;
	var tTile=vars.links[i*2].title;
	tTile=tTile.replace("رابط ثابت لـ ","");
	iImage=iImage.replace(/-180x120/g,'');
	arr.push({
		title:tTile,
		image:iImage,
		link:vars.links[i*2].href
	});
}
Ti.API.info(arr);
}
});
var parser = new htmlparser.Parser(handler);
parser.parseComplete(body);
};
xhr.onerror = function() {
Titanium.API.info('error');
};
xhr.open("GET",queryIndexCat);
xhr.send();
}
