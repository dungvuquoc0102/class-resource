import { createIcons, Menu, ArrowRight, Globe } from "lucide";
import img1 from "./assets/images/img-1.jpg";

createIcons({
  icons: {
    Menu,
    ArrowRight,
    Globe,
  },
});

document.querySelector(".child-1").addEventListener("click", () => {
  console.log("Click child 1");
});
