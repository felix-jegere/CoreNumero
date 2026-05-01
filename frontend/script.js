document.getElementById('numerologyForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const dob = document.getElementById('userDate').value;
    if (!dob) return;

    // Basic Pythagorean Life Path Calculation
    // Logic: Sum of all digits in DOB until reduced to 1-9 or Master Number 11, 22, 33
    const digits = dob.replace(/-/g, '');
    let sum = 0;
    for (let char of digits) {
        sum += parseInt(char);
    }

    function reduceNum(n) {
        if (n <= 9 || n === 11 || n === 22 || n === 33) return n;
        let newSum = n.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
        return reduceNum(newSum);
    }

    const lifePath = reduceNum(sum);

    // Update UI
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('lifePathDigit').innerText = lifePath;
    
    // In a real app, this is where you would call your Gemini backend
    document.getElementById('geminiSummary').innerText = `Syncing with AI Model to interpret the vibration of Number ${lifePath}...`;
    
    // Communication with backend to get AI insights
    try {
        const response = await fetch('https://core-numero.vercel.app/api/insights', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: document.getElementById('userName').value || 'Seeker',
                numbers:{
                    lifePath: lifePath,
                },
            })
        });

        const data = await response.json();
        console.log('Received response from backend:', data.success);
        if(data.success) {
            document.getElementById('geminiSummary').innerHTML = data.insight;
        }else{
            document.getElementById('geminiSummary').innerText = 'The stars are fuzzy right now. Try again?';
        }
    } catch (error) {
        console.error('Connection Error: ', error);
        document.getElementById('geminiSummary').innerText = 'Unable to establish connection. Please try again later.';
    }

    // Smooth scroll to results
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
});

// Mobile hamburger toggle
const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-links a');
if (hamburger && navbar) {
    hamburger.addEventListener('click', () => {
        navbar.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => link.addEventListener('click', () => {
        navbar.classList.remove('open');
    }));
}
