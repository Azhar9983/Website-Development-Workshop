<?php
header("Pragma: no-cache");
header("Cache-Control: no-cache");
header("Expires: 0");
// following files need to be included
require_once("./lib/config_paytm.php");
require_once("./lib/encdec_paytm.php");

$paytmChecksum = "";
$paramList = array();
$isValidChecksum = "FALSE";

$paramList = $_POST;
$paytmChecksum = isset($_POST["CHECKSUMHASH"]) ? $_POST["CHECKSUMHASH"] : ""; //Sent by Paytm pg

//Verify all parameters received from Paytm pg to your application. Like MID received from paytm pg is same as your application’s MID, TXN_AMOUNT and ORDER_ID are same as what was sent by you to Paytm PG for initiating transaction etc.
$isValidChecksum = verifychecksum_e($paramList, PAYTM_MERCHANT_KEY, $paytmChecksum); //will return TRUE or FALSE string.


if($isValidChecksum == "TRUE") {
	echo "<b>Checksum matched and following are the transaction details:</b>" . "<br/>";
	if ($_POST["STATUS"] == "TXN_SUCCESS") {
		echo "<b>Transaction status is success</b>" . "<br/>";
		if (isset($_POST) && count($_POST)>0 )
	{ 
		foreach($_POST as $paramName => $paramValue) {
		     if($paramName=='ORDERID'){
				echo "<script src='https://unpkg.com/parse/dist/parse.min.js'></script><script type='text/javascript'>Parse.initialize('KGJuejYDRU2PuBsGcr3Pxv666l6EQkQ02uoS2pBW', 'Epd5m0pyM8Le8Ooi2eTfsRu7GyFDKaw6hqOIWHCK');Parse.masterKey = '493xV4XV6qdyWSzyV558e6lq3z2YtRv9bpaVHYiW';Parse.serverURL = 'https://parseapi.back4app.com'; 	var players=Parse.Object.extend('players');	var player = new players();	var query = new Parse.Query(players);	query.get('".$paramValue."').then((player) => {  	player.set('TxnStatus',true); 	player.save();	}, (error) => {		alert('Error in updating, but do not worry..');	}); </script>";
		}
	}
		//Process your transaction here as success transaction.
		//Verify amount & order id received from Payment gateway with your application's order id and amount.
	}
	}
	else {
		echo "<b>Transaction status is failure</b>" . "<br/>";
        
	}

	if (isset($_POST) && count($_POST)>0 )
	{ 
		foreach($_POST as $paramName => $paramValue) {
				echo "<br/>" . $paramName . " = " . $paramValue;
		}
	}
	

}
else {
	echo "<b>Checksum mismatched.</b>";
	//Process transaction as suspicious.
}
?>