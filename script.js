const balance = document.querySelector('#balance')
const incomeAmount = document.querySelector('#inc-amt')
const expenseAmount = document.querySelector('#exp-amt')
const description = document.querySelector('#desc')
const amount = document.querySelector('#amount')
const form = document.querySelector('#form')
const transcationList = document.querySelector('#trans')

// // dummy datas

// const dummyData =[
//     {  id:1, description:'flower', amount:20 },
//     {  id:2, description:'rent', amount:-200 },
//     {  id:3, description:'food', amount:-520 },
//     {  id:4, description:'petrol', amount:-320 },
//     {  id:5, description:'salary', amount:2000 }
// ];




// localStorage

const localStorageTrans = JSON.parse(localStorage.getItem('trans')) 
let transactions = localStorage.getItem('trans') !==null? localStorageTrans :[] 


// // create: creating the li elemnt to display the datas

// let transactions= dummyData
//loading added items in viewport

function loadTransactionDetails(transaction){
    const sign = transaction.amount <0 ? '-':'+';
    // console.log(sign)
    const item = document.createElement('li')
    item.classList.add(transaction.amount <0 ? 'exp':'inc')
    item.innerHTML =`
     ${transaction.description}
     <span>${sign} ${Math.abs(transaction.amount)}</span>
     <button class="btn-del" onclick='removeTrans(${transaction.id})'>x</button>
    `
    transcationList.appendChild(item)
    // console.log(transaction)
}

// delete function
function removeTrans(id){
    // console.log(id)
    if(confirm('Do you want to delete this transaction?')){
        transactions = transactions.filter((transaction)=> transaction.id != id)
        config()  
        updateLocalStorage()      //to update localstorage with respect to deleting the transactions
    }
    else{
        return;
    }
}


// update:
function updateAmount(){
    const amounts = transactions.map((transaction)=>transaction.amount)
    // console.log(amounts)
    // total -->Your balance
    const total = amounts.reduce((acc,item)=> acc+= item, 0.00).toFixed(2)
    balance.innerHTML =` ₹ ${total} `

    // only income -->incomeAmount

    const income = amounts
    .filter((item)=> item>0)
    .reduce((acc,item)=> (acc += item),0.00)
    .toFixed(2)
    // console.log(income)
    incomeAmount.innerHTML=`  ₹ ${income}`

    // only expense ---> expenseAmount
    const expense = amounts
    .filter((item)=> item<0)
    .reduce((acc,item)=> (acc += item),0.00)
    .toFixed(2)
    // console.log(expense)
    expenseAmount.innerHTML=`  ₹ ${ Math.abs(expense)}`   
}

// read: clear the pg when loaded and read the dummy data--> store in transactionList varaiable
function config(){
    transcationList.innerHTML=''
    transactions.forEach(loadTransactionDetails)  // items in transaction will itterated and added into loadtransaction detail 
   //   calling updateAmount() to get updated whenever the pg gets loaded
    updateAmount()
}

// Add new transaction (income/expense chosen by radio)
function addTransaction(e) {
  e.preventDefault();

  const selectedType = document.querySelector('input[name="type"]:checked').value;

  if (description.value.trim() === '' || amount.value.trim() === '') {
    alert('Please enter both description and amount!');
    return;
  }

  let amtValue = +amount.value;
  if (selectedType === 'expense') amtValue = -Math.abs(amtValue); // negative for expense

  const transaction = {
    id: uniqueId(),
    description: description.value,
    amount: amtValue,
  };

  transactions.push(transaction);
  updateLocalStorage();
  loadTransactionDetails(transaction);
  updateAmount();

  description.value = '';
  amount.value = '';
}


//  uniqueId()
 function uniqueId(){
    return Math.floor(Math.random()*100)
 }

//Reset function
 function resetTransaction(){
    transactions=[]
    balance.textContent='0.00'
    incomeAmount.textContent='0.00'
    expenseAmount.textContent='0.00'
    localStorage.removeItem('trans');
    
    config()
 }

// filters based on radio button
document.getElementById('all').addEventListener('change',()=>filterTransactions('all'))
document.getElementById('inc-radio').addEventListener('change',()=>filterTransactions('inc-radio'))
document.getElementById('exp-radio').addEventListener('change',()=>filterTransactions('exp-radio'))


function filterTransactions(type){
    const allitems= document.querySelectorAll('#trans li')
    // console.log(allitems)
    allitems.forEach(item => {
        const amountText = item.textContent  
        // console.log(amountText)
        const isIncome=amountText.includes('+')
        //  console.log(isIncome)
        const isExpense = amountText.includes('-')
        //  console.log(isExpense)

         if(type==='all'){
            // item.style.display='list-item'
            item.style.display='flex'
            item.style.justifyContent='space-between'
            // console.log(item)
         }
         else if(type==='inc-radio'&& isIncome){
            // item.style.display='list-item'
            item.style.display='flex'
            item.style.justifyContent='space-between'
            //  console.log(item)
         }
         else if(type==='exp-radio'&& isExpense){
            // item.style.display='list-item'
            item.style.display='flex'
            item.style.justifyContent='space-between'
            //  console.log(item)
         }
         else{
            item.style.display='none'
         }
    })
}

//form & window events:

form.addEventListener('submit',addTransaction)
form.addEventListener('reset',function(){
    resetTransaction()
})

window.addEventListener('load',function(){
    config();
});

// localStorage function

function updateLocalStorage(){
    localStorage.setItem('trans',JSON.stringify(transactions))

}