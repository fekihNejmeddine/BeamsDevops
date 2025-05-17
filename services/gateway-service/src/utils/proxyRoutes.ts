export const PROXY_ROUTES = [
  { path: "/auth", target: "http://localhost:4001" },
  { path: "/api/notifications", target: "http://localhost:4001" },
  { path: "/syndic", target: "http://localhost:4002" },
  { path: "/fees", target: "http://localhost:4003" },
  { path: "/meetings", target: "http://localhost:4004" },
];
