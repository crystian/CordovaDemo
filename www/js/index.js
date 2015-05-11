var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {

        document.getElementById('info-1').innerHTML = 'dsa';

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