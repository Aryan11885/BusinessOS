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

export async function getOpportunities() {
  const response = await fetch(
    `${API_URL}/opportunities/`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch opportunities"
    );
  }

  return response.json();
}

export async function convertLead(
  leadId: string
) {
  const response = await fetch(
    `${API_URL}/leads/${leadId}/convert`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to convert lead"
    );
  }

  return response.json();
}

export async function getOpportunityById(
  id: string
) {
  const response = await fetch(
    `${API_URL}/opportunities/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch opportunity"
    );
  }

  return response.json();
}

export async function updateOpportunity(
  id: string,
  data: any
) {
  const response = await fetch(
    `${API_URL}/opportunities/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to update opportunity"
    );
  }

  return response.json();
}

export async function getProposals() {
  const response = await fetch(
    `${API_URL}/proposals/`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch proposals");
  }

  return response.json();
}

export async function getProposalById(
  id: string
) {
  const response = await fetch(
    `${API_URL}/proposals/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch proposal");
  }

  return response.json();
}

export async function createProposal(
  data: any
) {
  const response = await fetch(
    `${API_URL}/proposals/`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to create proposal"
    );
  }

  return response.json();
}

export async function updateProposal(
  id: string,
  data: any
) {
  const response = await fetch(
    `${API_URL}/proposals/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to update proposal"
    );
  }

  return response.json();
}

export async function deleteProposal(
  id: string
) {
  const response = await fetch(
    `${API_URL}/proposals/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to delete proposal"
    );
  }

  return response.json();
}

