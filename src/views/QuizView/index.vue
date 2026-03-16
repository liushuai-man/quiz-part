<template>
  <Transition name="fade">
    <div
      v-if="statuses[step]"
      :class="[
        `fixed inset-0 z-10 flex items-center justify-center text-center backdrop-blur-md`,
        {
          'bg-green-100 text-green-600': statuses[step] === 'win',
          'bg-red-100 text-red-600': statuses[step] === 'lose',
          'bg-gray-100 text-gray-500': statuses[step] === 'timeout',
        },
      ]"
    >
      <span class="text-6xl font-black animate-fade-in">{{ statusText }}</span>
    </div>
  </Transition>

  <DefaultLayout class="flex min-h-screen flex-col">
    <div class="fixed top-0 right-0 h-1 bg-blue-500" :style="`width: ${width}%`"></div>

    <h1 class="text-3xl md:text-5xl font-bold text-gray-900">
      {{ quiz.title }}
    </h1>

    <div class="mt-32 md:mt-48 flex flex-wrap justify-center">
      <template v-for="(answer, index) in answers" :key="answer.id">
        <div
          class="relative flex flex-basis-[600px] md:flex-basis-[491px] h-[136px] items-center p-6 m-4 border-2 border-red-100 rounded-md bg-white cursor-pointer transition-all hover:border-red-200"
          @click="checkAnswer(answer.id)"
        >
          <div
            class="absolute top-[-24px] left-[-24px] flex items-center justify-center w-12 h-12 rounded-full bg-white border-3 border-blue-500 font-bold text-2xl"
          >
            {{ index + 1 }}
          </div>
          <span class="text-xl text-gray-900">{{ answer.title }}</span>
        </div>
      </template>
    </div>

    <div class="mt-auto flex justify-center pb-8">
      <template v-for="counter in quizzes.length" :key="counter">
        <span
          :class="[
            'h-6 border-2 border-blue-500 mx-4',
            {
              'w-6 rounded-full': counterClasses(counter - 1).includes('normal'),
              'w-12 rounded-full bg-red-100': counterClasses(counter - 1).includes('current'),
              'w-6 rounded-full bg-gray-200': counterClasses(counter - 1).includes('timeout'),
              'w-6 rounded-full bg-red-500': counterClasses(counter - 1).includes('lose'),
              'w-6 rounded-full bg-green-500': counterClasses(counter - 1).includes('win'),
            },
          ]"
        />
      </template>
    </div>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout/index.vue';
import quizzesList from '@/assets/mock/quizzes.json';
import { shuffleArray } from '@/utils/index.js';
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const step = ref(0);
const width = ref(100);
const timer = ref(null);
const statuses = ref([]);
const router = useRouter();
const quizzes = computed(() => {
  return shuffleArray(quizzesList);
});
const quiz = computed(() => {
  return quizzes.value[step.value];
});
const answers = computed(() => {
  return shuffleArray(quiz.value.items);
});
const statusText = computed(() => {
  if (statuses.value[step.value] === 'timeout') {
    return '时间到了！';
  }
  return statuses.value[step.value] === 'win' ? quiz.value.response.win : quiz.value.response.lose;
});
const stopTimer = () => {
  clearTimeout(timer.value);
  timer.value = null;
};
const startTimer = () => {
  if (width.value <= 0) {
    return stopTimer();
  }
  width.value -= 1;
  timer.value = setTimeout(startTimer, 100);
};
const calculateScore = () => {
  let score = 0;
  for (const status of statuses.value) {
    if (status === 'win') score += 100;
  }
  const timeLeft = width.value / 10;
  const finalScore = Math.floor(score * timeLeft);
  return finalScore;
};

const changeStep = () => {
  setTimeout(() => {
    width.value = 100;
    // Check if next step is available or not
    if (step.value + 1 > quizzes.value.length - 1) {
      localStorage.setItem('score', JSON.stringify(calculateScore()));
      return router.push('/result');
    }
    step.value += 1;
    startTimer();
  }, 3000);
};
const onWin = () => {
  statuses.value[step.value] = 'win';
};
const onLose = () => {
  statuses.value[step.value] = 'lose';
};
const onTimeout = () => {
  statuses.value[step.value] = 'timeout';
};
const checkAnswer = (answerId) => {
  stopTimer();
  quiz.value.currectAnswer === answerId ? onWin() : onLose();
  changeStep();
};

const counterClasses = (counter) => {
  if (statuses.value[counter]) {
    return `quiz-counters__couter quiz-counters__couter--${statuses.value[counter]}`;
  }

  return `quiz-counters__couter quiz-counters__couter--${counter === step.value ? 'current' : 'normal'}`;
};

watch(width, (value) => {
  if (value <= 0) {
    onTimeout();
    changeStep();
  }
});

onMounted(startTimer);
</script>

<style scoped>
/* 自定义动画样式 */
.fade-enter-active,
.fade-leave-active {
  transition: ease 0.3s all;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}

@keyframes show {
  from {
    opacity: 0;
    margin-top: -160px;
  }

  to {
    opacity: 1;
    margin-top: 0;
  }
}

.animate-fade-in {
  animation: show 0.5s forwards;
}
</style>
