// guard.js - require login for all pages except auth.html
(function() {
  try {
    // Don't run on the auth page itself
    var path = window.location.pathname.toLowerCase();
    if (path.endsWith('/auth.html') || path === '/auth.html') return;

    // Hide content until auth status is known
    document.documentElement.style.visibility = 'hidden';

    function redirectToAuth() {
      var current = encodeURIComponent(window.location.pathname + window.location.search + window.location.hash);
      window.location.href = 'auth.html?redirect=' + current;
    }

    function showPage() {
      document.documentElement.style.visibility = '';
    }

    // Wait for Firebase to be available
    function waitForFirebase(retries) {
      retries = retries || 0;
      if (window.firebase && firebase.apps && firebase.apps.length > 0) {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            showPage();
          } else {
            redirectToAuth();
          }
        });
      } else if (retries < 50) {
        setTimeout(function(){ waitForFirebase(retries + 1); }, 100);
      } else {
        // If Firebase never loads, fail closed
        redirectToAuth();
      }
    }

    waitForFirebase(0);
  } catch (e) {
    // On unexpected errors, fail closed
    try { redirectToAuth(); } catch (_) {}
  }
})();
