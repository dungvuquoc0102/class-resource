const tabContainers = document.querySelectorAll(".tab-container");

tabContainers.forEach((tabContainer) => {
  const titles = tabContainer.querySelectorAll("[id^='title-']");
  const contents = tabContainer.querySelectorAll("[id^='content-']");
  const activedTitle = tabContainer.querySelector(".active");
  let activedContentNumber;

  contents.forEach((content) => {
    content.classList.add("hidden");
  });
  if (!activedTitle) {
    titles[0].classList.add("active");
    contents[0].classList.remove("hidden");
    activedContentNumber = 1;
  }

  titles.forEach((title) => {
    title.addEventListener("click", () => {
      const activedTitle = tabContainer.querySelector(".active");
      if (activedTitle) {
        activedTitle.classList.remove("active");
        const activedContent = tabContainer.querySelector(
          `#content-${activedTitle.id.split("-")[1]}`,
        );
        activedContent.classList.add("hidden");
      }
      title.classList.add("active");
      const content = tabContainer.querySelector(
        `#content-${title.id.split("-")[1]}`,
      );
      content.classList.remove("hidden");
      activedContentNumber = parseInt(title.id.split("-")[1]);
    });
  });

  tabContainer.tabIndex = 0;
  tabContainer.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      const nextContentNumber =
        activedContentNumber === contents.length ? 1 : activedContentNumber + 1;
      const nextTitle = tabContainer.querySelector(
        `#title-${nextContentNumber}`,
      );
      nextTitle.click();
    } else if (event.key === "ArrowLeft") {
      const prevContentNumber =
        activedContentNumber === 1 ? contents.length : activedContentNumber - 1;
      const prevTitle = tabContainer.querySelector(
        `#title-${prevContentNumber}`,
      );
      prevTitle.click();
    } else {
      if (Number(event.key) > 0 && Number(event.key) <= contents.length) {
        const title = tabContainer.querySelector(`#title-${event.key}`);
        title.click();
      }
    }
  });
});
