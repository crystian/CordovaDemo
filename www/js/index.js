var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
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

function nextStep(n){
    nPrev = n-1;

    if(n === 0){
      nPrev = 4;
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
    options.desiredFields = [navigator.contacts.fieldType.id];
    var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];

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

        for(var i = 0; i<contacts.length;i++){
            contact = contacts[i];
            el.innerHTML += '<li>Name: '+ contact +'</li>';
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

