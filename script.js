// Initial questions data
let questions = [
    {
        id: 1,
        text_en: "Which of the following is the capital of France?",
        text_hi: "निम्नलिखित में से फ्रांस की राजधानी कौन सी है?",
        image: null,
        options: [
            { text_en: "Berlin", text_hi: "बर्लिन", image: null },
            { text_en: "Madrid", text_hi: "मैड्रिड", image: null },
            { text_en: "Paris", text_hi: "पेरिस", image: null },
            { text_en: "Rome", text_hi: "रोम", image: null }
        ],
        selectedOption: null,
        correctOption: "option3", // Paris is option3
        status: 'not-visited' // 'not-visited', 'not-answered', 'answered', 'marked-for-review', 'answered-marked-for-review'
    },
    {
        id: 2,
        text_en: "Which answer figure will complete the pattern in the question figure?",
        text_hi: "कौन सी उत्तर आकृति प्रश्न आकृति में पैटर्न को पूरा करेगी?",
        image: "https://placehold.co/192x192/E5E7EB/374151?text=Question+Figure",
        options: [
            { text_en: null, text_hi: null, image: "https://placehold.co/48x48/E5E7EB/374151?text=Option+1" },
            { text_en: null, text_hi: null, image: "https://placehold.co/48x48/E5E7EB/374151?text=Option+2" },
            { text_en: null, text_hi: null, image: "https://placehold.co/48x48/E5E7EB/374151?text=Option+3" },
            { text_en: null, text_hi: null, image: "https://placehold.co/48x48/E5E7EB/374151?text=Option+4" }
        ],
        selectedOption: null,
        correctOption: "option4", // Assuming option 4 is correct for this image-based question
        status: 'not-visited'
    },
    {
        id: 3,
        text_en: "What is the chemical symbol for water?",
        text_hi: "पानी का रासायनिक प्रतीक क्या है?",
        image: null,
        options: [
            { text_en: "O2", text_hi: "O2", image: null },
            { text_en: "CO2", text_hi: "CO2", image: null },
            { text_en: "H2O", text_hi: "H2O", image: null }, // Correct option
            { text_en: "NaCl", text_hi: "NaCl", image: null }
        ],
        selectedOption: null,
        correctOption: "option3", // H2O is option3
        status: 'not-visited'
    },
    {
        id: 4,
        text_en: "Solve for x: 2x + 5 = 15",
        text_hi: "x के लिए हल करें: 2x + 5 = 15",
        image: null,
        options: [
            { text_en: "x = 5", text_hi: "x = 5", image: null }, // Correct option (2*5+5 = 15)
            { text_en: "x = 10", text_hi: "x = 10", image: null },
            { text_en: "x = 2.5", text_hi: "x = 2.5", image: null },
            { text_en: "x = 7.5", text_hi: "x = 7.5", image: null }
        ],
        selectedOption: null,
        correctOption: "option1", // x=5 is option1
        status: 'not-visited'
    }
];

// Add 21 more distinct generic questions to reach a total of 25 (5-25)
for (let i = 5; i <= 25; i++) {
    questions.push({
        id: i,
        text_en: `This is a unique placeholder question number ${i}. Consider the following statement and choose the best option.`,
        text_hi: `यह एक अद्वितीय प्लेसहोल्डर प्रश्न संख्या ${i} है। निम्नलिखित कथन पर विचार करें और सबसे अच्छा विकल्प चुनें।`,
        image: null,
        options: [
            { text_en: `Option A for Unique Q${i}`, text_hi: `अद्वितीय प्रश्न ${i} के लिए विकल्प ए`, image: null },
            { text_en: `Option B for Unique Q${i}`, text_hi: `अद्वितीय प्रश्न ${i} के लिए विकल्प बी`, image: null },
            { text_en: `Option C for Unique Q${i}`, text_hi: `अद्वितीय प्रश्न ${i} के लिए विकल्प सी`, image: null },
            { text_en: `Option D for Unique Q${i}`, text_hi: `अद्वितीय प्रश्न ${i} के लिए विकल्प डी`, image: null }
        ],
        selectedOption: null,
        correctOption: `option${(i % 4) + 1}`, // Assigning a rotating correct option for demo
        status: 'not-visited'
    });
}

let currentQuestionIndex = 0;
// --- REVERTED TO NORMAL TIME VALUES ---
let timeLeft = 3 * 60 * 60; // 3 hours in seconds
let timerInterval;
let currentLanguage = 'en'; // Default language

// Flags to ensure time warnings appear only once
let twoHourWarningShown = false;
let oneHourWarningShown = false;
let thirtyMinWarningShown = false; // New flag
let fifteenMinWarningShown = false;
let tenMinWarningShown = false; // New flag
let fiveMinWarningShown = false; // New flag


// Translations object
const translations = {
    en: {
        'exam_title': 'SSC CGL (New Exam Interface) 2025 All India Mega Live Test',
        'time_left_label': 'Time Left',
        'fullscreen_button': 'Switch Full Screen',
        'symbols_tab': 'SYMBOLS',
        'instructions_tab': 'INSTRUCTIONS',
        'part_a': 'PART-A',
        'part_b': 'PART-B',
        'part_c': 'PART-C',
        'part_d': 'PART-D', // Added translation for Part D
        'part_e': 'PART-E', // Added translation for Part E
        'part_f': 'PART-F', // Added translation for Part F
        'reasoning_section_title': 'General Intelligence and Reasoning',
        'analysis_section_title': 'PART-A Analysis',
        'answered_label': 'Answered',
        'not_answered_label': 'Not Answered',
        'visited_label': 'Visited', // New translation
        'not_visited_label': 'Not Visited', // New translation
        'mark_review_next_top_button': 'Mark for Review & Next',
        'save_next_top_button': 'Save & Next',
        'submit_test_button': 'Submit Test',
        'save_next_bottom_button': 'Save & Next',
        'previous_button': 'Previous',
        'mark_for_review_button': 'Mark for Review',
        'unmark_review_button': 'Unmark Review',
        'select_language_label': 'Select Language',
        'report_button': 'Report',
        'instructions_modal_title': 'Instructions',
        'instructions_modal_text': 'The different symbols used in the next pages are shown below. Please go through them and understand their meaning before you start the test.',
        'symbol_header': 'Symbol',
        'description_header': 'Description',
        'option_not_chosen': 'Option Not chosen',
        'q_blue_desc': 'Question number shown in blue color indicates that you have not yet attempted the question.',
        'q_green_desc': 'Question number shown in green color indicates that you have answered the question.',
        'q_red_desc': 'You have not yet answered the question, but marked it for coming back for review later, if time permits.',
        'q_purple_desc': 'You have answered the question, but marked it for review later, if time permits.',
        'save_next_btn_short': 'Save & Next',
        'save_next_desc': 'Clicking on this will take you to the next question.',
        'previous_btn_short': 'Previous',
        'previous_desc': 'Clicking on this will take you to the previous question.',
        'mark_review_btn_short': 'Mark for Review',
        'mark_review_desc': 'By clicking on this button, you can mark the question for review later. Please note that if you answer the question and mark for review, the question will be treated as answered and evaluated even if you do not review it.',
        'unmark_review_btn_short': 'Unmark Review',
        'unmark_review_desc': 'By clicking on this button, you can unmark the question for review',
        'confirm_submit_title': 'Confirm Submission',
        'confirm_submit_message': 'Are you sure you want to submit the test?',
        'total_questions_summary': 'Total Questions',
        'answered_summary': 'Answered',
        'marked_for_review_summary': 'Marked for Review',
        'not_answered_summary': 'Not Answered',
        'confirm_button': 'Confirm',
        'cancel_button': 'Cancel',
        'question_no': 'Question No.',
        'last_label': 'Last', // Added for warning time
        'min_left_label': 'min left', // Added for warning time
        // New translations for results modal
        'results_modal_title': 'Test Results',
        'results_answered_label': 'Answered',
        'results_correct_label': 'Correct',
        'results_incorrect_label': 'Incorrect',
        'results_score_label': 'Your Score',
        'close_results_button': 'Close',
        // New translations for time warning modal
        'time_warning_title': 'Time Warning!',
        'time_warning_2hr': 'You have 2 hours left in the test.',
        'time_warning_1hr': 'You have 1 hour left in the test.',
        'time_warning_30min': 'You have 30 minutes left in the test.', // New
        'time_warning_15min': 'You have 15 minutes left in the test.',
        'time_warning_10min': 'You have 10 minutes left in the test.', // New
        'time_warning_5min': 'You have 5 minutes left in the test.',   // New
        'time_warning_close': 'Close'
    },
    hi: {
        'exam_title': 'एसएससी सीजीएल (नया परीक्षा इंटरफ़ेस) 2025 अखिल भारतीय मेगा लाइव टेस्ट',
        'time_left_label': 'शेष समय',
        'fullscreen_button': 'पूर्ण स्क्रीन पर स्विच करें',
        'symbols_tab': 'प्रतीक',
        'instructions_tab': 'निर्देश',
        'part_a': 'भाग-ए',
        'part_b': 'भाग-बी',
        'part_c': 'भाग-सी',
        'part_d': 'भाग-डी', // Added translation for Part D
        'part_e': 'भाग-ई', // Added translation for Part E
        'part_f': 'भाग-एफ', // Added translation for Part F
        'reasoning_section_title': 'सामान्य बुद्धि और तर्क',
        'analysis_section_title': 'भाग-ए विश्लेषण',
        'answered_label': 'उत्तर दिया गया',
        'not_answered_label': 'उत्तर नहीं दिया गया',
        'visited_label': 'देखे गए', // New translation
        'not_visited_label': 'नहीं देखे गए', // New translation
        'mark_review_next_top_button': 'समीक्षा और अगला चिह्नित करें',
        'save_next_top_button': 'सहेजें और अगला',
        'submit_test_button': 'टेस्ट जमा करें',
        'save_next_bottom_button': 'सहेजें और अगला',
        'previous_button': 'पिछला',
        'mark_for_review_button': 'समीक्षा के लिए चिह्नित करें',
        'unmark_review_button': 'समीक्षा से हटाएँ',
        'select_language_label': 'भाषा चुनें',
        'report_button': 'रिपोर्ट करें',
        'instructions_modal_title': 'निर्देश',
        'instructions_modal_text': 'अगले पृष्ठों में उपयोग किए गए विभिन्न प्रतीक नीचे दिखाए गए हैं। कृपया परीक्षण शुरू करने से पहले उन्हें पढ़ें और उनका अर्थ समझें।',
        'symbol_header': 'प्रतीक',
        'description_header': 'विवरण',
        'option_not_chosen': 'विकल्प नहीं चुना गया',
        'q_blue_desc': 'नीले रंग में दिखाया गया प्रश्न संख्या इंगित करता है कि आपने अभी तक प्रश्न का प्रयास नहीं किया है।',
        'q_green_desc': 'हरे रंग में दिखाया गया प्रश्न संख्या इंगित करता है कि आपने प्रश्न का उत्तर दिया है।',
        'q_red_desc': 'आपने अभी तक प्रश्न का उत्तर नहीं दिया है, लेकिन यदि समय अनुमति देता है, तो इसे बाद में समीक्षा के लिए चिह्नित किया गया है।',
        'q_purple_desc': 'आपने प्रश्न का उत्तर दिया है, लेकिन यदि समय अनुमति देता है, तो इसे बाद में समीक्षा के लिए चिह्नित किया गया है।',
        'save_next_btn_short': 'सहेजें और अगला',
        'save_next_desc': 'इस पर क्लिक करने से आप अगले प्रश्न पर चले जाएंगे।',
        'previous_btn_short': 'पिछला',
        'previous_desc': 'इस पर क्लिक करने से आप पिछले प्रश्न पर चले जाएंगे।',
        'mark_review_btn_short': 'समीक्षा के लिए चिह्नित करें',
        'mark_review_desc': 'इस बटन पर क्लिक करके, आप प्रश्न को बाद में समीक्षा के लिए चिह्नित कर सकते हैं। कृपया ध्यान दें कि यदि आप प्रश्न का उत्तर देते हैं और समीक्षा के लिए चिह्नित करते हैं, तो प्रश्न को उत्तरित माना जाएगा और मूल्यांकन किया जाएगा, भले ही आप उसकी समीक्षा न करें।',
        'unmark_review_btn_short': 'समीक्षा से हटाएँ',
        'unmark_review_desc': 'इस बटन पर क्लिक करके, आप प्रश्न से समीक्षा को हटा सकते हैं',
        'confirm_submit_title': 'पुष्टि जमा करें',
        'confirm_submit_message': 'क्या आप वाकई टेस्ट जमा करना चाहते हैं?',
        'total_questions_summary': 'कुल प्रश्न',
        'answered_summary': 'उत्तर दिया गया',
        'marked_for_review_summary': 'समीक्षा के लिए चिह्नित',
        'not_answered_summary': 'उत्तर नहीं दिया गया',
        'confirm_button': 'पुष्टि करें',
        'cancel_button': 'रद्द करें',
        'question_no': 'प्रश्न संख्या',
        'last_label': 'अंतिम', // Added for warning time
        'min_left_label': 'मिनट शेष', // Added for warning time
        // New translations for results modal
        'results_modal_title': 'परीक्षा परिणाम',
        'results_answered_label': 'उत्तर दिए गए',
        'results_correct_label': 'सही',
        'results_incorrect_label': 'गलत',
        'results_score_label': 'आपका स्कोर',
        'close_results_button': 'बंद करें',
        // New translations for time warning modal
        'time_warning_title': 'समय चेतावनी!',
        'time_warning_2hr': 'परीक्षा में 2 घंटे शेष हैं।',
        'time_warning_1hr': 'परीक्षा में 1 घंटा शेष है।',
        'time_warning_30min': 'परीक्षा में 30 मिनट शेष हैं।', // New
        'time_warning_15min': 'परीक्षा में 15 मिनट शेष हैं।',
        'time_warning_10min': 'परीक्षा में 10 मिनट शेष हैं।', // New
        'time_warning_5min': 'परीक्षा में 5 मिनट शेष हैं।',   // New
        'time_warning_close': 'बंद करें'
    }
};

// DOM Elements
const questionNumberDisplay = document.getElementById('question-number-display');
const questionTextElement = document.getElementById('question-text');
const questionImageContainer = document.getElementById('question-image-container');
const optionsContainer = document.getElementById('options-container');
const questionPaletteContainer = document.getElementById('question-palette-container');
const timeLeftDisplay = document.getElementById('time-left-display');
const totalAnsweredDisplay = document.getElementById('total-answered-display');
const totalNotAnsweredDisplay = document.getElementById('total-not-answered-display');
const totalVisitedDisplay = document.getElementById('total-visited-display');
const totalNotVisitedDisplay = document.getElementById('total-not-visited-display');
const warningTimeDisplay = document.getElementById('warning-time-display');
const totalQuestionsAnsweredHeader = document.querySelector('.header-total-answered-count'); // New: Added ID/Class to header span

const instructionsModal = document.getElementById("instructionsModal");
const submitConfirmationModal = document.getElementById("submitConfirmationModal");
const resultsModal = document.getElementById("resultsModal");
const timeWarningModal = document.getElementById("timeWarningModal"); // New modal element
const timeWarningTitle = document.getElementById("time-warning-title"); // New element
const timeWarningMessage = document.getElementById("time-warning-message"); // New element


// Functions
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(remainingSeconds).padStart(2, '0')}`;
}

function startTimer() {
    // --- REVERTED TO NORMAL INTERVAL ---
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timeLeftDisplay.textContent = formatTime(timeLeft);

            const WARNING_THRESHOLD_SECONDS_MAIN_DISPLAY = 55 * 60; // Existing warning for 55 min
            if (timeLeft <= WARNING_THRESHOLD_SECONDS_MAIN_DISPLAY && timeLeft > 0) {
                const remainingWarningMinutes = Math.ceil(timeLeft / 60);
                warningTimeDisplay.innerHTML = `<span class="text-blue-600">${translations[currentLanguage]['last_label']}</span> <span class="text-red-600">${remainingWarningMinutes} ${translations[currentLanguage]['min_left_label']}</span>`;
                warningTimeDisplay.classList.remove('hidden');
            } else {
                warningTimeDisplay.classList.add('hidden');
            }

            // New time-based warnings (actual values in seconds)
            const TWO_HOURS_IN_SECONDS = 2 * 60 * 60;
            const ONE_HOUR_IN_SECONDS = 1 * 60 * 60;
            const THIRTY_MINUTES_IN_SECONDS = 30 * 60;
            const FIFTEEN_MINUTES_IN_SECONDS = 15 * 60;
            const TEN_MINUTES_IN_SECONDS = 10 * 60;
            const FIVE_MINUTES_IN_SECONDS = 5 * 60;


            if (timeLeft === TWO_HOURS_IN_SECONDS && !twoHourWarningShown) {
                timeWarningTitle.textContent = translations[currentLanguage]['time_warning_title'];
                timeWarningMessage.textContent = translations[currentLanguage]['time_warning_2hr'];
                openModal('timeWarningModal');
                twoHourWarningShown = true;
            } else if (timeLeft === ONE_HOUR_IN_SECONDS && !oneHourWarningShown) {
                timeWarningTitle.textContent = translations[currentLanguage]['time_warning_title'];
                timeWarningMessage.textContent = translations[currentLanguage]['time_warning_1hr'];
                openModal('timeWarningModal');
                oneHourWarningShown = true;
            } else if (timeLeft === THIRTY_MINUTES_IN_SECONDS && !thirtyMinWarningShown) {
                timeWarningTitle.textContent = translations[currentLanguage]['time_warning_title'];
                timeWarningMessage.textContent = translations[currentLanguage]['time_warning_30min'];
                openModal('timeWarningModal');
                thirtyMinWarningShown = true;
            } else if (timeLeft === FIFTEEN_MINUTES_IN_SECONDS && !fifteenMinWarningShown) {
                timeWarningTitle.textContent = translations[currentLanguage]['time_warning_title'];
                timeWarningMessage.textContent = translations[currentLanguage]['time_warning_15min'];
                openModal('timeWarningModal');
                fifteenMinWarningShown = true;
            } else if (timeLeft === TEN_MINUTES_IN_SECONDS && !tenMinWarningShown) {
                timeWarningTitle.textContent = translations[currentLanguage]['time_warning_title'];
                timeWarningMessage.textContent = translations[currentLanguage]['time_warning_10min'];
                openModal('timeWarningModal');
                tenMinWarningShown = true;
            } else if (timeLeft === FIVE_MINUTES_IN_SECONDS && !fiveMinWarningShown) {
                timeWarningTitle.textContent = translations[currentLanguage]['time_warning_title'];
                timeWarningMessage.textContent = translations[currentLanguage]['time_warning_5min'];
                openModal('timeWarningModal');
                fiveMinWarningShown = true;
            }


        } else {
            clearInterval(timerInterval);
            console.log("Time's up! The test will be submitted automatically.");
            warningTimeDisplay.classList.add('hidden');
            showSubmitConfirmation();
        }
    }, 1000); // Reverted to 1 second interval
}

function renderQuestion(index) {
    const question = questions[index];
    if (!translations[currentLanguage]['question_no']) {
        translations[currentLanguage]['question_no'] = 'Question No.';
    }
    if (!translations['hi']['question_no']) {
        translations['hi']['question_no'] = 'प्रश्न संख्या';
    }

    questionNumberDisplay.textContent = `${translations[currentLanguage]['question_no']} ${question.id}`;
    questionTextElement.textContent = question[`text_${currentLanguage}`];

    // Mark question as 'not-answered' (visited) if it was 'not-visited'
    if (question.status === 'not-visited') {
        question.status = 'not-answered';
    }

    questionImageContainer.innerHTML = '';
    if (question.image) {
        const img = document.createElement('img');
        img.src = question.image;
        img.alt = `Question ${question.id} Image`;
        img.classList.add('max-w-full', 'max-h-full', 'object-contain');
        questionImageContainer.appendChild(img);
        questionImageContainer.classList.remove('hidden');
    } else {
        questionImageContainer.classList.add('hidden');
    }

    optionsContainer.innerHTML = '';
    question.options.forEach((option, i) => {
        const label = document.createElement('label');
        label.classList.add('flex', 'items-center', 'text-gray-700', 'cursor-pointer');

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'answer';
        input.value = `option${i + 1}`;
        input.classList.add('form-radio', 'h-5', 'w-5', 'text-blue-600', 'rounded-full');
        input.checked = (question.selectedOption === input.value);

        input.onchange = () => {
            questions[currentQuestionIndex].selectedOption = input.value;
            if (questions[currentQuestionIndex].status === 'not-visited' || questions[currentQuestionIndex].status === 'not-answered') {
                questions[currentQuestionIndex].status = 'answered';
            } else if (questions[currentQuestionIndex].status === 'marked-for-review') {
                questions[currentQuestionIndex].status = 'answered-marked-for-review';
            }
            updateQuestionPalette();
        };

        const span = document.createElement('span');
        span.classList.add('ml-3', 'text-base');

        if (option[`text_${currentLanguage}`]) {
            span.textContent = option[`text_${currentLanguage}`];
        } else if (option.image) {
            const img = document.createElement('img');
            img.src = option.image;
            img.alt = `Option ${i + 1}`;
            img.classList.add('inline-block', 'w-12', 'h-12', 'object-contain', 'ml-2');
            span.appendChild(img);
        }

        label.appendChild(input);
        label.appendChild(span);
        optionsContainer.appendChild(label);
    });
}

function updateQuestionPalette() {
    questionPaletteContainer.innerHTML = '';
    
    questions.forEach((q, index) => {
        const button = document.createElement('button');
        button.classList.add('question-palette-button');
        button.textContent = q.id;

        button.classList.remove('not-visited', 'not-answered', 'answered', 'marked-for-review', 'answered-marked-for-review', 'active-question');

        if (q.status === 'answered' || q.status === 'answered-marked-for-review') {
            button.classList.add('answered');
        } else if (q.status === 'marked-for-review') {
            button.classList.add('marked-for-review');
        } else if (q.status === 'not-answered') {
            button.classList.add('not-answered');
        }
        else { // 'not-visited'
            button.classList.add('not-visited');
        }

        if (index === currentQuestionIndex) {
            // Remove active-question from all other buttons before adding to the current one
            document.querySelectorAll('.question-palette-button').forEach(btn => {
                btn.classList.remove('active-question');
            });
            button.classList.add('active-question');
        }

        button.onclick = () => {
            currentQuestionIndex = index;
            // When a question is clicked, if it was 'not-visited', change it to 'not-answered'
            if (questions[currentQuestionIndex].status === 'not-visited') {
                questions[currentQuestionIndex].status = 'not-answered';
            }
            renderQuestion(currentQuestionIndex);
            updateQuestionPalette(); // Call again to update active state and counts
        };
        questionPaletteContainer.appendChild(button);
    });

    // Recalculate counts for analysis section based on current question statuses
    let answeredCount = questions.filter(q => q.status === 'answered' || q.status === 'answered-marked-for-review').length;
    let notAnsweredCount = questions.filter(q => q.status === 'not-answered' || q.status === 'marked-for-review').length;
    let visitedCount = questions.filter(q => q.status !== 'not-visited').length;
    let notVisitedCount = questions.filter(q => q.status === 'not-visited').length;

    totalAnsweredDisplay.textContent = answeredCount;
    totalNotAnsweredDisplay.textContent = notAnsweredCount;
    totalVisitedDisplay.textContent = visitedCount;
    totalNotVisitedDisplay.textContent = notVisitedCount;

    // Update the "Total Questions Answered" in the header
    document.querySelector('.header-total-answered-count').textContent = answeredCount;
}

// Button Handlers
function saveAndNext() {
    if (questions[currentQuestionIndex].selectedOption !== null) {
        if (questions[currentQuestionIndex].status === 'not-visited' || questions[currentQuestionIndex].status === 'not-answered' || questions[currentQuestionIndex].status === 'marked-for-review') {
            questions[currentQuestionIndex].status = 'answered';
        }
    } else {
        // If no option is selected, and it was 'not-visited' or 'marked-for-review', make it 'not-answered'
        if (questions[currentQuestionIndex].status === 'not-visited' || questions[currentQuestionIndex].status === 'marked-for-review') {
            questions[currentQuestionIndex].status = 'not-answered';
        }
    }

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        // Ensure the next question's status is updated if it was 'not-visited'
        if (questions[currentQuestionIndex].status === 'not-visited') {
            questions[currentQuestionIndex].status = 'not-answered';
        }
        renderQuestion(currentQuestionIndex);
        updateQuestionPalette();
    } else {
        console.log("You are on the last question. Click 'Submit Test' to finish.");
        updateQuestionPalette(); // Update palette for the last question's status change
    }
}

function markForReviewAndNext() {
    if (questions[currentQuestionIndex].selectedOption !== null) {
        questions[currentQuestionIndex].status = 'answered-marked-for-review';
    } else {
        questions[currentQuestionIndex].status = 'marked-for-review';
    }

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        // Ensure the next question's status is updated if it was 'not-visited'
        if (questions[currentQuestionIndex].status === 'not-visited') {
            questions[currentQuestionIndex].status = 'not-answered';
        }
        renderQuestion(currentQuestionIndex);
        updateQuestionPalette();
    } else {
        console.log("You are on the last question. Marked for review. Click 'Submit Test' to finish.");
        updateQuestionPalette(); // Update palette for the last question's status change
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion(currentQuestionIndex);
        updateQuestionPalette();
    } else {
        console.log("You are on the first question.");
    }
}

function markForReview() {
    if (questions[currentQuestionIndex].selectedOption !== null) {
        questions[currentQuestionIndex].status = 'answered-marked-for-review';
    } else {
        questions[currentQuestionIndex].status = 'marked-for-review';
    }
    updateQuestionPalette();
}

function unmarkReview() {
    if (questions[currentQuestionIndex].selectedOption !== null) {
        questions[currentQuestionIndex].status = 'answered';
    } else {
        questions[currentQuestionIndex].status = 'not-answered';
    }
    updateQuestionPalette();
}

function showSubmitConfirmation() {
    let answeredCount = 0;
    let markedForReviewCount = 0;
    let notAnsweredCount = 0;

    questions.forEach(q => {
        if (q.status === 'answered' || q.status === 'answered-marked-for-review') {
            answeredCount++;
        } else if (q.status === 'marked-for-review') {
            markedForReviewCount++;
        } else if (q.status === 'not-answered' || q.status === 'not-visited') {
            notAnsweredCount++;
        }
    });

    // Update total questions in submit confirmation modal
    document.getElementById('total-questions-summary').textContent = `${translations[currentLanguage]['total_questions_summary']}: ${questions.length}`;
    document.getElementById('answered-count').textContent = answeredCount;
    document.getElementById('marked-for-review-count').textContent = markedForReviewCount;
    document.getElementById('not-answered-count').textContent = notAnsweredCount;

    submitConfirmationModal.style.display = 'flex';
    clearInterval(timerInterval);
}

function confirmSubmit() {
    closeModal('submitConfirmationModal');

    let answeredCount = 0;
    let correctCount = 0;
    let incorrectCount = 0;

    questions.forEach(q => {
        if (q.selectedOption !== null) {
            answeredCount++;
            if (q.selectedOption === q.correctOption) {
                correctCount++;
            } else {
                incorrectCount++;
            }
        }
    });

    // Update total questions and max score in results modal
    document.getElementById('results-total-questions').textContent = `${translations[currentLanguage]['total_questions_summary']}: ${questions.length}`;
    document.getElementById('results-answered-count').textContent = answeredCount;
    document.getElementById('results-correct-count').textContent = correctCount;
    document.getElementById('results-incorrect-count').textContent = incorrectCount;
    document.getElementById('results-score-value').textContent = correctCount;
    document.getElementById('results-max-score').textContent = questions.length; // Ensure this also reflects the new total

    openModal('resultsModal');
    console.log("Test submitted and results displayed!");
}

function cancelSubmit() {
    submitConfirmationModal.style.display = 'none';
    startTimer();
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(e => {
            console.log(`Error attempting to enable full-screen mode: ${e.message} (${e.name})`);
        });
    } else {
        document.exitFullscreen();
    }
}

function setLanguage(lang) {
    currentLanguage = lang;
    document.getElementById('exam-title').textContent = translations[lang]['exam_title'];
    document.getElementById('time-left-label').textContent = translations[lang]['time_left_label'];
    document.getElementById('fullscreen-button').textContent = translations[lang]['fullscreen_button'];
    document.getElementById('symbols-tab').textContent = translations[lang]['symbols_tab'];
    document.getElementById('instructions-tab').textContent = translations[lang]['instructions_tab'];
    document.getElementById('part-a-button').textContent = translations[lang]['part_a'];
    document.getElementById('part-b-button').textContent = translations[lang]['part_b'];
    document.getElementById('part-c-button').textContent = translations[lang]['part_c'];
    document.querySelector('#part-navigation button:nth-child(4)').textContent = translations[lang]['part_d'];
    document.querySelector('#part-navigation button:nth-child(5)').textContent = translations[lang]['part_e'];
    document.querySelector('#part-navigation button:nth-child(6)').textContent = translations[lang]['part_f'];

    document.getElementById('reasoning-section-title').textContent = translations[lang]['reasoning_section_title'];
    document.getElementById('analysis-section-title').textContent = translations[lang]['analysis_section_title'];
    document.getElementById('answered-label').textContent = translations[lang]['answered_label'];
    document.getElementById('not-answered-label').textContent = translations[lang]['not_answered_label'];
    document.getElementById('visited-label').textContent = translations[lang]['visited_label'];
    document.getElementById('not-visited-label').textContent = translations[lang]['not_visited_label'];

    document.getElementById('mark-review-next-top-button').textContent = translations[lang]['mark_review_next_top_button'];
    document.getElementById('save-next-top-button').textContent = translations[lang]['save_next_top_button'];
    document.getElementById('submit-test-button').textContent = translations[lang]['submit_test_button'];
    document.getElementById('save-next-bottom-button').textContent = translations[lang]['save_next_bottom_button'];
    document.getElementById('previous-button').textContent = translations[lang]['previous_button'];
    document.getElementById('mark-for-review-button').textContent = translations[lang]['mark_for_review_button'];
    document.getElementById('unmark-review-button').textContent = translations[lang]['unmark_review_button'];
    document.getElementById('select-language-label').textContent = translations[lang]['select_language_label'];
    // document.getElementById('report-button').textContent = translations[lang]['report_button']; // No report button currently

    document.getElementById('instructions-modal-title').textContent = translations[lang]['instructions_modal_title'];
    document.getElementById('instructions-modal-text').textContent = translations[lang]['instructions_modal_text'];
    document.getElementById('symbol-header').textContent = translations[lang]['symbol_header'];
    document.getElementById('description-header').textContent = translations[lang]['description_header'];

    document.querySelectorAll('#instructionsModal [data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    document.getElementById('confirm-submit-title').textContent = translations[lang]['confirm_submit_title'];
    document.getElementById('confirm-submit-message').textContent = translations[lang]['confirm_submit_message'];
    document.getElementById('total-questions-summary').textContent = `${translations[lang]['total_questions_summary']}: ${questions.length}`;
    document.getElementById('answered-summary').childNodes[0].nodeValue = `${translations[lang]['answered_summary']}: `;
    document.getElementById('marked-for-review-summary').childNodes[0].nodeValue = `${translations[lang]['marked_for_review_summary']}: `;
    document.getElementById('not-answered-summary').childNodes[0].nodeValue = `${translations[lang]['not_answered_summary']}: `;
    document.getElementById('confirm-submit-button').textContent = translations[lang]['confirm_button'];
    document.getElementById('cancel-submit-button').textContent = translations[lang]['cancel_button'];

    document.getElementById('results-modal-title').textContent = translations[lang]['results_modal_title'];
    document.getElementById('results-answered-label').textContent = translations[lang]['results_answered_label'];
    document.getElementById('results-correct-label').textContent = translations[lang]['results_correct_label'];
    document.getElementById('results-incorrect-label').textContent = translations[lang]['results_incorrect_label'];
    document.getElementById('results-score-label').textContent = translations[lang]['results_score_label'];
    document.getElementById('close-results-button').textContent = translations[lang]['close_results_button'];

    // Update time warning modal translations
    document.getElementById('time-warning-title').textContent = translations[lang]['time_warning_title'];
    document.getElementById('close-time-warning-button').textContent = translations[lang]['time_warning_close'];
    // The message itself will be set dynamically by startTimer, but ensure the title/button are translated.


    const WARNING_THRESHOLD_SECONDS_MAIN_DISPLAY = 55 * 60;
    if (timeLeft <= WARNING_THRESHOLD_SECONDS_MAIN_DISPLAY && timeLeft > 0) {
        const remainingWarningMinutes = Math.ceil(timeLeft / 60);
        warningTimeDisplay.innerHTML = `<span class="text-blue-600">${translations[currentLanguage]['last_label']}</span> <span class="text-red-600">${remainingWarningMinutes} ${translations[currentLanguage]['min_left_label']}</span>`;
        warningTimeDisplay.classList.remove('hidden');
    } else {
        warningTimeDisplay.classList.add('hidden');
    }

    renderQuestion(currentQuestionIndex);
}

// Modal specific functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = "flex";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log('Script loaded and DOMContentLoaded event fired.');
    // Add a class/ID to the span in the header for "Total Questions Answered"
    // I will add a class to the span element like so:
    // <span class="bg-yellow-300 text-black px-1 rounded header-total-answered-count">0</span>
    // I assume you will update your HTML with this class for the next iteration.
    // For now, I will use a generic query selector that assumes it's the first span in that paragraph.
    const headerAnsweredSpan = document.querySelector('.flex-grow + div p:first-child span');
    if (headerAnsweredSpan) {
        headerAnsweredSpan.classList.add('header-total-answered-count');
    }


    renderQuestion(currentQuestionIndex);
    updateQuestionPalette();
    startTimer();
    setLanguage(currentLanguage);

    // Update total questions in submit and results modals on load
    document.getElementById('total-questions-summary').textContent = `${translations[currentLanguage]['total_questions_summary']}: ${questions.length}`;
    document.getElementById('results-total-questions').textContent = `${translations[currentLanguage]['total_questions_summary']}: ${questions.length}`;
    document.getElementById('results-max-score').textContent = questions.length;


    document.getElementById('save-next-top-button').onclick = saveAndNext;
    document.getElementById('mark-review-next-top-button').onclick = markForReviewAndNext;
    document.getElementById('save-next-bottom-button').onclick = saveAndNext;
    document.getElementById('previous-button').onclick = previousQuestion;
    document.getElementById('mark-for-review-button').onclick = markForReview;
    document.getElementById('unmark-review-button').onclick = unmarkReview;
    document.getElementById('submit-test-button').onclick = showSubmitConfirmation;
    document.getElementById('fullscreen-button').onclick = toggleFullScreen;

    document.getElementById('confirm-submit-button').onclick = confirmSubmit;
    document.getElementById('cancel-submit-button').onclick = cancelSubmit;

    document.getElementById('close-results-button').onclick = function() {
        closeModal('resultsModal');
    };

    // New event listener for the time warning modal close button
    document.getElementById('close-time-warning-button').onclick = function() {
        closeModal('timeWarningModal');
    };

    document.getElementById("instructions-tab").onclick = function() {
        openModal('instructionsModal');
    };
    document.querySelector("#instructionsModal .close-button").onclick = function() {
        closeModal('instructionsModal');
    };
    window.onclick = function(event) {
        if (event.target == instructionsModal) {
            closeModal('instructionsModal');
        }
        if (event.target == submitConfirmationModal) {
            cancelSubmit();
        }
        if (event.target == resultsModal) {
            closeModal('resultsModal');
        }
        if (event.target == timeWarningModal) { // Close time warning if clicked outside
            closeModal('timeWarningModal');
        }
    };

    document.querySelectorAll('.part-button').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.part-button').forEach(btn => {
                btn.classList.remove('bg-green-500', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-700');
            });
            this.classList.remove('bg-gray-200', 'text-gray-700');
            this.classList.add('bg-green-500', 'text-white');
            this.scrollIntoView({ behavior: 'smooth', inline: 'center' });
            console.log(`${this.textContent} clicked`);
        });
    });

    document.getElementById('language-select').addEventListener('change', function() {
        setLanguage(this.value);
    });

    document.getElementById('symbols-tab').addEventListener('click', function() {
        this.classList.add('border-blue-600', 'text-blue-600');
        document.getElementById('instructions-tab').classList.remove('border-blue-600', 'text-blue-600');
        document.getElementById('instructions-tab').classList.add('text-gray-600');
        closeModal('instructionsModal');
    });
});