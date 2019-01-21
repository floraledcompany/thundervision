// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

//Jquery test
// $("h1").text("YESSSS!!!! THIS IS THUNDERVISION!")
const fs = require('fs'); // Load the File System
const settings = require('electron').remote.require('electron-settings');
const app = require('electron').remote.app;
const BrowserWindow = require('electron').remote.BrowserWindow;
// const delay = require('delay');
// settings.setPath('/Users/lf/desktop/tv project settings/user-settings.json'); //debug

//declare form validity variables
var titleValid, patValid, templateValid;

//check validity of project title, project destination, and template location
function checkTextValidity() {
  titleValid = $("#ptitle")[0].checkValidity();
  pathValid = $("#pdestination")[0].checkValidity();
  $("#temploc").attr("placeholder", "...")


  //check if templates are needed and double check template location
  if (($("#ae_checkbox_main").is(":checked")) || ($("#pr_checkbox_main").is(":checked")) || ($("#c4d_checkbox_main").is(":checked"))) {
    templateValid = $("#temploc")[0].checkValidity();
    if(titleValid && pathValid && templateValid){
      return true;
    } else if(templateValid != true) {
      $("#temploc").attr("placeholder", "SELECT TEMPLATE LOCATION")
    } else {
      return false;
    }
  } else {
    if(titleValid && pathValid){
      return true;
    } else {
      return false;
    }
  }
}

// checks validity and activates/deactivates button
function checkFormValidity(){

  if (checkTextValidity()) {
    $("input[type='submit']").attr("disabled", false);
    $("input[type='submit']").val("Create Project");
    $("input[type='submit']").css({"background-color": "#EE5000", "color":"white"});


  } else {
    $("input[type='submit']").attr("disabled", true);
    $("input[type='submit']").val("Create Project");
    $("input[type='submit']").css({"background-color": "gray", "color":"white"});


  }
}

// activate checkboxes
function activateAEOptions() {
  $("#ae_south_board").attr("disabled", false);               //turn on checkmarks
  $("#ae_ribbons").attr("disabled", false);
  $("#ae_hd_video").attr("disabled", false);
  $("#ae_0").css("color","gray");                             //style to indicate they are on
  $("#ae_1").css("color","gray");
  $("#ae_2").css("color","gray");
  $("#ae_checkBoxLabelMain").css("color","#FF5200");          //highlight main label
}
function disactiveAEOptions() {
  $("#ae_south_board").attr("disabled", true);                //turn off checkmarks
  $("#ae_ribbons").attr("disabled", true);
  $("#ae_hd_video").attr("disabled", true);
  $("#ae_south_board").prop("checked",false);                 //uncheck checkmarks
  $("#ae_ribbons").prop("checked",false);
  $("#ae_hd_video").prop("checked",false);
  $("#ae_0").css("color","#333");                             //style to indicate they are off
  $("#ae_1").css("color","#333");
  $("#ae_2").css("color","#333");
  $("#ae_checkBoxLabelMain").css("color","gray");             //unhighlight main label
}

function activatePROptions() {
  $("#pr_south_board").attr("disabled", false);
  $("#pr_hd_video").attr("disabled", false);
  $("#pr_0").css("color","gray");
  $("#pr_1").css("color","gray");
  $("#pr_checkBoxLabelMain").css("color","#FF5200");
}
function disactivatePROptions() {
  $("#pr_south_board").attr("disabled", true);
  $("#pr_hd_video").attr("disabled", true);
  $("#pr_south_board").prop("checked",false);                 //uncheck checkmarks
  $("#pr_hd_video").prop("checked",false);
  $("#pr_0").css("color","#333");
  $("#pr_1").css("color","#333");
  $("#pr_checkBoxLabelMain").css("color","gray");
}

$( document ).ready(function() {
  //load previous settings
  $("#pdestination").val(settings.get('paths.project_directory'));
  $("#temploc").val(settings.get('paths.template_directory'));
  if (settings.get('ae.state')) {
    $('#ae_checkbox_main').prop('checked',true);
    activateAEOptions();
    if (settings.get('ae.south_board')) {
      $('#ae_south_board').prop('checked', true);
      $("#ae_0").css("color","#FF5200");
    }
    if (settings.get('ae.ribbons')) {
      $('#ae_ribbons').prop('checked', true);
      $("#ae_1").css("color","#FF5200");
    }
    if (settings.get('ae.hd_video')) {
      $('#ae_hd_video').prop('checked', true);
      $("#ae_2").css("color","#FF5200");
    }
  }
  if (settings.get('pr.state')) {
    $('#pr_checkbox_main').prop('checked',true);
    activatePROptions();
    if (settings.get('pr.south_board')) {
      $('#pr_south_board').prop('checked', true);
      $("#pr_0").css("color","#FF5200");
    }
    if (settings.get('pr.hd_video')) {
      $('#pr_hd_video').prop('checked', true);
      $("#pr_1").css("color","#FF5200");
    }
  }
  if (settings.get('c4d.state')) {
    $('#c4d_checkbox_main').prop('checked',true);
    $("#c4d_checkBoxLabelMain").css("color","#FF5200");
  }
  //check validity
  checkFormValidity();

  //DIRECTORY SELECTION//////////////////////////////////////
  $("#projectDirectoryInput").on("change", function() {
    var projectDirectoryPath = document.getElementById("projectDirectoryInput").files[0].path;
    $("#pdestination").val(projectDirectoryPath);
    // console.log(projectDirectoryPath);                              //DEBUG
    // $("#projectDirectoryLabel").css("color","yellow");           //DEBUG
    checkFormValidity();
  });
  $('#projectDirectoryLabel').keypress(function (e) {
   var key = e.which;
   if(key == 13) {  // the enter key code

    // $("form").css("background-color","white");                   //DEBUG
    $("projectDirectoryInput").trigger("change");
    checkFormValidity();
  }
});

  // var templateDirectoryPath;
  $("#templateDirectoryInput").change(function() {
    var templateDirectoryPath = document.getElementById("templateDirectoryInput").files[0].path;
    $("#temploc").val(templateDirectoryPath);
    // console.log(templateDirectoryPath);                             //DEBUG
    checkFormValidity();
  });
  $('#templateDirectoryInput').keypress(function (e) {
    var key = e.which;
    if(key == 13) {  // the enter key code

    // $("form").css("background-color","white");                   //DEBUG
    $("templateDirectoryInput").trigger("change");
    checkFormValidity();
  }
});
  //CHECKBOXES////////////////////////////////////////////////
  //handle AE Main Checkbox
  $("#ae_checkbox_main").change(function(){
    if($(this).is(":checked")) {
      activateAEOptions();
    } else {
      disactiveAEOptions();
    }
    checkFormValidity();
  });

  //handle Pr Main Checkbox
  $("#pr_checkbox_main").change(function(){
    if($(this).is(":checked")){
      activatePROptions();
    } else {
      disactivatePROptions();
    }
    checkFormValidity();
  });

  //handle c4d Main Checkbox
  $("#c4d_checkbox_main").change(function(){
    if($(this).is(":checked")){
      $("#c4d_checkBoxLabelMain").css("color","#FF5200");
    } else {
      $("#c4d_checkBoxLabelMain").css("color","gray");
    }
    checkFormValidity();
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
  $("#ae_hd_video").change(function(){
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
  $("#pr_hd_video").change(function(){
    if ($(this).is(":checked")){
      $("#pr_1").css("color","#FF5200");
    } else {
      $("#pr_1").css("color","gray");
    }
  });

  //VALIDATION AND SUBMIT ACTIVATION/////////////////////////
  $("input[type='text']").on("change paste keyup", function() {
    // titleValid = $("#ptitle")[0].checkValidity();
    // pathValid = $("#pdestination")[0].checkValidity();
    // templateValid = $("#temploc")[0].checkValidity();
    //
    // if(titleValid+pathValid+templateValid == 3){
    //   $("input[type='submit']").attr("disabled", false);
    // } else {
    //   $("input[type='submit']").attr("disabled", true);
    // }
    if ($("#ptitle").val().length > 1) {
      $("#pdestination").attr("placeholder","CHOOSE PROJECT DESTINATION")
    } else {
      $("#pdestination").attr("placeholder","...")

    }
    checkFormValidity();
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
       south_board: $("#ae_south_board").is(":checked"),
       ribbons: $("#ae_ribbons").is(":checked"),
       hd_video: $("#ae_hd_video").is(":checked")
     },
     prOptions: {
       state: $("#pr_checkbox_main").is(":checked"),
       south_board: $("#pr_south_board").is(":checked"),
       hd_video: $("#pr_hd_video").is(":checked")
     },
     c4dOptions: {
       state: $("#c4d_checkbox_main").is(":checked")
     }
    }

    //set directories
    var projectDirectory = project.directory + '/' + project.title + '/';
    var templateDirectory = project.templates + '/';
    //declare project type variables
    var projectType = [];
    var projectSubType = [];
    //declare folders
    var project_files, gfx_assets, video_assets, audio_assets, docs, exports_folder,
    ae, pr, c4d, tex, _working_renders, _previous1, _previous2, _previous3, _previous4;
    //declare templates
    var aeTemp, prTemp, c4dTemp;
    //asign folder paths
    function assignFolderPaths() {
     project_files = projectDirectory + "01 project files/";
     gfx_assets = projectDirectory + "02 gfx assets/";
     video_assets = projectDirectory + "03 video assets/";
     audio_assets = projectDirectory + "04 audio assets/";
     docs = projectDirectory + "05 docs/";
     exports_folder = projectDirectory + "06 exports/";
     ae = project_files + "ae/";
     _previous1 = ae + "_PREVIOUS/";
     pr = project_files + "pr/";
     _previous2 = pr + "_PREVIOUS/";
     c4d = project_files + "c4d/";
     tex = c4d + "tex/";
     _previous3 = c4d + "_PREVIOUS/";
     _working_renders = gfx_assets + "_working renders/";
     _previous4 = exports_folder + "_PREVIOUS/";

   }
    //create project directory
    function createProjectDirectory() {
    // var projectDirectory = project.directory + '/' + project.title + '/';
      fs.mkdirSync(projectDirectory, (err) => {
        if (err) throw err;
      });
    }
    //create level 1 sub folders
    function createSubFolders() {
      //lvl one folders
      fs.mkdirSync(project_files, (err) => {
        if (err) throw err;
      });
      fs.mkdirSync(gfx_assets, (err) => {
        if (err) throw err;
      });
      fs.mkdirSync(video_assets, (err) => {
        if (err) throw err;
      });
      fs.mkdirSync(audio_assets, (err) => {
        if (err) throw err;
      });
      fs.mkdirSync(docs, (err) => {
        if (err) throw err;
      });
      fs.mkdirSync(exports_folder, (err) => {
        if (err) throw err;
      });
      fs.mkdirSync(_previous4, (err) => {
        if (err) throw err;
      })

      //lvl 2 folders
      if (project.aeOptions.state) {
        fs.mkdirSync(ae, (err) => {
          if (err) throw err;
        });
        fs.mkdirSync(_previous1, (err) => {
          if (err) throw err;
        });
      }
      if (project.prOptions.state) {
        fs.mkdirSync(pr, (err) => {
          if (err) throw err;
        });
        fs.mkdirSync(_previous2, (err) => {
          if (err) throw err;
        });
      }
      if (project.c4dOptions.state) {
        fs.mkdirSync(c4d, (err) => {
          if (err) throw err;
        });
        fs.mkdirSync(_previous3, (err) => {
          if (err) throw err;
        });
        fs.mkdirSync(tex, (err) => {
          if (err) throw err;
        });
      }
      if (project.aeOptions.state || project.c4dOptions.state) {
    fs.mkdirSync(_working_renders, (err) => {
      if (err) throw err;
    });
  }
    }
    //copy templates into new project directory and rename the files
    function createProjectFiles() {
      var aeProjectTitle, prProjectTitle, c4dProjectTitle;
      //check ae
      if (project.aeOptions.state) {
        aeProjectTitle = ae + project.title + " 01.aep";
        projectType.push('After Effects');
        if (!project.aeOptions.south_board && !project.aeOptions.ribbons && !project.aeOptions.hd_video) {
          aeTemp = templateDirectory + "ae_temp_00.aep";
          fs.copyFileSync(aeTemp, aeProjectTitle);
        } else if (project.aeOptions.south_board && !project.aeOptions.ribbons && !project.aeOptions.hd_video) {
          aeTemp = templateDirectory + "ae_temp_1.aep";
          projectSubType.push('South Board');
          fs.copyFileSync(aeTemp, aeProjectTitle);
        } else if (!project.aeOptions.south_board && project.aeOptions.ribbons && !project.aeOptions.hd_video) {
          aeTemp = templateDirectory + "ae_temp_2.aep";
          fs.copyFileSync(aeTemp, aeProjectTitle);
          projectSubType.push('Ribbons');
        }
        else if (!project.aeOptions.south_board && !project.aeOptions.ribbons && project.aeOptions.hd_video) {
          aeTemp = templateDirectory + "ae_temp_3.aep";
          fs.copyFileSync(aeTemp, aeProjectTitle);
          projectSubType.push('1920x1080');

        }
        else if (project.aeOptions.south_board && project.aeOptions.ribbons && !project.aeOptions.hd_video) {
          aeTemp = templateDirectory + "ae_temp_4.aep";
          fs.copyFileSync(aeTemp, aeProjectTitle);
          projectSubType.push('South Board');
          projectSubType.push(' Ribbons');
        }
        else if (project.aeOptions.south_board && !project.aeOptions.ribbons && project.aeOptions.hd_video) {
          aeTemp = templateDirectory + "ae_temp_5.aep";
          fs.copyFileSync(aeTemp, aeProjectTitle);
          projectSubType.push('South Board');
          projectSubType.push(' 1920x1080');
        }
        else if (!project.aeOptions.south_board && project.aeOptions.ribbons && project.aeOptions.hd_video) {
          aeTemp = templateDirectory + "ae_temp_6.aep";
          fs.copyFileSync(aeTemp, aeProjectTitle);
          projectSubType.push('Ribbons');
          projectSubType.push(' 1920x1080');
        }
        else if (project.aeOptions.south_board && project.aeOptions.ribbons && project.aeOptions.hd_video) {
          aeTemp = templateDirectory + "ae_temp_7.aep";
          fs.copyFileSync(aeTemp, aeProjectTitle);
          projectSubType.push('South Board');
          projectSubType.push(' Ribbons');
          projectSubType.push(' 1920x1080');
        }
      }
      //check pr
      if (project.prOptions.state) {
        prProjectTitle = pr + project.title + " 01.prproj";
        projectType.push(' Premiere Pro');
        if (!project.prOptions.south_board && !project.prOptions.hd_video) {
          prTemp = templateDirectory + "pr_temp_00.prproj";
          fs.copyFileSync(prTemp, prProjectTitle);
        }
        if (project.prOptions.south_board && !project.prOptions.hd_video) {
          prTemp = templateDirectory + "pr_temp_1.prproj";
          fs.copyFileSync(prTemp, prProjectTitle);
          if (projectSubType.indexOf('South Board') < 0) {
            projectSubType.push('South Board');
          }
        }
        if (!project.prOptions.south_board && project.prOptions.hd_video) {
          prTemp = templateDirectory + "pr_temp_2.prproj";
          fs.copyFileSync(prTemp, prProjectTitle);
          if (projectSubType.indexOf(' 1920x1080') < 0) {
          projectSubType.push(' 1920x1080');
          }
        }
        if (project.prOptions.south_board && project.prOptions.hd_video) {
          prTemp = templateDirectory + "pr_temp_3.prproj";
          fs.copyFileSync(prTemp, prProjectTitle);
          if (projectSubType.indexOf('South Board') < 0) {
            projectSubType.push('South Board');
          }
          if (projectSubType.indexOf(' 1920x1080') < 0) {
          projectSubType.push(' 1920x1080');
          }
        }
      }
      //check c4d
      if (project.c4dOptions.state) {
        c4dProjectTitle = c4d + project.title + " 01.c4d";
        projectType.push(' Cinema4D');
        c4dTemp = templateDirectory + "c4d_temp_00.c4d";
        fs.copyFileSync(c4dTemp, c4dProjectTitle);
      }
    }
    //create project info file
    function createProjectInfo() {
      var projectInfoDoc = docs + "project-info.txt"
      var date = new Date();

      fs.writeFile(projectInfoDoc, '\nTHUNDERVISION VIDEO PROJECT\n\n' + 'Project Title:\t\t'
      + project.title + '\nCreated:\t\t' + date + '\nProject Type(s):\t' + projectType
      + '\nFormat(s):\t\t' + projectSubType + '\n\nNOTES [please log DATE and AUTHOR for each update]:',
      function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    }

    //execute project directory creation
    assignFolderPaths();
    createProjectDirectory();
    createSubFolders();
    //execute file placement
    createProjectFiles();
    createProjectInfo();
    //save info for next time
    settings.set('paths', {
      project_directory: project.directory,
      template_directory: project.templates
    });
    settings.set('ae', {
      state: project.aeOptions.state,
      south_board: project.aeOptions.south_board,
      ribbons: project.aeOptions.ribbons,
      hd_video: project.aeOptions.hd_video
    });
    settings.set('pr', {
      state: project.prOptions.state,
      south_board: project.prOptions.south_board,
      hd_video: project.prOptions.hd_video
    });
    settings.set('c4d', {
      state: project.c4dOptions.state
    });


    //DEBUG
    // console.log(settings.get('name.title'));
    // let printProject = ()=> {
    //   console.log(project.title);
    //   console.log(project.directory);
    //   console.log(project.templates);
    //   console.log(project.aeOptions);
    //   // console.log(project.aeOptions.state);
    //   // console.log(project.aeOptions.south_board);
    //   // console.log(project.aeOptions.ribbons);
    //   // console.log(project.aeOptions.hd_video);
    //   console.log(project.prOptions);
    //   // console.log(project.prOptions.south_board);
    //   // console.log(project.prOptions.hd_video);
    //   console.log(project.c4dOptions);
    // }
    // printProject();
    // await new Promise(done => setTimeout(done, 5000));

    // app.quit();
    // var window = BrowserWindow.getCurrentWindow();
    // window.close();
    $("input[type='submit']").attr("disabled", true);
    $("input[type='submit']").val("Project Created!");
    $("input[type='submit']").css({"background-color": "green", "color":"lightgray"});


  });
});
