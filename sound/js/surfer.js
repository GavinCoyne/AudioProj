$(document).ready(function(){
	
	$(".chosen-select").chosen({width: "95%"});
	
	$("#volumeChanger").on("change", function() {
		wavesurfer.setVolume(this.value/100);
	});

	$("#cancel").on("click", function(){
		$(".toSave").toggle();
		$('#comments').val("");
		
	});
	
	$("#save").on("click", function(){

		save();
		$('#comments').val("");
	});
		
	$('#annotate').click(function(){
    	$('#toSave').modal('show');
    });
	$('#helpMe').click(function(){
		$('#viewHelp').modal('show');
	});

	
	$('#loadData').click(function(){
		 $.ajax({
		      type: "POST",
		      url: "controller/loadData.php",
		      dataType: "json",
		      data:{
		    	  fileName:$('#drop').text()
		    	  },
		      success: function (data) {
		        $('#loadDataModal').html(data.data);
		        
		        console.log(data.marks.length);
		        for(var i = 0; i < data.marks.length; i++)
		        {
		        	 wavesurfer.mark({
		                 id: data.marks[i][2],
		                 position: data.marks[i][2],
		                 color: 'rgba(0, 255, 0, 0.9)',
		                 played: true
		             });
		        	 
		        	 wavesurfer.mark({
		                 id: data.marks[i][3],
		                 position: data.marks[i][3],
		                 color: 'rgba(255, 0, 0, 0.9)',
		                 played: true
		             });
		        }
		        
		      }
		   });
		console.log($('#drop').text());
    	$('#viewData').modal('show');
    });
	
	$('#create').submit(function(e){
		e.preventDefault();
		if($('#passwordIn').val() == $('#passwordCheck').val())
		{
		 $.ajax({
		      type: "POST",
		      url: "controller/createUser.php",
		      dataType: "json",
		      data:{
		    	  username: $('#usernameIn').val(),
		    	  password: $('#passwordIn').val(),
		    	  email: $('#email').val()
		    	  },
		      success: function (data) {
		        alert('Created user');
		      }
		   });
		}else{
			alert('Paswords Don\'t match');
		}
	});
	
	$('#login').submit(function(e){
		e.preventDefault();

		 $.ajax({
		      type: "POST",
		      url: "controller/login.php",
		      dataType: "json",
		      data:{
		    	  username:$('#username').val(),
		    	  password:$('#password').val()
		    	  },
		      success: function (data) {
		        location.reload();
		      }
		   });
		
	});
	
	$('#logout').click(function(){
		 $.ajax({
		      type: "POST",
		      url: "controller/logout.php",
		      dataType: "json",
		      success: function (data) {
		    	  location.reload()
		      }
		   });
	});
	
	
	$("#zoomChanger").on("change", function() {
			zoom = this.value/100;
			console.log("Zoom: " + zoom);
	});
	
	$("#family").chosen().change(function(){	
		var famID = $("#family option:selected").val();
		$(".species").each(function(index, element){
			if($(element).attr('data-family') == famID){
				$(element).removeClass('hide');
			} else if(!$(element).hasClass('hide')){
				$(element).addClass('hide');
			}
			
		});
		$('#speciesListSelect').chosen();
		$('#speciesListSelect').trigger("chosen:updated");
		
	});
	
	$('#saveForm').submit( function(e){
		e.preventDefault();
		
		
		 $.ajax({
		      type: "POST",
		      url: "controller/saveNote.php",
		      dataType: "json",
		      data:{
		    	  	fileName:$('#drop').text(),
		    	  	userRel:$('#userRel').val(),
		    	  	noteStart:$('#startTime').val(),
		    	  	noteEnd:$('#endTime').val(),
		    	  	userFamilyID:$('#family').chosen().val(),
		    	  	userSpeciesID:$('#speciesListSelect').chosen().val(),
		    	  	note:$('#noteIn').val()
		    	  },
		      success: function (data) {
		    	 // $("#toSave").modal('hide');
		      }
		   });
		
	});
	
	$('#userRel').change(function(){
		$('#dynamicRel').text($('#userRel').val());
	});
	
});
