// Database Module - Firestore operations
import { db } from './firebase-config.js';
import { 
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  arrayUnion,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Create or update user profile
export async function createUserProfile(userId, data) {
  try {
    await setDoc(doc(db, 'users', userId), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }, { merge: true });
    return { success: true };
  } catch (error) {
    console.error("Create profile error:", error);
    return { success: false, error: error.message };
  }
}

// Get user profile
export async function getUserProfile(userId) {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
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
export async function enrollInCourse(userId, courseId) {
  try {
    await setDoc(doc(db, 'enrollments', `${userId}_${courseId}`), {
      userId,
      courseId,
      enrolledAt: serverTimestamp(),
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
export async function getCourseEnrollment(userId, courseId) {
  try {
    const docRef = doc(db, 'enrollments', `${userId}_${courseId}`);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
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
export async function completLesson(userId, courseId, lessonId) {
  try {
    const enrollmentRef = doc(db, 'enrollments', `${userId}_${courseId}`);
    
    await updateDoc(enrollmentRef, {
      completedLessons: arrayUnion(lessonId),
      lastAccessedAt: serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    console.error("Complete lesson error:", error);
    return { success: false, error: error.message };
  }
}

// Update course progress percentage
export async function updateProgress(userId, courseId, progressPercent) {
  try {
    const enrollmentRef = doc(db, 'enrollments', `${userId}_${courseId}`);
    
    await updateDoc(enrollmentRef, {
      progress: progressPercent,
      lastAccessedAt: serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    console.error("Update progress error:", error);
    return { success: false, error: error.message };
  }
}

// Get all user enrollments
export async function getUserEnrollments(userId) {
  try {
    const q = query(collection(db, 'enrollments'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
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
export async function saveLastLesson(userId, courseId, lessonId) {
  try {
    const enrollmentRef = doc(db, 'enrollments', `${userId}_${courseId}`);
    
    await updateDoc(enrollmentRef, {
      lastLessonId: lessonId,
      lastAccessedAt: serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    console.error("Save last lesson error:", error);
    return { success: false, error: error.message };
  }
}
