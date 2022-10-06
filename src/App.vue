<script lang="ts" setup>
import { computed, reactive, watch } from 'vue';

function formatDate(date: Date) {
  return `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, '0')}-${`${date.getDate()}`.padStart(2, '0')}`;
}

const data = reactive({
  interestRate: Number(localStorage.getItem('rate') ?? 2.3),
  baseDay: formatDate(new Date()),
  balance1: Number(localStorage.getItem('balance1') ?? 0),
  balance2: Number(localStorage.getItem('balance2') ?? 0),
});

const baseDate = computed(() => new Date(data.baseDay));
const lastDate = computed(() => {
  const base1 = new Date(baseDate.value.getFullYear(), baseDate.value.getMonth(), 1);
  let finalDate = new Date(base1.getFullYear(), base1.getMonth(), 21 - base1.getDay());

  if (finalDate <= baseDate.value) {
    const next1 = new Date(baseDate.value.getFullYear(), baseDate.value.getMonth() + 1, 1);
    finalDate = new Date(next1.getFullYear(), next1.getMonth(), 21 - next1.getDay());
  }

  return finalDate;
});
const totalBalance = computed(() => data.balance1 + data.balance2);

watch(() => data.interestRate, (i) => localStorage.setItem('rate', `${i}`));
watch(() => data.balance1, (b) => localStorage.setItem('balance1', `${b}`));
watch(() => data.balance2, (b) => localStorage.setItem('balance2', `${b}`));

interface Result {
  balance: number
  interest: number
  tax: number
}

function taxForInterest(interest: number) {
  const incomeTax = Math.floor(interest * 0.014) * 10;
  const residenceTax = Math.floor(incomeTax * 0.01) * 10;

  return incomeTax + residenceTax;
}

const optimized = computed<Result[]>(() => {
  const balanceForInterest1 = 365 / (data.interestRate / 100); // 1 * 365 / rate
  // 767 is max income tax on 1b - interest value is 5479;
  const result: Result[] = [{
    balance: 0,
    interest: 0,
    tax: 0,
  }];
  for (let tax = 10; tax < 767; tax += 10) {
    const interestMax = tax / 0.14; // 14%
    const interest = Number.isInteger(interestMax) ? interestMax - 1 : Math.floor(interestMax);
    const balance = Math.ceil(balanceForInterest1 * interest);
    if (balance > totalBalance.value) {
      break;
    }
    result.push({
      balance,
      interest,
      tax: taxForInterest(interest),
    });
  }

  return result;
});

function dayBalace(balance: number, days = 1): Result {
  const interest = Math.floor((balance * (data.interestRate / 100) * days) / 365);
  const tax = taxForInterest(interest);

  return {
    balance: balance + interest - tax,
    interest,
    tax,
  };
}

function compound(balance: number, days: number, interest = 0, tax = 0): Result {
  const result: Result = {
    balance,
    interest,
    tax,
  };

  for (let i = 0; i < days; i += 1) {
    const intermediate = dayBalace(result.balance);
    result.balance = intermediate.balance;
    result.interest += intermediate.interest;
    result.tax += intermediate.tax;
  }

  return result;
}

function calcCompoundNormal(balance: number, bsi: number, days: number) {
  const result: Result = {
    balance,
    interest: 0,
    tax: 0,
  };

  for (let d = 0; d < days; d += 1) {
    const intermediate = dayBalace(result.balance);
    result.balance = intermediate.balance + bsi;
    result.interest += intermediate.interest;
    result.tax += intermediate.tax;
  }

  return result;
}

function calcForSeparation(bn: number, bs: number, days: number) {
  const bsi = Math.floor((bs * (data.interestRate / 100)) / 365);
  const bst = taxForInterest(bsi);
  const bsResult: Result = {
    balance: bs,
    interest: bsi * days,
    tax: bst * days,
  };

  const bnResult = calcCompoundNormal(bn, bsi, days);

  return [bnResult, bsResult];
}

const days = computed(() => Math.ceil(
  (lastDate.value.getTime() - baseDate.value.getTime()) / 86400000,
));

const ZERO: Result = {
  balance: 0,
  interest: 0,
  tax: 0,
};

interface CalcResult {
  balance: number
  savings: number
  interest: number
  tax: number
  profit: number
}

function toCalcResultFrom(result: Result[]): CalcResult {
  return {
    balance: result[0].balance + result[1].balance,
    savings: result[1].balance,
    interest: result[0].interest + result[1].interest,
    tax: result[0].tax + result[1].tax,
    profit: result[0].interest + result[1].interest - result[0].tax - result[1].tax,
  };
}

const compoundSavings = computed<CalcResult>(() => {
  let total = 0;
  let result: Result[] = [ZERO, ZERO];

  for (let i = 0; i < optimized.value.length; i += 1) {
    const opt = optimized.value[i];
    if (opt.balance > totalBalance.value) {
      break;
    }
    const bs = opt.balance;

    const now = calcForSeparation(totalBalance.value - bs, bs, days.value);
    const sum = now[0].balance + now[1].balance;
    if (sum >= total) {
      total = sum;
      result = now;
    }
  }

  return toCalcResultFrom(result);
});

const simpleSavings = computed(() => {
  let total = 0;
  let result: Result[] = [ZERO, ZERO];

  for (let i = 0; i < optimized.value.length; i += 1) {
    const opt = optimized.value[i];
    if (opt.balance > totalBalance.value) {
      break;
    }

    const bs = opt.balance;
    const bsResult = dayBalace(bs, days.value);
    const bnResult = dayBalace(totalBalance.value - bs, days.value);

    const sum = bsResult.balance + bnResult.balance;
    if (sum >= total) {
      total = sum;

      bnResult.balance += bsResult.interest - bsResult.tax;
      bsResult.balance = bs;

      result = [bnResult, bsResult];
    }
  }

  return toCalcResultFrom(result);
});

function toCalcResult(result: Result): CalcResult {
  return {
    ...result,
    savings: 0,
    profit: result.interest - result.tax,
  };
}

const result = computed(() => ({
  Simple: toCalcResult(dayBalace(totalBalance.value, days.value)),
  'Simple w/Savings': simpleSavings.value,
  Compound: toCalcResult(compound(totalBalance.value, days.value)),
  'Compound w/Savings': compoundSavings.value,
}));

const maxProfit = computed(() => Math.max(...Object.values(result.value).map((v) => v.profit)));

function highlightClass(profit: number) {
  if (profit === maxProfit.value) {
    return 'text-red-600';
  }
  return '';
}

</script>

<template>
  <h1 class="text-3xl font-bold">
    Interest Better
  </h1>
  <form
    class="flex flex-col gap-2 my-2"
    @submit.prevent=""
  >
    <label class="flex items-baseline gap-1">Interest rate
      <input
        v-model="data.interestRate"
        class="text-right w-36"
        type="number"
        min="0"
        step="0.1"
      >
      %
    </label>

    <label class="flex justify-between items-baseline gap-1">Base day
      <input
        v-model="data.baseDay"
        class="text-center"
        type="date"
      >
    </label>
    <label class="flex justify-between items-baseline gap-1">Balance1
      <input
        v-model="data.balance1"
        class="text-right"
        type="number"
        size="11"
      >
    </label>
    <label class="flex justify-between items-baseline gap-1">Balance2
      <input
        v-model="data.balance2"
        class="text-right"
        type="number"
        size="11"
      >
    </label>
  </form>
  <div class="mt-2">
    Total Balance: {{ totalBalance.toLocaleString() }}
  </div>
  <div class="mb-2">
    To: {{ formatDate(lastDate) }} ({{ days }} day{{ days === 1 ? '' : 's' }})
  </div>

  <h2 class="text-xl font-bold my-2">
    Result
  </h2>

  <div class="flex flex-wrap justify-center gap-2">
    <section
      v-for="(v, k) in result"
      :key="k"
    >
      <h3>{{ k }}</h3>
      <dl>
        <dt>Balance</dt>
        <dd>{{ v.balance.toLocaleString() }}</dd>
        <dt>Savings</dt>
        <dd>{{ v.savings.toLocaleString() }}</dd>
        <dt>Interest</dt>
        <dd>{{ v.interest.toLocaleString() }}</dd>
        <dt>B2 - SV</dt>
        <dd>{{ (v.savings - data.balance2).toLocaleString() }}</dd>
        <dt>Tax</dt>
        <dd>{{ v.tax.toLocaleString() }}</dd>
        <dt>Profit</dt>
        <dd
          class="font-bold"
          :class="highlightClass(v.profit)"
        >
          {{ v.profit.toLocaleString() }}
        </dd>
      </dl>
    </section>
  </div>
</template>

<style>
#app {
  @apply flex flex-col items-center pt-8;
}
section {
  @apply p-2 border rounded flex-shrink-0;
}
h3 {
  @apply font-bold underline text-center tracking-tighter whitespace-nowrap !important;
}
dl {
  @apply grid grid-cols-2;
};
dd {
  @apply text-right;
}
label>input {
  @apply border p-1 w-40;
}
</style>
