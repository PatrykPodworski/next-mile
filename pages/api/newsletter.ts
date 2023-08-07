import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
    return;
  }

  const { email } = req.body;
  if (typeof email !== "string" || !email.includes("@")) {
    res.status(422).json({ message: "Invalid email address" });
    return;
  }

  if (!process.env.MAILER_LITE_API_TOKEN || !process.env.MAILER_LITE_GROUP_ID) {
    res.status(500).json({ message: "Missing configuration" });
    return;
  }

  // Store or send to some API
  const response = await fetch(
    "https://connect.mailerlite.com/api/subscribers",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MAILER_LITE_API_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
        groups: [process.env.MAILER_LITE_GROUP_ID],
      }),
    }
  );

  console.log(await response.text());
  if (!response.ok) {
    res.status(500).json({ message: "Failed to add email to newsletter" });
    return;
  }

  res.status(201).json({ message: "Success" });
};

export default handler;
