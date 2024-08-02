$(document).ready(function() {

    $("#terminal").on('click',function(){
       $("#commandInput").focus();
    });

    let ls = [
        ["about","&nbsp;&nbsp;&nbsp;&nbsp;A breif introduction"],
        ["social" ,"&nbsp;&nbsp;&nbsp;Social media links"],
        ["projects","&nbsp;List of projects"],
        ["joke","&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fetch a fun joke😝"],
        ["email","&nbsp;&nbsp;&nbsp;&nbsp;Email me!"],
        ["clear","&nbsp;&nbsp;&nbsp;&nbsp;Clear the terminal"],
        ["ls","&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;List all commands"],
        ["banner","&nbsp;&nbsp;&nbsp;Show ascii banner"]
    ]
    let social = [
        ["linkedin",`&nbsp&nbsp<a class="terminal-link" target="_blank" href="https://www.linkedin.com/in/venkata-satya5202/">linkedin/venkata-satya5202</a>`],
        ["Github",`&nbsp&nbsp&nbsp&nbsp<a class="terminal-link" target="_blank" href="https://github.com/VenkataSatyakoppula">github/VenkataSatyakoppula</a>`],
        ["Leetcode",`&nbsp&nbsp<a class="terminal-link" target="_blank" href="https://leetcode.com/u/VenkataSatyakoppula/">leetcode/VenkataSatyakoppula</a>`]
    ]
    let banner = [
        `<pre class="Greeting d-none d-lg-block">
  _   _______  ____ _____ _________     _______ _______  _____ 
 | | / / __/ |/ / //_/ _ /_  __/ _ |   / __/ _ /_  __| \\/ / _ |
 | |/ / _//    / ,< / __ |/ / / __ |  _\\ \\/ __ |/ /   \\  / __ |
 |___/___/_/|_/_/|_/_/ |_/_/ /_/ |_| /___/_/ |_/_/    /_/_/ |_| 
       </pre>
        <pre class="Greeting .d-none .d-sm-block d-lg-none"> 
        _   _______  ____ _____ _________  
       | | / / __/ |/ / //_/ _ /_  __/ _ | 
       | |/ / _//    / ,< / __ |/ / / __ | 
       |___/___/_/|_/_/|_/_/ |_/_/ /_/ |_|   
           _______ _______  _____ 
          / __/ _ /_  __| \\/ / _ |
         _\\ \\/ __ |/ /   \\  / __ |
        /___/_/ |_/_/    /_/_/ |_|
       
        </pre>`
    ]
    let about = [
        `<p class="mx-2 terminal-line">Hello,👋 I'm Venkata Satya Koppula<br> 
        I love programming and building software.After graduating with a Bachelor's degree in computer science I started pursuing a Masters's Degree in CS at SUNY at Buffalo. Technologies I am proficient in 
        <span class="text-primary"> Django Rest Framework</span>,<span class="text-primary">Python</span>,REST APIs,<span class="text-primary">Docker</span> ,<span class="text-primary">Kubernates</span>...etc . I do
        a bit of Front-end using <span class="text-primary">Bootstrap</span> and <span class="text-primary">AngularJS</span>.
        I made this website to boost my online presence and showcase my technical skills.</p>  
        `
    ]
    let projs = JSON.parse(projects);
 async function renderCmd(command,data){
        let final_html = ""
        switch (command.toLowerCase()) {
            case 'ls':
                for (let i = 0; i < data.length; i++) {
                    const element = data[i];
                    final_html += `<p class="mx-2 terminal-line"><span class="cmd text-primary"> ${element[0]} </span>${element[1]} </p>`
                }
                break;
            case 'social':
                for (let i = 0; i < data.length; i++) {
                    const element = data[i];
                    final_html += `<p class="mx-2 terminal-line"><span class="cmd text-primary"> ${element[0]} </span>${element[1]} </p>`
                    
                }
                break;
            case 'joke':
                try {
                    const res = await $.ajax({
                        url: data,
                        method: 'GET'
                    });
                    final_html += `<p class="mx-2 terminal-line text-primary">${res.setup}</p>`
                    final_html += `<p class="mx-2 terminal-line">${res.delivery}</p>`
                } catch (error) {
                    console.error('There has been a problem with your GET request', error);
                }
                
                break;
            case 'projects':
                for (let i = 0; i < data.length; i++) {
                    const element = data[i];
                    final_html += `<p class="d-flex justify-content-between mx-2 terminal-line"><span class="cmd text-primary"> ${element.title}</span>  <a class="terminal-link me-5" target="_blank" href="${element.deploy}">Demo</a></p>` 
                }
                break;
            default:
                response = 'Command not found: ' + command;
            
        }
        return final_html
    }
 
    $("#commandInput").on("input",function (e) { 
        let inputval = $(this).val();
        $("#get-command").text(inputval);
    });
    $('#commandInput').on('keypress', function(e) {
        if (e.which === 13) { // Enter key
            e.preventDefault(); // Prevent new line in textarea
            const command = $("#get-command").text();
            $('#terminal-data').append('<div class="text-white mt-2"><span class="prompt-color mx-1" >venkata@local:~$</span>' + command + '</div>');
            $(this).val(''); // Clear input
            $("#get-command").text("");
            // Process the command
            processCommand(command);
        }
    });
 
  async  function processCommand(command) {
        let response;
        switch (command.toLowerCase()) {
            case 'ls':
                response = await renderCmd(command,ls);
                break;
            case 'about':
                response = about[0];
                break;
            case 'social':
                response = await renderCmd(command,social);
                break;
            case 'email':
                response = `<a class="mx-2 terminal-link" href="mailto:satyavenkata5202@gmail.com?subject=Hello">Click to send an Email!</a>`
                window.location.href = "mailto:satyavenkata5202@gmail.com?subject=Hello"
                break;
            case 'joke':
                $('#terminal-data').append('<div class="text-white joke-load"></div>');
                response = await renderCmd(command,'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart');
                $('.joke-load').remove();
                break;
            case 'banner':
                response = banner[0];
                break;
            case 'projects':
                response = await renderCmd(command,projs);
                break;
            case 'clear':
                $('#terminal-data').html(''); // Clear terminal
                return; // Exit the function
            default:
                response = 'Command not found: ' + command;
        }
        $('#terminal-data').append('<div class="text-white">' + response + '</div>');
        console.log($('#terminal-data')[0].scrollHeight)
        $('#terminal-data').scrollTop($('#terminal-data')[0].scrollHeight); // Scroll to bottom
    }
 });