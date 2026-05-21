const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ||
  "https://movierecommendation-1-qxlx.onrender.com";

export async function apiGet(path, params = {}) {
  const url = new URL(`${API_BASE}${path}`);
  Object.keys(params).forEach(key =>
    url.searchParams.append(key, params[key])
  );

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 60000);

  try {
    const res = await fetch(url.toString(), {
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
