import apiClient from "./axios";

// ✅ Safely extracts the product array from any response shape the backend sends
function extractProducts(data) {
  if (!data) return [];
  // Try every key the backend might use
  const list =
    data.products ??   // ← new normalised key (added in fix)
    data.data     ??   // ← some endpoints
    data.rows     ??   // ← getPagingData original key
    (Array.isArray(data) ? data : null);
  return Array.isArray(list) ? list : [];
}

export async function fetchProducts(
  params = {}
) {
  const query = new URLSearchParams();

  if (params.page)     query.set("page",     String(params.page));
  if (params.limit)    query.set("limit",    String(params.limit));
  if (params.category) query.set("category", String(params.category));
  if (params.sort)     query.set("sort",     params.sort);
  if (params.q)        query.set("q",        params.q);
  if (params.featured) query.set("featured", "true");
  if (params.inStock)  query.set("inStock",  "true");

  const { data } = await apiClient.get(`/product?${query.toString()}`);

  return {
    products:    extractProducts(data),
    totalItems:  data?.totalItems  ?? 0,
    totalPages:  data?.totalPages  ?? 1,
    currentPage: data?.currentPage ?? 1,
  };
}