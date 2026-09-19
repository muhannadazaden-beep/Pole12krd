# pole12krd v5
A polished Kurdish-first frontend shell built on the v4 project.

Included:
- Professional home page/navigation
- Compact settings panel
- Light/dark mode
- Language selector: Sorani, Badini, Arabic, English
- Login/register modal prepared for Supabase Auth
- Profile/edit-profile/security/logout entries prepared
- Telegram and Facebook footer links
- Existing Render/OpenAI backend preserved
- CORS added for future GitHub Pages → Render API connection

Important: Supabase URL/key are intentionally blank. Add only the public/publishable (anon) key in `public/app.js`; never add a service-role key.


## v6 account flow
- Registration asks for full name, email, password and password confirmation.
- Client-side password checks are included, but real security/authentication is handled by Supabase Auth after configuration.
- Email confirmation is expected before normal login when enabled in Supabase.
- Main site content remains behind the registration modal only as an account entry point; the home page itself is still visible.
- Owner/admin dashboard and role-based permissions are intentionally the next backend step; do not rely on browser-only admin flags.
