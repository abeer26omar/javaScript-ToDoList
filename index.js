//aplay oop concepts
//iiefs function return obj && create some classes(constractors)
/* create 3-models for apply sperate of conserns 
model for the budget ,ui and the main controller 
 */
//budget model
var budgetController = (function(){
    //controller for income
    var income=function(id,description,value){
        this.id=id;
        this.description=description;
        this.value=value;
    };
    //controller for expenses
    var expenses=function(id,description,value){
        this.id=id;
        this.description=description;
        this.value=value;
    };
    //make the arrays in obj to be easy to push data on it
    var data={
        allItems:{
            exp:[],
            inc:[]
        },
        totals:{
            exp:0,
            inc:0
        }
    };
    //to take data from user and push it to the array
    return{
        addItem:function(type,desc,val){
            var newItem , ID;

            if(data.allItems[type].lenght > 0){
                ID=data.allItems[type][data.allItems[type].lenght -1].id + 1;
            }
            else{
                ID=0;
            }
            if(type === 'exp'){
                newItem = new expenses(ID,desc,val);
            }
            else if(type === 'inc'){
                newItem = new income(ID,desc,val);

            }

            data.allItems[type].push(newItem);
            return newItem;
        } ,
        test:function(){
            console.log(data);
        }
    }



})();
//ui model
var UIcontrller = (function (){
    //input fields from html(for easy upate and change name of classes)
    var domInputs={
        type :'add-type',
        description :'.add-desc',
        value :'.add-value',
        inputBtn :'.add-btn',
        incTable :'.incTable',
        expTable :'.expTable'
    };
    //retrieve data from the input fields
    return{
        //get the value of inputs
        getInputs:function(){
            return{
            type : document.getElementById(domInputs.type).value,
            description : document.querySelector(domInputs.description).value,
            value : document.querySelector(domInputs.value).value
            };
        },
        //to access the data in domInputs outside the uicontroller
        getDomInputs:function(){
            return domInputs;
        }, 
        //to add elements to html
        addTableItems:function(obj,type){
            var html ,newHtml ,element;
            if(type === 'inc'){
                element=domInputs.incTable;
                html='<tr id="income-%id%"><td class="incStyle">%description%</td><td class="incStyle">%value%</td><td><button class="btn btn-outline-info ml-3"><i class="fas fa-times"></i></button></td></tr>';
            }
            else if(type === 'exp'){
                element=domInputs.expTable;
                html='<tr id="expenses-%id%"><td class="expStyle">%description%</td><td class="expStyle">%value%</td><td><button class="btn btn-outline-danger ml-3"><i class="fas fa-times"></i></button></td></tr>';
            }
            newHtml = html.replace('%id%',obj.id);
            newHtml = newHtml.replace('%description%' , obj.description);
            newHtml = newHtml.replace('%value%' , obj.value);

            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
        }
    };

})();
//controller model
var controller = (function (budgetCtrl,UIctrl){

    //for user actions this fun is private
    var eventLitsners = function(){
        var domBtn=UIctrl.getDomInputs();
        //mouse click
        document.querySelector(domBtn.inputBtn).addEventListener('click',ctrlAddItem);
        //keyboard press
        document.addEventListener('keypress',function(event){
        if(event.keyCode === 13 || event.which === 13){
            ctrlAddItem();
        }
    });
    };

    var ctrlAddItem = function (){
        var input, newItem;
        //get the data
         input = UIctrl.getInputs();
         //console.log(input);
         //add the data 
         newItem = budgetCtrl.addItem(input.type , input.description , input.value);
        // console.log(newItem);
        UIctrl.addTableItems(newItem , input.type);

    };
    //to make the eventlisner fuction accesable (public)
    return {
        init :function(){
            eventLitsners();
        }
    };

})(budgetController,UIcontrller);
//to call the methods and make it works
controller.init();