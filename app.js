const chat = document.getElementById("chat");
const input = document.getElementById("question");
const send = document.getElementById("send");

function addMessage(text, type){
  const el=document.createElement("div");
  el.className="bubble "+type;
  el.innerHTML=text.replace(/\n/g,"<br>");
  chat.appendChild(el);
  chat.scrollTop=chat.scrollHeight;
}
function ask(){
  const q=input.value.trim();
  if(!q)return;
  addMessage(q,"user");
  input.value="";
  setTimeout(()=>{
    addMessage("پرسیارەکەت وەرگیرا. لە وەشانی تەواوی pole12krd، ئەم بەشە بە AI ـی پشتبەستوو بە سەرچاوە پەسەندکراوەکان وەڵام دەدرێتەوە. بۆ نموونە دەتوانیت پرسیار لە بیرکاری، فیزیا، کیمیا، زیندەزانی یان بابەتەکانی پۆلی 12 بکەیت. 🤖","bot");
  },500);
}
send.addEventListener("click",ask);
input.addEventListener("keydown",e=>{if(e.key==="Enter")ask()});

document.querySelectorAll(".tool").forEach(btn=>{
  btn.addEventListener("click",()=>{
    alert("ئەم ئامرازە لە قۆناغی دووەمی پڕۆژەدا بە سیستەمی ڕاستەقینەی PDF/AI زیاد دەکرێت.");
  });
});

document.getElementById("langBtn").addEventListener("click",()=>{
  alert("لە وەشانی داهاتوودا: کوردی سۆرانی، کوردی بادینی، العربية و English.");
});

document.getElementById("menuBtn").addEventListener("click",()=>{
  const nav=document.querySelector(".topbar nav");
  const open=nav.style.display==="flex";
  nav.style.display=open?"none":"flex";
  if(!open){
    nav.style.position="absolute";nav.style.top="70px";nav.style.right="0";nav.style.left="0";
    nav.style.padding="20px 5%";nav.style.background="#0b1220";nav.style.flexDirection="column";
  }
});
