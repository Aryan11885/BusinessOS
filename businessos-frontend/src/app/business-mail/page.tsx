"use client";

import { useState } from "react";

import AppLayout from "@/components/AppLayout";
import { sendEmail } from "@/services/api";

import {
  Mail,
  Send,
  Paperclip,
  Loader2,
  FileText,
  Receipt,
  Megaphone,
  X,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

type Template = "proposal" | "invoice" | "general" | null;

export default function BusinessMailPage() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const [attachment, setAttachment] = useState<File | null>(null);
  const [activeTemplate, setActiveTemplate] = useState<Template>(null);

  const [sending, setSending] = useState(false);

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  function loadProposalTemplate() {
    setActiveTemplate("proposal");
    setSubject("BusinessOS Proposal");

    setBody(`Hello,

Please find the attached proposal.

Kindly review it and let us know your feedback.

Regards,
BusinessOS Team`);
  }

  function loadInvoiceTemplate() {
    setActiveTemplate("invoice");
    setSubject("BusinessOS Invoice");

    setBody(`Hello,

Please find your invoice attached.

Regards,
BusinessOS Team`);
  }

  function loadGeneralTemplate() {
    setActiveTemplate("general");
    setSubject("BusinessOS");

    setBody(`Hello,

Hope you are doing well.

Regards,
BusinessOS Team`);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setSending(true);

    setSuccess("");

    setError("");

    try {
      const formData = new FormData();

      formData.append("to", to);

      formData.append("subject", subject);

      formData.append("body", body);

      if (attachment) {
        formData.append("attachment", attachment);
      }

      await sendEmail(formData);

      setSuccess("Email sent successfully.");

      setTo("");

      setSubject("");

      setBody("");

      setAttachment(null);
      setActiveTemplate(null);
    } catch (err: any) {
      setError(err.message || "Unable to send email.");
    } finally {
      setSending(false);
    }
  }

  const templates: {
    key: Exclude<Template, null>;
    label: string;
    description: string;
    icon: typeof FileText;
    accent: string;
    iconColor: string;
    onClick: () => void;
  }[] = [
    {
      key: "proposal",
      label: "Proposal",
      description: "Ready proposal email",
      icon: FileText,
      accent: "border-l-indigo-500",
      iconColor: "text-indigo-600 bg-indigo-50",
      onClick: loadProposalTemplate,
    },
    {
      key: "invoice",
      label: "Invoice",
      description: "Ready invoice email",
      icon: Receipt,
      accent: "border-l-emerald-500",
      iconColor: "text-emerald-600 bg-emerald-50",
      onClick: loadInvoiceTemplate,
    },
    {
      key: "general",
      label: "General",
      description: "Normal business mail",
      icon: Megaphone,
      accent: "border-l-amber-500",
      iconColor: "text-amber-600 bg-amber-50",
      onClick: loadGeneralTemplate,
    },
  ];

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0">
            <Mail className="w-10 h-5 sm:w-6 sm:h-6 text-white" />
          </div>

          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Business Mail
            </h1>

            <p className="text-sm text-slate-500 mt-0.5">
              Send proposals, invoices, and business documents from BusinessOS
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="space-y-4 sm:space-y-5 lg:order-1 order-2">
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 sm:p-5">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3 sm:mb-4">
                Quick templates
              </h2>

              <div className="grid grid-cols-3 gap-2 sm:grid-cols-1 sm:gap-2.5">
                {templates.map(({ key, label, description, icon: Icon, accent, iconColor, onClick }) => {
                  const isActive = activeTemplate === key;

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={onClick}
                      className={`flex flex-col sm:flex-row items-center gap-2 sm:gap-3 p-3 rounded-lg border-l-4 sm:border-l-4 bg-slate-50 transition-colors text-center sm:text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                        isActive
                          ? `${accent} bg-white ring-1 ring-slate-200 shadow-sm`
                          : "border-l-transparent hover:bg-slate-100"
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${iconColor}`}>
                        <Icon className="w-4.5 h-4.5" />
                      </div>

                      <div className="min-w-0">
                        <p className="font-medium text-xs sm:text-sm text-slate-900">{label}</p>

                        <p className="hidden sm:block text-xs text-slate-500 mt-0.5">
                          {description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="hidden sm:block bg-slate-900 rounded-xl p-6 text-white">
              <div className="flex items-center gap-2.5 mb-3">
                <Mail className="w-5 h-5 text-indigo-400" />
                <h3 className="font-semibold text-base">BusinessOS Mail</h3>
              </div>

              <p className="text-slate-300 text-sm leading-6">
                Send proposals, invoices, agreements, reports and business
                documents directly from the CRM.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 order-1 lg:order-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 sm:p-7"
            >
              {success && (
                <div
                  role="status"
                  aria-live="polite"
                  className="flex items-center gap-2.5 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 mb-5"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  {success}
                </div>
              )}

              {error && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="flex items-start gap-2.5 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700 break-words mb-5"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  {error}
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label className="block mb-1.5 text-sm font-medium text-slate-700">
                    Recipient email
                  </label>

                  <input
                    type="email"
                    required
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="customer@email.com"
                    className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block mb-1.5 text-sm font-medium text-slate-700">
                    Subject
                  </label>

                  <input
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="BusinessOS Proposal"
                    className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block mb-1.5 text-sm font-medium text-slate-700">
                    Message
                  </label>

                  <textarea
                    rows={7}
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Write your message..."
                    className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm transition-colors resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="border-t border-slate-100 my-6" />

              <div>
                <label className="block mb-2 text-sm font-medium text-slate-700">
                  Attachment
                </label>

                <label className="cursor-pointer block">
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setAttachment(e.target.files?.[0] || null)}
                  />

                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 sm:p-8 transition-colors hover:border-indigo-400 hover:bg-indigo-50/50">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center mb-3">
                        <UploadCloud className="w-5 h-5 text-indigo-500" />
                      </div>

                      <p className="font-medium text-sm text-slate-700">
                        Click to upload
                      </p>

                      <p className="text-xs text-slate-400 mt-1 text-center">
                        PDF, DOCX, XLSX, JPG, PNG
                      </p>
                    </div>
                  </div>
                </label>

                {attachment && (
                  <div className="mt-3 rounded-lg border border-slate-100 bg-slate-50 p-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Paperclip className="w-4 h-4 text-indigo-600 shrink-0" />

                      <div className="min-w-0">
                        <p className="font-medium text-sm text-slate-900 truncate">{attachment.name}</p>

                        <p className="text-xs text-slate-500">
                          {(attachment.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setAttachment(null)}
                      aria-label="Remove attachment"
                      className="text-slate-400 hover:text-red-600 transition-colors shrink-0 p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center sm:justify-end gap-3 pt-6 mt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setTo("");
                    setSubject("");
                    setBody("");
                    setAttachment(null);
                    setActiveTemplate(null);
                    setError("");
                    setSuccess("");
                  }}
                  className="px-5 py-3 rounded-lg border border-slate-200 text-slate-700 text-sm font-medium transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  Clear
                </button>

                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                  {sending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send email
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}