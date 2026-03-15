"use strict";

const { EventEmitter } = require("events");
const {
  handleProviders,
  handleTranslate,
  handleTutorChat,
  handleGenerateLesson,
} = require("../../server");

function normalizeApiPath(event) {
  let path = event.path || "";
  if (!path && event.rawUrl) {
    path = new URL(event.rawUrl).pathname;
  }

  path = String(path || "");
  path = path.replace(/^\/\.netlify\/functions\/api/, "");
  path = path.replace(/^\/api/, "");
  if (!path) return "/";
  if (!path.startsWith("/")) return `/${path}`;
  return path;
}

function eventBody(event) {
  const raw = event.body || "";
  if (!event.isBase64Encoded) return raw;
  return Buffer.from(raw, "base64").toString("utf8");
}

function makeMockReq(event) {
  const req = new EventEmitter();
  req.method = event.httpMethod || "GET";
  req.headers = event.headers || {};
  req.url = event.path || "/";
  req.destroy = () => {};

  const body = eventBody(event);
  process.nextTick(() => {
    if (body) req.emit("data", Buffer.from(body));
    req.emit("end");
  });

  return req;
}

function makeMockRes(resolve) {
  return {
    statusCode: 200,
    headers: {},
    writeHead(statusCode, headers = {}) {
      this.statusCode = statusCode;
      this.headers = headers;
    },
    end(body = "") {
      resolve({
        statusCode: this.statusCode || 200,
        headers: this.headers || { "Content-Type": "application/json; charset=utf-8" },
        body: typeof body === "string" ? body : String(body),
      });
    },
  };
}

function invokeReqRes(handler, event) {
  return new Promise((resolve, reject) => {
    const req = makeMockReq(event);
    const res = makeMockRes(resolve);
    Promise.resolve(handler(req, res)).catch(reject);
  });
}

function invokeResOnly(handler) {
  return new Promise((resolve, reject) => {
    const res = makeMockRes(resolve);
    Promise.resolve(handler(res)).catch(reject);
  });
}

function json(statusCode, payload) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  };
}

exports.handler = async (event) => {
  const method = String(event.httpMethod || "GET").toUpperCase();
  const apiPath = normalizeApiPath(event);

  try {
    if (method === "GET" && apiPath === "/providers") {
      return await invokeResOnly(handleProviders);
    }

    if (method === "POST" && apiPath === "/translate") {
      return await invokeReqRes(handleTranslate, event);
    }

    if (method === "POST" && apiPath === "/tutor-chat") {
      return await invokeReqRes(handleTutorChat, event);
    }

    if (method === "POST" && apiPath === "/generate-lesson") {
      return await invokeReqRes(handleGenerateLesson, event);
    }

    if (method === "OPTIONS") {
      return {
        statusCode: 204,
        headers: {
          Allow: "GET,POST,OPTIONS",
        },
        body: "",
      };
    }

    return json(404, { error: "Not found" });
  } catch (err) {
    return json(500, {
      error: err instanceof Error ? err.message : String(err),
    });
  }
};
