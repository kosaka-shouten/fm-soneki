var soneki = {
  rate      : 0,
  num       : 0,
  fee       : 0,
  disamount : 0,
  profit    : 0 ,
  contract  : '',
  store_n   : 0,
  incentive : function(){
    let c = this.cont;
    let n = this.store_n;
    if (n < 2) return 1.0;

    switch(c){
      case 'a':
      case 'b':
        return (n < 5) ? 1.02 : (n < 10) ? 1.05 : 1.10;
      case 'c':
        return (n < 5) ? 1.01 : (n < 10) ? 1.03 : 1.05;
      case 'n':
        return 1.0
    };
  },
  setData: function(){
    form = document.forms.setting;
    this.rate      = form.rate.value / 100;
    this.num       = form.num.value;
    this.fee       = form.fee.value / 100;
    this.disamount = form.disamount.value * 1000;
    this.profit    = form.profit.value * 1000;
    this.cont      = form.contract.value;
    this.store_n   = form.store_n.value;
  },
  calc : function(){
    this.setData();
    let r = this.rate;
    let n = parseInt(this.num, 10);
    let f = this.fee;
    let inc = document.forms.setting.enable_incentive.checked ? this.incentive() : 1;
    let d = this.disamount
    let dr = document.forms.setting.enable_discompensation.checked ? ((d<100000 ? d : d<300000 ? 99999+(d-99999)*0.9 : d<500000 ? 99999+200000*0.9+(d-299999)*0.5 : 99999+200000*0.9+200000*0.5+(d-499999)*0.85)/d) : 1

    let kuro = 0;
    let data = [];
    for(let i=0; i<=n; i++){
      rieki = r*i*f*inc-(1-r)*(n-i)*dr;
      data.push(rieki);
      rieki>0 && kuro++;
    };
    $("#disposal").text(kuro);

    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [...Array(++n)].map((v,i)=>i) ,
          datasets: [{
              data: data,
              borderWidth: 1
          }],
        }
    });
  }
};
