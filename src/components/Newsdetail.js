// Fixed file content for src/components/Newsdetail.js
// Security fix applied: javascript.browser.security.insecure-document-method.insecure-document-method
// Issue: User controlled data in methods like `innerHTML`, `outerHTML` or `document.write` is an anti-pattern that can lead to XSS vulnerabilities
// Fix: Automatic fix applied

    import DOMPurify from 'dompurify'; // Add this import at the top of your file

    function parseHTML(html) {
      var t = document.createElement("template");
      // Sanitize the HTML to prevent XSS
      t.innerHTML = DOMPurify.sanitize(html);
      return t.content;
    }

// Original file content would be replaced with the above fix
// This demonstrates the fix that would be applied