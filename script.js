class PomodoroTimer {
    constructor() {
        this.workTime = 25 * 60; // 25 minutes in seconds
        this.breakTime = 5 * 60; // 5 minutes in seconds
        this.currentTime = this.workTime;
        this.isRunning = false;
        this.isWorkMode = true;
        this.timer = null;

        // DOM elements
        this.minutesDisplay = document.getElementById('minutes');
        this.secondsDisplay = document.getElementById('seconds');
        this.startPauseButton = document.getElementById('startPause');
        this.resetButton = document.getElementById('reset');
        this.modeToggleButton = document.getElementById('modeToggle');

        // Event listeners
        this.startPauseButton.addEventListener('click', () => this.toggleStartPause());
        this.resetButton.addEventListener('click', () => this.reset());
        this.modeToggleButton.addEventListener('click', () => this.toggleMode());

        this.updateDisplay();
        this.updateModeButton();

        // Add quotes array
        this.quotes = [
            { text: "We suffer more often in imagination than in reality.", author: "Seneca" },
            { text: "Waste no more time arguing about what a good man should be. Be one.", author: "Marcus Aurelius" },
            { text: "While we wait for life, life passes.", author: "Seneca" },
            { text: "The best revenge is to be unlike him who performed the injury.", author: "Marcus Aurelius" },
            { text: "What we do now echoes in eternity.", author: "Marcus Aurelius" },
            { text: "Life is long if you know how to use it.", author: "Seneca" },
            { text: "Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth.", author: "Marcus Aurelius" },
            { text: "Luck is what happens when preparation meets opportunity.", author: "Seneca" }
        ];

        // Update quote periodically
        this.updateQuote();
        setInterval(() => this.updateQuote(), 300000); // Update quote every 5 minutes

        // Add background images array with reliable hosted images
        this.backgroundImages = [
            "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        
        ];

        // Set random background on load
        this.setRandomBackground();
    }

    setRandomBackground() {
        const randomIndex = Math.floor(Math.random() * this.backgroundImages.length);
        const selectedImage = this.backgroundImages[randomIndex];
        
        // Create a new image object to preload
        const img = new Image();
        img.onload = () => {
            document.body.style.backgroundImage = `url('${selectedImage}')`;
        };
        img.src = selectedImage;
    }

    updateDisplay() {
        const minutes = Math.floor(this.currentTime / 60);
        const seconds = this.currentTime % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Update the display elements
        this.minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        this.secondsDisplay.textContent = seconds.toString().padStart(2, '0');
        
        // Update the tab title with the timer and current mode
        const mode = this.isWorkMode ? 'Work' : 'Break';
        document.title = `(${timeString}) ${mode} - Roman Pomodoro`;
    }

    toggleStartPause() {
        if (this.isRunning) {
            this.pause();
        } else {
            this.start();
        }
        this.updateStartPauseButton();
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.timer = setInterval(() => {
                this.currentTime--;
                if (this.currentTime < 0) {
                    this.switchMode();
                } else {
                    this.updateDisplay();
                }
            }, 1000);
            this.updateStartPauseButton();
        }
    }

    pause() {
        this.isRunning = false;
        clearInterval(this.timer);
        document.title = 'Roman Pomodoro Timer';
        this.updateStartPauseButton();
    }

    reset() {
        this.pause();
        this.currentTime = this.isWorkMode ? this.workTime : this.breakTime;
        this.updateDisplay();
    }

    setWorkMode() {
        this.isWorkMode = true;
        this.pause();
        this.currentTime = this.workTime;
        this.updateDisplay();
        this.updateModeButton();
    }

    setBreakMode() {
        this.isWorkMode = false;
        this.pause();
        this.currentTime = this.breakTime;
        this.updateDisplay();
        this.updateModeButton();
    }

    toggleMode() {
        if (this.isWorkMode) {
            this.setBreakMode();
        } else {
            this.setWorkMode();
        }
    }

    updateModeButton() {
        this.modeToggleButton.textContent = this.isWorkMode ? 'Break' : 'Work';
        this.modeToggleButton.classList.toggle('active', !this.isWorkMode);
    }

    updateStartPauseButton() {
        this.startPauseButton.textContent = this.isRunning ? 'Pause' : 'Start';
        this.startPauseButton.classList.toggle('active', this.isRunning);
    }

    playAlarm() {
        const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
        audio.play();
    }

    updateQuote() {
        const quoteElement = document.getElementById('roman-quote');
        const authorElement = document.querySelector('.author');
        const randomQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
        
        quoteElement.textContent = `"${randomQuote.text}"`;
        authorElement.textContent = `- ${randomQuote.author}`;
    }
}

// Initialize the timer
const pomodoro = new PomodoroTimer();