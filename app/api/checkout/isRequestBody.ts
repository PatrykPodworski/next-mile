type RequestBody = {
  emailAddress: string;
  name: string;
  address: string;
  phone: string;
  items: Item[];
};

export type Item = {
  id: string;
  quantity: number;
};

// TODO: Replace with Zod
const isRequestBody = (body: any): body is RequestBody => {
  if (typeof body !== "object") {
    return false;
  }

  if (typeof body.emailAddress !== "string") {
    return false;
  }

  if (typeof body.name !== "string") {
    return false;
  }

  if (typeof body.address !== "string") {
    return false;
  }

  if (typeof body.phone !== "string") {
    return false;
  }

  if (!Array.isArray(body.items)) {
    return false;
  }

  if (
    body.items.some(
      (item: any) =>
        typeof item.id !== "string" || typeof item.quantity !== "number"
    )
  ) {
    return false;
  }

  if (body.items.length === 0) {
    return false;
  }

  return true;
};

export default isRequestBody;
