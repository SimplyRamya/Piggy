function validateForType(type){
	var idString;
	if(type=="e"){
		idString = "#expensesForm";
	}else{
		idString = "#savingsForm"
	}
	var success = true;
	$(idString+" .req").each(function(){
		var fieldVal = $(this).val();
		if(fieldVal== ""){
			$(this).css("border-color","red");
			success = false;
		}else{
			$(this).css("border-color","black");
		}
	});
	if(!success){
		$(idString+" .error").css("display","inline");
		$(idString+" .success").css("display","none");
	}else{
		$(idString+" .error").css("display","none");
	}
	return success;
}