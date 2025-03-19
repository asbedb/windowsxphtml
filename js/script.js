console.log("AsbedOS BIOS Loaded.");
const scanLinesElement = document.getElementById("screen-scanlines");
const bootSequenceContainer = document.getElementById("boot-sequence-container");

const shutdownSplash = document.getElementById("shutdown-screen");
const startupSplash = document.getElementById("startup-screen");
const restartSplash = document.getElementById("restart-screen");
const biosSplash = document.getElementById("bios-screen");
const loadingScreen = document.getElementById("loading-screen");
const loginContainer = document.getElementById("login-container");

const biosSplashText = document.getElementById("bios-splash-text");
const shutdownButton = document.getElementById("shutdown-button");
const restartButton = document.getElementById("restart-button");
const flickerButton = document.getElementById("flicker-button");

bootSequenceContainer.style.display = "none"
restartSplash.style.display = "none"
biosSplash.style.display = "none";
loadingScreen.style.display = "none";
loginContainer.style.display = "none";
shutdownSplash.style.display = "none";
startupSplash.style.display = "none";
scanLinesElement.style.maskImage = "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))";

const continueLoad = () => {
    console.log("Now Booting AsbedOS (0_0)");
    if (biosSplash.style.display !== "none") {
        biosSplash.style.display = "none";
        loadingScreen.style.display = ""; 
        setTimeout(() => {
            loadingScreen.style.display = "none";
            loginContainer.style.display = "";
        }, 5000);
    }
};

const startUpSequence = () => {
    // Ensure all containers are hidden initially
    bootSequenceContainer.style.display = "none"
    biosSplash.style.display = "none";
    loadingScreen.style.display = "none";
    loginContainer.style.display = "none";
    shutdownSplash.style.display = "none";
    startupSplash.style.display = "none";
    // Show the startup splash after a delay of 1 second
    setTimeout(() => {
        bootSequenceContainer.style.display = ""
        startupSplash.style.display = "flex"; 
        setTimeout(() => {
            startupSplash.style.display = "none"; // Hide startup splash
            biosSplash.style.display = ""; // Show bios splash
            console.log("timed out, biosSplash now visible");
        }, 1000); 
    }, 1000); 
};

const shutDown = () => {
    if (bootSequenceContainer.style.display === "none") {
        startUpSequence();
    } else {
        bootSequenceContainer.style.display = "none";
        shutdownSplash.style.display = "flex";
        setTimeout(() => {
            shutdownSplash.style.display = "none";
        }, 1000);
    }
};

const restart = () => {
    if (bootSequenceContainer.style.display === "none") {
        startUpSequence();
    } else {
        bootSequenceContainer.style.display = "none";
        restartSplash.style.display = "flex";
        setTimeout(() => {
            restartSplash.style.display = "none";
        }, 1000);
        startUpSequence();
    }
};

const restartMachine = () => {
    const computedStyle = getComputedStyle(bootSequenceContainer);
    if (computedStyle.display === "none") {
        if (biosSplash.style.display !== "none") {
            // Handle restarting the machine when the BIOS splash is visible
        }
        shutdownSplash.style.display = "none";
        bootSequenceContainer.style.display = "flex"; 
    }
};

const toggleFlicker = () => {
    const currentMaskImage = getComputedStyle(scanLinesElement).maskImage;

    if (currentMaskImage === "none" || currentMaskImage === "") {
        scanLinesElement.style.maskImage = "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))";
    } else {
        scanLinesElement.style.maskImage = ""; 
    }
};

biosSplashText.addEventListener("click", continueLoad);
shutdownButton.addEventListener("click", shutDown);
restartButton.addEventListener("click", restart);
flickerButton.addEventListener("click", toggleFlicker);

document.addEventListener("keydown", (e) => {
    console.log(e.key);
    if (e.key === "Enter") {
        continueLoad();
    }
});
