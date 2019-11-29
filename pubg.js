Parse.initialize("KGJuejYDRU2PuBsGcr3Pxv666l6EQkQ02uoS2pBW", "Epd5m0pyM8Le8Ooi2eTfsRu7GyFDKaw6hqOIWHCK");
Parse.masterKey = "493xV4XV6qdyWSzyV558e6lq3z2YtRv9bpaVHYiW";
Parse.serverURL = 'https://parseapi.back4app.com';


function validate(){
  alert('Please disable your pop-up blocker and click the "Open" link again.\n For Chrome users: setting->site settings-> popup and redirects->allow'); 
 
    document.getElementById('form1').style.visibility='visible';
	document.getElementById('help').style.visibility='visible';
	document.getElementById('register').style.visibility='hidden';
	
}
function pay(){
 var orderid;	
var email=document.getElementById('email').value;
var mobile=document.getElementById('mobile').value;
var pusername=document.getElementById('pusername').value;
var address=document.getElementById('address').value;
var city=document.getElementById('city').value;
var pin=document.getElementById('pin').value;
var amount=document.getElementById('amount').value;
if(email==='' || mobile=='' || pusername=='' || address=='' || city=='' ||pin=='' || amount==''){
	alert("All fields are mandatory !!")
}
else {
	const players = Parse.Object.extend("players");
const player = new players();

player.set("email", email);
player.set("mobile", mobile);
player.set("address", address);
player.set("pusername", pusername);
player.set("city", city);
player.set("pin", pin);
player.set("amount", amount);
player.set("TxnStatus", false);

player.save()
.then((player) => {
  // Execute any logic that should take place after the object is saved.
  alert('Registration got Successfully completed with objectId: ' + player.id + '. Soon you will be added to our whatsapp community. Now go for Payment...');
  orderid=player.id;
  payment();
}, (error) => {
  // Execute any logic that should take place if the save fails.
  // error is a Parse.Error with an error code and message.
  alert('Failed to create new object, with error code: ' + error.message);
});

	
}
function payment(){
var form = document.createElement("form");
form.setAttribute("method", "post");
form.setAttribute("action", "pgRedirect.php");

form.setAttribute("target", "view");


var field2 = document.createElement("input"); 
field2.setAttribute("type", "hidden");
field2.setAttribute("name", "ORDER_ID");
field2.setAttribute("value", orderid);
form.appendChild(field2);
document.body.appendChild(form);

var field3 = document.createElement("input"); 
field3.setAttribute("type", "hidden");
field3.setAttribute("name", "CUST_ID");
field3.setAttribute("value", mobile);
form.appendChild(field3);
document.body.appendChild(form);

var field4 = document.createElement("input"); 
field4.setAttribute("type", "hidden");
field4.setAttribute("name", "INDUSTRY_TYPE_ID");
field4.setAttribute("value", "Retail");
form.appendChild(field4);
document.body.appendChild(form);

var field5 = document.createElement("input"); 
field5.setAttribute("type", "hidden");
field5.setAttribute("name", "CHANNEL_ID");
field5.setAttribute("value", "WEB");
form.appendChild(field5);
document.body.appendChild(form);

var field6 = document.createElement("input"); 
field6.setAttribute("type", "hidden");
field6.setAttribute("name", "TXN_AMOUNT");
field6.setAttribute("value", amount);
form.appendChild(field6);
document.body.appendChild(form);


window.open('', 'view');

form.submit();
}
}
