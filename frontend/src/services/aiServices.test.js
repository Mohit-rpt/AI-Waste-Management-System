import test from "node:test";
import assert from "node:assert";
import { formatErrorMessage } from "./aiServices.js";

test("formatErrorMessage handles client-side timeout / ECONNABORTED", () => {
  const err = { code: "ECONNABORTED", message: "timeout of 25000ms exceeded" };
  const msg = formatErrorMessage(err);
  assert.match(msg, /timed out/i);
});

test("formatErrorMessage extracts server detail when available", () => {
  const err = {
    response: {
      status: 429,
      data: { detail: "Gemini API rate limit or quota exceeded. Please wait a moment and try again." },
    },
  };
  const msg = formatErrorMessage(err);
  assert.strictEqual(msg, "Gemini API rate limit or quota exceeded. Please wait a moment and try again.");
});

test("formatErrorMessage handles 401/403 authentication failures", () => {
  const err = {
    response: {
      status: 401,
      data: {},
    },
  };
  const msg = formatErrorMessage(err);
  assert.match(msg, /authentication failed/i);
});

test("formatErrorMessage handles 503 service unavailable", () => {
  const err = {
    response: {
      status: 503,
      data: {},
    },
  };
  const msg = formatErrorMessage(err);
  assert.match(msg, /service is currently unavailable/i);
});

test("formatErrorMessage handles 504 server timeout", () => {
  const err = {
    response: {
      status: 504,
      data: {},
    },
  };
  const msg = formatErrorMessage(err);
  assert.match(msg, /server timed out/i);
});

test("formatErrorMessage handles network disconnect / unreachable server", () => {
  const err = {
    request: {},
    message: "Network Error",
  };
  const msg = formatErrorMessage(err);
  assert.match(msg, /unable to reach the backend server/i);
});

test("formatErrorMessage fallback for unknown errors", () => {
  const err = new Error("Something broke");
  const msg = formatErrorMessage(err);
  assert.strictEqual(msg, "Something broke");
});

test("sendChatMessage rejects empty or whitespace input without network request", async () => {
  await assert.rejects(
    async () => {
      const { sendChatMessage } = await import("./aiServices.js");
      await sendChatMessage("");
    },
    {
      name: "Error",
      message: "Message cannot be empty.",
    }
  );

  await assert.rejects(
    async () => {
      const { sendChatMessage } = await import("./aiServices.js");
      await sendChatMessage("   \n\t ");
    },
    {
      name: "Error",
      message: "Message cannot be empty.",
    }
  );
});

test("getAIInsight rejects empty waste type", async () => {
  await assert.rejects(
    async () => {
      const { getAIInsight } = await import("./aiServices.js");
      await getAIInsight("   ");
    },
    {
      name: "Error",
      message: "Waste type cannot be empty.",
    }
  );
});

test("getApiBaseUrl resolves cleanly and strips trailing slashes", async () => {
  const { getApiBaseUrl } = await import("../api/axios.js");
  const url = getApiBaseUrl();
  assert.ok(url);
  assert.strictEqual(url.endsWith("/"), false);
});

