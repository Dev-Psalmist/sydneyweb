import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const DESK_CONTEXT = `You are the client care assistant for Sydney's Consulting & General Services, a corporate compliance and general services firm at No 9 Port Harcourt Crescent, Area 11, Garki, Abuja, Nigeria.

Services offered: CAC company incorporation and post-incorporation filings; PENCOM pension compliance; NSITF employee compensation registration; ITF industrial training contributions; BPP / IRR federal contractor registration; SCUML (EFCC anti-money laundering) registration; DPR petroleum permits; NITDA registration and data protection; NEPC exporter registration; tax clearance certificates and tax filings; general contracts and tender documentation.

Contact: phone +234 706 784 2575, email sydneysconsultingltd@gmail.com, office open Monday to Friday 9:00 to 17:00 (Saturdays by appointment). Appointments can be booked on the website's Book an appointment page.

Rules for your replies:
- Be warm, concise and professional. Maximum 90 words, plain sentences, no markdown or bullet symbols.
- Answer only about the firm, its services, required documents, process, timelines and how to get in touch. If asked anything unrelated, politely steer back to compliance and advisory work.
- Never invent exact fees or guarantee approval dates; say a quote is confirmed after a short scoping call and invite the client to book one.
- If the visitor seems ready to proceed or has a complex case, invite them to book an appointment or leave a support ticket.`;

export const lookupTicket = createServerFn({ method: "POST" })
  .validator(
    z.object({
      reference: z.string().min(3).max(40),
      email: z.string().min(5).max(160),
    }),
  )
  .handler(async ({ data, context }) => {
    const reference = data.reference.trim().toUpperCase();
    const email = data.email.trim().toLowerCase();
    if (!reference || !email) return { ticket: null };

    const base44 = context.getBase44();
    const rows = await base44.asServiceRole.entities.Ticket.filter({ reference, email });
    const ticket = Array.isArray(rows) ? rows[0] : rows?.items?.[0];
    if (!ticket) return { ticket: null };

    return {
      ticket: {
        reference: ticket.reference,
        subject: ticket.subject,
        message: ticket.message,
        status: ticket.status,
        priority: ticket.priority,
        category: ticket.category,
        created_date: ticket.created_date,
      },
    };
  });

export const chatReply = createServerFn({ method: "POST" })
  .validator(
    z.object({
      message: z.string().min(1).max(600),
      history: z
        .array(
          z.object({
            role: z.enum(["user", "assistant"]),
            content: z.string().max(600),
          }),
        )
        .max(6)
        .optional(),
    }),
  )
  .handler(async ({ data, context }) => {
    const base44 = context.getBase44();
    const transcript = (data.history ?? [])
      .map((m) => `${m.role === "user" ? "Visitor" : "Assistant"}: ${m.content}`)
      .join("\n");

    const prompt = `${DESK_CONTEXT}

${transcript ? `Conversation so far:\n${transcript}\n` : ""}Visitor: ${data.message}
Assistant:`;

    const result = await base44.asServiceRole.integrations.Core.InvokeLLM({ prompt });
    const reply = (typeof result === "string" ? result : result?.response ?? "").trim();
    return { reply };
  });