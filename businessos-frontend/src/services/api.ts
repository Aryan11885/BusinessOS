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

export async function getCustomers() {
  const response = await fetch(
    `${API_URL}/customers/`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch customers");
  }

  return response.json();
}

export async function getCustomerById(
  id: string
) {
  const response = await fetch(
    `${API_URL}/customers/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch customer");
  }

  return response.json();
}

export async function createCustomer(
  data: any
) {
  const response = await fetch(
    `${API_URL}/customers/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create customer");
  }

  return response.json();
}

export async function updateCustomer(
  id: string,
  data: any
) {
  const response = await fetch(
    `${API_URL}/customers/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update customer");
  }

  return response.json();
}

export async function deleteCustomer(
  id: string
) {
  const response = await fetch(
    `${API_URL}/customers/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete customer");
  }

  return response.json();
}

export async function getProjects() {
  const response = await fetch(
    `${API_URL}/projects`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  return response.json();
}

export async function getProjectById(
  id: string
) {
  const response = await fetch(
    `${API_URL}/projects/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch project");
  }

  return response.json();
}

export async function createProject(
  data: any
) {
  const response = await fetch(
    `${API_URL}/projects`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.detail || "Failed to create project"
    );
  }

  return result;
}

export async function updateProject(
  id: string,
  data: any
) {
  const response = await fetch(
    `${API_URL}/projects/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.detail || "Failed to update project"
    );
  }

  return result;
}

export async function deleteProject(
  id: string
) {
  const response = await fetch(
    `${API_URL}/projects/${id}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to delete project"
    );
  }

  return data;
}

export async function getTasks() {
  const response = await fetch(
    `${API_URL}/tasks`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return response.json();
}

export async function getTaskById(id: string) {
  const response = await fetch(
    `${API_URL}/tasks/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch task");
  }

  return response.json();
}

export async function updateTask(
  id: string,
  data: any
) {
  const response = await fetch(
    `${API_URL}/tasks/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  return response.json();
}

export async function deleteTask(id: string) {
  const response = await fetch(
    `${API_URL}/tasks/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  return response.json();
}

export async function createTask(data: any) {
  const response = await fetch(
    `${API_URL}/tasks`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  return response.json();
}

export async function getInvoices() {
  const response = await fetch(
    `${API_URL}/invoices`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch invoices");
  }

  return response.json();
}

export async function getInvoiceById(
  id: string
) {
  const response = await fetch(
    `${API_URL}/invoices/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch invoice");
  }

  return response.json();
}

export async function createInvoice(
  data: any
) {
  const response = await fetch(
    `${API_URL}/invoices`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.detail || "Failed to create invoice"
    );
  }

  return result;
}

export async function updateInvoice(
  id: string,
  data: any
) {
  const response = await fetch(
    `${API_URL}/invoices/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.detail || "Failed to update invoice"
    );
  }

  return result;
}

export async function deleteInvoice(
  id: string
) {
  const response = await fetch(
    `${API_URL}/invoices/${id}`,
    {
      method: "DELETE",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.detail || "Failed to delete invoice"
    );
  }

  return result;
}