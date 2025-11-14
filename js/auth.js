// Authentication Module
// Must be loaded AFTER firebase-config.js

// Sign up with email and password
async function signUp(email, password, displayName) {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    
    // Update profile with display name
    if (displayName) {
      await user.updateProfile({ displayName: displayName });
    }
    
    return { success: true, user };
  } catch (error) {
    console.error("Sign up error:", error);
    return { success: false, error: error.message };
  }
}

// Sign in with email and password
async function signIn(email, password) {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error("Sign in error:", error);
    return { success: false, error: error.message };
  }
}

// Sign in with Google
async function signInWithGoogle() {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    return { success: true, user: result.user };
  } catch (error) {
    console.error("Google sign in error:", error);
    return { success: false, error: error.message };
  }
}

// Sign out
async function logOut() {
  try {
    await auth.signOut();
    return { success: true };
  } catch (error) {
    console.error("Sign out error:", error);
    return { success: false, error: error.message };
  }
}

// Reset password
async function resetPassword(email) {
  try {
    await auth.sendPasswordResetEmail(email);
    return { success: true };
  } catch (error) {
    console.error("Password reset error:", error);
    return { success: false, error: error.message };
  }
}

// Get current user
function getCurrentUser() {
  return auth.currentUser;
}

// Listen to auth state changes
function onAuthChange(callback) {
  return auth.onAuthStateChanged(callback);
}

// Check if user is authenticated
function isAuthenticated() {
  return auth.currentUser !== null;
}

// Expose functions globally
window.signUp = signUp;
window.signIn = signIn;
window.signInWithGoogle = signInWithGoogle;
window.logOut = logOut;
window.resetPassword = resetPassword;
window.getCurrentUser = getCurrentUser;
window.onAuthChange = onAuthChange;
window.isAuthenticated = isAuthenticated;
