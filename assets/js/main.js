$(document).ready(function(){
    let projs = JSON.parse(projects)
    // Click Events
    $(document).on("click",".card-title, .card-text",function (e) { 
        e.preventDefault();
        let clicked_title = "";
        let desc = "";
        if ($(e.currentTarget).attr('class').split(" ")[0] == "card-title"){
          let id = Number($(e.currentTarget).attr('id'));
          clicked_title = $(this).text();
          desc = $(this).next().next().text();
          window.open(projs[id].deploy,"_blank");
          return;
        }else{
          clicked_title = $(this).prev().prev().text();
          desc = $(this).text();
        } 
      $(".project-images").html("");
      $(".project-description").html(desc);
      $(".modal-title").html(clicked_title)
      $("#project-view").modal("show");

    });

    $(document).on("click",".images-modal",function (e) { 
      e.preventDefault();
      let clicked_element = $(this).prev().prev().prev().prev().prev();
      let clicked_title = clicked_element.text();
      let clicked_id = Number(clicked_element.attr("id"));
      let images = ``
      $(".modal-title").html(clicked_title);
      $(".project-description").html("");
      let [folder_name , total_images] = projs[clicked_id].images
      if( projs[clicked_id].images.length !== 0){
            images += `<p class="text-white text-center my-n2">Project Screenshots</p>`
            for (let i = 1; i < total_images; i++) {
              images += `<img src="assets/images/${folder_name}/${i}.png" alt="${clicked_title}-img" onclick="this.requestFullscreen()" style="cursor:pointer;" srcset="">`
            }
      }else{
        images = `<p class="text-white">This project Screenshots will be added soon... 🏗️</p>`
      }
      $(".project-images").html(images);
      $("#project-view").modal("show");
    });

    $("#project-search-bar").on("input",function (e) { 
      let inputval = $(this).val();
      $("#project-cards").html("");
      const res = projs.filter(items => items.title.toLowerCase().includes(inputval.toLowerCase()));
      if (res.length >0){
        LoadProjects(res);
      }
    });




    function LoadProjects(projs) { 
        let all_projs_html = ``
        $(".project-loader").removeClass("d-none");
        for (let i = 0; i < projs.length; i++) {
            const element = projs[i];
            let live = "Offline"
            let dot_color = "bg-secondary"
            let live_link= "live-disabled"
            if (element.live === true){
                live= "Live"
                dot_color = ""
                live_link = ""
            }
            all_projs_html += `<div class="card m-2 project-card" style="width: 25rem;">
                    <div class="card-body">
                      <h5 class="card-title text-white" id="${i}"> <span class="card-title-border"></span> ${element.title}</h5>
                      <div class="online-status text-start my-2">
                        <span class="status-dot ${dot_color}"></span>
                        <span class="text-white">${live}</span>
                      </div> 
                      <p class="card-text text-white" id="desc-${i}">${element.desc}</p>
                      <div class="skill-chips d-flex flex-wrap mb-2">
                      `
            element.tags.forEach(tag => {
            all_projs_html += `<span class="badge badge-pill badge-primary bg-success m-1">${tag}</span>`
            });
            all_projs_html+=`
                        </div>
                      <a class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" target="_blank" href="${element.github}">
                        Github
                      </a>
                      <a class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover mx-4 images-modal" target="_blank" >
                        Images
                      </a>
                      <a class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover ${live_link}" target="_blank"  href="${element.deploy}" >
                        Live Demo
                      </a>
                </div>
                </div>`
            
        }
        $("#project-cards").html(all_projs_html);
        
        $(".project-loader").addClass("d-none");
     }
     LoadProjects(projs);

})

