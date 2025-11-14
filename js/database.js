// Database Module - Firestore operations
// Must be loaded AFTER firebase-config.js

// Create or update user profile
async function createUserProfile(userId, data) {
  try {
    await db.collection('users').doc(userId).set({
      ...data,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    return { success: true };
  } catch (error) {
    console.error("Create profile error:", error);
    return { success: false, error: error.message };
  }
}

// Get user profile
async function getUserProfile(userId) {
  try {
    const docRef = db.collection('users').doc(userId);
    const docSnap = await docRef.get();
    
    if (docSnap.exists) {
      return { success: true, data: docSnap.data() };
    } else {
      return { success: false, error: "Profile not found" };
    }
  } catch (error) {
    console.error("Get profile error:", error);
    return { success: false, error: error.message };
  }
}

// Enroll user in a course
async function enrollInCourse(userId, courseId) {
  try {
    await db.collection('enrollments').doc(`${userId}_${courseId}`).set({
      userId,
      courseId,
      enrolledAt: firebase.firestore.FieldValue.serverTimestamp(),
      progress: 0,
      completedLessons: [],
      status: 'active'
    });
    return { success: true };
  } catch (error) {
    console.error("Enrollment error:", error);
    return { success: false, error: error.message };
  }
}

// Get user's course enrollment
async function getCourseEnrollment(userId, courseId) {
  try {
    const docRef = db.collection('enrollments').doc(`${userId}_${courseId}`);
    const docSnap = await docRef.get();
    
    if (docSnap.exists) {
      return { success: true, data: docSnap.data() };
    } else {
      return { success: false, error: "Not enrolled" };
    }
  } catch (error) {
    console.error("Get enrollment error:", error);
    return { success: false, error: error.message };
  }
}

// Mark lesson as complete
async function completLesson(userId, courseId, lessonId) {
  try {
    const enrollmentRef = db.collection('enrollments').doc(`${userId}_${courseId}`);
    
    await enrollmentRef.update({
      completedLessons: firebase.firestore.FieldValue.arrayUnion(lessonId),
      lastAccessedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    console.error("Complete lesson error:", error);
    return { success: false, error: error.message };
  }
}

// Update course progress percentage
async function updateProgress(userId, courseId, progressPercent) {
  try {
    const enrollmentRef = db.collection('enrollments').doc(`${userId}_${courseId}`);
    
    await enrollmentRef.update({
      progress: progressPercent,
      lastAccessedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    console.error("Update progress error:", error);
    return { success: false, error: error.message };
  }
}

// Get all user enrollments
async function getUserEnrollments(userId) {
  try {
    const querySnapshot = await db.collection('enrollments')
      .where('userId', '==', userId)
      .get();
    
    const enrollments = [];
    querySnapshot.forEach((doc) => {
      enrollments.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, data: enrollments };
  } catch (error) {
    console.error("Get enrollments error:", error);
    return { success: false, error: error.message };
  }
}

// Save user's last accessed lesson
async function saveLastLesson(userId, courseId, lessonId) {
  try {
    const enrollmentRef = db.collection('enrollments').doc(`${userId}_${courseId}`);
    
    await enrollmentRef.update({
      lastLessonId: lessonId,
      lastAccessedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    console.error("Save last lesson error:", error);
    return { success: false, error: error.message };
  }
}

// Expose functions globally
window.createUserProfile = createUserProfile;
window.getUserProfile = getUserProfile;
window.enrollInCourse = enrollInCourse;
window.getCourseEnrollment = getCourseEnrollment;
window.completLesson = completLesson;
window.updateProgress = updateProgress;
window.getUserEnrollments = getUserEnrollments;
window.saveLastLesson = saveLastLesson;
