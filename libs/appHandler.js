"use strict";
/* jshint strict: false */

var config = require("./config");
var Utils = require("./Utils");

function openApp(appParams, options) {
    var url = config.nanoScheme(options.debug);
    url = url + "://virtual?params=" + JSON.stringify(appParams);
    window.location.href = url;
    // var ifr = document.createElement('iframe');
    // ifr.src = url;
    // ifr.style.display='none';

    if(!Utils.isAnybitMobile() && options.mobile.showInstallTip) {
        checkOpen(function(opened) {
            if (!opened) {
                //showNanoInstallTip(options);
				alertNanoInstall();
            }
        });
    }

    // document.body.appendChild(ifr);      
    // setTimeout(function() {
    //     document.body.removeChild(ifr);
    // }, 2000); 
}

function alertNanoInstall(){
    if (window.confirm('XwcExtWallet is not installed. Click "ok" to install it.'))
    {
        //window.open("https://wallet.xwc.cash/");  //usually pop-up window is blocked
        window.location.href='https://wallet.xwc.cash/';
    }
}

//check app open
function checkOpen(cb){
	var _clickTime = +(new Date());
	function check(elsTime) {
		if ( elsTime > 3000 || document.hidden || document.webkitHidden) {
			cb(1);
		} else {
			cb(0);
		}
	}

	//Start the timer running at an interval of 20ms 
	// and check whether the cumulative consumption time exceeds 3000ms
	var _count = 0, intHandle;
	intHandle = setInterval(function(){
		_count++;        
		var elsTime = +(new Date()) - _clickTime;
		if (_count>=100 || elsTime > 3000 ) {
			clearInterval(intHandle);
			check(elsTime);
		}
	}, 20);
}

function showNanoInstallTip(options) {
    var installBtn = document.createElement("BUTTON");
	installBtn.className = "install";
    installBtn.innerHTML = options.mobile.installTip || "INSTALL NASNano/下载星云钱包";
    /*jshint multistr: true */
	var style = ("text-align: center;\
    background-color: #000;\
    color: #fff;\
    border-radius: 20px;\
    width: 80%;\
    height: 40px;\
    position: absolute;\
    left: 50%;\
    top: 50%;\
    transform: translate(-50%,-50%);");
	Utils.addCssRule(".install", style);

    var background = document.createElement("div");
	background.className = "install-background";
	style = "position: fixed;\
	bottom:0;\
	z-index:1000;\
	height:40px;\
    width:100%;\
	background-color: rgba(0, 0, 0, 0);";
	Utils.addCssRule(".install-background", style);
	background.appendChild(installBtn);

	var bodys = document.getElementsByTagName("body");
	var body = bodys[0];
    body.appendChild(background);
    
    installBtn.onclick = function () {
		body.removeChild(background);
        background = null;
        //window.location.href = "https://nano.xwc.io/";
        window.open("https://nano.xwc.io/");
	};
}

module.exports = openApp;