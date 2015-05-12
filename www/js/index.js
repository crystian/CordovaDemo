var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        //we get 300ms on touch responses
        FastClick.attach(document.body);

        showDeviceInfo();
    }
};

//don't do it at your home!
var div = [];
div[0] = document.getElementById('step0');
div[1] = document.getElementById('step1');
div[2] = document.getElementById('step2');
div[3] = document.getElementById('step3');
div[4] = document.getElementById('step4');
div[5] = document.getElementById('step5');

function nextStep(n){
    nPrev = n-1;

    if(n === 0){
      nPrev = 5;
    }

    div[nPrev].classList.add('hidden');
    div[n].classList.remove('hidden');
}

app.initialize();

//PLUGINS

//device
function showDeviceInfo(){
    document.getElementById('info-1').innerHTML = 'cordova: '+device.cordova;
    document.getElementById('info-2').innerHTML = 'model: '+device.model;
    document.getElementById('info-3').innerHTML = 'platform: '+device.platform;
    document.getElementById('info-4').innerHTML = 'uuid: '+device.uuid;
    document.getElementById('info-5').innerHTML = 'version: '+device.version;
}

//camera:
function takePicture(){
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
        destinationType: Camera.DestinationType.FILE_URI });

    function onSuccess(imageURI) {
        var image = document.getElementById('myImage');
        image.src = imageURI;
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
}

//contacts
function readContacts(){
    var options      = new ContactFindOptions();
    options.filter   = document.getElementById('contactSearch').value;
    options.multiple = true;
    var fields       = ['name'];

    //just in case
    if(options.filter.length === 0){return;}

    navigator.contacts.find(fields, function (contacts) {
        document.getElementById('contactsFound').innerHTML = 'Found ' + contacts.length + ' contacts.';

        var flagMore = false;

        if(contacts.length === 0){
            return;
        } else if(contacts.length > 3){
            contacts.splice(3);//just 3 for example
            flagMore = true;
        }

        var el = document.getElementById('contacts');
        el.innerHTML = '';

        for(var i = 0; i<contacts.length;i++){
            contact = contacts[i];
            el.innerHTML += '<li>Name: '+ contact.displayName +'</li>';
        }
        el.innerHTML += (flagMore ? '<li>more...</li>' : '');

    }, function (contactError) {
        alert('onError!');
    }, options);
}

function pickContact(){
    navigator.contacts.pickContact(function(contact){
        alert('The following contact has been selected:' + JSON.stringify(contact));
    },function(err){
        console.log('Error: ' + err);
    });
}

//globalization
function showGlobalization(){
    navigator.globalization.getPreferredLanguage(function (language) {
        document.getElementById('loc-1').innerHTML = 'preferredLanguage: '+ language.value;
    }, function () {
        alert('error!')
    });
    navigator.globalization.getLocaleName(function (locale) {
        document.getElementById('loc-2').innerHTML = 'localeName: '+ locale.value;
    }, function () {
        alert('error!')
    });
    navigator.globalization.getDatePattern(function (date) {
        document.getElementById('loc-3').innerHTML = 'datePattern: '+ date.pattern;
    }, function () {
        alert('error!')
    });

}

//vibration
function vibrate(){
    var v = document.getElementById('vibrationTime').value;

    v = parseInt(v);
    if(isNaN(v)){
        v = 200;
    }

    navigator.vibrate(v);
}

//barcode
function scanBarcode(){
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            document.getElementById('barcode-1').innerHTML = 'Format: <b>'+ result.format +'</b>';
            document.getElementById('barcode-2').innerHTML = 'Value: <b>'+ result.text +'</b>';
        },
        function (error) {
            alert("Scanning failed: " + error);
        }
    );
}