document.addEventListener("DOMContentLoaded", () => {
    // Set dark mode as default on page load
    document.body.classList.add('dark-mode');
    
    // Define bmiContent first to ensure it's available globally
    const bmiContent = {
        "Underweight": {
            comment: "Are you hiding behind a lamppost? Might need a few more burgers! 🍔",
            trifectaRecommendation: "If your BMI result says you're underweight, don't panic—it's just one part of the bigger picture. Being underweight can mean your body isn't getting all the nutrients it needs to grow strong and stay energized. Try focusing on eating balanced meals with plenty of whole foods like fruits, veggies, proteins, and healthy fats. If you're feeling tired a lot or not sure what to eat, talking to a doctor or nutritionist can really help. Taking care of your body now sets you up for feeling great later!",
            weightGainTips: "✅ Healthy Weight Gain Tips for Young People\n\nEat More Often\nAim for 5–6 meals a day instead of 2–3 large ones. Include snacks between meals — like trail mix, smoothies, or yogurt with granola.\n\nChoose Nutrient-Dense, High-Calorie Foods\nGo for foods that are both healthy and calorie-rich, like:\n• Nut butters (peanut, almond)\n• Avocados\n• Whole-grain breads and pasta\n• Dried fruits and nuts\n• Olive oil or coconut oil (add to veggies or cooking)\n\nProtein is Key\nProtein helps build lean muscle. Include:\n• Eggs\n• Chicken, turkey, tofu\n• Greek yogurt\n• Protein shakes or smoothies\n\nStrength Training\nCombine eating more with strength training (like lifting weights or bodyweight exercises). This helps ensure you're gaining muscle, not just fat.\n\nDrink Calories, Too\nIf eating large meals is hard, sip on smoothies, milkshakes, or 100% fruit juices. You'll get extra nutrients and calories without feeling overly full.\n\nDon't Skip Breakfast\nStart your day with a solid breakfast — oatmeal with peanut butter and banana, eggs with toast and avocado, or a protein smoothie.\n\nStay Consistent\nGaining weight takes time — don't get discouraged. Track your meals, workouts, and progress weekly to stay motivated.",
            links: [
                { text: "💪 Healthy Weight Gain Tips", url: "weight-gain-tips.html", target: "_blank" },
                { text: "💪 Best equipment to add muscle", url: "#", showEquipment: true }
            ],
            womenEquipment: {
                pilates: { text: "Pilates", url: "https://amzn.to/44OsqoO" },
                resistanceBands: { text: "Resistance Bands", url: "https://amzn.to/4mtxANr" },
                exerciseBike: { text: "Exercise Bike", url: "https://amzn.to/43xBjkc" }
            }
        },
        "Normal weight": {
            comment: "Looking good! Perfectly balanced, like all things should be... or something. 👌",
            fitnessMaintenanceTips: "💪 Tips for Maintaining Body Shape & Fitness\n\nStick to a Balanced Diet\nFocus on whole foods: lean proteins, healthy fats, fruits, vegetables, and whole grains. Try the 80/20 rule — eat clean 80% of the time, and allow yourself to enjoy treats 20% of the time without guilt.\n\nKeep Moving Consistently\nAim for at least 30 minutes of activity most days. Whether it's strength training, running, dancing, or a walk with friends — just keep moving. Consistency beats intensity.\n\nStrength Train at Least 2–3x a Week\nBuilding and maintaining muscle helps burn more calories, supports metabolism, and keeps your body strong and toned.\n\nDon't Neglect Cardio\nCardiovascular workouts (like cycling, jogging, or HIIT) help your heart health, stamina, and fat management.\n\nPrioritize Sleep\nSleep is when your body recovers, builds muscle, and resets. Aim for 7–9 hours each night — it's just as important as working out!\n\nStay Hydrated\nDrinking water supports metabolism, keeps your energy up, and helps your body function at its best. Aim for at least 2 liters (or about half a gallon) a day.\n\nWatch Portion Sizes\nEven healthy food can lead to weight gain if eaten in large quantities. Be mindful of your hunger and fullness signals — and eat slowly.\n\nLimit Processed Foods and Sugary Drinks\nThese often lead to fat storage and energy crashes. Replace soda with water or herbal tea, and processed snacks with fruits or nuts.\n\nTrack Your Progress — Not Just Your Weight\nUse photos, how your clothes fit, how strong you feel, or how well you sleep as signs of progress — not just the number on the scale.\n\nMake Fitness Fun\nThe best exercise is the one you enjoy. Try new workouts, classes, or sports until you find what excites you.",
            links: [
                { text: "🏃‍♂️ Maintain Your Healthy Lifestyle", url: "healthy-lifestyle.html", target: "_blank" },
                { text: "🏋️‍♀️ Fitness Gear for Maintenance", url: "gym-equipment.html", target: "_blank" }
            ]
        },
        "Overweight": {
            comment: "A little extra cushion for the pushin'! Maybe swap *one* cookie for a carrot? 🥕",
            trifectaRecommendation: "If your BMI result says you're overweight, don't stress—it doesn't define your health or who you are. It's just a starting point to help you understand your body better. What matters most is building habits that make you feel strong, energized, and confident. Try adding more movement to your day, choosing balanced meals, and taking care of your mental health too. If you're unsure where to start, talking to a doctor or health coach can help you find a plan that works for you.",
            links: [
                { text: "💪 Best Home Gym Equipment", url: "gym-equipment.html", target: "_blank" }
            ]
        },
        "Obese": {
            comment: "More of you to love! But maybe let's hit the gym together sometime? 🏋️",
            trifectaRecommendation: "If your BMI result shows you're in the obese range, remember that it's just one measure of your health, not who you are. It's a chance to focus on making small, positive changes that can help you feel your best—both physically and mentally. Start by adding more movement to your day, like walking, dancing, or playing sports, and try to eat balanced meals filled with nourishing foods. If you're feeling unsure about where to begin, reaching out to a doctor or nutritionist can help you create a plan that's right for you. Remember, it's all about progress, not perfection!",
            links: [
                { text: "💪 Best Home Gym Equipment", url: "gym-equipment.html", target: "_blank" }
            ]
        }
    };

    // Audio elements
    let chantAudio = null;
    let celebrationAudio1 = null;
    let celebrationAudio2 = null;
    let lastCelebrationIndex = 0; // Track which celebration audio was last played

    // Load jokes from JSON file
    let jokes = {
        underweight: [],
        normal: [],
        overweight_obese: []
    };

    // Fetch jokes from JSON file
    fetch('js/jokes.json')
        .then(response => response.json())
        .then(data => {
            jokes = data;
            console.log("Jokes loaded successfully");
            // Enable calculate button after jokes are loaded
            const calculateBtn = document.getElementById("calculate-btn");
            if (calculateBtn) {
                calculateBtn.disabled = false;
                calculateBtn.classList.remove("disabled");
            }
        })
        .catch(error => {
            console.error("Error loading jokes:", error);
            // Enable button anyway so basic functionality works even without jokes
            const calculateBtn = document.getElementById("calculate-btn");
            if (calculateBtn) {
                calculateBtn.disabled = false;
                calculateBtn.classList.remove("disabled");
            }
        });

    // Initialize audio
    function initAudio() {
        if (!chantAudio) {
            chantAudio = new Audio('audio/who_ate_all_the_pies.m4a');
            chantAudio.preload = 'auto';
            console.log("Chant audio initialized");
        }
        
        if (!celebrationAudio1) {
            celebrationAudio1 = new Audio('audio/celebration1.m4a');
            celebrationAudio1.preload = 'auto';
            console.log("Celebration audio 1 initialized");
        }
        
        if (!celebrationAudio2) {
            celebrationAudio2 = new Audio('audio/celebration2.m4a');
            celebrationAudio2.preload = 'auto';
            console.log("Celebration audio 2 initialized");
        }
    }

    // Function to get the next celebration audio in alternating sequence
    function getNextCelebrationAudio() {
        // Alternate between the two celebration audio files
        if (lastCelebrationIndex === 0) {
            lastCelebrationIndex = 1;
            return celebrationAudio1;
        } else {
            lastCelebrationIndex = 0;
            return celebrationAudio2;
        }
    }

    // Function to get a random joke based on BMI category
    function getRandomJoke(category) {
        let jokeCategory;
        if (category === "Underweight") {
            jokeCategory = jokes.underweight;
        } else if (category === "Normal weight") {
            jokeCategory = jokes.normal;
        } else {
            // Both Overweight and Obese use the same joke category
            jokeCategory = jokes.overweight_obese;
        }
        
        if (jokeCategory && jokeCategory.length > 0) {
            const randomIndex = Math.floor(Math.random() * jokeCategory.length);
            return jokeCategory[randomIndex];
        }
        
        // Fallback if no jokes are available
        return "Why did the BMI calculator go to therapy? It had too many weight issues!";
    }

    // Complaints modal functionality
    const complaintsLink = document.getElementById("complaints-link");
    const complaintsModal = document.getElementById("complaints-modal");
    const closeModalBtn = document.querySelector(".close-modal");
    
    // Open complaints modal when clicking the link
    complaintsLink.addEventListener("click", (e) => {
        e.preventDefault();
        complaintsModal.classList.add("show");
    });
    
    // Close complaints modal when clicking the X button
    closeModalBtn.addEventListener("click", () => {
        complaintsModal.classList.remove("show");
    });
    
    // Close complaints modal when clicking outside the modal content
    window.addEventListener("click", (e) => {
        if (e.target === complaintsModal) {
            complaintsModal.classList.remove("show");
        }
    });
    
    // Close complaints modal when pressing Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && complaintsModal.classList.contains("show")) {
            complaintsModal.classList.remove("show");
        }
    });
    // Height unit elements
    const heightUnitSelect = document.getElementById("height-unit");
    const heightCmInput = document.getElementById("height-cm-input");
    const heightFtInInput = document.getElementById("height-ft-in-input");
    
    // Weight unit elements
    const weightUnitSelect = document.getElementById("weight-unit");
    const weightKgInput = document.getElementById("weight-kg-input");
    const weightLbsInput = document.getElementById("weight-lbs-input");
    const weightStLbsInput = document.getElementById("weight-st-lbs-input");
    
    // Input fields
    const heightCm = document.getElementById("height-cm");
    const heightFt = document.getElementById("height-ft");
    const heightIn = document.getElementById("height-in");
    const weightKg = document.getElementById("weight-kg");
    const weightLbs = document.getElementById("weight-lbs");
    const weightSt = document.getElementById("weight-st");
    const weightLbsPart = document.getElementById("weight-lbs-part");
    
    // Result elements
    const calculateBtn = document.getElementById("calculate-btn");
    const resultSection = document.getElementById("result-section");
    const bmiValueSpan = document.getElementById("bmi-value");
    const bmiCategorySpan = document.getElementById("bmi-category");
    const funnyImage = document.getElementById("funny-image");
    const funnyComment = document.getElementById("funny-comment");
    const affiliateLinksDiv = document.getElementById("affiliate-links");
    const linksListUl = document.getElementById("links-list");
    const jokeContainer = document.getElementById("joke-container");
    const jokeText = document.getElementById("joke-text");
    const audioContainer = document.getElementById("audio-container");
    
    // Theme toggle
    const themeToggle = document.getElementById("theme-toggle");

    // Initialize audio
    initAudio();

    // Disable calculate button until jokes are loaded
    if (calculateBtn) {
        calculateBtn.disabled = true;
        calculateBtn.classList.add("disabled");
    }

    // Initialize animations
    initializeAnimations();

    // Image paths by gender and BMI category
    const imagesByCategory = {
        "male": {
            "Underweight": [
                "images/male/underweight/underweight_man_1.webp",
                "images/male/underweight/underweight_man_2.webp"
            ],
            "Normal weight": [
                "images/male/normal/normal_man_1.webp",
                "images/male/normal/normal_man_2.webp",
                "images/male/normal/normal_man_3.webp",
                "images/male/normal/normal_man_4.webp"
            ],
            "Overweight": [
                "images/male/overweight/overweight_man_1.gif",
                "images/male/overweight/overweight_man_2.webp",
                "images/male/overweight/overweight_man_3.webp",
                "images/male/overweight/overweight_man_4.webp"
            ],
            "Obese": [
                "images/male/obese/obese_man_1.webp",
                "images/male/obese/obese_man_2.webp",
                "images/male/obese/obese_man_3.webp",
                "images/male/obese/obese_man_4.webp"
            ]
        },
        "female": {
            "Underweight": [
                "images/female/underweight/underweight_woman_1.webp",
                "images/female/underweight/underweight_woman_2.webp"
            ],
            "Normal weight": [
                "images/female/normal/normal_woman_1.webp",
                "images/female/normal/normal_woman_2.webp",
                "images/female/normal/normal_woman_3.webp",
                "images/female/normal/normal_woman_4.webp"
            ],
            "Overweight": [
                "images/female/overweight/overweight_woman_1.webp",
                "images/female/overweight/overweight_woman_2.webp",
                "images/female/overweight/overweight_woman_3.webp",
                "images/female/overweight/overweight_woman_4.webp"
            ],
            "Obese": [
                "images/female/obese/obese_woman_1.webp",
                "images/female/obese/obese_woman_2.webp",
                "images/female/obese/obese_woman_3.webp",
                "images/female/obese/obese_woman_4.webp"
            ]
        },
        "both": {
            "Underweight": [
                "images/both/underweight/underweight_both_1.webp",
                "images/both/underweight/underweight_both_2.webp"
            ],
            "Normal weight": [
                "images/both/normal/normal_both_1.webp",
                "images/both/normal/normal_both_2.webp"
            ],
            "Overweight": [],
            "Obese": []
        }
    };

    // Function to get a random image based on gender and BMI category
    function getRandomImage(gender, category) {
        // Try gender-specific images first
        let images = imagesByCategory[gender][category];
        
        // If no gender-specific images, try 'both' category
        if (!images || images.length === 0) {
            images = imagesByCategory["both"][category];
        }
        
        // If still no images, use a fallback
        if (!images || images.length === 0) {
            return `images/${category.toLowerCase()}_cartoon.jpeg`;
        }
        
        // Return a random image from the available ones
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    }
    
    // Function to initialize animations
    function initializeAnimations() {
        // Add animation classes to elements
        document.querySelectorAll('.input-group').forEach((el, index) => {
            el.style.opacity = 0;
            el.style.transform = 'translateY(20px)';
            setTimeout(() => {
                el.style.transition = 'all 0.5s ease';
                el.style.opacity = 1;
                el.style.transform = 'translateY(0)';
            }, 100 + (index * 50));
        });
        
        if (calculateBtn) {
            calculateBtn.style.opacity = 0;
            calculateBtn.style.transform = 'translateY(20px)';
            setTimeout(() => {
                calculateBtn.style.transition = 'all 0.5s ease';
                calculateBtn.style.opacity = 1;
                calculateBtn.style.transform = 'translateY(0)';
            }, 500);
        }
    }
    
    // Handle height unit change
    heightUnitSelect.addEventListener("change", () => {
        if (heightUnitSelect.value === "cm") {
            heightCmInput.style.display = "block";
            heightFtInInput.style.display = "none";
        } else {
            heightCmInput.style.display = "none";
            heightFtInInput.style.display = "block";
        }
    });
    
    // Handle weight unit change
    weightUnitSelect.addEventListener("change", () => {
        weightKgInput.style.display = "none";
        weightLbsInput.style.display = "none";
        weightStLbsInput.style.display = "none";
        
        if (weightUnitSelect.value === "kg") {
            weightKgInput.style.display = "block";
        } else if (weightUnitSelect.value === "lbs") {
            weightLbsInput.style.display = "block";
        } else {
            weightStLbsInput.style.display = "block";
        }
    });
    
    // Handle theme toggle
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    });
    
    // Calculate BMI when button is clicked
    calculateBtn.addEventListener("click", () => {
        try {
            // Get gender
            const gender = document.getElementById("gender").value;
            
            // Get height in cm
            let heightInCm = 0;
            if (heightUnitSelect.value === "cm") {
                heightInCm = parseFloat(heightCm.value);
                if (!heightInCm || heightInCm <= 0) {
                    shakeElement(heightCm);
                    throw new Error("Please enter a valid height.");
                }
            } else {
                const feet = parseFloat(heightFt.value);
                const inches = parseFloat(heightIn.value) || 0;
                if (!feet || feet <= 0) {
                    shakeElement(heightFt);
                    throw new Error("Please enter a valid height in feet.");
                }
                heightInCm = (feet * 30.48) + (inches * 2.54);
            }
            
            // Get weight in kg
            let weightInKg = 0;
            if (weightUnitSelect.value === "kg") {
                weightInKg = parseFloat(weightKg.value);
                if (!weightInKg || weightInKg <= 0) {
                    shakeElement(weightKg);
                    throw new Error("Please enter a valid weight.");
                }
            } else if (weightUnitSelect.value === "lbs") {
                weightInKg = parseFloat(weightLbs.value) * 0.453592;
                if (!weightInKg || weightInKg <= 0) {
                    shakeElement(weightLbs);
                    throw new Error("Please enter a valid weight.");
                }
            } else {
                const stones = parseFloat(weightSt.value);
                const pounds = parseFloat(weightLbsPart.value) || 0;
                if (!stones || stones <= 0) {
                    shakeElement(weightSt);
                    throw new Error("Please enter a valid weight in stones.");
                }
                weightInKg = (stones * 6.35029) + (pounds * 0.453592);
            }
            
            // Calculate BMI
            const heightInM = heightInCm / 100;
            const bmi = weightInKg / (heightInM * heightInM);
            const roundedBMI = Math.round(bmi * 10) / 10;
            
            // Determine BMI category
            let category = "";
            if (bmi < 18.5) {
                category = "Underweight";
            } else if (bmi < 25) {
                category = "Normal weight";
            } else if (bmi < 30) {
                category = "Overweight";
            } else {
                category = "Obese";
            }
            
            // Update result elements
            bmiValueSpan.textContent = roundedBMI;
            bmiCategorySpan.textContent = category;
            
            // Get a random joke for this category and use it as the funny comment
            const joke = getRandomJoke(category);
            funnyComment.textContent = joke;
            
            // Hide joke container since we're using the joke as the funny comment
            if (jokeContainer) {
                jokeContainer.style.display = "none";
            }
            
            // Play appropriate audio based on BMI category and gender
            // Stop any currently playing audio first
            if (chantAudio) {
                chantAudio.pause();
                chantAudio.currentTime = 0;
            }
            
            if (celebrationAudio1) {
                celebrationAudio1.pause();
                celebrationAudio1.currentTime = 0;
            }
            
            if (celebrationAudio2) {
                celebrationAudio2.pause();
                celebrationAudio2.currentTime = 0;
            }
            
            // Hide audio container by default
            if (audioContainer) {
                audioContainer.style.display = "none";
                audioContainer.innerHTML = '';
            }
            
            // Play audio based on BMI category and gender
            setTimeout(() => {
                // Play "Who Ate All The Pies?" chant for overweight and obese males only
                if ((category === "Overweight" || category === "Obese") && gender === "male") {
                    if (chantAudio) {
                        console.log("Playing chant audio for overweight/obese male");
                        const playPromise = chantAudio.play();
                        
                        if (playPromise !== undefined) {
                            playPromise.then(() => {
                                console.log("Chant audio playing successfully");
                            }).catch(error => {
                                console.log("Chant autoplay prevented by browser:", error);
                                // Create a visible play button if autoplay is blocked
                                const audioButton = document.createElement("button");
                                audioButton.textContent = "Play 'Who Ate All The Pies?' Chant";
                                audioButton.className = "play-audio-btn";
                                audioButton.onclick = function() {
                                    chantAudio.play();
                                    this.remove(); // Remove button after clicked
                                };
                                
                                // Add button to audio container
                                if (audioContainer) {
                                    audioContainer.innerHTML = '';
                                    audioContainer.appendChild(audioButton);
                                    audioContainer.style.display = "block";
                                }
                            });
                        }
                    }
                }
                // Play alternating celebration sounds for normal weight (any gender)
                else if (category === "Normal weight") {
                    // Get the next celebration audio in sequence
                    const currentCelebrationAudio = getNextCelebrationAudio();
                    
                    if (currentCelebrationAudio) {
                        console.log("Playing celebration audio for normal weight");
                        const playPromise = currentCelebrationAudio.play();
                        
                        if (playPromise !== undefined) {
                            playPromise.then(() => {
                                console.log("Celebration audio playing successfully");
                            }).catch(error => {
                                console.log("Celebration autoplay prevented by browser:", error);
                                // Create a visible play button if autoplay is blocked
                                const audioButton = document.createElement("button");
                                audioButton.textContent = "Play Celebration Sound";
                                audioButton.className = "play-audio-btn celebration-btn";
                                audioButton.onclick = function() {
                                    currentCelebrationAudio.play();
                                    this.remove(); // Remove button after clicked
                                };
                                
                                // Add button to audio container
                                if (audioContainer) {
                                    audioContainer.innerHTML = '';
                                    audioContainer.appendChild(audioButton);
                                    audioContainer.style.display = "block";
                                }
                            });
                        }
                    }
                }
            }, 500);
            
            // Show recommendation if available
            const trifectaRecommendationElement = document.getElementById("trifecta-recommendation");
            if (trifectaRecommendationElement) {
                if (bmiContent[category].trifectaRecommendation) {
                    trifectaRecommendationElement.textContent = bmiContent[category].trifectaRecommendation;
                    trifectaRecommendationElement.style.display = "block";
                } else {
                    trifectaRecommendationElement.style.display = "none";
                }
            }
            
            // Set random image based on gender and category
            const imageSrc = getRandomImage(gender, category);
            funnyImage.src = imageSrc;
            funnyImage.alt = `${category} ${gender} image`;
            
            // Clear previous links
            linksListUl.innerHTML = '';
            
            // Add category-specific links
            if (bmiContent[category].links && bmiContent[category].links.length > 0) {
                bmiContent[category].links.forEach((link, index) => {
                    const li = document.createElement("li");
                    const a = document.createElement("a");
                    a.textContent = link.text;
                    a.href = link.url;
                    
                    if (link.target) {
                        a.target = link.target;
                    }
                    
                    if (link.showTips) {
                        a.addEventListener("click", (e) => {
                            e.preventDefault();
                            showWeightGainTips();
                        });
                    } else if (link.showEquipment) {
                        a.addEventListener("click", (e) => {
                            e.preventDefault();
                            if (gender === "female") {
                                a.href = "equipment-women.html";
                                a.target = "_blank";
                                window.open(a.href, a.target);
                            } else {
                                a.href = "equipment.html";
                                a.target = "_blank";
                                window.open(a.href, a.target);
                            }
                        });
                    } else if (link.showHoliday) {
                        a.addEventListener("click", (e) => {
                            e.preventDefault();
                            showHolidayRecommendations();
                        });
                    } else if (link.showFitnessTips) {
                        a.addEventListener("click", (e) => {
                            e.preventDefault();
                            showFitnessMaintenance();
                        });
                    }
                    
                    li.appendChild(a);
                    li.style.opacity = 0;
                    li.style.transform = "translateX(-20px)";
                    linksListUl.appendChild(li);
                    
                    // Animate in with staggered delay
                    setTimeout(() => {
                        li.style.opacity = 1;
                        li.style.transform = "translateX(0)";
                    }, 300 + (index * 100));
                });
                affiliateLinksDiv.style.display = "block";
            } else {
                affiliateLinksDiv.style.display = "none";
            }
            
            // Show result section with animation
            resultSection.style.display = "block";
            resultSection.style.opacity = 0;
            resultSection.style.transform = "translateY(20px)";
            setTimeout(() => {
                resultSection.style.opacity = 1;
                resultSection.style.transform = "translateY(0)";
            }, 100);
            
            // Scroll to results
            resultSection.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.error("Error calculating BMI:", error);
            showToast("An error occurred. Please try again.");
        }
    });
    
    // Function to show toast message
    function showToast(message) {
        // Remove any existing toast
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        // Create new toast
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        // Add to document
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.opacity = 1;
            toast.style.transform = 'translateY(0)';
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            toast.style.opacity = 0;
            toast.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }
    
    // Function to shake element for invalid input
    function shakeElement(element) {
        element.classList.add('shake');
        setTimeout(() => {
            element.classList.remove('shake');
        }, 500);
    }
    
    // Function to show weight gain tips modal
    function showWeightGainTips() {
        // Create modal elements
        const modal = document.createElement("div");
        modal.id = "tips-modal";
        modal.className = "modal";
        
        const modalContent = document.createElement("div");
        modalContent.className = "modal-content";
        
        const closeBtn = document.createElement("span");
        closeBtn.className = "close-modal";
        closeBtn.innerHTML = "&times;";
        closeBtn.onclick = function() {
            modal.style.opacity = "0";
            setTimeout(() => {
                modal.remove();
            }, 300);
        };
        
        const modalTitle = document.createElement("h2");
        modalTitle.textContent = "Healthy Weight Gain Tips";
        
        const modalText = document.createElement("div");
        modalText.className = "tips-content";
        
        // Format the tips text with proper line breaks
        const formattedTips = bmiContent["Underweight"].weightGainTips.replace(/\n/g, '<br>');
        modalText.innerHTML = formattedTips;
        
        // Assemble the modal
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(modalText);
        modal.appendChild(modalContent);
        
        // Add to document and animate in
        document.body.appendChild(modal);
        setTimeout(() => {
            modal.style.opacity = "1";
        }, 10);
        
        // Close modal when clicking outside content
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.opacity = "0";
                setTimeout(() => {
                    modal.remove();
                }, 300);
            }
        };
    }
    
    // Function to show women's equipment recommendations
    function showWomenEquipment() {
        // Create modal elements
        const modal = document.createElement("div");
        modal.id = "equipment-modal";
        modal.className = "modal";
        
        const modalContent = document.createElement("div");
        modalContent.className = "modal-content";
        
        const closeBtn = document.createElement("span");
        closeBtn.className = "close-modal";
        closeBtn.innerHTML = "&times;";
        closeBtn.onclick = function() {
            modal.style.opacity = "0";
            setTimeout(() => {
                modal.remove();
            }, 300);
        };
        
        const modalTitle = document.createElement("h2");
        modalTitle.textContent = "Best Equipment to Add Muscle";
        
        const modalText = document.createElement("div");
        modalText.className = "equipment-content";
        
        // Create equipment list with affiliate links for women
        const womenEquipment = bmiContent["Underweight"].womenEquipment;
        const equipmentHTML = `
            <p>Here are the best equipment options to help you build muscle and gain healthy weight:</p>
            <ul class="equipment-list">
                <li><a href="${womenEquipment.pilates.url}" target="_blank" class="affiliate-link">${womenEquipment.pilates.text}</a> - Great for building core strength and lean muscle with low-impact exercises.</li>
                <li><a href="${womenEquipment.resistanceBands.url}" target="_blank" class="affiliate-link">${womenEquipment.resistanceBands.text}</a> - Versatile and portable resistance training for full-body workouts.</li>
                <li><a href="${womenEquipment.exerciseBike.url}" target="_blank" class="affiliate-link">${womenEquipment.exerciseBike.text}</a> - Excellent for building lower body strength and cardiovascular health.</li>
            </ul>
            <p>Combining these equipment options with proper nutrition is the key to healthy weight gain and muscle development.</p>
        `;
        
        modalText.innerHTML = equipmentHTML;
        
        // Assemble the modal
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(modalText);
        modal.appendChild(modalContent);
        
        // Add to document and animate in
        document.body.appendChild(modal);
        setTimeout(() => {
            modal.style.opacity = "1";
        }, 10);
        
        // Close modal when clicking outside content
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.opacity = "0";
                setTimeout(() => {
                    modal.remove();
                }, 300);
            }
        };
    }
    
    // Function to show generic equipment recommendations for men
    function showGenericEquipment() {
        // Create modal elements
        const modal = document.createElement("div");
        modal.id = "equipment-modal";
        modal.className = "modal";
        
        const modalContent = document.createElement("div");
        modalContent.className = "modal-content";
        
        const closeBtn = document.createElement("span");
        closeBtn.className = "close-modal";
        closeBtn.innerHTML = "&times;";
        closeBtn.onclick = function() {
            modal.style.opacity = "0";
            setTimeout(() => {
                modal.remove();
            }, 300);
        };
        
        const modalTitle = document.createElement("h2");
        modalTitle.textContent = "Best Equipment to Add Muscle";
        
        const modalText = document.createElement("div");
        modalText.className = "equipment-content";
        
        // Create equipment list with affiliate links and images for men
        const equipmentHTML = `
            <p>Here are the best equipment options to help you build muscle and gain healthy weight:</p>
            <div class="equipment-item">
                <div class="equipment-image">
                    <img src="images/equipment/dumbbells/image_0.png" alt="Dumbbells" class="product-image">
                </div>
                <div class="equipment-details">
                    <h3><a href="https://amzn.to/3Fc6NEC" target="_blank" class="affiliate-link">Dumbbells</a></h3>
                    <p>Perfect for progressive overload and building strength at home. Essential for beginners looking to add muscle mass.</p>
                    <a href="https://amzn.to/3Fc6NEC" target="_blank" class="buy-now-button">Check Price</a>
                </div>
            </div>
            
            <div class="equipment-item">
                <div class="equipment-image">
                    <img src="images/equipment/bench/image_0.png" alt="Weight Bench" class="product-image">
                </div>
                <div class="equipment-details">
                    <h3><a href="https://amzn.to/4kzrngZ" target="_blank" class="affiliate-link">Weight Bench</a></h3>
                    <p>Versatile equipment for a complete home gym setup and various strength exercises.</p>
                    <a href="https://amzn.to/4kzrngZ" target="_blank" class="buy-now-button">Check Price</a>
                </div>
            </div>
            
            <div class="equipment-item">
                <div class="equipment-details">
                    <h3><a href="https://amzn.to/3UQnwHO" target="_blank" class="affiliate-link">Protein Powder</a></h3>
                    <p>Support muscle growth with proper post-workout nutrition and recovery.</p>
                    <a href="https://amzn.to/3UQnwHO" target="_blank" class="buy-now-button">Check Price</a>
                </div>
            </div>
            
            <p>Combining these equipment options with proper nutrition is the key to healthy weight gain and muscle development.</p>
        `;
        
        modalText.innerHTML = equipmentHTML;
        
        // Assemble the modal
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(modalText);
        modal.appendChild(modalContent);
        
        // Add to document and animate in
        document.body.appendChild(modal);
        setTimeout(() => {
            modal.style.opacity = "1";
        }, 10);
        
        // Close modal when clicking outside content
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.opacity = "0";
                setTimeout(() => {
                    modal.remove();
                }, 300);
            }
        };
    }
    
    // Function to show fitness maintenance tips
    function showFitnessMaintenance() {
        // Create modal elements
        const modal = document.createElement("div");
        modal.id = "fitness-modal";
        modal.className = "modal";
        
        const modalContent = document.createElement("div");
        modalContent.className = "modal-content";
        
        const closeBtn = document.createElement("span");
        closeBtn.className = "close-modal";
        closeBtn.innerHTML = "&times;";
        closeBtn.onclick = function() {
            modal.style.opacity = "0";
            setTimeout(() => {
                modal.remove();
            }, 300);
        };
        
        const modalTitle = document.createElement("h2");
        modalTitle.textContent = "Tips for Maintaining Body Shape & Fitness";
        
        const modalText = document.createElement("div");
        modalText.className = "fitness-content";
        
        // Format the fitness tips text with proper line breaks
        const formattedTips = bmiContent["Normal weight"].fitnessMaintenanceTips.replace(/\n/g, '<br>');
        modalText.innerHTML = formattedTips;
        
        // Assemble the modal
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(modalText);
        modal.appendChild(modalContent);
        
        // Add to document and animate in
        document.body.appendChild(modal);
        setTimeout(() => {
            modal.style.opacity = "1";
        }, 10);
        
        // Close modal when clicking outside content
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.opacity = "0";
                setTimeout(() => {
                    modal.remove();
                }, 300);
            }
        };
    }
    
    // Function to show holiday recommendations
    function showHolidayRecommendations() {
        // Create modal elements
        const modal = document.createElement("div");
        modal.id = "holiday-modal";
        modal.className = "modal";
        
        const modalContent = document.createElement("div");
        modalContent.className = "modal-content";
        
        const closeBtn = document.createElement("span");
        closeBtn.className = "close-modal";
        closeBtn.innerHTML = "&times;";
        closeBtn.onclick = function() {
            modal.style.opacity = "0";
            setTimeout(() => {
                modal.remove();
            }, 300);
        };
        
        const modalTitle = document.createElement("h2");
        modalTitle.textContent = "Celebrate Your Healthy Weight with a Holiday!";
        
        const modalText = document.createElement("div");
        modalText.className = "holiday-content";
        
        // Create holiday list with affiliate links
        const holidayHTML = `
            <p>You've earned it! Here are some fantastic holiday options to reward your healthy lifestyle:</p>
            <ul class="holiday-list">
                <li><a href="https://www.booking.com/index.html?aid=1610682" target="_blank" class="affiliate-link">Booking.com</a> - Find the perfect accommodation for your well-deserved break. From luxury hotels to cozy apartments, there's something for every healthy traveler!</li>
                <li><a href="https://www.awin1.com/cread.php?awinmid=2615&awinaffid=1234567" target="_blank" class="affiliate-link">TUI Holidays</a> - Discover all-inclusive packages to beautiful beach destinations. Perfect for relaxing and maintaining your healthy routine!</li>
                <li><a href="https://www.jet2holidays.com/affiliate-programme" target="_blank" class="affiliate-link">Jet2holidays</a> - Explore city breaks and beach getaways with one of the UK's leading holiday companies.</li>
            </ul>
            <p>Remember, maintaining your healthy weight is easier when you're relaxed and happy. A holiday is the perfect reward for your commitment to wellness!</p>
        `;
        
        modalText.innerHTML = holidayHTML;
        
        // Assemble the modal
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(modalText);
        modal.appendChild(modalContent);
        
        // Add to document and animate in
        document.body.appendChild(modal);
        setTimeout(() => {
            modal.style.opacity = "1";
        }, 10);
        
        // Close modal when clicking outside content
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.opacity = "0";
                setTimeout(() => {
                    modal.remove();
                }, 300);
            }
        };
    }
});
