export const getUserName = (name) => {
  // Eğer parametre yoksa manuel değeri kullan
  const finalName = name || "Eslem Akar";
  return "@" + finalName.toLowerCase().replaceAll(" ", "_");
};
