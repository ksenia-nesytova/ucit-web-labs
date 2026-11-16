const deposits = {
    replenishable: [
        { period: '6 месяцев', months: 6, rate: 20 },
        { period: '1 год', months: 12, rate: 22 },
        { period: '1,5 года', months: 18, rate: 15 },
        { period: '2 года', months: 24, rate: 10 },
    ],
    fixed: [
        { period: '3 месяца', months: 3, rate: 20 },
        { period: '6 месяцев', months: 6, rate: 22 },
        { period: '9 месяцев', months: 9, rate: 23 },
        { period: '1 год', months: 12, rate: 24 },
        { period: '1,5 года', months: 18, rate: 18 },
        { period: '2 года', months: 24, rate: 15 },
    ],
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

    period.replaceChildren();

    const placeholder = new Option('Выберите срок вклада', '', true, true);
    placeholder.disabled = true;
    period.appendChild(placeholder);

    if (!currentType) {
        period.disabled = true;
        return;
    }

    period.disabled = false;

    deposits[currentType].forEach(deposit => {
        period.add(new Option(deposit.period, deposit.period));
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

    if (!selectedDeposit || !Number.isFinite(amount) || amount <= 0) {
        return;
    }

    const { rate, months } = selectedDeposit;
    const finalAmount = amount * (1 + (rate / 100) * (months / 12));

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

function hideResult() {
    result.classList.add('hidden');
}

// Event Listeners
type.addEventListener('change', () => {
    updatePeriods();
    hideResult();
});

period.addEventListener('change', hideResult);
amount.addEventListener('input', hideResult);

form.addEventListener('submit', (event) => { 
    event.preventDefault();

    if (!form.reportValidity()) {
        return;
    }

    calculateFinalDeposit();
})

// Init
updatePeriods();
