export const PROXY_ROUTES = [
  { path: "/auth", target: "http://auth_service:4001" },
  { path: "/api/notifications", target: "http://auth_service:4001" },
  { path: "/syndic", target: "http://syndic_service:4002" },
  { path: "/fees", target: "http://fees_service:4003" },
  { path: "/meetings", target: "http://meeting_service:4004" },
];
