let r=/^(1|)(\s+|)((\d{3})|(\(\d{3}\)))(\s+|-)(\d{3})(\s+|-)(\d{4})|\d{10}|(\d{3})-(\d{3})-(\d{4})/g 



let r=/^(1|)(\s+|)((\d{3})|(\(\d{3}\)))(\s+|-|)(\d{3})(\s+|-|)(\d{4})/g




Penny:0.01,Nickel:0.05,Dime:0.1,Quarter:0.25,Dollar:1,Five:5,Ten:10,Twenty:20,hundred:100,


"PENNY":1.01,"NICKEL":2.05,"DIME":3.1,"QUARTER":4.25,"ONE":90,"FIVE":55,"TEN":20,"TWENTY":60,"ONE HUNDRED":100,

"PENNY":0.01,"NICKEL":0.05,"DIME":0.1,"QUARTER":0.25,"ONE":1,"FIVE":5,"TEN":10,"TWENTY":20,"ONE HUNDRED":100,


function checkCashRegister(price, cash, cid) {
    //reduce
    //if for
    let cidCash=0;
    let j;
    let change=[];
    let backCash=cash-price;
    let initVal="closed";
    for(let i=0;i<cid.length;i++){
      cidCash+=cid[i][1]
    }
    const cashUnit=[{"PENNY":0.01,"NICKEL":0.05,"DIME":0.1,"QUARTER":0.25,"ONE":1,"FIVE":5,"TEN":10,"TWENTY":20,"ONE HUNDRED":100}]
   
    console.log(cid[0][1])
   console.log(cid.hasOwnProperty())
    if (cidCash<backCash){
  return {status: "INSUFFICIENT_FUNDS", change: []}
    }else if(cidCash==backCash){
      return {status: "CLOSED", change: cid}
    }else{
   for(j in cashUnit){
  if(backCash>cashUnit[j]){
  for
  
  }
    }
      return {status: "OPEN", change: [change]}
    }
    
  }
  
  checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);

  function checkCashRegister(price, cash, cid) {
    //reduce
    //if for
    let cidCash=0;
    function Subtr(arg1,arg2){ 
   var r1,r2,m,n; 
   try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0} 
   try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0} 
   m=Math.pow(10,Math.max(r1,r2)); 
   n=(r1>=r2)?r1:r2; 
   return ((arg1*m-arg2*m)/m).toFixed(n); 
  }
    let change=[];
    let backCash=cash-price;
    for(let i=0;i<cid.length;i++){
      cidCash+=cid[i][1]
    }
    let flatCid=cid.flat()
    const cashUnit=[["PENNY",0.01],["NICKEL",0.05],["DIME",0.1],["QUARTER",0.25],["ONE",1],["FIVE",5],["TEN",10],["TWENTY",20],["ONE HUNDRED",100]]
  
    if (cidCash<backCash){
  return {status: "INSUFFICIENT_FUNDS", change: []}
    }else if(cidCash==backCash){
      return {status: "CLOSED", change: cid}
    }else{
      for (let j=7;j>=0;j--){
   if (backCash>=cashUnit[j][1]&&backCash<cid[j][1]){
    change.push([cashUnit[j][0],parseInt((backCash*10000)/(cashUnit[j][1]*10000))*(cashUnit[j][1]*10000)/10000]);
     backCash=Subtr(backCash,parseInt((backCash*10000)/(cashUnit[j][1]*10000))*(cashUnit[j][1]*10000)/10000)
   }else if(backCash>=cashUnit[j][1]&&backCash>=cid[j][1]&&cid[j][1]!=0&&j!=0){
    
     change.push([cashUnit[j][0],cid[j][1]])
      backCash=Subtr(backCash,cid[j][1])
   }else if(j==0&&backCash!=0){
  return {status: "INSUFFICIENT_FUNDS", change: []}
   }
      }
  
    }
      return {status: "OPEN", change: change}
    }
  checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
  
  console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]))