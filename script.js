// Workout Data Mapping
const workoutData = {
    1: { // Monday
        title: "Chest & Triceps",
        exercises: [
            { name: "Bench Press", sets: "3 sets x 12 reps", steps: ["Lie on the bench, feet flat.", "Grip the bar wider than shoulder-width.", "Lower the bar to mid-chest.", "Press up to full extension."] },
            { name: "Incline DB Press", sets: "3 sets x 10 reps", steps: ["Set bench to 30-45 degrees.", "Lower dumbbells to sides of chest.", "Drive weights up and together.", "Slowly control the descent."] },
            { name: "Push Ups", sets: "3 sets x 15 reps", steps: ["Start in high plank.", "Lower body until chest nearly touches floor.", "Keep elbows at 45 degree angle.", "Push back to start."] },
            { name: "Tricep Pushdowns", sets: "3 sets x 12 reps", steps: ["Stand at cable machine.", "Grip bar with elbows tucked at sides.", "Push bar down until arms are straight.", "Flex triceps at the bottom."] }
        ],
        breathing: "Inhale while lowering (eccentric), Exhale while pushing (concentric).",
        safety: "Do not lock your elbows. Keep your core engaged to protect your lower back."
    },
    2: { // Tuesday
        title: "Back & Biceps",
        exercises: [
            { name: "Lat Pulldowns", sets: "3 sets x 12 reps", steps: ["Grip bar wider than shoulders.", "Pull bar down to upper chest.", "Squeeze shoulder blades.", "Slowly return to start."] },
            { name: "Seated Cable Rows", sets: "3 sets x 12 reps", steps: ["Sit with knees slightly bent.", "Pull weight to lower stomach.", "Drive elbows back.", "Control the weight forward."] },
            { name: "Hammer Curls", sets: "3 sets x 12 reps", steps: ["Hold DBs with neutral grip.", "Curl towards shoulders.", "Keep elbows stationary.", "Lower slowly."] },
            { name: "Barbell Rows", sets: "3 sets x 10 reps", steps: ["Hinge at hips, back flat.", "Pull bar to lower chest.", "Keep neck neutral.", "Controlled descent."] }
        ],
        breathing: "Exhale as you pull the weight toward you.",
        safety: "Avoid using momentum (swinging). Keep your spine neutral and flat."
    },
    3: { // Wednesday
        title: "Legs & Core",
        exercises: [
            { name: "Barbell Squats", sets: "3 sets x 12 reps", steps: ["Bar on traps, feet shoulder-width.", "Sit back into a squat.", "Keep knees behind toes.", "Drive through heels to stand."] },
            { name: "Leg Press", sets: "3 sets x 15 reps", steps: ["Feet flat on platform.", "Lower until knees are at 90 degrees.", "Push platform up.", "No knee locking."] },
            { name: "Leg Extensions", sets: "3 sets x 15 reps", steps: ["Adjust seat for knee alignment.", "Extend legs until straight.", "Hold 1 second.", "Slowly lower."] },
            { name: "Plank", sets: "3 sets x 60s", steps: ["Forearms on floor.", "Straight line head to heels.", "Squeeze glutes/core.", "Hold steady."] }
        ],
        breathing: "Inhale lowering, Exhale on the effort (pushing up).",
        safety: "NEVER lock your knees on Leg Press. Keep heels flat on the floor during squats."
    },
    4: { // Thursday
        title: "Rest Day & Recovery",
        exercises: [
            { name: "Light Stretching", sets: "15 mins", steps: ["Focus on tight areas.", "Hold each stretch 30s.", "Deep breathing.", "No bouncing."] },
            { name: "Stay Hydrated", sets: "All Day", steps: ["Drink 3L+ water.", "Electrolytes if needed."] }
        ],
        breathing: "Deep, diaphragmatic breathing to enhance recovery.",
        safety: "Rest is vital. If you must move, keep it low impact like walking or yoga."
    },
    5: { // Friday
        title: "Shoulders",
        exercises: [
            { name: "Overhead Press", sets: "3 sets x 10 reps", steps: ["Stand/sit tall.", "Press weight straight up.", "Full extension above head.", "Lower to ear level."] },
            { name: "Lateral Raises", sets: "3 sets x 15 reps", steps: ["DBs at sides.", "Raise arms to shoulder height.", "Slight elbow bend.", "Control the drop."] },
            { name: "Front Raises", sets: "3 sets x 12 reps", steps: ["Raise DBs in front of you.", "Keep core tight.", "Shoulder height max.", "No swinging."] },
            { name: "Face Pulls", sets: "3 sets x 15 reps", steps: ["Rope at eye level.", "Pull towards your face.", "Pull handles apart.", "Feel the rear delts."] }
        ],
        breathing: "Exhale as you press or raise the weight.",
        safety: "Keep weights moderate. Shoulder joints are delicate, prioritize form."
    },
    6: { // Saturday
        title: "Full Body",
        exercises: [
            { name: "Deadlift", sets: "3 sets x 8 reps", steps: ["Feet hip-width, grip outside.", "Chest up, back flat.", "Drive through legs.", "Lock out hips."] },
            { name: "Lunges", sets: "3 sets x 12/leg", steps: ["Step forward into split stance.", "Lower back knee toward floor.", "Push back to start.", "Alternate legs."] },
            { name: "Dumbbell Bench", sets: "3 sets x 12 reps", steps: ["Same as bench press mechanics.", "Increased range of motion.", "Squeeze chest at top."] },
            { name: "Pull Ups", sets: "3 sets x Max", steps: ["Grip bar wide.", "Pull chest to bar.", "Lower under control.", "Full extension."] }
        ],
        breathing: "Sharp exhale on the crunch or heaviest pull part of the movement.",
        safety: "Ensure a full warm-up. This is your most taxing session."
    },
    0: { // Sunday
        title: "Cardio & Mobility",
        exercises: [
            { name: "Low Intensity Cardio", sets: "30-45 mins", steps: ["Walking, Cycling, or Swimming.", "Keep heart rate moderate."] },
            { name: "Foam Rolling", sets: "10 mins", steps: ["Roll tight muscles.", "Breathe through trigger points."] }
        ],
        breathing: "Steady, rhythmic breathing.",
        safety: "Focus on active recovery to prepare for Monday."
    }
};

// Modal Logic
const modal = document.getElementById('workout-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-modal');

function showWorkoutGuide(dayId) {
    const data = workoutData[dayId];
    if (!data) return;

    let html = `
        <div class="modal-header">
            <p class="split-name">Daily Workout Guide</p>
            <h2>${data.title}</h2>
        </div>
        <div class="guide-exercise-list">
    `;

    data.exercises.forEach(ex => {
        html += `
            <div class="guide-item">
                <h4>${ex.name}</h4>
                <ul class="guide-steps">
                    ${ex.steps.map(step => `<li>${step}</li>`).join('')}
                </ul>
                <div class="guide-meta">
                    <span>${ex.sets}</span>
                </div>
            </div>
        `;
    });

    html += `
        </div>
        <div class="modal-tips">
            <h4>💡 Pro Training Tips</h4>
            <div class="tip-grid">
                <div class="tip-box">
                    <h5>Breathing</h5>
                    <p>${data.breathing}</p>
                </div>
                <div class="tip-box">
                    <h5>Safety First</h5>
                    <p>${data.safety}</p>
                </div>
            </div>
        </div>
    `;

    modalBody.innerHTML = html;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
}

// Close on outside click
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});


// Gym Schedule - Dynamic Today Highlight & Selection
function initGymSchedule() {
    const today = new Date().getDay(); // 0 is Sunday, 1 is Monday, etc.
    const dayCards = document.querySelectorAll('.day-card');
    
    function setActiveCard(targetCard) {
        dayCards.forEach(card => card.classList.remove('today'));
        targetCard.classList.add('today');
    }

    // Set automatic highlight
    dayCards.forEach(card => {
        const dayId = parseInt(card.getAttribute('data-day'));
        if (dayId === today) {
            setActiveCard(card);
        }
        
        // Add click interaction
        card.addEventListener('click', function() {
            setActiveCard(this);
            showWorkoutGuide(dayId); // Popup guide on click
        });
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initGymSchedule();
});


// Diet & Exercise Form Submission
const dietForm = document.getElementById('diet-form');
if (dietForm) {
    dietForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const name = document.getElementById('user-name').value;
        const email = document.getElementById('user-email').value;
        const type = document.getElementById('request-type').value;

        // Visual feedback
        const submitBtn = this.querySelector('button') || this.querySelector('input[type="submit"]');
        const originalText = submitBtn ? (submitBtn.innerText || submitBtn.value) : 'Submit';
        if (submitBtn) {
            submitBtn.disabled = true;
            if (submitBtn.tagName === 'INPUT') submitBtn.value = 'Sending...';
            else submitBtn.innerText = 'Sending...';
        }

        try {
            // Point to your Vercel deployment URL here in production
            const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
                ? 'http://localhost:5001/api/contact' 
                : '/api/contact'; // Relative path works if deployed on same Vercel project

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    requestType: type
                }),
            });

            const result = await response.json();

            if (response.ok) {
                alert(`Thanks ${name}! Your request has been saved to our database. I'll get back to you soon!`);
                this.reset();
            } else {
                alert(`Oops! ${result.error || 'Something went wrong. Please try again later.'}`);
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert(`Unable to connect to the server (${error.message}). Please check your internet connection and ensure the backend is running!`);
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                if (submitBtn.tagName === 'INPUT') submitBtn.value = originalText;
                else submitBtn.innerText = originalText;
            }
        }
    });
}
