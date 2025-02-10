export function getLoggedUserId() {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    return null; // Retorna null se não houver usuário logado
  }
  return userId;
}

export function redirectToLogin(router) {
  alert("Usuário não está logado. Redirecionando para a página de login.");
  router.push({ name: "Login" });
}
