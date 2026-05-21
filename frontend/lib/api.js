const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ||
  "https://movierecommendation-1-qxlx.onrender.com";

export async function apiGet(path) {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 60000);

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      cache: "no-store",
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    return await res.json();
  } catch (err) {
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}
