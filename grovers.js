// JavaScript code for running Grover's algorithm using Qiskit.js
import { gsap } from "gsap";
const IBMQ = require('ibm-q'); // Include the Qiskit.js library

// Initialize the IBM Quantum provider
const token = '919bb509bde0516ebde71cf37e303d78de9e1cb04210edb4a34608c7a3afaa71c15cd33707f81c6c2668941d88787cfd4eba0b27c637b300f11d49399b908044';
IBMQ.enableAccount(token);

// Function to run Grover's algorithm
function runGrover(device, expression) {
    const provider = new IBMQ.Provider(); // Initialize the provider

    // Construct the oracle and problem
    const oracle = new qiskit.CircuitLibrary.PhaseOracle(expression);
    const problem = new qiskit.Algorithms.AmplificationProblem(
        oracle,
        (bitstring) => oracle.evaluateBitstring(bitstring)
    );

    // Choose the backend device
    const backend = provider.getBackend(device);

    // Initialize the quantum instance
    const quantumInstance = new qiskit.QuantumInstance(backend);

    // Run Grover's algorithm
    qiskit.Algorithms.Grover.amplify(problem, quantumInstance)
        .then((result) => {
            const counts = result.getCircuitResults();
            // Update the frontend to display the results
            displayResults(counts);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Function to handle user input and initiate Grover's algorithm
function initiateGrover() {
    const device = document.getElementById('device').value;
    const expression = document.getElementById('expression').value;
    runGrover(device, expression);
}

// Function to update the frontend with the results
function displayResults(counts) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = 'Result: ' + JSON.stringify(counts);
}

// Add event listener to a button to initiate Grover's algorithm
const runButton = document.getElementById('runButton');
runButton.addEventListener('click', initiateGrover);

const elementToAnimate = document.querySelector(".animation-element");

// Create an animation using GSAP
gsap.from(elementToAnimate, {
  opacity: 0,
  y: 20,
  duration: 1,
  delay: 0.5,
  ease: "power3.out",
});

