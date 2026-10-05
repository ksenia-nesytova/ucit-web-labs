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
const depositNames = {
    replenishable: "Пополняемый",
    fixed: "Срочный"
};

const form = document.getElementById('form');
const type = document.getElementById('type');
const period = document.getElementById('period');
const result = document.getElementById('result');

const depositType = document.getElementById('deposit-type');
const depositPeriod = document.getElementById('deposit-period');
const depositAmount = document.getElementById('deposit-amount');
const depositRate = document.getElementById('deposit-rate');
const depositTotal = document.getElementById('deposit-total');


function updatePeriods() { 
    const currentType = type.value;

    period.innerHTML = '';

    if (!currentType) {
        period.disabled = true;
        return;
    }

    period.disabled = false;

    deposits[currentType].forEach(deposit => {
        const option = document.createElement('option');

        option.textContent = deposit.period;
        option.value = deposit.period;

        period.appendChild(option);
    });
}

function getCurrentDeposit(type, period) {
    return deposits[type]
        .find((deposit) => deposit.period === period);
}

function calculateFinalDeposit() { 
    const currentType = type.value;
    const currentPeriod = period.value;
    const selectedDeposit = getCurrentDeposit(
        currentType,
        currentPeriod
    );

    const amount = Number(document.getElementById('amount').value);
    const rate = selectedDeposit.rate;
    const finalAmount = amount + (amount * rate / 100);

    result.classList.remove('hidden');

    depositType.textContent = depositNames[currentType];
    depositPeriod.textContent = currentPeriod;
    depositAmount.textContent = amount.toLocaleString("ru-RU", {
        style: "currency",
        currency: "RUB"
    });

    depositRate.textContent = `${rate}%`;

    depositTotal.textContent = finalAmount.toLocaleString("ru-RU", {
        style: "currency",
        currency: "RUB"
    });
}

// Event Listeners
type.addEventListener('change', () => {
    updatePeriods();
});


form.addEventListener('submit', (event) => { 
    event.preventDefault();
    calculateFinalDeposit();
})

// Init
updatePeriods();
