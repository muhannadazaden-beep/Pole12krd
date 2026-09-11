const SUPABASE_URL="https://ifflhejqgxiyjzdiyqfk.supabase.co",SUPABASE_KEY="sb_publishable_Eh8H_GpzmxGJLqvfGNQiuw_GFAYieiU";
const configured=!SUPABASE_URL.includes("PASTE_")&&!SUPABASE_KEY.includes("PASTE_");
let supabaseClient=null,isSignup=true;
if(configured&&window.supabase)supabaseClient=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);

const $=id=>document.getElementById(id);
const settings=$("settings-panel"),modal=$("auth-modal");
$("settings-toggle").onclick=()=>settings.classList.toggle("hidden");
$("close-auth").onclick=()=>modal.classList.add("hidden");
$("account-btn").onclick=()=>{isSignup=false;openAuth()};
$("hero-login").onclick=()=>{isSignup=true;openAuth()};
function openAuth(){modal.classList.remove("hidden");$("auth-title").textContent=isSignup?"خۆتۆمارکردن":"چوونەژوورەوە";$("auth-submit").textContent=isSignup?"خۆتۆمارکردن":"چوونەژوورەوە";$("name-wrap").classList.toggle("hidden",!isSignup);$("confirm-wrap").classList.toggle("hidden",!isSignup);$("password-rules").classList.toggle("hidden",!isSignup);$("name").required=isSignup;$("password-confirm").required=isSignup;$("password").autocomplete=isSignup?"new-password":"current-password";$("auth-message").textContent=""}
$("toggle-auth").onclick=()=>{isSignup=!isSignup;openAuth();};
$("auth-form").onsubmit=async e=>{e.preventDefault();const msg=$("auth-message");const email=$("email").value.trim(),password=$("password").value;if(isSignup&&password!==$("password-confirm").value){msg.textContent="وشەی نهێنی و پشتڕاستکردنەوەکە یەکسان نین.";return}if(password.length<8){msg.textContent="وشەی نهێنی دەبێت لانیکەم ٨ پیت بێت.";return}if(!supabaseClient){msg.textContent="ئێستا تەنها ڕووکاری پەڕەکە ئامادەیە؛ بۆ خۆتۆمارکردنی ڕاستەقینە دەبێت Supabase ڕێکبخرێت.";return}try{if(isSignup){const name=$("name").value.trim();const {data,error}=await supabaseClient.auth.signUp({email,password,options:{data:{full_name:name},emailRedirectTo:location.origin}});if(error)throw error;msg.textContent=data.session?"خۆتۆمارکردن سەرکەوتوو بوو.":"ئیمەیڵی پشتڕاستکردنەوە بۆت نێردرا؛ پاش پشتڕاستکردنەوە Login بکە."}else{const {error}=await supabaseClient.auth.signInWithPassword({email,password});if(error)throw error;msg.textContent="بەخێربێیت 👋";modal.classList.add("hidden");updateAccount()}}catch(err){msg.textContent="هەڵە: "+(err.message||"نەتوانرا کارەکە تەواو بکرێت")}};
async function updateAccount(){if(!supabaseClient)return;const {data}=await supabaseClient.auth.getSession();$("account-btn").textContent=data.session?"👤 ئەکاونتی من":"چوونەژوورەوە"} 
document.querySelectorAll("[data-theme]").forEach(b=>b.onclick=()=>{localStorage.setItem("pole12krd-theme",b.dataset.theme);document.body.classList.toggle("dark",b.dataset.theme==="dark")});
document.body.classList.toggle("dark",localStorage.getItem("pole12krd-theme")==="dark");
$("language-select").value=localStorage.getItem("pole12krd-language")||"ckb";
$("language-select").onchange=e=>localStorage.setItem("pole12krd-language",e.target.value);
document.querySelectorAll("[data-action]").forEach(b=>b.onclick=async()=>{const a=b.dataset.action;if(a==="logout"&&supabaseClient){await supabaseClient.auth.signOut();updateAccount();settings.classList.add("hidden");}else if(a==="profile"||a==="edit"||a==="security"){alert("ئەم بەشە لە قۆناغی authentication ـی دواتردا بە تەواوی چالاک دەکرێت.")}});
updateAccount();
