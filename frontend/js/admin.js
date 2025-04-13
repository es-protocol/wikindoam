/**
 * Admin Detection System 
 * 
 * This code runs when the page loads and:
 * 1. checks if a jwt token exist in local storage
 * 2. If found verifies with backend if user is admin
 * 2. Enables admin controls if verifies
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check for existing auth token
    const token = localStorage.getItem('jwtToken');
    
    // If no token, user isn't logged in - exit
    if (!token) {
        console.log('No user session found');
        return;
    }

    // Verify admin status with backend
    fetch('/api/check-admin', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) throw new Error('Admin check failed');
        return response.json();
    })
    .then(data => {
        if (data.isAdmin) {
            console.log('Admin access granted');
            document.body.classList.add('admin-mode');
            activateAdminFeatures();
        }
    })
    .catch(error => {
        console.error('Admin verification error:', error);
    });
});