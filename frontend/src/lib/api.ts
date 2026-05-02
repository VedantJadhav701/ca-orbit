import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = Cookies.get("orbit_token");
  
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Something went wrong");
  }

  return response.json();
}

export const authApi = {
  login: (formData: FormData) => {
    return fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      body: formData,
    }).then(res => {
      if (!res.ok) throw new Error("Invalid credentials");
      return res.json();
    });
  },
  register: (data: any) => apiRequest("/auth/register", { method: "POST", body: JSON.stringify(data) }),
};

export const taskApi = {
  list: () => apiRequest("/tasks"),
  create: (data: any) => apiRequest("/tasks", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: any) => apiRequest(`/tasks/${id}`, { method: "PUT", body: JSON.stringify(data) }),
};

export const progressApi = {
  get: () => apiRequest("/progress"),
  summary: () => apiRequest("/progress/summary"),
};

export const plannerApi = {
  generate: () => apiRequest("/planner/generate", { method: "POST" }),
};
