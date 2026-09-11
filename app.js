const $=s=>document.querySelector(s);
function toast(t){const x=$("#toast");x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),2600)}
$("#openAi").onclick=()=>document.querySelector("#study").scrollIntoView({behavior:"smooth"});
$("#menuBtn").onclick=()=>toast("مێنیووی سایت لە وەشانی دواتر بە تەواوی زیاد دەکرێت.");

$("#chatForm").addEventListener("submit",e=>{
 e.preventDefault(); const input=$("#question"), q=input.value.trim(); if(!q)return;
 const chat=$("#chat"); chat.innerHTML+=`<div class="bubble user">${escapeHtml(q)}</div>`;
 input.value="";
 setTimeout(()=>{
   chat.innerHTML+=`<div class="bubble bot"><b>AI مامۆستا:</b><br>ئەمە وەڵامی Demo ـە. لە وەشانی AI ـی ڕاستەقینەدا پرسیارەکەت بە زمانی خۆت وەردەگیرێت، دواتر بە هەمان زمان وەڵام، هۆکار و نموونە بۆت دەدرێت.</div>`;
   chat.scrollTop=chat.scrollHeight;
 },450);
});
function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}

$("#pdf").addEventListener("change",e=>{
 const f=e.target.files[0]; if(!f)return;
 $("#fileInfo").textContent=`📄 ${f.name} — ${Math.round(f.size/1024)} KB`;
 toast("PDF وەرگیرا؛ لە قۆناغی دواتر AI ناوەڕۆکەکە دەخوێنێتەوە.");
});

const texts={
 ku:{hero:"یاریدەدەری خوێندن بۆ پۆلی 12، زانکۆ و پەیمانگە؛ بە AI ـی مامۆستا."},
 ar:{hero:"منصة تعليمية للصف 12 والجامعة والمعاهد، مع مساعد ذكاء اصطناعي كالمعلّم."},
 en:{hero:"A smart learning platform for Grade 12, university and institute students, with an AI teacher."}
};
$("#language").addEventListener("change",e=>{
 const l=e.target.value; document.documentElement.lang=l;
 document.documentElement.dir=l==="en"?"ltr":"rtl";
 $("#heroText").textContent=texts[l].hero;
 toast(l==="ku"?"زمان: کوردی":l==="ar"?"اللغة: العربية":"Language: English");
});