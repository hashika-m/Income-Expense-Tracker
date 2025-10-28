Tracker used to diplay your balance based on the income and expenses you did
   It contains input fields like description and amount to enter the user values
   It has buttons add transaction to add the items to be display in transaction area and reset to set all to default value 0 with no items to be displayed in transaction area and gets stored in local storage
   It has income, expense, your balance and transaction area to dispaly all respectively based on the inputs
   It has filters (all,income, expense) to specifically display the respective items basd on users selection


   Description of tracker for usage:
   1. Input fields: There is 2 fields(description, amount ) to get user inputs(eg:coffee 50)
       if amount entered is 1000/+1000 it assigns it as income of the user in transaction area with respective badge
      if amount enteres is -1000 it assigns it as expense of the user in transaction area with repective badge
   2. Add transaction button: Once the fields get filled by the user and cliking the add transaction button it will display the items in transaction area.
               Dynamically income, expense, your balance get updated
               The local storage also get updated with the datas in JSON format
   4. Reset button: Once the button is clicked all the  income, expense,your balance set to 0 and transaction area becomes empty
                    The local storage remain same with the items added before
   5. Filters: There are 3 filters(all,income,expense)
       all- it display both income and expense in transaction area. The left side (income,expense,your balance remains same)
       income- it display only income in transaction area. The left side (income,expense,your balance remains same)
       expense- it display only expense in transaction area. The left side (income,expense,your balance remains same)
  6. Delete- It will appear once the user hover over the item. If the delete(x) button is clicked it gets deleted from the transaction area and from local storage    
  7.Local storage: The items are stored in this even afetr the window is closed and once it reloaded or open again it returns the stored datas to be displayed
  8. Income -only shows the total income
  9. Expense- only dispaly the total expense
  10. Your balance - display the balance amount (income-expense) and based on add/removal of income/expense it gets yupdated dynamically.
