const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.question-wrapper');
    question.addEventListener('click', () => {
        const answers = document.querySelectorAll('.faq-answer');
        answers.forEach(answer => {
            if (answer == item.querySelector('.faq-answer')) {
                return;
            }
            answer.classList.add('hidden');
        });
        const chevrons = document.querySelectorAll('i');
        chevrons.forEach(chevron => {
            chevron.classList.remove('rotate');
        });
        const answer = item.querySelector('.faq-answer');
        const chevron = item.querySelector('i');
        answer.classList.toggle('hidden');
        chevron.classList.toggle('rotate');
    });
});

const faqSectionLinks = document.querySelectorAll('.faq-links');

faqSectionLinks.forEach(link => {
    link.addEventListener('click', () => {
        const id = link.getAttribute('id');
        const item = document.querySelector(`#${id}-faqs`);
        for (const section of document.querySelectorAll('.faqs')) {
            section.classList.add('hidden');
        }
        item.classList.remove('hidden');
        for (const link of faqSectionLinks) {
            link.classList.remove('selected');
        }
        link.classList.add('selected');
    });
});