const demoPapers=[
 {subject:"Organic Chemistry",course:"BSc",semester:"3rd Semester",year:"2025",url:""},
 {subject:"Physical Chemistry",course:"BSc",semester:"2nd Semester",year:"2024",url:""},
 {subject:"Inorganic Chemistry",course:"BSc",semester:"1st Semester",year:"2025",url:""}
];

let papers=JSON.parse(localStorage.getItem("buPapers")||"null")||demoPapers;

const $=id=>document.getElementById(id);

function render(){
 const q=$("search").value.toLowerCase();
 const c=$("course").value, s=$("semester").value, y=$("year").value;
 const list=papers.filter(p=>
   (!q || `${p.subject} ${p.course} ${p.semester} ${p.year}`.toLowerCase().includes(q)) &&
   (!c||p.course===c)&&(!s||p.semester===s)&&(!y||p.year===y)
 );
 $("count").textContent=`${list.length} paper${list.length!==1?"s":""}`;
 $("papers").innerHTML=list.length?list.map((p,i)=>`
   <article class="card">
    <span class="tag">${p.course}</span><span class="tag">${p.semester}</span><span class="tag">${p.year}</span>
    <h3>${escapeHtml(p.subject)}</h3>
    <p>Bhattadev University question paper</p>
    ${p.url?`<a class="view" href="${p.url}" target="_blank">View PDF</a><a class="download" href="${p.url}" download>Download</a>`:`<button class="view" onclick="alert('Add the real PDF from the upload section.')">PDF coming soon</button>`}
   </article>`).join(""):"<p>No question papers found.</p>";
}
function escapeHtml(x){return String(x).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}

["search","course","semester","year"].forEach(id=>$(id).addEventListener("input",render));

$("addBtn").onclick=()=>{
 const file=$("pdf").files[0];
 const subject=$("subject").value.trim(), course=$("paperCourse").value.trim();
 const semester=$("paperSemester").value.trim(), year=$("paperYear").value.trim();
 if(!subject||!course||!semester||!year||!file){alert("Please fill all fields and choose a PDF.");return;}
 if(file.size>2*1024*1024){alert("For this browser demo, please use a PDF under 2 MB.");return;}
 const reader=new FileReader();
 reader.onload=()=>{
   papers.unshift({subject,course,semester,year,url:reader.result});
   try{localStorage.setItem("buPapers",JSON.stringify(papers));}
   catch(e){alert("Browser storage is full. Use smaller PDFs.");return;}
   ["subject","paperCourse","paperSemester","paperYear","pdf"].forEach(id=>$(id).value="");
   render(); alert("Paper added to this browser.");
 };
 reader.readAsDataURL(file);
};
render();