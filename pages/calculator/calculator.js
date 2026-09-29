const deposits = {
    replenishable: [
        { period: "6 месяцев", rate: 20 },
        { period: "1 год", rate: 22 },
        { period: "1,5 года", rate: 15 },
        { period: "2 года", rate: 10 }
    ],
    fixed: [
        { period: "3 месяца", rate: 20 },
        { period: "6 месяцев", rate: 22 },
        { period: "9 месяцев", rate: 23 },
        { period: "1 год", rate: 24 },
        { period: "1,5 года", rate: 18 },
        { period: "2 года", rate: 15 }
    ]
};

const form = document.getElementById('form');
const type = document.getElementById('type');
const period = document.getElementById('period');
const result = document.getElementById('result');

type.addEventListener('change', () => {
    const currentType = type.value;

    period.innerHTML = '';

    deposits[currentType].forEach(deposit => {
        const option = document.createElement('option');

        option.textContent = deposit.period;
        option.value = deposit.period;

        period.appendChild(option);
    });
});


form.addEventListener('submit', (event) => { 
    event.preventDefault();

    const currentType = type.value;
    const currentPeriod = period.value;
    const amount = Number(document.getElementById('amount').value);

    const selectedDeposit = deposits[currentType]
        .find((deposit) => deposit.period === currentPeriod);

    const rate = selectedDeposit.rate;
    const finalAmount = amount + (amount * rate / 100);

    result.innerHTML = `
    <p>Вклад ${currentType} на срок ${currentPeriod} на сумму ${amount}.
    <p>Итоговая сумма: ${finalAmount}</p>`;
})




