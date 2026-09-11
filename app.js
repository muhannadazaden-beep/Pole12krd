// Supabase configuration:
// Create a Supabase project, then put ONLY the public project URL and
// publishable/anon key here. Never put a service-role key in this file.
const SUPABASE_URL = "PASTE_YOUR_SUPABASE_URL_HERE";
const SUPABASE_KEY = "PASTE_YOUR_SUPABASE_PUBLISHABLE_KEY_HERE";

const configured =
  !SUPABASE_URL.includes("PASTE_") &&
  !SUPABASE_KEY.includes("PASTE_");

const authForm = document.getElementById("auth-form");
const authTitle = document.getElementById("auth-title");
const authSubmit = document.getElementById("auth-submit");
const toggleAuth = document.getElementById("toggle-auth");
const authMessage = document.getElementById("auth-message");
const nameInput = document.getElementById("name");
const appCard = document.getElementById("app-card");
const authCard = document.getElementById("auth-card");
const welcome = document.getElementById("welcome");
const logout = document.getElementById("logout");

let isLogin = false;
let supabase = null;

function message(text, type="") {
  authMessage.textContent = text;
  authMessage.className = `message ${type}`;
}

if (configured && window.supabase) {
  supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
} else {
  message("پێش بەکارهێنانی خۆتۆمارکردن، Supabase دەبێت ڕێکبخرێت.", "error");
}

toggleAuth.addEventListener("click", () => {
  isLogin = !isLogin;
  authTitle.textContent = isLogin ? "چوونەژوورەوە" : "خۆتۆمارکردن";
  authSubmit.textContent = isLogin ? "چوونەژوورەوە" : "خۆتۆمارکردن";
  toggleAuth.textContent = isLogin
    ? "هەژمارم نییە — خۆتۆمار دەکەم"
    : "هەژمارم هەیە — چوونەژوورەوە";
  nameInput.parentElement.style.display = isLogin ? "none" : "";
  nameInput.required = !isLogin;
  message("");
});

authForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!supabase) return message("ڕێکخستنی Supabase تەواو نییە.", "error");

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const name = nameInput.value.trim();

  authSubmit.disabled = true;
  message("تکایە چاوەڕێ بکە...");

  try {
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      message("");
      await refreshSession();
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
          emailRedirectTo: window.location.origin
        }
      });
      if (error) throw error;

      if (data.session) {
        message("خۆتۆمارکردن سەرکەوتوو بوو.", "success");
        await refreshSession();
      } else {
        message("ئیمەیڵێکت بۆ پشتڕاستکردنەوە نێردرا. پاش پشتڕاستکردنەوە دەتوانیت بچیتە ژوورەوە.", "success");
      }
    }
  } catch (err) {
    message("هەڵە: " + (err.message || "نەتوانرا کارەکە تەواو بکرێت"), "error");
  } finally {
    authSubmit.disabled = false;
  }
});

logout.addEventListener("click", async () => {
  if (!supabase) return;
  await supabase.auth.signOut();
  await refreshSession();
});

async function refreshSession() {
  if (!supabase) return;
  const { data } = await supabase.auth.getSession();
  const session = data.session;

  if (session) {
    const user = session.user;
    const displayName = user.user_metadata?.full_name || user.email || "خوێندکار";
    welcome.textContent = `بەخێربێیت ${displayName}.`;
    authCard.classList.add("hidden");
    appCard.classList.remove("hidden");
  } else {
    authCard.classList.remove("hidden");
    appCard.classList.add("hidden");
  }
}

if (supabase) {
  supabase.auth.onAuthStateChange(() => refreshSession());
  refreshSession();
}
\n// pole12krd Settings\nconst st=document.getElementById("settings-toggle"), sp=document.getElementById("settings-panel"), sm=document.getElementById("settings-message"), ls=document.getElementById("language-select");\nconst theme=localStorage.getItem("pole12krd-theme")||"light"; document.body.classList.toggle("dark",theme==="dark");\nst?.addEventListener("click",()=>sp.classList.toggle("hidden"));\ndocument.querySelectorAll("[data-theme]").forEach(b=>b.addEventListener("click",()=>{localStorage.setItem("pole12krd-theme",b.dataset.theme);document.body.classList.toggle("dark",b.dataset.theme==="dark");sm.textContent="دۆخی ڕووناکی گۆڕدرا."; }));\nls.value=localStorage.getItem("pole12krd-language")||"ckb"; ls.addEventListener("change",()=>{localStorage.setItem("pole12krd-language",ls.value);sm.textContent="زمان هەڵبژێردرا.";});\ndocument.querySelectorAll("[data-action]").forEach(b=>b.addEventListener("click",async()=>{if(b.dataset.action==="logout"&&typeof supabase!=="undefined"&&supabase){await supabase.auth.signOut();if(typeof refreshSession==="function")await refreshSession();}else if(b.dataset.action!=="logout")sm.textContent="ئەم بەشە لە هەنگاوی دواتردا بە سکیوریتیی ڕاستەقینە چالاک دەکرێت."; }));\n