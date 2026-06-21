const API_URL = "http://127.0.0.1:8000";

export async function getLeads() {
  const response = await fetch(`${API_URL}/leads/`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch leads");
  }

  return response.json();
}

export async function createLead(data: any) {
  const response = await fetch(
    `${API_URL}/leads/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create lead");
  }

  return response.json();
}

export async function getLeadById(id: string) {
  const response = await fetch(
    `${API_URL}/leads/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch lead");
  }

  return response.json();
}

export async function updateLead(
  id: string,
  data: any
) {
  const response = await fetch(
    `${API_URL}/leads/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update lead");
  }

  return response.json();
}

export async function deleteLead(id: string) {
  const response = await fetch(
    `${API_URL}/leads/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete lead");
  }

  return response.json();
}