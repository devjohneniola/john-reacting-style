export const scrollTo = ({ id, behavior = "instant", block = "end" }) => {
  if (!id || !document) return;
  const target = document.getElementById(id);
  if (target) target.scrollIntoView({ behavior, block });
};
export const scrollUp = () => scrollTo({ id: "attic" });
export const scrollDown = () => scrollTo({ id: "basement" });
export const scrollToFormReport = () =>
  scrollTo({ id: "info-err-suc", behavior: "smooth" });
