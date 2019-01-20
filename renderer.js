// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

//Jquery test
// $("h1").text("YESSSS!!!! THIS IS THUNDERVISION!")
const fs = require('fs'); // Load the File System

$( document ).ready(function() {
  //DIRECTORY SELECTION//////////////////////////////////////
  $("#projectDirectoryInput").on("change", function() {
    var projectDirectoryPath = document.getElementById("projectDirectoryInput").files[0].path;
    $("#pdestination").val(projectDirectoryPath);
    console.log(projectDirectoryPath);                              //DEBUG
    // $("#projectDirectoryLabel").css("color","yellow");           //DEBUG
  });

  $('#projectDirectoryLabel').keypress(function (e) {
 var key = e.which;
 if(key == 13) {  // the enter key code

    $("form").css("background-color","white");                   //DEBUG
    $("projectDirectoryInput").trigger("change");
  }
});

  $("#templateDirectoryInput").change(function() {
    var templateDirectoryPath = document.getElementById("templateDirectoryInput").files[0].path;
    $("#temploc").val(templateDirectoryPath);
    console.log(templateDirectoryPath);                             //DEBUG
  });
  //CHECKBOXES////////////////////////////////////////////////
  //handle AE Main Checkbox
  $("#ae_checkbox_main").change(function(){
    if($(this).is(":checked")) {
      $("#ae_south_board").attr("disabled", false);               //turn on checkmarks
      $("#ae_ribbons").attr("disabled", false);
      $("#ae_16_9").attr("disabled", false);
      $("#ae_0").css("color","gray");                             //style to indicate they are on
      $("#ae_1").css("color","gray");
      $("#ae_2").css("color","gray");
      $("#ae_checkBoxLabelMain").css("color","#FF5200");          //highlight main label
    } else {
      $("#ae_south_board").attr("disabled", true);                //turn off checkmarks
      $("#ae_ribbons").attr("disabled", true);
      $("#ae_16_9").attr("disabled", true);
      $("#ae_south_board").prop("checked",false);                 //uncheck checkmarks
      $("#ae_ribbons").prop("checked",false);
      $("#ae_16_9").prop("checked",false);
      $("#ae_0").css("color","#333");                             //style to indicate they are off
      $("#ae_1").css("color","#333");
      $("#ae_2").css("color","#333");
      $("#ae_checkBoxLabelMain").css("color","gray");             //unhighlight main label
    }
  });

  //handle Pr Main Checkbox
  $("#pr_checkbox_main").change(function(){
    if($(this).is(":checked")){
      $("#pr_south_board").attr("disabled", false);
      $("#pr_16_9").attr("disabled", false);
      $("#pr_0").css("color","gray");
      $("#pr_1").css("color","gray");
      $("#pr_checkBoxLabelMain").css("color","#FF5200");
    } else {
      $("#pr_south_board").attr("disabled", true);
      $("#pr_16_9").attr("disabled", true);
      $("#pr_south_board").prop("checked",false);                 //uncheck checkmarks
      $("#pr_16_9").prop("checked",false);
      $("#pr_0").css("color","#333");
      $("#pr_1").css("color","#333");
      $("#pr_checkBoxLabelMain").css("color","gray");
    }
  });

  //handle c4d Main Checkbox
  $("#c4d_checkbox_main").change(function(){
    if($(this).is(":checked")){
      $("#c4d_checkBoxLabelMain").css("color","#FF5200");
    } else {
      $("#c4d_checkBoxLabelMain").css("color","gray");
    }
  });

  //handle ae sub checkboxes
  $("#ae_south_board").change(function(){
    if ($(this).is(":checked")){
      $("#ae_0").css("color","#FF5200");
    } else {
      $("#ae_0").css("color","gray");
    }
  });
  $("#ae_ribbons").change(function(){
    if ($(this).is(":checked")){
      $("#ae_1").css("color","#FF5200");
    } else {
      $("#ae_1").css("color","gray");
    }
  });
  $("#ae_16_9").change(function(){
    if ($(this).is(":checked")){
      $("#ae_2").css("color","#FF5200");
    } else {
      $("#ae_2").css("color","gray");
    }
  });
  //handle pr sub checkboxes
  $("#pr_south_board").change(function(){
    if ($(this).is(":checked")){
      $("#pr_0").css("color","#FF5200");
    } else {
      $("#pr_0").css("color","gray");
    }
  });
  $("#pr_16_9").change(function(){
    if ($(this).is(":checked")){
      $("#pr_1").css("color","#FF5200");
    } else {
      $("#pr_1").css("color","gray");
    }
  });

  //VALIDATION AND SUBMIT ACTIVATION/////////////////////////
  $("input[type='text']").on("change paste keyup", function() {
    var titleValid = $("#ptitle")[0].checkValidity();
    var pathValid = $("#pdestination")[0].checkValidity();
    var templateValid = $("#temploc")[0].checkValidity();

    if(titleValid+pathValid+templateValid == 3){
      $("input[type='submit']").attr("disabled", false);
    } else {
      $("input[type='submit']").attr("disabled", true);
    }
 });

 //SUBMIT THE FORM
 $("input[type='submit']").click(function(e){
   e.preventDefault(); //stop form from actually submitting and disapearing
   //COLLECT FORM DATA INTO PROJECT OBJECT
   var project = {
     title: $("#ptitle").val(),
     directory: $("#pdestination").val(),
     templates: $("#temploc").val(),
     aeOptions: {
       state: $("#ae_checkbox_main").is(":checked"),
       south_board: $("#ae_0").is(":checked"),
       ribbons: $("#ae_1").is(":checked"),
       hd_video: $("#ae_2").is(":checked")
     },
     prOptions: {
       state: $("#pr_checkbox_main").is(":checked"),
       south_board: $("#pr_0").is(":checked"),
       hd_video: $("#pr_1").is(":checked")
     },
     c4dOptions: {
       state: $("#c4d_checkbox_main").is(":checked")
     }
   }

  var directory_made = false;
  //create project directory
  var projectDirectory = project.directory + '/' + project.title + '/';
  fs.mkdirSync(projectDirectory, (err) => {
    if (err) throw err;
    directory_made = true;
    console.log(directory_made);
  });

  //create level 1 sub folders
  var folder1 = projectDirectory + "01 project files";

  fs.mkdirSync(folder1, (err) => {
    if (err) throw err;
  });



  //DEBUG
//  let printProject = ()=> {
//  console.log(project.title);
//  console.log(project.directory);
//  console.log(project.templates);
//  console.log(project.aeOptions);
//  // console.log(project.aeOptions.state);
//  // console.log(project.aeOptions.south_board);
//  // console.log(project.aeOptions.ribbons);
//  // console.log(project.aeOptions.hd_video);
//  console.log(project.prOptions);
//  // console.log(project.prOptions.south_board);
//  // console.log(project.prOptions.hd_video);
//  console.log(project.c4dOptions);
// }
//  printProject();
 });
});
