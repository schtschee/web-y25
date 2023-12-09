paths=document.location.pathname.split('/')
page = paths[paths.length-1];
if (page === "index.html"){
    curNav=document.getElementById('to_two_days');
}
else if(page === "today.html"){
    curNav=document.getElementById('to_day');
}
else if(page === "week.html"){
    curNav=document.getElementById('to_week');
}
curNav.classList.add("current-mode")