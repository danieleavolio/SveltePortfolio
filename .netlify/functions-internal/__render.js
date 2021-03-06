var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// .svelte-kit/netlify/entry.js
__export(exports, {
  handler: () => handler
});

// node_modules/@sveltejs/kit/dist/install-fetch.js
var import_http = __toModule(require("http"));
var import_https = __toModule(require("https"));
var import_zlib = __toModule(require("zlib"));
var import_stream = __toModule(require("stream"));
var import_util = __toModule(require("util"));
var import_crypto = __toModule(require("crypto"));
var import_url = __toModule(require("url"));
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i = 1; i < meta.length; i++) {
    if (meta[i] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i]}`;
      if (meta[i].indexOf("charset=") === 0) {
        charset = meta[i].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var src = dataUriToBuffer;
var dataUriToBuffer$1 = src;
var { Readable } = import_stream.default;
var wm = new WeakMap();
async function* read(parts) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else {
      yield part;
    }
  }
}
var Blob = class {
  constructor(blobParts = [], options2 = {}) {
    let size = 0;
    const parts = blobParts.map((element) => {
      let buffer;
      if (element instanceof Buffer) {
        buffer = element;
      } else if (ArrayBuffer.isView(element)) {
        buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
      } else if (element instanceof ArrayBuffer) {
        buffer = Buffer.from(element);
      } else if (element instanceof Blob) {
        buffer = element;
      } else {
        buffer = Buffer.from(typeof element === "string" ? element : String(element));
      }
      size += buffer.length || buffer.size || 0;
      return buffer;
    });
    const type = options2.type === void 0 ? "" : String(options2.type).toLowerCase();
    wm.set(this, {
      type: /[^\u0020-\u007E]/.test(type) ? "" : type,
      size,
      parts
    });
  }
  get size() {
    return wm.get(this).size;
  }
  get type() {
    return wm.get(this).type;
  }
  async text() {
    return Buffer.from(await this.arrayBuffer()).toString();
  }
  async arrayBuffer() {
    const data = new Uint8Array(this.size);
    let offset = 0;
    for await (const chunk of this.stream()) {
      data.set(chunk, offset);
      offset += chunk.length;
    }
    return data.buffer;
  }
  stream() {
    return Readable.from(read(wm.get(this).parts));
  }
  slice(start = 0, end = this.size, type = "") {
    const { size } = this;
    let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
    let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
    const span = Math.max(relativeEnd - relativeStart, 0);
    const parts = wm.get(this).parts.values();
    const blobParts = [];
    let added = 0;
    for (const part of parts) {
      const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
      if (relativeStart && size2 <= relativeStart) {
        relativeStart -= size2;
        relativeEnd -= size2;
      } else {
        const chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
        blobParts.push(chunk);
        added += ArrayBuffer.isView(chunk) ? chunk.byteLength : chunk.size;
        relativeStart = 0;
        if (added >= span) {
          break;
        }
      }
    }
    const blob = new Blob([], { type: String(type).toLowerCase() });
    Object.assign(wm.get(blob), { size: span, parts: blobParts });
    return blob;
  }
  get [Symbol.toStringTag]() {
    return "Blob";
  }
  static [Symbol.hasInstance](object) {
    return object && typeof object === "object" && typeof object.stream === "function" && object.stream.length === 0 && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
  }
};
Object.defineProperties(Blob.prototype, {
  size: { enumerable: true },
  type: { enumerable: true },
  slice: { enumerable: true }
});
var fetchBlob = Blob;
var Blob$1 = fetchBlob;
var FetchBaseError = class extends Error {
  constructor(message, type) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.type = type;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
};
var FetchError = class extends FetchBaseError {
  constructor(message, type, systemError) {
    super(message, type);
    if (systemError) {
      this.code = this.errno = systemError.code;
      this.erroredSysCall = systemError.syscall;
    }
  }
};
var NAME = Symbol.toStringTag;
var isURLSearchParameters = (object) => {
  return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
};
var isBlob = (object) => {
  return typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
};
function isFormData(object) {
  return typeof object === "object" && typeof object.append === "function" && typeof object.set === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.delete === "function" && typeof object.keys === "function" && typeof object.values === "function" && typeof object.entries === "function" && typeof object.constructor === "function" && object[NAME] === "FormData";
}
var isAbortSignal = (object) => {
  return typeof object === "object" && object[NAME] === "AbortSignal";
};
var carriage = "\r\n";
var dashes = "-".repeat(2);
var carriageLength = Buffer.byteLength(carriage);
var getFooter = (boundary) => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;
function getHeader(boundary, name, field) {
  let header = "";
  header += `${dashes}${boundary}${carriage}`;
  header += `Content-Disposition: form-data; name="${name}"`;
  if (isBlob(field)) {
    header += `; filename="${field.name}"${carriage}`;
    header += `Content-Type: ${field.type || "application/octet-stream"}`;
  }
  return `${header}${carriage.repeat(2)}`;
}
var getBoundary = () => (0, import_crypto.randomBytes)(8).toString("hex");
async function* formDataIterator(form, boundary) {
  for (const [name, value] of form) {
    yield getHeader(boundary, name, value);
    if (isBlob(value)) {
      yield* value.stream();
    } else {
      yield value;
    }
    yield carriage;
  }
  yield getFooter(boundary);
}
function getFormDataLength(form, boundary) {
  let length = 0;
  for (const [name, value] of form) {
    length += Buffer.byteLength(getHeader(boundary, name, value));
    if (isBlob(value)) {
      length += value.size;
    } else {
      length += Buffer.byteLength(String(value));
    }
    length += carriageLength;
  }
  length += Buffer.byteLength(getFooter(boundary));
  return length;
}
var INTERNALS$2 = Symbol("Body internals");
var Body = class {
  constructor(body, {
    size = 0
  } = {}) {
    let boundary = null;
    if (body === null) {
      body = null;
    } else if (isURLSearchParameters(body)) {
      body = Buffer.from(body.toString());
    } else if (isBlob(body))
      ;
    else if (Buffer.isBuffer(body))
      ;
    else if (import_util.types.isAnyArrayBuffer(body)) {
      body = Buffer.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof import_stream.default)
      ;
    else if (isFormData(body)) {
      boundary = `NodeFetchFormDataBoundary${getBoundary()}`;
      body = import_stream.default.Readable.from(formDataIterator(body, boundary));
    } else {
      body = Buffer.from(String(body));
    }
    this[INTERNALS$2] = {
      body,
      boundary,
      disturbed: false,
      error: null
    };
    this.size = size;
    if (body instanceof import_stream.default) {
      body.on("error", (err) => {
        const error3 = err instanceof FetchBaseError ? err : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${err.message}`, "system", err);
        this[INTERNALS$2].error = error3;
      });
    }
  }
  get body() {
    return this[INTERNALS$2].body;
  }
  get bodyUsed() {
    return this[INTERNALS$2].disturbed;
  }
  async arrayBuffer() {
    const { buffer, byteOffset, byteLength } = await consumeBody(this);
    return buffer.slice(byteOffset, byteOffset + byteLength);
  }
  async blob() {
    const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
    const buf = await this.buffer();
    return new Blob$1([buf], {
      type: ct
    });
  }
  async json() {
    const buffer = await consumeBody(this);
    return JSON.parse(buffer.toString());
  }
  async text() {
    const buffer = await consumeBody(this);
    return buffer.toString();
  }
  buffer() {
    return consumeBody(this);
  }
};
Object.defineProperties(Body.prototype, {
  body: { enumerable: true },
  bodyUsed: { enumerable: true },
  arrayBuffer: { enumerable: true },
  blob: { enumerable: true },
  json: { enumerable: true },
  text: { enumerable: true }
});
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  let { body } = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (isBlob(body)) {
    body = body.stream();
  }
  if (Buffer.isBuffer(body)) {
    return body;
  }
  if (!(body instanceof import_stream.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const err = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(err);
        throw err;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error3) {
    if (error3 instanceof FetchBaseError) {
      throw error3;
    } else {
      throw new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error3.message}`, "system", error3);
    }
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error3) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error3.message}`, "system", error3);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
var clone = (instance, highWaterMark) => {
  let p1;
  let p2;
  let { body } = instance;
  if (instance.bodyUsed) {
    throw new Error("cannot clone body after it is used");
  }
  if (body instanceof import_stream.default && typeof body.getBoundary !== "function") {
    p1 = new import_stream.PassThrough({ highWaterMark });
    p2 = new import_stream.PassThrough({ highWaterMark });
    body.pipe(p1);
    body.pipe(p2);
    instance[INTERNALS$2].body = p1;
    body = p2;
  }
  return body;
};
var extractContentType = (body, request) => {
  if (body === null) {
    return null;
  }
  if (typeof body === "string") {
    return "text/plain;charset=UTF-8";
  }
  if (isURLSearchParameters(body)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }
  if (isBlob(body)) {
    return body.type || null;
  }
  if (Buffer.isBuffer(body) || import_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
    return null;
  }
  if (body && typeof body.getBoundary === "function") {
    return `multipart/form-data;boundary=${body.getBoundary()}`;
  }
  if (isFormData(body)) {
    return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
  }
  if (body instanceof import_stream.default) {
    return null;
  }
  return "text/plain;charset=UTF-8";
};
var getTotalBytes = (request) => {
  const { body } = request;
  if (body === null) {
    return 0;
  }
  if (isBlob(body)) {
    return body.size;
  }
  if (Buffer.isBuffer(body)) {
    return body.length;
  }
  if (body && typeof body.getLengthSync === "function") {
    return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
  }
  if (isFormData(body)) {
    return getFormDataLength(request[INTERNALS$2].boundary);
  }
  return null;
};
var writeToStream = (dest, { body }) => {
  if (body === null) {
    dest.end();
  } else if (isBlob(body)) {
    body.stream().pipe(dest);
  } else if (Buffer.isBuffer(body)) {
    dest.write(body);
    dest.end();
  } else {
    body.pipe(dest);
  }
};
var validateHeaderName = typeof import_http.default.validateHeaderName === "function" ? import_http.default.validateHeaderName : (name) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
    const err = new TypeError(`Header name must be a valid HTTP token [${name}]`);
    Object.defineProperty(err, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
    throw err;
  }
};
var validateHeaderValue = typeof import_http.default.validateHeaderValue === "function" ? import_http.default.validateHeaderValue : (name, value) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
    const err = new TypeError(`Invalid character in header content ["${name}"]`);
    Object.defineProperty(err, "code", { value: "ERR_INVALID_CHAR" });
    throw err;
  }
};
var Headers = class extends URLSearchParams {
  constructor(init2) {
    let result = [];
    if (init2 instanceof Headers) {
      const raw = init2.raw();
      for (const [name, values] of Object.entries(raw)) {
        result.push(...values.map((value) => [name, value]));
      }
    } else if (init2 == null)
      ;
    else if (typeof init2 === "object" && !import_util.types.isBoxedPrimitive(init2)) {
      const method = init2[Symbol.iterator];
      if (method == null) {
        result.push(...Object.entries(init2));
      } else {
        if (typeof method !== "function") {
          throw new TypeError("Header pairs must be iterable");
        }
        result = [...init2].map((pair) => {
          if (typeof pair !== "object" || import_util.types.isBoxedPrimitive(pair)) {
            throw new TypeError("Each header pair must be an iterable object");
          }
          return [...pair];
        }).map((pair) => {
          if (pair.length !== 2) {
            throw new TypeError("Each header pair must be a name/value tuple");
          }
          return [...pair];
        });
      }
    } else {
      throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    }
    result = result.length > 0 ? result.map(([name, value]) => {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return [String(name).toLowerCase(), String(value)];
    }) : void 0;
    super(result);
    return new Proxy(this, {
      get(target, p, receiver) {
        switch (p) {
          case "append":
          case "set":
            return (name, value) => {
              validateHeaderName(name);
              validateHeaderValue(name, String(value));
              return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase(), String(value));
            };
          case "delete":
          case "has":
          case "getAll":
            return (name) => {
              validateHeaderName(name);
              return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase());
            };
          case "keys":
            return () => {
              target.sort();
              return new Set(URLSearchParams.prototype.keys.call(target)).keys();
            };
          default:
            return Reflect.get(target, p, receiver);
        }
      }
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(name) {
    const values = this.getAll(name);
    if (values.length === 0) {
      return null;
    }
    let value = values.join(", ");
    if (/^content-encoding$/i.test(name)) {
      value = value.toLowerCase();
    }
    return value;
  }
  forEach(callback) {
    for (const name of this.keys()) {
      callback(this.get(name), name);
    }
  }
  *values() {
    for (const name of this.keys()) {
      yield this.get(name);
    }
  }
  *entries() {
    for (const name of this.keys()) {
      yield [name, this.get(name)];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  raw() {
    return [...this.keys()].reduce((result, key) => {
      result[key] = this.getAll(key);
      return result;
    }, {});
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((result, key) => {
      const values = this.getAll(key);
      if (key === "host") {
        result[key] = values[0];
      } else {
        result[key] = values.length > 1 ? values : values[0];
      }
      return result;
    }, {});
  }
};
Object.defineProperties(Headers.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
  result[property] = { enumerable: true };
  return result;
}, {}));
function fromRawHeaders(headers = []) {
  return new Headers(headers.reduce((result, value, index2, array) => {
    if (index2 % 2 === 0) {
      result.push(array.slice(index2, index2 + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
var redirectStatus = new Set([301, 302, 303, 307, 308]);
var isRedirect = (code) => {
  return redirectStatus.has(code);
};
var INTERNALS$1 = Symbol("Response internals");
var Response = class extends Body {
  constructor(body = null, options2 = {}) {
    super(body, options2);
    const status = options2.status || 200;
    const headers = new Headers(options2.headers);
    if (body !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(body);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    this[INTERNALS$1] = {
      url: options2.url,
      status,
      statusText: options2.statusText || "",
      headers,
      counter: options2.counter,
      highWaterMark: options2.highWaterMark
    };
  }
  get url() {
    return this[INTERNALS$1].url || "";
  }
  get status() {
    return this[INTERNALS$1].status;
  }
  get ok() {
    return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
  }
  get redirected() {
    return this[INTERNALS$1].counter > 0;
  }
  get statusText() {
    return this[INTERNALS$1].statusText;
  }
  get headers() {
    return this[INTERNALS$1].headers;
  }
  get highWaterMark() {
    return this[INTERNALS$1].highWaterMark;
  }
  clone() {
    return new Response(clone(this, this.highWaterMark), {
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected,
      size: this.size
    });
  }
  static redirect(url, status = 302) {
    if (!isRedirect(status)) {
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    }
    return new Response(null, {
      headers: {
        location: new URL(url).toString()
      },
      status
    });
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
};
Object.defineProperties(Response.prototype, {
  url: { enumerable: true },
  status: { enumerable: true },
  ok: { enumerable: true },
  redirected: { enumerable: true },
  statusText: { enumerable: true },
  headers: { enumerable: true },
  clone: { enumerable: true }
});
var getSearch = (parsedURL) => {
  if (parsedURL.search) {
    return parsedURL.search;
  }
  const lastOffset = parsedURL.href.length - 1;
  const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
  return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
};
var INTERNALS = Symbol("Request internals");
var isRequest = (object) => {
  return typeof object === "object" && typeof object[INTERNALS] === "object";
};
var Request = class extends Body {
  constructor(input, init2 = {}) {
    let parsedURL;
    if (isRequest(input)) {
      parsedURL = new URL(input.url);
    } else {
      parsedURL = new URL(input);
      input = {};
    }
    let method = init2.method || input.method || "GET";
    method = method.toUpperCase();
    if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body");
    }
    const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
    super(inputBody, {
      size: init2.size || input.size || 0
    });
    const headers = new Headers(init2.headers || input.headers || {});
    if (inputBody !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(inputBody, this);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    let signal = isRequest(input) ? input.signal : null;
    if ("signal" in init2) {
      signal = init2.signal;
    }
    if (signal !== null && !isAbortSignal(signal)) {
      throw new TypeError("Expected signal to be an instanceof AbortSignal");
    }
    this[INTERNALS] = {
      method,
      redirect: init2.redirect || input.redirect || "follow",
      headers,
      parsedURL,
      signal
    };
    this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
    this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
    this.counter = init2.counter || input.counter || 0;
    this.agent = init2.agent || input.agent;
    this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
    this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
  }
  get method() {
    return this[INTERNALS].method;
  }
  get url() {
    return (0, import_url.format)(this[INTERNALS].parsedURL);
  }
  get headers() {
    return this[INTERNALS].headers;
  }
  get redirect() {
    return this[INTERNALS].redirect;
  }
  get signal() {
    return this[INTERNALS].signal;
  }
  clone() {
    return new Request(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
};
Object.defineProperties(Request.prototype, {
  method: { enumerable: true },
  url: { enumerable: true },
  headers: { enumerable: true },
  redirect: { enumerable: true },
  clone: { enumerable: true },
  signal: { enumerable: true }
});
var getNodeRequestOptions = (request) => {
  const { parsedURL } = request[INTERNALS];
  const headers = new Headers(request[INTERNALS].headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }
  let contentLengthValue = null;
  if (request.body === null && /^(post|put)$/i.test(request.method)) {
    contentLengthValue = "0";
  }
  if (request.body !== null) {
    const totalBytes = getTotalBytes(request);
    if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set("Content-Length", contentLengthValue);
  }
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "node-fetch");
  }
  if (request.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip,deflate,br");
  }
  let { agent } = request;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }
  if (!headers.has("Connection") && !agent) {
    headers.set("Connection", "close");
  }
  const search = getSearch(parsedURL);
  const requestOptions = {
    path: parsedURL.pathname + search,
    pathname: parsedURL.pathname,
    hostname: parsedURL.hostname,
    protocol: parsedURL.protocol,
    port: parsedURL.port,
    hash: parsedURL.hash,
    search: parsedURL.search,
    query: parsedURL.query,
    href: parsedURL.href,
    method: request.method,
    headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
    insecureHTTPParser: request.insecureHTTPParser,
    agent
  };
  return requestOptions;
};
var AbortError = class extends FetchBaseError {
  constructor(message, type = "aborted") {
    super(message, type);
  }
};
var supportedSchemas = new Set(["data:", "http:", "https:"]);
async function fetch(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request(url, options_);
    const options2 = getNodeRequestOptions(request);
    if (!supportedSchemas.has(options2.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${options2.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (options2.protocol === "data:") {
      const data = dataUriToBuffer$1(request.url);
      const response2 = new Response(data, { headers: { "Content-Type": data.typeFull } });
      resolve2(response2);
      return;
    }
    const send = (options2.protocol === "https:" ? import_https.default : import_http.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error3 = new AbortError("The operation was aborted.");
      reject(error3);
      if (request.body && request.body instanceof import_stream.default.Readable) {
        request.body.destroy(error3);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error3);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(options2);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (err) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, "system", err));
      finalize();
    });
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              try {
                headers.set("Location", locationURL);
              } catch (error3) {
                reject(error3);
              }
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: request.body,
              signal: request.signal,
              size: request.size
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_stream.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            resolve2(fetch(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
        }
      }
      response_.once("end", () => {
        if (signal) {
          signal.removeEventListener("abort", abortAndFinalize);
        }
      });
      let body = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error3) => {
        reject(error3);
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createGunzip(zlibOptions), (error3) => {
          reject(error3);
        });
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error3) => {
          reject(error3);
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflate(), (error3) => {
              reject(error3);
            });
          } else {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflateRaw(), (error3) => {
              reject(error3);
            });
          }
          response = new Response(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createBrotliDecompress(), (error3) => {
          reject(error3);
        });
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}

// node_modules/@sveltejs/kit/dist/adapter-utils.js
function isContentTypeTextual(content_type) {
  if (!content_type)
    return true;
  const [type] = content_type.split(";");
  return type === "text/plain" || type === "application/json" || type === "application/x-www-form-urlencoded" || type === "multipart/form-data";
}

// node_modules/@sveltejs/kit/dist/ssr.js
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key in obj) {
    clone2[key.toLowerCase()] = obj[key];
  }
  return clone2;
}
function error(body) {
  return {
    status: 500,
    body,
    headers: {}
  };
}
function is_string(s2) {
  return typeof s2 === "string" || s2 instanceof String;
}
async function render_endpoint(request, route) {
  const mod = await route.load();
  const handler2 = mod[request.method.toLowerCase().replace("delete", "del")];
  if (!handler2) {
    return;
  }
  const match = route.pattern.exec(request.path);
  if (!match) {
    return error("could not parse parameters from request path");
  }
  const params = route.params(match);
  const response = await handler2({ ...request, params });
  const preface = `Invalid response from route ${request.path}`;
  if (!response) {
    return;
  }
  if (typeof response !== "object") {
    return error(`${preface}: expected an object, got ${typeof response}`);
  }
  let { status = 200, body, headers = {} } = response;
  headers = lowercase_keys(headers);
  const type = headers["content-type"];
  const is_type_textual = isContentTypeTextual(type);
  if (!is_type_textual && !(body instanceof Uint8Array || is_string(body))) {
    return error(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if ((typeof body === "object" || typeof body === "undefined") && !(body instanceof Uint8Array) && (!type || type.startsWith("application/json"))) {
    headers = { ...headers, "content-type": "application/json; charset=utf-8" };
    normalized_body = JSON.stringify(typeof body === "undefined" ? {} : body);
  } else {
    normalized_body = body;
  }
  return { status, body: normalized_body, headers };
}
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry, i) {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i) {
          return i in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i) {
            statements_1.push(name + "[" + i + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i = 0; i < str.length; i += 1) {
    var char = str.charAt(i);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$1) {
      result += escaped$1[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop() {
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
Promise.resolve();
var subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = [];
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (let i = 0; i < subscribers.length; i += 1) {
          const s2 = subscribers[i];
          s2[1]();
          subscriber_queue.push(s2, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.push(subscriber);
    if (subscribers.length === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      const index2 = subscribers.indexOf(subscriber);
      if (index2 !== -1) {
        subscribers.splice(index2, 1);
      }
      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function hash(value) {
  let hash2 = 5381;
  let i = value.length;
  if (typeof value === "string") {
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else {
    while (i)
      hash2 = hash2 * 33 ^ value[--i];
  }
  return (hash2 >>> 0).toString(36);
}
var s$1 = JSON.stringify;
async function render_response({
  branch,
  options: options2,
  $session,
  page_config,
  status,
  error: error3,
  page
}) {
  const css2 = new Set(options2.entry.css);
  const js = new Set(options2.entry.js);
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error3) {
    error3.stack = options2.get_stack(error3);
  }
  if (page_config.ssr) {
    branch.forEach(({ node, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url) => css2.add(url));
      if (node.js)
        node.js.forEach((url) => js.add(url));
      if (node.styles)
        node.styles.forEach((content) => styles.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session
      },
      page,
      components: branch.map(({ node }) => node.module.default)
    };
    for (let i = 0; i < branch.length; i += 1) {
      props[`props_${i}`] = await branch[i].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options2.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js.clear();
  const links = options2.amp ? styles.size > 0 || rendered.css.code.length > 0 ? `<style amp-custom>${Array.from(styles).concat(rendered.css.code).join("\n")}</style>` : "" : [
    ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
    ...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
  ].join("\n		");
  let init2 = "";
  if (options2.amp) {
    init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>`;
  } else if (include_js) {
    init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : "document.body"},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error4) => {
      throw new Error(`Failed to serialize session data: ${error4.message}`);
    })},
				host: ${page && page.host ? s$1(page.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s$1(options2.trailing_slash)},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error3)},
					nodes: [
						${(branch || []).map(({ node }) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page && page.host ? s$1(page.host) : "location.host"}, // TODO this is redundant
						path: ${s$1(page && page.path)},
						query: new URLSearchParams(${page ? s$1(page.query.toString()) : ""}),
						params: ${page && s$1(page.params)}
					}
				}` : "null"}
			});
		<\/script>`;
  }
  if (options2.service_worker) {
    init2 += `<script>
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register('${options2.service_worker}');
			}
		<\/script>`;
  }
  const head = [
    rendered.head,
    styles.size && !options2.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init2
  ].join("\n\n		");
  const body = options2.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({ url, body: body2, json }) => {
    let attributes = `type="application/json" data-type="svelte-data" data-url="${url}"`;
    if (body2)
      attributes += ` data-body="${hash(body2)}"`;
    return `<script ${attributes}>${json}<\/script>`;
  }).join("\n\n			")}
		`.replace(/^\t{2}/gm, "");
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  if (!options2.floc) {
    headers["permissions-policy"] = "interest-cohort=()";
  }
  return {
    status,
    headers,
    body: options2.template({ head, body })
  };
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(err);
    return null;
  }
}
function serialize_error(error3) {
  if (!error3)
    return null;
  let serialized = try_serialize(error3);
  if (!serialized) {
    const { name, message, stack } = error3;
    serialized = try_serialize({ ...error3, name, message, stack });
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return {
        status: status || 500,
        error: new Error()
      };
    }
    const error3 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error3 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error3}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error3 };
    }
    return { status, error: error3 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  return loaded;
}
var s = JSON.stringify;
async function load_node({
  request,
  options: options2,
  state,
  route,
  page,
  node,
  $session,
  context,
  prerender_enabled,
  is_leaf,
  is_error,
  status,
  error: error3
}) {
  const { module: module2 } = node;
  let uses_credentials = false;
  const fetched = [];
  let loaded;
  const page_proxy = new Proxy(page, {
    get: (target, prop, receiver) => {
      if (prop === "query" && prerender_enabled) {
        throw new Error("Cannot access query on a page with prerendering enabled");
      }
      return Reflect.get(target, prop, receiver);
    }
  });
  if (module2.load) {
    const load_input = {
      page: page_proxy,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let url;
        if (typeof resource === "string") {
          url = resource;
        } else {
          url = resource.url;
          opts = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity,
            ...opts
          };
        }
        const resolved = resolve(request.path, url.split("?")[0]);
        let response;
        const filename = resolved.replace(options2.paths.assets, "").slice(1);
        const filename_html = `${filename}/index.html`;
        const asset = options2.manifest.assets.find((d2) => d2.file === filename || d2.file === filename_html);
        if (asset) {
          response = options2.read ? new Response(options2.read(asset.file), {
            headers: asset.type ? {
              "content-type": asset.type
            } : {}
          }) : await fetch(`http://${page.host}/${asset.file}`, opts);
        } else if (resolved.startsWith(options2.paths.base || "/") && !resolved.startsWith("//")) {
          const relative = resolved.replace(options2.paths.base, "");
          const headers = { ...opts.headers };
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            headers.cookie = request.headers.cookie;
            if (!headers.authorization) {
              headers.authorization = request.headers.authorization;
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          const search = url.includes("?") ? url.slice(url.indexOf("?") + 1) : "";
          const rendered = await respond({
            host: request.host,
            method: opts.method || "GET",
            headers,
            path: relative,
            rawBody: opts.body,
            query: new URLSearchParams(search)
          }, options2, {
            fetched: url,
            initiator: route
          });
          if (rendered) {
            if (state.prerender) {
              state.prerender.dependencies.set(relative, rendered);
            }
            response = new Response(rendered.body, {
              status: rendered.status,
              headers: rendered.headers
            });
          }
        } else {
          if (resolved.startsWith("//")) {
            throw new Error(`Cannot request protocol-relative URL (${url}) in server-side fetch`);
          }
          if (typeof request.host !== "undefined") {
            const { hostname: fetch_hostname } = new URL(url);
            const [server_hostname] = request.host.split(":");
            if (`.${fetch_hostname}`.endsWith(`.${server_hostname}`) && opts.credentials !== "omit") {
              uses_credentials = true;
              opts.headers = {
                ...opts.headers,
                cookie: request.headers.cookie
              };
            }
          }
          const external_request = new Request(url, opts);
          response = await options2.hooks.serverFetch.call(null, external_request);
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 !== "etag" && key2 !== "set-cookie")
                    headers[key2] = value;
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":${escape(body)}}`
                  });
                }
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      context: { ...context }
    };
    if (is_error) {
      load_input.status = status;
      load_input.error = error3;
    }
    loaded = await module2.load.call(null, load_input);
  } else {
    loaded = {};
  }
  if (!loaded && is_leaf && !is_error)
    return;
  if (!loaded) {
    throw new Error(`${node.entry} - load must return a value except for page fall through`);
  }
  return {
    node,
    loaded: normalize(loaded),
    context: loaded.context || context,
    fetched,
    uses_credentials
  };
}
var escaped = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
var absolute = /^([a-z]+:)?\/?\//;
function resolve(base, path) {
  const base_match = absolute.exec(base);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base}"`);
  }
  const baseparts = path_match ? [] : base.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path.slice(path_match[0].length).split("/") : path.split("/");
  baseparts.pop();
  for (let i = 0; i < pathparts.length; i += 1) {
    const part = pathparts[i];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix}${baseparts.join("/")}`;
}
function coalesce_to_error(err) {
  return err instanceof Error ? err : new Error(JSON.stringify(err));
}
async function respond_with_error({ request, options: options2, state, $session, status, error: error3 }) {
  const default_layout = await options2.load_component(options2.manifest.layout);
  const default_error = await options2.load_component(options2.manifest.error);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params: {}
  };
  const loaded = await load_node({
    request,
    options: options2,
    state,
    route: null,
    page,
    node: default_layout,
    $session,
    context: {},
    prerender_enabled: is_prerender_enabled(options2, default_error, state),
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded,
    await load_node({
      request,
      options: options2,
      state,
      route: null,
      page,
      node: default_error,
      $session,
      context: loaded ? loaded.context : {},
      prerender_enabled: is_prerender_enabled(options2, default_error, state),
      is_leaf: false,
      is_error: true,
      status,
      error: error3
    })
  ];
  try {
    return await render_response({
      options: options2,
      $session,
      page_config: {
        hydrate: options2.hydrate,
        router: options2.router,
        ssr: options2.ssr
      },
      status,
      error: error3,
      branch,
      page
    });
  } catch (err) {
    const error4 = coalesce_to_error(err);
    options2.handle_error(error4);
    return {
      status: 500,
      headers: {},
      body: error4.stack
    };
  }
}
function is_prerender_enabled(options2, node, state) {
  return options2.prerender && (!!node.module.prerender || !!state.prerender && state.prerender.all);
}
async function respond$1(opts) {
  const { request, options: options2, state, $session, route } = opts;
  let nodes;
  try {
    nodes = await Promise.all(route.a.map((id) => id ? options2.load_component(id) : void 0));
  } catch (err) {
    const error4 = coalesce_to_error(err);
    options2.handle_error(error4);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error4
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  let page_config = get_page_config(leaf, options2);
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return {
      status: 204,
      headers: {},
      body: ""
    };
  }
  let branch = [];
  let status = 200;
  let error3;
  ssr:
    if (page_config.ssr) {
      let context = {};
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        let loaded;
        if (node) {
          try {
            loaded = await load_node({
              ...opts,
              node,
              context,
              prerender_enabled: is_prerender_enabled(options2, node, state),
              is_leaf: i === nodes.length - 1,
              is_error: false
            });
            if (!loaded)
              return;
            if (loaded.loaded.redirect) {
              return {
                status: loaded.loaded.status,
                headers: {
                  location: encodeURI(loaded.loaded.redirect)
                }
              };
            }
            if (loaded.loaded.error) {
              ({ status, error: error3 } = loaded.loaded);
            }
          } catch (err) {
            const e = coalesce_to_error(err);
            options2.handle_error(e);
            status = 500;
            error3 = e;
          }
          if (loaded && !error3) {
            branch.push(loaded);
          }
          if (error3) {
            while (i--) {
              if (route.b[i]) {
                const error_node = await options2.load_component(route.b[i]);
                let node_loaded;
                let j = i;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  const error_loaded = await load_node({
                    ...opts,
                    node: error_node,
                    context: node_loaded.context,
                    prerender_enabled: is_prerender_enabled(options2, error_node, state),
                    is_leaf: false,
                    is_error: true,
                    status,
                    error: error3
                  });
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  page_config = get_page_config(error_node.module, options2);
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  break ssr;
                } catch (err) {
                  const e = coalesce_to_error(err);
                  options2.handle_error(e);
                  continue;
                }
              }
            }
            return await respond_with_error({
              request,
              options: options2,
              state,
              $session,
              status,
              error: error3
            });
          }
        }
        if (loaded && loaded.loaded.context) {
          context = {
            ...context,
            ...loaded.loaded.context
          };
        }
      }
    }
  try {
    return await render_response({
      ...opts,
      page_config,
      status,
      error: error3,
      branch: branch.filter(Boolean)
    });
  } catch (err) {
    const error4 = coalesce_to_error(err);
    options2.handle_error(error4);
    return await respond_with_error({
      ...opts,
      status: 500,
      error: error4
    });
  }
}
function get_page_config(leaf, options2) {
  return {
    ssr: "ssr" in leaf ? !!leaf.ssr : options2.ssr,
    router: "router" in leaf ? !!leaf.router : options2.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options2.hydrate
  };
}
async function render_page(request, route, options2, state) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.path}`
    };
  }
  const match = route.pattern.exec(request.path);
  const params = route.params(match);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params
  };
  const $session = await options2.hooks.getSession(request);
  const response = await respond$1({
    request,
    options: options2,
    state,
    $session,
    route,
    page
  });
  if (response) {
    return response;
  }
  if (state.fetched) {
    return {
      status: 500,
      headers: {},
      body: `Bad request in load function: failed to fetch ${state.fetched}`
    };
  }
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      if (map.has(key)) {
        (map.get(key) || []).push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
var ReadOnlyFormData = class {
  #map;
  constructor(map) {
    this.#map = map;
  }
  get(key) {
    const value = this.#map.get(key);
    return value && value[0];
  }
  getAll(key) {
    return this.#map.get(key);
  }
  has(key) {
    return this.#map.has(key);
  }
  *[Symbol.iterator]() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *entries() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *keys() {
    for (const [key] of this.#map)
      yield key;
  }
  *values() {
    for (const [, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield value[i];
      }
    }
  }
};
function parse_body(raw, headers) {
  if (!raw || typeof raw !== "string")
    return raw;
  const [type, ...directives] = headers["content-type"].split(/;\s*/);
  switch (type) {
    case "text/plain":
      return raw;
    case "application/json":
      return JSON.parse(raw);
    case "application/x-www-form-urlencoded":
      return get_urlencoded(raw);
    case "multipart/form-data": {
      const boundary = directives.find((directive) => directive.startsWith("boundary="));
      if (!boundary)
        throw new Error("Missing boundary");
      return get_multipart(raw, boundary.slice("boundary=".length));
    }
    default:
      throw new Error(`Invalid Content-Type ${type}`);
  }
}
function get_urlencoded(text) {
  const { data, append } = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    throw new Error("Malformed form data");
  }
  const { data, append } = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    if (!match) {
      throw new Error("Malformed form data");
    }
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    const headers = {};
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name, value] = raw_header.split(": ");
      name = name.toLowerCase();
      headers[name] = value;
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name2, value2] = raw_directive.split("=");
        directives[name2] = JSON.parse(value2);
      });
      if (name === "content-disposition") {
        if (value !== "form-data")
          throw new Error("Malformed form data");
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      throw new Error("Malformed form data");
    append(key, body);
  });
  return data;
}
async function respond(incoming, options2, state = {}) {
  if (incoming.path !== "/" && options2.trailing_slash !== "ignore") {
    const has_trailing_slash = incoming.path.endsWith("/");
    if (has_trailing_slash && options2.trailing_slash === "never" || !has_trailing_slash && options2.trailing_slash === "always" && !(incoming.path.split("/").pop() || "").includes(".")) {
      const path = has_trailing_slash ? incoming.path.slice(0, -1) : incoming.path + "/";
      const q = incoming.query.toString();
      return {
        status: 301,
        headers: {
          location: encodeURI(path + (q ? `?${q}` : ""))
        }
      };
    }
  }
  try {
    const headers = lowercase_keys(incoming.headers);
    return await options2.hooks.handle({
      request: {
        ...incoming,
        headers,
        body: parse_body(incoming.rawBody, headers),
        params: {},
        locals: {}
      },
      resolve: async (request) => {
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            options: options2,
            $session: await options2.hooks.getSession(request),
            page_config: { ssr: false, router: true, hydrate: true },
            status: 200,
            branch: []
          });
        }
        for (const route of options2.manifest.routes) {
          if (!route.pattern.test(request.path))
            continue;
          const response = route.type === "endpoint" ? await render_endpoint(request, route) : await render_page(request, route, options2, state);
          if (response) {
            if (response.status === 200) {
              if (!/(no-store|immutable)/.test(response.headers["cache-control"])) {
                const etag = `"${hash(response.body || "")}"`;
                if (request.headers["if-none-match"] === etag) {
                  return {
                    status: 304,
                    headers: {},
                    body: ""
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        const $session = await options2.hooks.getSession(request);
        return await respond_with_error({
          request,
          options: options2,
          state,
          $session,
          status: 404,
          error: new Error(`Not found: ${request.path}`)
        });
      }
    });
  } catch (err) {
    const e = coalesce_to_error(err);
    options2.handle_error(e);
    return {
      status: 500,
      headers: {},
      body: options2.dev ? e.stack : e.message
    };
  }
}

// .svelte-kit/output/server/app.js
function noop2() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal2(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop2;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
Promise.resolve();
var escaped2 = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function escape2(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped2[match]);
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
var missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
var on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(parent_component ? parent_component.$$.context : context || []),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape2(value)) : `"${value}"`}`}`;
}
function afterUpdate() {
}
var css$1 = {
  code: "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
  map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n<\/script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\t{title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t#svelte-announcer {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\tclip: rect(0 0 0 0);\\n\\t\\tclip-path: inset(50%);\\n\\t\\toverflow: hidden;\\n\\t\\twhite-space: nowrap;\\n\\t\\twidth: 1px;\\n\\t\\theight: 1px;\\n\\t}\\n</style>"],"names":[],"mappings":"AAsDC,iBAAiB,eAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AACZ,CAAC"}`
};
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  $$result.css.add(css$1);
  {
    stores.page.set(page);
  }
  return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}` : ``}`
    })}` : ``}`
  })}

${``}`;
});
function set_paths(paths) {
}
function set_prerendering(value) {
}
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module"
});
var template = ({ head, body }) => '<!DOCTYPE html>\r\n<html lang="en">\r\n	<head>\r\n		<meta charset="utf-8" />\r\n		<link rel="icon" href="/favicon.png" />\r\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\r\n		' + head + '\r\n	</head>\r\n	<body>\r\n		<div id="svelte">' + body + "</div>\r\n	</body>\r\n</html>\r\n";
var options = null;
var default_settings = { paths: { "base": "", "assets": "/." } };
function init(settings = default_settings) {
  set_paths(settings.paths);
  set_prerendering(settings.prerendering || false);
  options = {
    amp: false,
    dev: false,
    entry: {
      file: "/./_app/start-584ec314.js",
      css: ["/./_app/assets/start-8077b9bf.css"],
      js: ["/./_app/start-584ec314.js", "/./_app/chunks/vendor-dd8e7245.js"]
    },
    fetched: void 0,
    floc: false,
    get_component_path: (id) => "/./_app/" + entry_lookup[id],
    get_stack: (error22) => String(error22),
    handle_error: (error22) => {
      if (error22.frame) {
        console.error(error22.frame);
      }
      console.error(error22.stack);
      error22.stack = options.get_stack(error22);
    },
    hooks: get_hooks(user_hooks),
    hydrate: true,
    initiator: void 0,
    load_component,
    manifest,
    paths: settings.paths,
    prerender: true,
    read: settings.read,
    root: Root,
    service_worker: null,
    router: true,
    ssr: true,
    target: "#svelte",
    template,
    trailing_slash: "never"
  };
}
var d = decodeURIComponent;
var empty = () => ({});
var manifest = {
  assets: [{ "file": "favicon.png", "size": 9316, "type": "image/png" }, { "file": "icons/burger.png", "size": 19470, "type": "image/png" }, { "file": "icons/discord.svg", "size": 1374, "type": "image/svg+xml" }, { "file": "icons/github.svg", "size": 822, "type": "image/svg+xml" }, { "file": "icons/instagram.png", "size": 19107, "type": "image/png" }, { "file": "icons/instagram.svg", "size": 1808, "type": "image/svg+xml" }, { "file": "icons/languages/apache.png", "size": 16333, "type": "image/png" }, { "file": "icons/languages/c.png", "size": 24527, "type": "image/png" }, { "file": "icons/languages/ceylon.png", "size": 24551, "type": "image/png" }, { "file": "icons/languages/cmake.png", "size": 24521, "type": "image/png" }, { "file": "icons/languages/coffeescript.png", "size": 28673, "type": "image/png" }, { "file": "icons/languages/cpp.png", "size": 25183, "type": "image/png" }, { "file": "icons/languages/csharp.png", "size": 27581, "type": "image/png" }, { "file": "icons/languages/css.png", "size": 15104, "type": "image/png" }, { "file": "icons/languages/dart.png", "size": 26587, "type": "image/png" }, { "file": "icons/languages/eclipse.png", "size": 27194, "type": "image/png" }, { "file": "icons/languages/elixir.png", "size": 24943, "type": "image/png" }, { "file": "icons/languages/erlang.png", "size": 15444, "type": "image/png" }, { "file": "icons/languages/git.png", "size": 13615, "type": "image/png" }, { "file": "icons/languages/go.png", "size": 25812, "type": "image/png" }, { "file": "icons/languages/golo.png", "size": 57168, "type": "image/png" }, { "file": "icons/languages/gradle.png", "size": 24053, "type": "image/png" }, { "file": "icons/languages/groovy.png", "size": 34541, "type": "image/png" }, { "file": "icons/languages/handlebars.png", "size": 15885, "type": "image/png" }, { "file": "icons/languages/html.png", "size": 13819, "type": "image/png" }, { "file": "icons/languages/intellijidea.png", "size": 10526, "type": "image/png" }, { "file": "icons/languages/java.png", "size": 32471, "type": "image/png" }, { "file": "icons/languages/javascript.png", "size": 18282, "type": "image/png" }, { "file": "icons/languages/json.png", "size": 49807, "type": "image/png" }, { "file": "icons/languages/kotlin.png", "size": 14889, "type": "image/png" }, { "file": "icons/languages/less.png", "size": 29534, "type": "image/png" }, { "file": "icons/languages/lua.png", "size": 21903, "type": "image/png" }, { "file": "icons/languages/markdown.png", "size": 11237, "type": "image/png" }, { "file": "icons/languages/perl.png", "size": 34370, "type": "image/png" }, { "file": "icons/languages/php.png", "size": 18590, "type": "image/png" }, { "file": "icons/languages/powershell.png", "size": 21368, "type": "image/png" }, { "file": "icons/languages/python.png", "size": 20080, "type": "image/png" }, { "file": "icons/languages/ruby.png", "size": 46995, "type": "image/png" }, { "file": "icons/languages/rust.png", "size": 38825, "type": "image/png" }, { "file": "icons/languages/sass.png", "size": 39328, "type": "image/png" }, { "file": "icons/languages/scala.png", "size": 14011, "type": "image/png" }, { "file": "icons/languages/shell.png", "size": 20416, "type": "image/png" }, { "file": "icons/languages/slim.png", "size": 16365, "type": "image/png" }, { "file": "icons/languages/sql.png", "size": 25994, "type": "image/png" }, { "file": "icons/languages/stylus.png", "size": 50699, "type": "image/png" }, { "file": "icons/languages/swift.png", "size": 29827, "type": "image/png" }, { "file": "icons/languages/tailwind css.png", "size": 6024, "type": "image/png" }, { "file": "icons/languages/toml.png", "size": 6623, "type": "image/png" }, { "file": "icons/languages/twig.png", "size": 19166, "type": "image/png" }, { "file": "icons/languages/typescript.png", "size": 15925, "type": "image/png" }, { "file": "icons/languages/unknown.png", "size": 19129, "type": "image/png" }, { "file": "icons/languages/vscode.png", "size": 17648, "type": "image/png" }, { "file": "icons/languages/vue.png", "size": 29070, "type": "image/png" }, { "file": "icons/languages/xml.png", "size": 16936, "type": "image/png" }, { "file": "icons/languages/yaml.png", "size": 8514, "type": "image/png" }, { "file": "icons/linkedin.svg", "size": 424, "type": "image/svg+xml" }, { "file": "icons/twitter.svg", "size": 602, "type": "image/svg+xml" }, { "file": "images/avatar.jpg", "size": 284840, "type": "image/jpeg" }, { "file": "images/contact.png", "size": 75118, "type": "image/png" }, { "file": "images/projects/animehook.jpg", "size": 293589, "type": "image/jpeg" }, { "file": "images/projects/donkeykong.jpg", "size": 1907184, "type": "image/jpeg" }, { "file": "images/projects/gofgui.jpg", "size": 323227, "type": "image/jpeg" }, { "file": "images/projects/gsillabus.jpg", "size": 353836, "type": "image/jpeg" }, { "file": "images/projects/heroroad.jpg", "size": 347219, "type": "image/jpeg" }, { "file": "images/projects/imissmybus.jpg", "size": 198670, "type": "image/jpeg" }, { "file": "images/projects/netlab.jpg", "size": 3093881, "type": "image/jpeg" }, { "file": "images/projects/personalPort.jpg", "size": 289604, "type": "image/jpeg" }, { "file": "images/projects/pswgen.jpg", "size": 340159, "type": "image/jpeg" }],
  layout: "src/routes/__layout.svelte",
  error: ".svelte-kit/build/components/error.svelte",
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/contattami\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/contattami.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/strumenti\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/strumenti.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/progetti\/([^/]+?)\/?$/,
      params: (m) => ({ name: d(m[1]) }),
      a: ["src/routes/__layout.svelte", "src/routes/progetti/[name].svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/progetti\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/progetti.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    }
  ]
};
var get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({ request, resolve: resolve2 }) => resolve2(request)),
  serverFetch: hooks.serverFetch || fetch
});
var module_lookup = {
  "src/routes/__layout.svelte": () => Promise.resolve().then(function() {
    return __layout;
  }),
  ".svelte-kit/build/components/error.svelte": () => Promise.resolve().then(function() {
    return error2;
  }),
  "src/routes/index.svelte": () => Promise.resolve().then(function() {
    return index;
  }),
  "src/routes/contattami.svelte": () => Promise.resolve().then(function() {
    return contattami;
  }),
  "src/routes/strumenti.svelte": () => Promise.resolve().then(function() {
    return strumenti;
  }),
  "src/routes/progetti/[name].svelte": () => Promise.resolve().then(function() {
    return _name_;
  }),
  "src/routes/progetti.svelte": () => Promise.resolve().then(function() {
    return progetti;
  })
};
var metadata_lookup = { "src/routes/__layout.svelte": { "entry": "/./_app/pages/__layout.svelte-c5f0b910.js", "css": ["/./_app/assets/pages/__layout.svelte-dd39c316.css"], "js": ["/./_app/pages/__layout.svelte-c5f0b910.js", "/./_app/chunks/vendor-dd8e7245.js"], "styles": [] }, ".svelte-kit/build/components/error.svelte": { "entry": "/./_app/error.svelte-6d95cdf8.js", "css": [], "js": ["/./_app/error.svelte-6d95cdf8.js", "/./_app/chunks/vendor-dd8e7245.js"], "styles": [] }, "src/routes/index.svelte": { "entry": "/./_app/pages/index.svelte-181b70e1.js", "css": [], "js": ["/./_app/pages/index.svelte-181b70e1.js", "/./_app/chunks/vendor-dd8e7245.js", "/./_app/chunks/Footer-11f3c5b7.js"], "styles": [] }, "src/routes/contattami.svelte": { "entry": "/./_app/pages/contattami.svelte-e6b33cce.js", "css": [], "js": ["/./_app/pages/contattami.svelte-e6b33cce.js", "/./_app/chunks/vendor-dd8e7245.js", "/./_app/chunks/Footer-11f3c5b7.js"], "styles": [] }, "src/routes/strumenti.svelte": { "entry": "/./_app/pages/strumenti.svelte-844c57b8.js", "css": [], "js": ["/./_app/pages/strumenti.svelte-844c57b8.js", "/./_app/chunks/vendor-dd8e7245.js", "/./_app/chunks/Footer-11f3c5b7.js"], "styles": [] }, "src/routes/progetti/[name].svelte": { "entry": "/./_app/pages/progetti/[name].svelte-cea87075.js", "css": [], "js": ["/./_app/pages/progetti/[name].svelte-cea87075.js", "/./_app/chunks/vendor-dd8e7245.js", "/./_app/chunks/progetti-ef589e34.js", "/./_app/chunks/Footer-11f3c5b7.js"], "styles": [] }, "src/routes/progetti.svelte": { "entry": "/./_app/pages/progetti.svelte-b6886e24.js", "css": [], "js": ["/./_app/pages/progetti.svelte-b6886e24.js", "/./_app/chunks/vendor-dd8e7245.js", "/./_app/chunks/Footer-11f3c5b7.js", "/./_app/chunks/progetti-ef589e34.js"], "styles": [] } };
async function load_component(file) {
  return {
    module: await module_lookup[file](),
    ...metadata_lookup[file]
  };
}
function render(request, {
  prerender
} = {}) {
  const host = request.headers["host"];
  return respond({ ...request, host }, options, { prerender });
}
var Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<nav class="${"bg-gray-700 mx-auto p-2 h-12 sticky top-0 dark:bg-yellow-200 z-10 relative"}"><div class="${"name"}">${``}

		${`
			<a class="${"font-black text-2xl dark:text-gray-700 dark:hover:text-gray-600 text-yellow-200  mx-5 absolute"}" href="${"/"}">DA</a>`}</div>
	<div class="${"others  m-auto justify-end mx-10 space-x-5 hidden sm:flex"}"><a class="${" text-2xl font-semibold dark:text-gray-700 dark:hover:text-gray-600 text-yellow-200 hover:text-yellow-300 ease-in duration-100 transition-all"}" href="${"/"}">Home</a>
		<a class="${"text-2xl  font-semibold dark:text-gray-700 dark:hover:text-gray-600 text-yellow-200 hover:text-yellow-300 ease-in duration-100 transition-all"}" href="${"/strumenti"}">Strumenti</a>
		<a class="${" text-2xl font-semibold dark:text-gray-700 dark:hover:text-gray-600 text-yellow-200 hover:text-yellow-300 ease-in duration-100 transition-all"}" href="${"/progetti"}">Progetti</a>
		<a class="${" text-2xl font-semibold dark:text-gray-700 dark:hover:text-gray-600 text-yellow-200 hover:text-yellow-300 ease-in duration-100 transition-all"}" href="${"/contattami"}">Contattami</a></div>

	<div class="${"dropdown sm:hidden flex justify-end"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" class="${"w-8 h-8 self-center hover:cursor-pointer dark:text-gray-700 dark:hover:text-gray-600 text-yellow-200 hover:text-yellow-300 duration-75 transition-all"}" fill="${"none"}" viewBox="${"0 0 24 24"}" stroke="${"currentColor"}"><path strokelinecap="${"round"}" strokelinejoin="${"round"}"${add_attribute("strokewidth", 2, 0)} d="${"M4 6h16M4 12h16M4 18h16"}"></path></svg></div>
	${``}</nav>`;
});
var css = {
  code: "@tailwind base;@tailwind components;@tailwind utilities;",
  map: `{"version":3,"file":"__layout.svelte","sources":["__layout.svelte"],"sourcesContent":["<script>\\r\\n\\timport Nav from '../components/Nav.svelte';\\r\\n<\/script>\\r\\n\\r\\n<Nav />\\r\\n\\r\\n<svelte:head>\\r\\n\\t<!-- HTML Meta Tags -->\\r\\n\\t<title>Daniele Avolio Web Developer</title>\\r\\n\\t<meta\\r\\n\\t\\tname=\\"description\\"\\r\\n\\t\\tcontent=\\"Sono Daniele Avolio, programmatore e sviluppatore. Principalmente mi occupo di sviluppo web. Mi appassiona il mondo della tecnologia e della programmazione web.\\"\\r\\n\\t/>\\r\\n\\r\\n\\t<!-- Facebook Meta Tags -->\\r\\n\\t<meta property=\\"og:url\\" content=\\"https://www.danieleavolio.it/\\" />\\r\\n\\t<meta property=\\"og:type\\" content=\\"website\\" />\\r\\n\\t<meta property=\\"og:title\\" content=\\"Daniele Avolio Web Developer\\" />\\r\\n\\t<meta\\r\\n\\t\\tproperty=\\"og:description\\"\\r\\n\\t\\tcontent=\\"Sono Daniele Avolio, programmatore e sviluppatore. Principalmente mi occupo di sviluppo web. Mi appassiona il mondo della tecnologia e della programmazione web.\\"\\r\\n\\t/>\\r\\n\\t<meta property=\\"og:image\\" content=\\"https://i.imgur.com/jtjXJOT.png\\" />\\r\\n\\r\\n\\t<!-- Twitter Meta Tags -->\\r\\n\\t<meta name=\\"twitter:card\\" content=\\"summary_large_image\\" />\\r\\n\\t<meta property=\\"twitter:domain\\" content=\\"danieleavolio.it\\" />\\r\\n\\t<meta property=\\"twitter:url\\" content=\\"https://www.danieleavolio.it/\\" />\\r\\n\\t<meta name=\\"twitter:title\\" content=\\"Daniele Avolio Web Developer\\" />\\r\\n\\t<meta\\r\\n\\t\\tname=\\"twitter:description\\"\\r\\n\\t\\tcontent=\\"Sono Daniele Avolio, programmatore e sviluppatore. Principalmente mi occupo di sviluppo web. Mi appassiona il mondo della tecnologia e della programmazione web.\\"\\r\\n\\t/>\\r\\n\\t<meta name=\\"twitter:image\\" content=\\"https://i.imgur.com/jtjXJOT.png\\" />\\r\\n\\r\\n\\t<!-- Meta Tags Generated via https://www.opengraph.xyz -->\\r\\n\\r\\n\\t<link rel=\\"preconnect\\" href=\\"https://fonts.googleapis.com\\" />\\r\\n\\t<link rel=\\"preconnect\\" href=\\"https://fonts.gstatic.com\\" crossorigin />\\r\\n\\t<link\\r\\n\\t\\thref=\\"https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,400;0,500;0,600;0,800;1,100;1,200;1,500;1,700&display=swap\\"\\r\\n\\t\\trel=\\"stylesheet\\"\\r\\n\\t/>\\r\\n\\t<link\\r\\n\\t\\thref=\\"https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap\\"\\r\\n\\t\\trel=\\"stylesheet\\"\\r\\n\\t/>\\r\\n\\r\\n\\t<style>\\r\\n\\t\\tbody {\\r\\n\\t\\t\\tbackground-color: #fff3c7;\\r\\n\\t\\t\\tfont-family: Poppins;\\r\\n\\t\\t\\tscroll-behavior: smooth;\\r\\n\\t\\t}\\r\\n\\t\\th1 {\\r\\n\\t\\t\\tfont-family: 'Libre Baskerville', serif;\\r\\n\\t\\t}\\r\\n\\r\\n\\t\\t/* width */\\r\\n\\t\\t::-webkit-scrollbar {\\r\\n\\t\\t\\twidth: 20px;\\r\\n\\t\\t}\\r\\n\\r\\n\\t\\t/* Track */\\r\\n\\t\\t::-webkit-scrollbar-track {\\r\\n\\t\\t\\tbox-shadow: inset 0 0 5px grey;\\r\\n\\t\\t\\tborder-radius: 10px;\\r\\n\\t\\t}\\r\\n\\r\\n\\t\\t/* Handle */\\r\\n\\t\\t::-webkit-scrollbar-thumb {\\r\\n\\t\\t\\tbackground: #374151;\\r\\n\\t\\t\\tborder-radius: 8px;\\r\\n\\t\\t}\\r\\n\\r\\n\\t\\t@media (prefers-color-scheme: dark) {\\r\\n\\t\\t\\t/* width */\\r\\n\\t\\t\\t::-webkit-scrollbar {\\r\\n\\t\\t\\t\\twidth: 20px;\\r\\n\\t\\t\\t}\\r\\n\\r\\n\\t\\t\\t/* Track */\\r\\n\\t\\t\\t::-webkit-scrollbar-track {\\r\\n\\t\\t\\t\\tbox-shadow: inset 0 0 5px grey;\\r\\n\\t\\t\\t\\tborder-radius: 10px;\\r\\n\\t\\t\\t}\\r\\n\\r\\n\\t\\t\\t/* Handle */\\r\\n\\t\\t\\t::-webkit-scrollbar-thumb {\\r\\n\\t\\t\\t\\tbackground: #fde68a;\\r\\n\\t\\t\\t\\tborder-radius: 8px;\\r\\n\\t\\t\\t}\\r\\n\\t\\t}\\r\\n\\t</style>\\r\\n</svelte:head>\\r\\n<slot />\\r\\n\\r\\n<style>\\r\\n\\t@tailwind base;\\r\\n\\t@tailwind components;\\r\\n\\t@tailwind utilities;\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAkGC,UAAU,IAAI,CAAC,AACf,UAAU,UAAU,CAAC,AACrB,UAAU,SAAS,CAAC"}`
};
var _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}

${$$result.head += `${$$result.title = `<title>Daniele Avolio Web Developer</title>`, ""}<meta name="${"description"}" content="${"Sono Daniele Avolio, programmatore e sviluppatore. Principalmente mi occupo di sviluppo web. Mi appassiona il mondo della tecnologia e della programmazione web."}" data-svelte="svelte-1w0u7hy"><meta property="${"og:url"}" content="${"https://www.danieleavolio.it/"}" data-svelte="svelte-1w0u7hy"><meta property="${"og:type"}" content="${"website"}" data-svelte="svelte-1w0u7hy"><meta property="${"og:title"}" content="${"Daniele Avolio Web Developer"}" data-svelte="svelte-1w0u7hy"><meta property="${"og:description"}" content="${"Sono Daniele Avolio, programmatore e sviluppatore. Principalmente mi occupo di sviluppo web. Mi appassiona il mondo della tecnologia e della programmazione web."}" data-svelte="svelte-1w0u7hy"><meta property="${"og:image"}" content="${"https://i.imgur.com/jtjXJOT.png"}" data-svelte="svelte-1w0u7hy"><meta name="${"twitter:card"}" content="${"summary_large_image"}" data-svelte="svelte-1w0u7hy"><meta property="${"twitter:domain"}" content="${"danieleavolio.it"}" data-svelte="svelte-1w0u7hy"><meta property="${"twitter:url"}" content="${"https://www.danieleavolio.it/"}" data-svelte="svelte-1w0u7hy"><meta name="${"twitter:title"}" content="${"Daniele Avolio Web Developer"}" data-svelte="svelte-1w0u7hy"><meta name="${"twitter:description"}" content="${"Sono Daniele Avolio, programmatore e sviluppatore. Principalmente mi occupo di sviluppo web. Mi appassiona il mondo della tecnologia e della programmazione web."}" data-svelte="svelte-1w0u7hy"><meta name="${"twitter:image"}" content="${"https://i.imgur.com/jtjXJOT.png"}" data-svelte="svelte-1w0u7hy"><link rel="${"preconnect"}" href="${"https://fonts.googleapis.com"}" data-svelte="svelte-1w0u7hy"><link rel="${"preconnect"}" href="${"https://fonts.gstatic.com"}" crossorigin data-svelte="svelte-1w0u7hy"><link href="${"https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,400;0,500;0,600;0,800;1,100;1,200;1,500;1,700&display=swap"}" rel="${"stylesheet"}" data-svelte="svelte-1w0u7hy"><link href="${"https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap"}" rel="${"stylesheet"}" data-svelte="svelte-1w0u7hy"><style data-svelte="svelte-1w0u7hy">body {
			background-color: #fff3c7;
			font-family: Poppins;
			scroll-behavior: smooth;
		}
		h1 {
			font-family: 'Libre Baskerville', serif;
		}

		/* width */
		::-webkit-scrollbar {
			width: 20px;
		}

		/* Track */
		::-webkit-scrollbar-track {
			box-shadow: inset 0 0 5px grey;
			border-radius: 10px;
		}

		/* Handle */
		::-webkit-scrollbar-thumb {
			background: #374151;
			border-radius: 8px;
		}

		@media (prefers-color-scheme: dark) {
			/* width */
			::-webkit-scrollbar {
				width: 20px;
			}

			/* Track */
			::-webkit-scrollbar-track {
				box-shadow: inset 0 0 5px grey;
				border-radius: 10px;
			}

			/* Handle */
			::-webkit-scrollbar-thumb {
				background: #fde68a;
				border-radius: 8px;
			}
		}
	</style>`, ""}
${slots.default ? slots.default({}) : ``}`;
});
var __layout = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _layout
});
function load$1({ error: error22, status }) {
  return { props: { error: error22, status } };
}
var Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { status } = $$props;
  let { error: error22 } = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error22 !== void 0)
    $$bindings.error(error22);
  return `<h1>${escape2(status)}</h1>

<pre>${escape2(error22.message)}</pre>



${error22.frame ? `<pre>${escape2(error22.frame)}</pre>` : ``}
${error22.stack ? `<pre>${escape2(error22.stack)}</pre>` : ``}`;
});
var error2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Error$1,
  load: load$1
});
var TransitionComponent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div>${slots.default ? slots.default({}) : ``}</div>`;
});
var Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<footer class="${"text-center m-2 dark:text-yellow-200 bottom-0"}">\xA9 2021 All rights reserved. Design &amp; Code by Daniele Avolio.
</footer>`;
});
var Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let socials = [
    {
      name: "twitter",
      link: "https://twitter.com/avolio_daniele"
    },
    {
      name: "github",
      link: "https://github.com/lovaion"
    },
    {
      name: "instagram",
      link: "https://www.instagram.com/oh_dagne/?hl=it"
    },
    {
      name: "discord",
      link: "https://discordapp.com/users/0657/"
    },
    {
      name: "linkedin",
      link: "https://www.linkedin.com/in/daniele-avolio-465aba145/"
    }
  ];
  return `<body class="${"dark:bg-gray-700"}"></body>

<title>Daniele Avolio</title>
${validate_component(TransitionComponent, "TransitionComponent").$$render($$result, {}, {}, {
    default: () => `<div class="${"container dark:bg-gray-700 bg-yellow-100 w-11/12 h-auto sm:h-screen rounded-lg sm:grid sm:grid-cols-2 grid-rows-1 m-auto "}"><div class="${"info m-auto flex flex-col h-auto md:h-3/4 gap-5 "}"><div class="${"cnt-image m-auto hover:scale-110 duration-100 mt-5"}"><img class="${"border-4 dark:border-yellow-200 border-gray-600 rounded-full h-72 w-72 shadow-md"}" src="${"images\\avatar.jpg"}" alt="${""}"></div>
			<div class="${"infos shadow-md rounded-md dark:bg-yellow-200 bg-gray-700 p-2"}"><h2 class="${"flex justify-center md:text-2xl text-xl font-semibold dark:text-gray-700 text-yellow-200"}">Daniele Avolio
				</h2>
				<h3 class="${"flex justify-center md:text-xl text-md dark:text-gray-700 text-yellow-200"}">Computer Science student
				</h3></div>
			<a href="${"https://drive.google.com/file/d/1YYLo_PTYPDJEwrUOVGqychMAdH1QsNvq/view?usp=sharing"}" target="${"_blank"}" class="${" hover:scale-125 hover:text-yellow-300 dark:text-gray-700 text-yellow-200 dark:hover:text-gray-600 mx-auto my-5 dark:bg-yellow-200  bg-gray-600 rounded p-2 h-min max-w-sm font-semibold dark:hover:bg-yellow-300  hover:bg-gray-700 transition-all duration-150 ease-linear center"}">Download CV
			</a></div>
		<div class="${"bio m-auto hover:scale-105 duration-100"}"><div class="${"testo shadow-xl rounded-lg dark:bg-yellow-200  bg-gray-700"}"><h1 class="${"flex justify-left p-5 md:text-4xl text-3xl font-semibold dark:text-gray-700 text-yellow-200"}">Ciao! \u{1F44B}
				</h1>
				<p class="${"mx-5 md:text-xl text-md dark:text-gray-600 text-yellow-100"}">Mi chiamo Daniele.</p>
				<p class="${"mx-5 md:text-xl text-md dark:text-gray-600 text-yellow-100"}">Sono uno studente di <span class="${"font-semibold dark:text-gray-700 text-yellow-200 md:text-2xl text-xl"}">Informatica</span>
					dell&#39;Universit\xE0 della calabria e sono appassionato di tecnologia e programmazione. Il mio punto
					forte \xE8 lo
					<span class="${"font-semibold dark:text-gray-700 text-yellow-200 md:text-2xl text-xl"}">sviluppo Front-End</span>.
				</p>
				<p class="${"mx-5 pb-5 md:text-xl text-md dark:text-gray-600 text-yellow-100"}">Puoi navigare sul sito e vedere tutti i miei <a href="${"/progetti"}" target="${"_blank"}"><span class="${"font-semibold dark:text-gray-700 text-yellow-200 md:text-2xl text-xl"}">progetti</span></a>, il mio curriculum e i miei contatti!
				</p></div>

			<div class="${"m-5 grid grid-cols-5 h-auto space-x-5 place-items-center"}">${each(socials, (social) => `<a${add_attribute("href", social.link, 0)} target="${"_blank"}"><img class="${"h-10 p-2 dark:bg-yellow-200 bg-gray-400 rounded-lg mb-5 w-10 cursor-pointer opacity-75 hover:opacity-100 hover:scale-125 transition-all duration-150 "}" src="${"icons\\" + escape2(social.name) + ".svg"}" alt="${""}">
					</a>`)}</div></div></div>
	${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`
  })}`;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Routes
});
var Contattami = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<body class="${"dark:bg-gray-700"}"></body>

<title>Contattami</title>
${validate_component(TransitionComponent, "TransitionComponent").$$render($$result, {}, {}, {
    default: () => `<div class="${"container dark:bg-gray-700 bg-yellow-100 items-center justify-center h-screen flex flex-col gap-4 rounded-lg m-auto"}"><div class="${"boxCentrale m-5 bg-gray-700 dark:bg-yellow-200 max-w-lg lg:max-w-2xl xl:max-w-full xl:flex flex-row rounded-xl hover:shadow-lg duration-100 ease-linear"}"><div class="${"left h-auto m-auto flex w-auto md:flex-shrink-0"}"><img class="${"  sm:max-w-lg  lg:max-w-2xl xl:max-w-3xl rounded-t-lg xl:rounded-xl xl:rounded-r-none shadow-lg"}" src="${"images\\contact.png"}" alt="${""}"></div>
			<div class="${"right h-auto m-3 text-justify flex flex-col justify-evenly"}"><h2 class="${" text-2xl md:text-4xl xl:text-6xl text-yellow-300 dark:text-gray-800 font-semibold text-left "}">Contattami
				</h2>
				<h2 class="${" text-md md:text-lg xl:text-2xl text-yellow-200 dark:text-gray-800 font-medium text-left "}">Per qualsiasi informazione riguardo:
				</h2>
				<ul><li class="${"text-md md:text-lg text-yellow-200 dark:text-gray-700"}">\u{1F4CC} Progetti</li>
					<li class="${"text-md md:text-lg text-yellow-200 dark:text-gray-700"}">\u{1F4CC} Formazione</li>
					<li class="${"text-md md:text-lg text-yellow-200 dark:text-gray-700"}">\u{1F4CC} Lavoro</li></ul>
				<p class="${"text-sm sm:text-base md:text-lg text-yellow-100 dark:text-gray-600"}">Se sei interessato in un progetto per un <span class="${"font-semibold text-yellow-200 dark:text-gray-700 underline "}">sito Web
					</span>
					interamente personalizzabile a tuo piacimento e hai bisogno di qualcuno che gestisca le pagine
					che mostrano la tua attivit\xE0 o azienda, sentiti libero di
					<span class="${"font-semibold text-yellow-200 dark:text-gray-700 underline "}">contattarmi</span>
					in qualsiasi momento tramite il
					<span class="${"font-semibold text-yellow-200 dark:text-gray-700 underline "}">bottone</span> sottostante!
				</p></div></div>
		<a class="${"text-xl font-semibold hover:scale-110 items-center p-3 flex w-min rounded-md bg-yellow-400 hover:bg-yellow-300 text-gray-700 shadow-lg duration-100 ease-in "}" href="${"mailto:danieleavoliodev@gmail.com"}">Contattami</a></div>
	${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`
  })}`;
});
var contattami = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Contattami
});
var LanguageBox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { titolo = "PL" } = $$props;
  if ($$props.titolo === void 0 && $$bindings.titolo && titolo !== void 0)
    $$bindings.titolo(titolo);
  return `
<div class="${"	main m-auto grid gap-1 \r\n		  bg-gray-700 dark:bg-yellow-200 rounded-xl \r\n            p-2 \r\n			hover:scale-105 transition-all \r\n            duration-100 \r\n			w-24  lg:w-48\r\n			hover:w-48 xl:hover:w-64\r\n			hover:shadow-lg \r\n			mb-5\r\n			z-0\r\n			relative"}"><img class="${"w-30 h-30 flex m-auto p-1 rounded-xl "}" style="${"scroll-snap-align:center;"}" src="${"icons\\languages\\" + escape2(titolo.toLowerCase()) + ".png"}" alt="${""}">

	${``}</div>`;
});
var Strumenti = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const strAndLinguaggi = [
    { name: "Javascript" },
    { name: "Java" },
    { name: "Python" },
    { name: "Cpp" },
    { name: "CSS" },
    { name: "HTML" },
    { name: "Perl" },
    { name: "SQL" },
    { name: "Git" },
    { name: "Eclipse" },
    { name: "IntelliJIdea" },
    { name: "VSCode" },
    { name: "Tailwind CSS" }
  ];
  return `<body class="${"dark:bg-gray-700"}"></body>

${validate_component(TransitionComponent, "TransitionComponent").$$render($$result, {}, {}, {
    default: () => `<title>Strumenti e Linguaggi</title>
	<div class="${"container bg-yellow-100 dark:bg-gray-700 w-auto h-auto rounded-lg m-auto mt-20"}"><div class="${"boxCentrale"}"><h2 class="${"text-5xl dark:text-yellow-200 text-gray-700 font-black text-center m-5"}">Linguaggi e Strumenti
			</h2>
			<div class="${"boxLinguaggi grid grid-cols-1 md:grid-cols-2 gap-6 m-auto"}" style="${"scroll-behavior: smooth;"}">${each(strAndLinguaggi, (linguaggio) => `${validate_component(LanguageBox, "LanguageBox").$$render($$result, { titolo: linguaggio.name }, {}, {})}`)}</div></div></div>
	${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`
  })}`;
});
var strumenti = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Strumenti
});
var subscriber_queue2 = [];
function readable(value, start) {
  return {
    subscribe: writable2(value, start).subscribe
  };
}
function writable2(value, start = noop2) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal2(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue2.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue2.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue2.length; i += 2) {
            subscriber_queue2[i][0](subscriber_queue2[i + 1]);
          }
          subscriber_queue2.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop2) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop2;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
var progetti$1 = readable([
  {
    nome: "Donkey Kong AI",
    tipo: "Gioco + Intelligenza Artificiale",
    descrizione: "Gioco sviluppato per l`esame di intelligenza artificiale utilizzando DLV e EmbAsp per gestire la logica del gioco e di tutti gli ostacoli che erano presenti all`interno del progetto",
    immagine: "donkeykong",
    repo: "https://github.com/lovaion/DonkeyKongAI"
  },
  {
    nome: "Game Syllabus",
    tipo: "Full-stack Sito Web per videogiochi",
    descrizione: "Sito Web realizzato per il progetto di Sistemi Informativi per il Web e Ingegneria del Software, utilizzando Java come Backend con Spring Boot e PostgreSQL come Database, mentre il frontend \xE8 tutto HMTL,CSS e JS puri.",
    immagine: "gsillabus",
    repo: "https://github.com/lovaion/Game-Syllabus"
  },
  {
    nome: "Personal Portfolio",
    tipo: "Sito realizzato con Svelte",
    descrizione: "Sito Web personale (quello che stai visualizzando ora) realizzato utilizzando come Framework Svelte e TailWind CSS.",
    immagine: "personalPort",
    repo: "https://github.com/lovaion/SveltePortfolio"
  },
  {
    nome: "Password Generator",
    tipo: "Generatore minimale di Password",
    descrizione: "Generatore di password realizzato con un design molto MINIMAL. Il tutto \xE8 stato programmato utilizzando solamente HTML,CSS e JS.",
    immagine: "pswgen",
    repo: "https://github.com/lovaion/MinimalPasswordGenerator"
  },
  {
    nome: "I Miss My Bus",
    tipo: "Semplice applicazione Web",
    descrizione: "Semplice progetto personale realizzato prendendo spunto da un progetto simile. Il sito mostra una playlist e dei suoni che ricordano i viaggi che si fanno in bus, regolabili e mutabili.",
    immagine: "imissmybus",
    repo: "https://github.com/lovaion/IMissMyBus"
  },
  {
    nome: "Anime Hook",
    tipo: "Catalogo di Anime usando API Pubbliche",
    descrizione: "Applicazione Web che sfrutta delle API pubbliche per acquisire informazioni su Anime, realizzato usando Javascript.",
    immagine: "animehook",
    repo: "https://github.com/lovaion/AnimeHook"
  },
  {
    nome: "Hero Road",
    tipo: "Gioco 2D in Java",
    descrizione: "Gioco 2D Arcade realizzato interamente con Java per il progetto di Interfacce grafiche e Programmazione ad Eventi",
    immagine: "heroroad",
    repo: "https://github.com/lovaion/Hero-Road-Java"
  },
  {
    nome: "Game Of Life GUI",
    tipo: "Applicazione con GUI per GOF",
    descrizione: "Progetto personale per la visualizzazione del gioco della vita con grafica personalizzabile, scalabile e movibile.",
    immagine: "gofgui",
    repo: "https://github.com/lovaion/GameOfLife-GUI "
  },
  {
    nome: "Lab Network Configuration",
    tipo: "Configurazione di rete di un laboratorio",
    descrizione: "Progetto per Sistemi Operativi e Reti: Sfrutta GNS3 per la configurazione di un laboratorio partendo dal calcolo degli indirizzi Ip per arrivare alla configurazione del NAT",
    immagine: "netlab",
    repo: "https://github.com/AlexFazio64/Sor-project-29"
  }
]);
async function load(ctx) {
  const name = ctx.page.params.name;
  return { props: { name } };
}
var U5Bnameu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $progetti, $$unsubscribe_progetti;
  $$unsubscribe_progetti = subscribe(progetti$1, (value) => $progetti = value);
  let { name } = $$props;
  let index2 = $progetti.findIndex((elem) => elem.nome == name);
  let immagine = $progetti[index2].immagine;
  let tipo = $progetti[index2].tipo;
  let descrizione = $progetti[index2].descrizione;
  let repo = $progetti[index2].repo;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  $$unsubscribe_progetti();
  return `<title>${escape2(name)}</title>
${validate_component(TransitionComponent, "TransitionComponent").$$render($$result, {}, {}, {
    default: () => `<h2 class="${"text-center text-5xl m-5 font-black dark:text-yellow-200 text-gray-700 "}">${escape2(name)}</h2>
	<div class="${"container w-auto h-screen m-auto flex"}"><div class="${"card w-3/4 md:w-3/4 xl:w-max xl:h-max dark:bg-yellow-200 bg-gray-700 grid xl:flex m-auto gap- rounded-3xl hover:shadow-lg hover:scale-105 duration-100 ease-linear"}"><img class="${"flex-shrink-0 rounded-t-xl  xl:w-1/2 xl:h-1/2 xl:rounded-xl xl:rounded-r-none"}" src="${"..\\images\\projects\\" + escape2(immagine) + ".jpg"}" alt="${""}">
			<div class="${"right flex flex-col"}"><div class="${"testo"}"><h2 class="${"text-yellow-300 dark:text-gray-700 font-semibold text-lg md:text-2xl xl:text-3xl p-5"}">${escape2(tipo)}</h2>
					<p class="${"text-yellow-200  dark:text-gray-700 text-sm md:text-base italic p-5"}">${escape2(descrizione)}</p></div>
				<a class="${"p-5 m-2 m-auto mb-5 md:m-5 bg-green-500 hover:bg-green-400 duration-100 ease-in w-min whitespace-nowrap rounded-lg flex flex-row align-middle items-center text-white"}" target="${"_blank"}"${add_attribute("href", repo, 0)}><svg xmlns="${"http://www.w3.org/2000/svg"}" class="${"xl:h-10 xl:w-10 h-6 w-6 text-center text-white"}" viewBox="${"0 0 20 20"}" fill="${"currentColor"}"><path fillrule="${"evenodd"}" d="${"M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"}" cliprule="${"evenodd"}"></path></svg>
					Source Code
				</a></div></div></div>
	${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`
  })}`;
});
var _name_ = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": U5Bnameu5D,
  load
});
var ProjectCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { nome } = $$props;
  let { tipo } = $$props;
  let { immagine } = $$props;
  if ($$props.nome === void 0 && $$bindings.nome && nome !== void 0)
    $$bindings.nome(nome);
  if ($$props.tipo === void 0 && $$bindings.tipo && tipo !== void 0)
    $$bindings.tipo(tipo);
  if ($$props.immagine === void 0 && $$bindings.immagine && immagine !== void 0)
    $$bindings.immagine(immagine);
  return `
<div class="${"max-w-xs sm:max-w-md md:max-w-xl m-14 h-auto flex flex-col  rounded-xl bg-gray-700 dark:bg-yellow-200 hover:shadow-lg ease-linear duration-100 sm:hover:scale-105"}" style="${"scroll-snap-align:center;"}"><div class="${"topPart md:flex-shrink-0"}"><img class="${" max-w-xs sm:max-w-md md:max-w-lg rounded-xl rounded-b-none"}" src="${"images\\projects\\" + escape2(immagine) + ".jpg"}" alt="${""}"></div>
	<div class="${"bottomPart w-full h-full grid grid-cols-2 items-center justify-items-center"}"><div class="${"p-5 testi flex flex-col gap-5"}"><h2 class="${"text-left text-xl md:text-2xl font-semibold text-yellow-300 dark:text-gray-800"}">${escape2(nome)}</h2>
			<p class="${"text-sm md:text-md text-yellow-200 dark:text-gray-700"}">Tipo: <span class="${"italic"}">${escape2(tipo)}</span></p></div>
		<a href="${"/progetti/" + escape2(nome)}" class="${"flex w-min whitespace-nowrap h-1/3 items-center bg-yellow-200 dark:bg-gray-700 text-gray-700 dark:text-yellow-200  hover:scale-105 hover:bg-yellow-300 dark:hover:bg-gray-800 cursor-pointer first-letter:duration-100 transition-all  ease-linear p-3  rounded-md font-semibold"}">More Info
		</a></div></div>`;
});
var Progetti = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $progetti, $$unsubscribe_progetti;
  $$unsubscribe_progetti = subscribe(progetti$1, (value) => $progetti = value);
  $$unsubscribe_progetti();
  return `<head><meta name="${"viewport"}" content="${"width=device-width, initial-scale=1.0"}"></head>
<body class="${"dark:bg-gray-700 "}"></body>

${validate_component(TransitionComponent, "TransitionComponent").$$render($$result, {}, {}, {
    default: () => `<title>Progetti</title>
	<div class="${"container dark:bg-gray-700 bg-yellow-100 h-auto rounded-lg m-auto"}"><h2 class="${"text-7xl dark:text-yellow-200 text-gray-700 font-black text-center m-5"}">Progetti</h2>
		<div class="${"boxCentrale mt-5 h-screen flex flex-row "}"><div style="${"scroll-snap-type: x  mandatory; overflow-x: scroll; scroll-behavior: smooth;"}" class="${"boxProgetti flex flex-row overflow-auto m-auto h-auto overflow-x-hidden "}">${each($progetti, (progetto) => `${validate_component(ProjectCard, "ProjectCard").$$render($$result, {
      nome: progetto.nome,
      tipo: progetto.tipo,
      immagine: progetto.immagine
    }, {}, {})}`)}</div></div></div>
	${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`
  })}`;
});
var progetti = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Progetti
});

// .svelte-kit/netlify/entry.js
init();
async function handler(event) {
  const { path, httpMethod, headers, rawQuery, body, isBase64Encoded } = event;
  const query = new URLSearchParams(rawQuery);
  const encoding = isBase64Encoded ? "base64" : headers["content-encoding"] || "utf-8";
  const rawBody = typeof body === "string" ? Buffer.from(body, encoding) : body;
  const rendered = await render({
    method: httpMethod,
    headers,
    path,
    query,
    rawBody
  });
  if (rendered) {
    return {
      isBase64Encoded: false,
      statusCode: rendered.status,
      ...splitHeaders(rendered.headers),
      body: rendered.body
    };
  }
  return {
    statusCode: 404,
    body: "Not found"
  };
}
function splitHeaders(headers) {
  const h = {};
  const m = {};
  for (const key in headers) {
    const value = headers[key];
    const target = Array.isArray(value) ? m : h;
    target[key] = value;
  }
  return {
    headers: h,
    multiValueHeaders: m
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
