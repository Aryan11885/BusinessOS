"use client";

import { useState } from "react";
import { X, Mail, Paperclip, Loader2 } from "lucide-react";

import { sendEmail } from "@/services/api";

interface EmailModalProps {
  open: boolean;
  onClose: () => void;

  defaultTo?: string;
  defaultSubject?: string;
  defaultBody?: string;
}

export default function EmailModal({
  open,
  onClose,
  defaultTo = "",
  defaultSubject = "",
  defaultBody = "",
}: EmailModalProps) {
  const [to, setTo] = useState(defaultTo);
  const [subject, setSubject] = useState(defaultSubject);
  const [body, setBody] = useState(defaultBody);

  const [file, setFile] = useState<File | null>(null);

  const [sending, setSending] = useState(false);

  if (!open) return null;

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setSending(true);

    try {
      const formData = new FormData();

      formData.append("to", to);
      formData.append("subject", subject);
      formData.append("body", body);

      if (file) {
        formData.append("attachment", file);
      }

      await sendEmail(formData);

      alert("Email sent successfully ✅");

      onClose();

    } catch (error: any) {
      alert(error.message);

    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl">

        <div className="flex items-center justify-between p-6 border-b">

          <div className="flex items-center gap-2">

            <Mail className="w-5 h-5 text-indigo-600" />

            <h2 className="text-xl font-bold">
              Send Email
            </h2>

          </div>

          <button
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >

          <div>

            <label className="text-sm font-medium">
              To
            </label>

            <input
              type="email"
              required
              value={to}
              onChange={(e)=>setTo(e.target.value)}
              className="mt-1 border rounded-lg w-full p-3"
            />

          </div>

          <div>

            <label className="text-sm font-medium">
              Subject
            </label>

            <input
              required
              value={subject}
              onChange={(e)=>setSubject(e.target.value)}
              className="mt-1 border rounded-lg w-full p-3"
            />

          </div>

          <div>

            <label className="text-sm font-medium">
              Message
            </label>

            <textarea
              rows={6}
              value={body}
              onChange={(e)=>setBody(e.target.value)}
              className="mt-1 border rounded-lg w-full p-3"
            />

          </div>

          <div>

            <label className="text-sm font-medium flex items-center gap-2">

              <Paperclip className="w-4 h-4" />

              Attachment

            </label>

            <input
              type="file"
              onChange={(e)=>
                setFile(
                  e.target.files?.[0] || null
                )
              }
              className="mt-2"
            />

            {
              file &&
              <p className="text-sm mt-2 text-green-600">
                {file.name}
              </p>
            }

          </div>

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              disabled={sending}
              className="bg-indigo-600 text-white rounded-lg px-5 py-2 flex items-center gap-2"
            >

              {
                sending
                ?
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
                :
                <>
                  <Mail className="w-4 h-4" />
                  Send Email
                </>
              }

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}