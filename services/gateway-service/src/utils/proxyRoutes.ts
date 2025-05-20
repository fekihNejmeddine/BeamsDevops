export const PROXY_ROUTES = [
  { path: "/auth", target: "http://192.168.1.12:4001" },
  { path: "/api/notifications", target: "http://auth_service:4001" },
  { path: "/syndic", target: "http://syndic_service:4002" },
  { path: "/fees", target: "http://192.168.1.12:4003" },
  { path: "/meetings", target: "http://meeting_service:4004" },
];
