$(document).ready(function(){
	loadData();
	var categories = JSON.parse(localStorage.transactions)["categories"];
	for (var ii=0;ii<categories.length;ii++){
		$(".zgDropdown ul").append("<li>"+categories[ii]+"</li>")
	}

	$('#pgDateE').datepicker({changeMonth:true,changeYear:true});
	$('#pgDateS').datepicker({changeMonth:true,changeYear:true});
	
	$("#buttonAddSaving").click(function(){
		addTransactionWithType("s")
	});
	$("#buttonAddExpense").click(function(){
		addTransactionWithType("e")
	});
	
	$(".zgDropdown").hide();
	$('.categoryField').focus(function(){
		$(this).next().slideDown("fast");
	});
	$('.categoryField').blur(function(evt){
		$(this).next().slideUp("fast");		
	});
	$('.zgDropdown li').on('mousedown', function(evt){
		var listDiv = $(this).parent().parent();
		var listText = $(this).text();
		listDiv.slideUp("fast",function(){
			listDiv.prev().val(listText);
		});
	})
	
});


function addTransactionWithType(type){
	var name,amount,remarks,date;
	var formId;
	var test=validateForType(type);
	if (!test) {
		return;
	}
	if (type === "e") {
		name = $('#pigExpenseDiv #pgNameE').val();
		amount = $('#pigExpenseDiv #pgAmountE').val();
		remarks = $('#pigExpenseDiv #pgRemarksE').val();
		date = $('#pigExpenseDiv #pgDateE').val();
		formId = "#expensesForm";

	}else if(type === "s"){
		name = $('#pigSavingDiv #pgNameS').val();
		amount = $('#pigSavingDiv #pgAmountS').val();
		remarks = $('#pigSavingDiv #pgRemarksS').val();
		date = $('#pigSavingDiv #pgDateS').val();
		formId = "#savingsForm";
		
	}else{
		alert("Invalid type of transaction");
		return;
	};

	
	var test=pushObject(new Transaction(name,type,amount,null,date,null,remarks));
	if(test){
		$(formId+" .success").css("display","inline");
		$(formId+" .success .succMsg").text("Added saving.");
	
		$(formId)[0].reset();
	}
	
	
}
function pushObject (trans) {
	var transactionsDictionary = JSON.parse(localStorage.transactions);
	if(trans.type == "e"){
	 	transactionsDictionary["expenses"].push(trans);
	}else if(trans.type == "s"){
		transactionsDictionary["savings"].push(trans);
	}else{
		alert("Invalid type");
		return false;
	}
	localStorage.transactions = JSON.stringify(transactionsDictionary);
	return true;
}

function loadData () {
	var jsonString = localStorage.transactions;
	var transactionsDictionary; 
	if (!jsonString) {
		transactionsDictionary = {"savings":[],"expenses":[],"categories":["Salary","Other transfers","Interest","Random"]};
		localStorage.transactions = JSON.stringify(transactionsDictionary);
	}
}