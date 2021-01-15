import { onMounted, ref } from "vue";

export default function useTimer() {
  let five_minutes = 60 * 5;
  let timer = ref("");
  onMounted(() => {
    let intervalId = setInterval(() => {
      let minutes = Math.floor(five_minutes / 60),
        seconds = Math.floor(five_minutes % 60);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      timer.value = `${minutes}:${seconds}`;

      if (--five_minutes < 0) {
        clearInterval(intervalId);
      }
    }, 1000);
  });

  return { timer };
}
