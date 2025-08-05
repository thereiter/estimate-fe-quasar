const scrollTop = async function (
  elementId = null,
  delay = 700,
  element = null
) {
  let el = null;
  if (elementId) {
    el = document.getElementById(elementId);
  } else {
    el = document.getElementById("stepper-mode");
  }

  if (element) {
    el = element;
  }

  if (!el) {
    el = document.getElementById("app");
  }

  if (!el) {
    return;
  }

  setTimeout(() => {
    el.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  }, delay);
};

export { scrollTop };
