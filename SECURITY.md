# Security Policy

## 🛡️ Keamanan Website

Dokumen ini menjelaskan panduan keamanan dan best practices untuk website landing page "Jasa Pembuatan Website Profesional & Cepat".

---

## 🔒 Reporting Security Issues

Jika Anda menemukan vulnerability atau masalah keamanan:

1. **JANGAN** posting di issue public
2. Hubungi melalui:
   - 📧 Email: your@email.com
   - 📱 WhatsApp: 085736055388
3. Sertakan detail issue dengan jelas
4. Berikan waktu untuk kami merespons (max 48 jam)

---

## 🔐 Security Best Practices

### 1. **HTTPS/SSL Certificate**
```
✅ WAJIB saat deploy ke production:
   - Dapatkan SSL gratis dari Let's Encrypt
   - Setup force HTTPS redirect
   - Hati-hati dengan mixed content warnings
```

Contoh redirect di `.htaccess` (Apache):
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>
```

### 2. **WhatsApp Link Security**
```html
<!-- AMAN: URL-encoded message text -->
<a href="https://wa.me/62XXXXXXXXXX?text=Halo">Chat</a>

<!-- HINDARI: Memasukkan data sensitif di URL -->
<!-- JANGAN: https://wa.me/62XXXXXXXXXX?text=password123 -->
```

### 3. **Email Security**
```html
<!-- Gunakan obfuscation untuk email di HTML -->
<!-- HINDARI: <a href="mailto:email@domain.com">Email</a> -->

<!-- LEBIH AMAN: Gunakan contact form atau email encode -->
<a href="javascript:void(0)" onclick="revealEmail()">Hubungi Email</a>
```

### 4. **No Sensitive Data di Code**
```javascript
// JANGAN PERNAH:
const API_KEY = "sk_live_abc123xyz789";
const DB_PASSWORD = "password123";
const SECRET_TOKEN = "token_rahasia";

// Gunakan environment variables atau server-side config
```

### 5. **Content Security Policy (CSP)**
Tambahkan header ini di server:
```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';
```

### 6. **X-Frame-Options (Prevent Clickjacking)**
```
X-Frame-Options: SAMEORIGIN
```

### 7. **Validasi Input**
Jika nanti ada form, selalu validasi:
```javascript
// Validasi email
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Validasi phone number
const validatePhone = (phone) => {
    const re = /^(\+62|0)[0-9]{9,12}$/;
    return re.test(phone);
};
```

### 8. **Escape Output**
Jika menampilkan user input, escape dulu:
```javascript
// Escape HTML special characters
const escapeHtml = (text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
};
```

---

## 🛠️ Backend Security (Jika Ada)

Jika website di-upgrade dengan PHP backend:

### SQL Injection Prevention
```php
// HINDARI:
$query = "SELECT * FROM users WHERE email = '" . $_GET['email'] . "'";

// GUNAKAN:
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$_GET['email']]);
```

### XSS Prevention
```php
// HINDARI:
echo $_POST['message'];

// GUNAKAN:
echo htmlspecialchars($_POST['message'], ENT_QUOTES, 'UTF-8');
```

### CSRF Protection
```php
// Generate token
$token = bin2hex(random_bytes(32));
$_SESSION['csrf_token'] = $token;

// Verify pada form submit
if ($_POST['csrf_token'] !== $_SESSION['csrf_token']) {
    die('CSRF token invalid');
}
```

### File Upload Security
```php
$allowed_extensions = ['jpg', 'jpeg', 'png', 'gif'];
$file_ext = strtolower(pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION));

if (!in_array($file_ext, $allowed_extensions)) {
    die('File type not allowed');
}

// Rename file dengan random string
$new_filename = bin2hex(random_bytes(16)) . '.' . $file_ext;
```

---

## 📋 Security Checklist

### Sebelum Launch
- [ ] Ganti semua placeholder (nomor WA, email)
- [ ] Setup HTTPS/SSL certificate
- [ ] Test di berbagai browser
- [ ] Check mobile security
- [ ] Scan dengan security tools
- [ ] Update semua dependencies
- [ ] Remove console.log dan debug code
- [ ] Minify CSS dan JavaScript (optional)
- [ ] Setup web server headers dengan benar
- [ ] Test pada network yang berbeda

### Regular Maintenance
- [ ] Monitor website untuk errors
- [ ] Check security headers
- [ ] Update dependencies regularly
- [ ] Review access logs
- [ ] Backup website secara berkala
- [ ] Monitor untuk suspicious activity
- [ ] Test website loading speed
- [ ] Check SEO rankings

---

## 🔍 Testing Tools

Gunakan tools berikut untuk testing security:

| Tool | Fungsi | Link |
|------|--------|------|
| **SSL Labs** | Test SSL/TLS | https://www.ssllabs.com/ssltest/ |
| **PageSpeed Insights** | Performance & Security | https://pagespeed.web.dev/ |
| **SecurityHeaders.com** | Security headers test | https://securityheaders.com/ |
| **OWASP ZAP** | Penetration testing | https://www.zaproxy.org/ |
| **Lighthouse** | Chrome audits | Built-in di Chrome DevTools |

---

## 🚨 Common Vulnerabilities

### 1. Clickjacking
```html
<!-- Protect dengan X-Frame-Options header -->
```

### 2. Man-in-the-Middle (MITM)
```
Solusi: Always use HTTPS
```

### 3. Phishing
```
Validasi semua links sebelum di-share
```

### 4. Malware
```
- Jangan download file dari sumber tidak terpercaya
- Scan file sebelum upload
- Monitor website dengan tools seperti Sucuri
```

---

## 📱 Mobile Security

- ✅ Jangan simpan sensitive data di localStorage
- ✅ Gunakan HTTPS only
- ✅ Disable browser caching untuk sensitive pages
- ✅ Implement rate limiting untuk API calls

---

## 🔄 Deployment Security

### Pre-deployment Checklist
```bash
# 1. Remove development dependencies
npm prune --production

# 2. Minify assets
# gulp minify atau tools lainnya

# 3. Remove source maps di production
# rm -f *.map

# 4. Check file permissions
chmod 644 *.html *.css *.js
chmod 755 /

# 5. Backup current version
cp -r . ../backup-$(date +%Y%m%d-%H%M%S)/

# 6. Deploy ke production
# git push production main
```

---

## 📞 Security Contact

Untuk pertanyaan keamanan:

- 📧 Email: your@email.com
- 📱 WhatsApp: 085736055388
- 🌐 Website: your-domain.com

---

## 📚 Referensi Security

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 for Web](https://owasp.org/www-project-top-ten/)
- [Mozilla Web Security](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Website_security)
- [NIST Cybersecurity](https://www.nist.gov/cyberframework)
- [Web Security Academy](https://portswigger.net/web-security)

---

## 📄 Version History

**v1.0 (2026-05-02)**
- Initial security policy release
- Best practices documentation
- Security checklist

---

**Last Updated:** 2026-05-02
**Next Review:** 2026-08-02
**Security Level:** ⭐⭐⭐⭐ (High)

---

*Security is a shared responsibility. Jika ada pertanyaan, jangan ragu untuk hubungi kami!*
