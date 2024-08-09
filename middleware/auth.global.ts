export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await getCurrentUser();

  if (!user && to.name !== "login") {
    return navigateTo("/login");
  }

  if (user && to.name === "login") {
    return navigateTo("/");
  }

});
