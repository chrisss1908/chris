const courses = [
  {name:"Web Development",code:"IT 301",teacher:"Prof. Angela Reyes",units:3,grade:92,progress:100,mark:"⌘"},
  {name:"Database Management",code:"IT 302",teacher:"Prof. Marco Santos",units:3,grade:88,progress:90,mark:"▤"},
  {name:"Systems Analysis & Design",code:"IT 303",teacher:"Prof. Nina Cruz",units:3,grade:85,progress:82,mark:"⌕"},
  {name:"Networking Fundamentals",code:"IT 304",teacher:"Prof. Daniel Lim",units:3,grade:83,progress:78,mark:"⌁"},
  {name:"Human-Computer Interaction",code:"IT 305",teacher:"Prof. Bea Flores",units:3,grade:91,progress:95,mark:"◇"},
  {name:"Ethics in IT",code:"GE 204",teacher:"Prof. Luis Garcia",units:3,grade:79,progress:72,mark:"✳"}
];
const classes = [
 {day:"MON",time:"08:00",end:"09:30",name:"Web Development",room:"Room 302",kind:"",teacher:"Prof. Reyes"},
 {day:"MON",time:"10:00",end:"11:30",name:"Database Management",room:"Lab 2",kind:"green",teacher:"Prof. Santos"},
 {day:"TUE",time:"09:00",end:"10:30",name:"Systems Analysis",room:"Room 204",kind:"orange",teacher:"Prof. Cruz"},
 {day:"TUE",time:"13:00",end:"14:30",name:"Networking Fundamentals",room:"Lab 1",kind:"green",teacher:"Prof. Lim"},
 {day:"WED",time:"08:00",end:"09:30",name:"Web Development",room:"Room 302",kind:"",teacher:"Prof. Reyes"},
 {day:"WED",time:"10:00",end:"11:30",name:"Human-Computer Interaction",room:"Room 215",kind:"orange",teacher:"Prof. Flores"},
 {day:"WED",time:"13:00",end:"14:30",name:"Ethics in IT",room:"Room 108",kind:"",teacher:"Prof. Garcia"},
 {day:"THU",time:"09:00",end:"10:30",name:"Database Management",room:"Lab 2",kind:"green",teacher:"Prof. Santos"},
 {day:"THU",time:"13:00",end:"14:30",name:"Systems Analysis",room:"Room 204",kind:"",teacher:"Prof. Cruz"},
 {day:"FRI",time:"08:00",end:"09:30",name:"Networking Fundamentals",room:"Lab 1",kind:"green",teacher:"Prof. Lim"},
 {day:"FRI",time:"10:00",end:"11:30",name:"Human-Computer Interaction",room:"Room 215",kind:"orange",teacher:"Prof. Flores"}
];
const announcements = [
 {category:"academic",icon:"▤",title:"Final examination schedule is now available",date:"November 24, 2026",body:"The final examination timetable for the Fall semester has been posted. Please review your assigned dates, times, and examination rooms through the academic office notice board."},
 {category:"events",icon:"✦",title:"Innovation Week 2026 — Save the date!",date:"November 22, 2026",body:"Join us for a week of student-led exhibits, workshops, and inspiring talks. Registration opens on December 1. Watch for more details from the Student Affairs Office."},
 {category:"reminders",icon:"◷",title:"Library book return reminder",date:"November 20, 2026",body:"Please return or renew borrowed library materials before the end of the month to avoid overdue charges. You can check your borrowed items at the library desk."},
 {category:"academic",icon:"✎",title:"Course evaluation forms are open",date:"November 18, 2026",body:"Your feedback helps improve the learning experience. Complete the course evaluation form for each enrolled subject before December 5."},
 {category:"events",icon:"◎",title:"Student organization fair",date:"November 15, 2026",body:"Discover campus clubs, meet fellow students, and find a community that shares your interests at the student organization fair this Friday."}
];
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
function toast(message){const el=$("#toast");el.textContent=message;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2600)}
function go(page){$$(".page").forEach(p=>p.classList.toggle("active",p.id===`page-${page}`));$$(".nav-link").forEach(b=>b.classList.toggle("active",b.dataset.page===page));$("#breadcrumbPage").textContent=({dashboard:"Dashboard",schedule:"Class schedule",grades:"Grades",announcements:"Announcements",profile:"My profile"})[page];$("#sidebar").classList.remove("open");window.scrollTo({top:0,behavior:"smooth"})}
$$(".nav-link").forEach(b=>b.addEventListener("click",()=>go(b.dataset.page)));
$$("[data-go]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.go)));
$("#mobileMenu").addEventListener("click",()=>$("#sidebar").classList.toggle("open"));
$("#notificationButton").addEventListener("click",()=>{go("announcements");toast("You're all caught up on your latest updates.")});

function renderToday(){const todays=classes.filter(c=>c.day==="WED");$("#todayClasses").innerHTML=todays.map(c=>`<div class="class-item"><div class="class-time">${c.time}<br>${c.end}</div><div class="class-color ${c.kind}"></div><div class="class-info"><strong>${c.name}</strong><small>${c.teacher}</small></div><span class="room-tag">${c.room}</span></div>`).join("")}
function renderAnnouncements(){const latest=announcements.slice(0,3);$("#latestAnnouncements").innerHTML=latest.map(a=>`<div class="announcement-item"><div class="announcement-icon ${a.category}">${a.icon}</div><div><strong>${a.title}</strong><small>${a.date}</small></div></div>`).join("");renderFeed("all")}
function renderFeed(filter){const list=filter==="all"?announcements:announcements.filter(a=>a.category===filter);$("#announcementFeed").innerHTML=list.map((a,i)=>`<article class="feed-card"><div class="feed-icon ${a.category}">${a.icon}</div><div><span class="feed-category">${a.category}</span><h3>${a.title}${i<3?'<i class="feed-new"></i>':''}</h3><p>${a.body}</p></div><span class="feed-date">${a.date}</span></article>`).join("")}
$$(".filter-chip").forEach(b=>b.addEventListener("click",()=>{$$(".filter-chip").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");renderFeed(b.dataset.filter)}));
function renderGrades(){const filter=$("#gradeFilter").value;const rows=courses.filter(c=>filter==="all"||(filter==="high"&&c.grade>=90)||(filter==="mid"&&c.grade>=80&&c.grade<90)||(filter==="low"&&c.grade<80));$("#gradesTable").innerHTML=rows.map(c=>`<tr><td><div class="course-cell"><span class="course-mark">${c.mark}</span><span>${c.name}<small style="display:block;color:#a2a6b5;font-size:8px;font-weight:400;margin-top:3px">${c.code}</small></span></div></td><td>${c.teacher}</td><td>${c.units}</td><td><span class="grade-score">${c.grade}%</span></td><td><div class="progress-track"><div class="progress-fill" style="width:${c.progress}%"></div></div></td><td><span class="grade-status">${c.progress===100?"Completed":"In progress"}</span></td></tr>`).join("")||'<tr><td colspan="6">No courses match this filter.</td></tr>'}
$("#gradeFilter").addEventListener("change",renderGrades);
const days=["MON","TUE","WED","THU","FRI"], hours=["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00"];
function renderTimetable(){let html='<div class="time-head"></div>'+days.map((d,i)=>`<div class="day-head">${["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY"][i]}<small>${23+i} NOV</small></div>`).join("");hours.forEach(h=>{html+=`<div class="time-cell">${h}</div>`;days.forEach(d=>{const c=classes.find(x=>x.day===d&&x.time===h);html+=`<div class="day-cell">${c?`<div class="class-block ${c.kind}"><strong>${c.name}</strong>${c.time} – ${c.end}<br>${c.room}</div>`:""}</div>`})});$("#timetable").innerHTML=html}
let weekOffset=0;function updateWeek(){const start=new Date(2026,10,23+weekOffset*7);const end=new Date(2026,10,27+weekOffset*7);const fmt=d=>d.toLocaleDateString("en-US",{month:"short",day:"numeric"});$("#weekLabel").textContent=`${fmt(start)} – ${fmt(end)}`;$(".schedule-toolbar p").textContent=`Fall semester · ${fmt(start)}–${fmt(end)}, 2026`}
$("#prevWeek").addEventListener("click",()=>{weekOffset--;updateWeek();toast("Showing previous week (sample timetable).")});$("#nextWeek").addEventListener("click",()=>{weekOffset++;updateWeek();toast("Showing next week (sample timetable).")});$("#printSchedule").addEventListener("click",()=>window.print());

const dialog=$("#profileDialog");
$("#editProfile").addEventListener("click",()=>{const p=JSON.parse(localStorage.getItem("northstarProfile")||"{}");$("#editName").value=p.name||$("#detailName").textContent;$("#editEmail").value=p.email||$("#detailEmail").textContent;$("#editPhone").value=p.phone||$("#detailPhone").textContent;dialog.showModal()});
$("#profileForm").addEventListener("submit",e=>{if(e.submitter?.value==="cancel")return;e.preventDefault();const p={name:$("#editName").value.trim(),email:$("#editEmail").value.trim(),phone:$("#editPhone").value.trim()};localStorage.setItem("northstarProfile",JSON.stringify(p));applyProfile(p);dialog.close();toast("Profile updated on this device.")});
function applyProfile(p){$("#profileName").textContent=p.name;$("#detailName").textContent=p.name;$("#detailEmail").textContent=p.email;$("#detailPhone").textContent=p.phone;$$(".sidebar-user strong").forEach(el=>el.textContent=p.name)}
const saved=JSON.parse(localStorage.getItem("northstarProfile")||"null");if(saved)applyProfile(saved);
const now=new Date();$("#todayLabel").textContent=now.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"}).toUpperCase();
renderToday();renderAnnouncements();renderGrades();renderTimetable();updateWeek();
