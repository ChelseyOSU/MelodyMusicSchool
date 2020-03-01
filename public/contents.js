//果冻按键
var $button = document.querySelector('.add-button');
$button.addEventListener('click', function() {
  var duration = 0.3,
      delay = 0.08;
  TweenMax.to($button, duration, {scaleY: 1.6, ease: Expo.easeOut});
  TweenMax.to($button, duration, {scaleX: 1.2, scaleY: 1, ease: Back.easeOut, easeParams: [3], delay: delay});
  TweenMax.to($button, duration * 1.25, {scaleX: 1, scaleY: 1, ease: Back.easeOut, easeParams: [6], delay: delay * 3 });
});
//返回Home
document.getElementById('home').addEventListener('click', function(){
  window.location.href="index.html";
});


//创建新文本。
// document.getElementById("filter-update-button").addEventListener("click", update);
document.getElementById("sell-something-button").addEventListener("click", modal_toggle);
document.getElementById("modal-close").addEventListener("click", modal_toggle);
document.getElementById("modal-cancel").addEventListener("click", modal_toggle);
document.getElementById("modal-accept").addEventListener("click", modal_accept);


var posts = [];
var current_post = document.getElementById("posts").firstElementChild;
var size = document.getElementById("posts").childElementCount;
posts.push(current_post);

for (var i = 1; i < size; i++) {
    posts.push(current_post.nextElementSibling);
    current_post = current_post.nextElementSibling;
}


function modal_toggle() {
    document.getElementById("post-text-input").value = "";
    document.getElementById("post-photo-input").value = "";
    document.getElementById("post-time-input").value = "";
	 document.getElementById("post-time-input2").value = "AC";
    document.getElementById("modal-backdrop").classList.toggle('hidden');
    document.getElementById("sell-something-modal").classList.toggle('hidden');
}

function modal_accept() {


    if (!modal_check_inputs()) {
        alert("Please fill in all entries.");
        return;
    }

    var last_post = document.getElementById("posts").lastElementChild;
    var clone = last_post.cloneNode(true);
	clone.setAttribute("data-type", document.getElementById("post-time-input2").value);
    clone.setAttribute("data-price", document.getElementById("post-time-input").value);
    clone.firstElementChild.firstElementChild.firstElementChild.setAttribute("src", document.getElementById("post-photo-input").value);
    clone.firstElementChild.firstElementChild.firstElementChild.removeAttribute("alt");
    clone.firstElementChild.lastElementChild.firstElementChild.textContent = document.getElementById("post-text-input").value+"（"+document.getElementById("post-time-input2").value+"）";

    clone.firstElementChild.lastElementChild.firstElementChild.nextElementSibling.textContent =   document.getElementById("post-time-input").value;
    

    posts.push(clone);
    document.getElementById("posts").appendChild(clone);
    modal_toggle();
}


function modal_check_inputs() {
    if (document.getElementById("post-text-input").value == ""
        || document.getElementById("post-photo-input").value == ""
        || document.getElementById("post-time-input").value == ""
) {
            return false;
        }
    return true;
}


function update() {
    var text = document.getElementById("filter-text").value.toLowerCase();
    var posts_elem = document.getElementById("posts");
    var size = posts_elem.children.length;
    for (var i = 0; i < size; i++) {
        posts_elem.removeChild(posts_elem.firstElementChild);
    }
}
document.getElementById("delete-post").addEventListener("click", function deleteEle(){
  var post=document.getElementsByClassName("post");
  if(post.length>0){
    console.log('123');
    post[0].parentNode.removeChild(post[0]);
  }
  else if(post.length==0){
    alert("You don't have any posts to delete! ");
  }
});
