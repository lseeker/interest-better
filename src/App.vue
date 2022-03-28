<script lang="ts" setup>
import {
  computed, reactive, watch,
} from 'vue';

function formatDate(date: Date) {
  return `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, '0')}-${`${date.getDate()}`.padStart(2, '0')}`;
}

const data = reactive({
  baseDay: formatDate(new Date()),
  balance1: Number(localStorage.getItem('balance1')) ?? 0,
  balance2: Number(localStorage.getItem('balance2')) ?? 0,
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
  const balanceForInterest1 = 18250; // 1 * 365 / 0.02
  // 767 is max income tax on 1b - interest value is 5479;
  const result: Result[] = [];
  for (let tax = 10; tax < 767; tax += 10) {
    const interestMax = tax / 0.14; // 14%
    const interest = Number.isInteger(interestMax) ? interestMax - 1 : Math.floor(interestMax);
    const balance = balanceForInterest1 * interest;
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

function dayN(days: number) {
  const d = new Date(baseDate.value);
  d.setDate(d.getDate() + days);
  return formatDate(d);
}

function dayBalace(balance: number, days = 1): Result {
  const interest = Math.floor((balance * 0.02 * days) / 365);
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
  const bsi = Math.floor((bs * 0.02) / 365);
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

const better = computed(() => {
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

  return result;
});

const once = computed(() => dayBalace(totalBalance.value, days.value));

const comp = computed(() => compound(totalBalance.value, days.value));

</script>

<template>
  <h1 class="text-3xl font-bold">
    Interest Better
  </h1>
  <p>Rate: 2%</p>
  <form
    class="flex flex-col gap-2 my-2"
    @submit.prevent=""
  >
    <label class="flex justify-between items-baseline gap-1">Base day
      <input
        v-model="data.baseDay"
        class="border p-1"
        type="date"
      >
    </label>
    <label class="flex justify-between items-baseline gap-1">Balance1
      <input
        v-model="data.balance1"
        class="border p-1"
        type="number"
        size="11"
      >
    </label>
    <label class="flex justify-between items-baseline gap-1">Balance2
      <input
        v-model="data.balance2"
        class="border p-1"
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
  <!--
  <div class="flex gap-2 flex-wrap items-start justify-center">
    <table>
      <tr>
        <th>Interest</th>
        <th>Tax</th>
        <th>Balance</th>
      </tr>
      <tr
        v-for="(o, i) in optimized"
        :key="i"
      >
        <td>{{ o.interest.toLocaleString() }}</td>
        <td>{{ o.tax }}</td>
        <td>{{ o.balance.toLocaleString() }}</td>
      </tr>
    </table>
    -->

  <table>
    <tr>
      <th>Method</th>
      <th>Balance Total</th>
      <th>Balance Savings</th>
      <th>Interest</th>
      <th>Tax</th>
    </tr>
    <tr>
      <th>Simple</th>
      <td>{{ once.balance.toLocaleString() }}</td>
      <td>0</td>
      <td>{{ once.interest.toLocaleString() }}</td>
      <td>{{ once.tax }}</td>
    </tr>
    <tr>
      <th>Compound</th>
      <td>{{ comp.balance.toLocaleString() }}</td>
      <td>0</td>
      <td>{{ comp.interest.toLocaleString() }}</td>
      <td>{{ comp.tax }}</td>
    </tr>
    <tr>
      <th>Compound w/Savings</th>
      <td>{{ (better[0].balance + better[1].balance).toLocaleString() }}</td>
      <td>{{ better[1].balance.toLocaleString() }}</td>
      <td>{{ (better[0].interest + better[1].interest).toLocaleString() }}</td>
      <td>{{ better[0].tax + better[1].tax }}</td>
    </tr>
  </table>

  <!-- </div> -->
</template>

<style>
#app {
  @apply flex flex-col items-center pt-8;
}
th {
  @apply border p-1 text-center;
}
td {
  @apply border p-1 text-right;
}
</style>
