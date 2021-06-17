//aplay oop concepts

var budgetController = (function(){

})();

var UIcontrller = (function (){
    //dom 
    var domInputs={
        type :'add-type',
        description :'.add-desc',
        value :'.add-value',
        inputBtn :'.add-btn'
    };
    //retrieve data from the input fields
    return{
        getInputs:function(){
            return{
            type : document.getElementById(domInputs.type).value,
            description : document.querySelector(domInputs.description).value,
            value : document.querySelector(domInputs.value).value
            };
        },
        getDomInputs:function(){
            return domInputs;
        }
    };

})();

var controller = (function (budgetCtrl,UIctrl){

    var eventLisners = function(){
        var domBtn=UIctrl.getDomInputs();
        document.querySelector(domBtn.inputBtn).addEventListener('click',ctrlAddItem);
        document.addEventListener('keypress',function(event){
        if(event.keyCode === 13 || event.which === 13){
            ctrlAddItem();
        }
    });
    };

    var ctrlAddItem = function (){
        var input = UIctrl.getInputs();
        console.log(input);

    };

    return {
        init :function(){
            eventLisners();
        }
    };

})(budgetController,UIcontrller);

controller.init();