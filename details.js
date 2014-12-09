var varsSingle={}; var arrSingle= [];
function chanelInfo(link){
var xhr = Titanium.Network.createHTTPClient();
xhr.onload = function() {
var select = soupselect.select;
var body=xhr.responseText;
var handler = new htmlparser.DefaultHandler(function(err, dom) {
if (err) {
alert('Error: ' + err);
} else {
varsSingle.data=select(dom,'div.entry');
varsSingle.FinalData=varsSingle.data[0].children[6].raw+"<br>";
varsSingle.FinalData+=varsSingle.data[0].children[8].raw+"<br>";
varsSingle.FinalData+=varsSingle.data[0].children[10].raw+"<br>";
varsSingle.FinalData+=varsSingle.data[0].children[12].raw+"<br>";
varsSingle.FinalData+=varsSingle.data[0].children[14].raw+"<br>";
varsSingle.FinalData+=varsSingle.data[0].children[16].raw+" "+varsSingle.data[0].children[17].children[0].data+"<br>";
varsSingle.FinalData = varsSingle.FinalData.replace(/br/g, '<br>').trim();
arrSingle.push({
	title:"chanel",
    data:varsSingle.FinalData	
});
Ti.API.info(arrSingle);

}
});
var parser = new htmlparser.Parser(handler);
parser.parseComplete(body);
};
xhr.onerror = function() {
Titanium.API.info('error');
};
var queryIndexCat=link;
xhr.open("GET",queryIndexCat);
xhr.send();
}
