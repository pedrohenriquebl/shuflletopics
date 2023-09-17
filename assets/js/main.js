function generateTopicsToMembers () {
    return {
        inputsNames: document.querySelectorAll('.names'),
        inputsTopics: document.querySelectorAll('.topics'),
        buttonGenerate: document.querySelector('.generate'),
        resultTemplate: document.querySelector('.result'),
        showResultTemplate: document.querySelector('.show-result'),
        buttonClean: document.querySelector('.clean'),
        allInputs: document.querySelectorAll('.large'),
        errorContainer: document.querySelector('.error'),
        firstStepContainer: document.querySelector('.initial-step'),
        secondStepContainer: document.querySelector('.second-step'),
        backButton: document.querySelector('.back'),

        initiate() {
            this.listenToSubmit();
            this.clearInputs();
            this.hideResult();

            this.allInputs.forEach((input) => {
                input.addEventListener('click', () => {
                    this.hideErrorMessage();
                })
            })
        },

        hideErrorMessage() {
            this.errorContainer.style.display = 'none'
        },

        showErrorMessage() {
            this.errorContainer.style.display = 'block'

            setTimeout(() => {
                this.hideErrorMessage();
            }, 3000)
        },

        hideResult() {
            this.showResultTemplate.style.display = 'none';
            this.secondStepContainer.classList.add('hidden');
        },

        showResult() {
            this.firstStepContainer.classList.add('hidden');
            this.secondStepContainer.classList.remove('hidden');
            this.showResultTemplate.style.display = 'block';
            this.backToFirstStep();
        },

        backToFirstStep() {
            this.backButton.addEventListener('click', () => {
                this.firstStepContainer.classList.remove('hidden');
                this.secondStepContainer.classList.add('hidden');
            })
        },

        clearResults() {
            this.resultTemplate.innerHTML = ''; // Clear the inner HTML of resultTemplate
        },

        areAllInputsFilled(inputs) {
            let allFilled = true;

            inputs.forEach(input => {
                if (!input.value) {
                    allFilled = false;
                    return;
                }
            });

            return allFilled;
        },

        listenToSubmit() {
            this.buttonGenerate.addEventListener('click', e =>  {
                e.preventDefault();
                this.hideResult();
                this.clearResults();

                const arrayOfNames = this.collectInput(this.inputsNames);
                const arrayOfTopics = this.collectInput(this.inputsTopics);

                if (!this.areAllInputsFilled(this.allInputs)) {
                    setTimeout(() => {
                        this.showErrorMessage();
                    }, 500)

                    return;
                }

                const reshuffledArray = this.throwBackArrays(arrayOfNames, arrayOfTopics);
                const [arrayNames, arrayTopic] = reshuffledArray;

                for (let i = 0; i < arrayNames.length; i++) {
                    this.renderElement(arrayNames[i], arrayTopic[i])
                }

                this.showResult();
            })
        },

        clearInputs() {
            this.buttonClean.addEventListener('click', e => {
                e.preventDefault();
                this.hideResult();
                this.clearResults();
                this.allInputs.forEach((input) => {
                    input.value = '';
                })
            })
        },

        collectInput(allInputs) {
            const arrSubject = [];

            for (let i = 0; i < allInputs.length; i++) {
                arrSubject.push(allInputs[i].value);
            }

            return arrSubject;
        },

        throwBackArrays (arrayName, arrayTopic) {
            return [this.shuffleArrays(arrayName), this.shuffleArrays(arrayTopic)];
        },

        shuffleArrays(arraySubject) {
            for (let i = arraySubject.length -1; i > 0; i--) {
                const shuffle = Math.floor(Math.random() * (i + 1));
                [arraySubject[i], arraySubject[shuffle]] = [arraySubject[shuffle], arraySubject[i]];
            }

            return arraySubject;
        },

        renderElement (name, topic) {
            const li = document.createElement('li');
            const span = document.createElement('span');
            const h1 = document.createElement('h1');
            h1.innerText = `${name}:  `
            span.innerText = topic;
            li.appendChild(h1);
            li.appendChild(span);
            this.resultTemplate.appendChild(li);
        },
    }
}

const shuffleTopicsAndMembers = generateTopicsToMembers();
shuffleTopicsAndMembers.initiate();