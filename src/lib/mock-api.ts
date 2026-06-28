export type TimeRange = "daily" | "weekly" | "monthly";

export interface DataPoint {
  date: string;
  label: string;
  revenue: number;
  users: number;
  conversionRate: number;
}

export interface AnalyticsSummary {
  revenue: { value: number; change: number };
  users: { value: number; change: number };
  conversionRate: { value: number; change: number };
  mrr: { value: number; change: number };
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "billing";
  read: boolean;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  avatar: string;
  plan: "starter" | "pro" | "enterprise";
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

function generateData(range: TimeRange): DataPoint[] {
  const configs = {
    daily: { count: 14, format: (i: number) => `Day ${i + 1}` },
    weekly: { count: 12, format: (i: number) => `W${i + 1}` },
    monthly: { count: 12, format: (i: number) => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i] },
  };
  const { count, format } = configs[range];
  return Array.from({ length: count }, (_, i) => ({
    date: `2025-${String(i + 1).padStart(2, "0")}-01`,
    label: format(i),
    revenue: 42000 + Math.sin(i * 0.8) * 12000 + i * 2800 + Math.random() * 5000,
    users: 1200 + Math.cos(i * 0.6) * 400 + i * 180 + Math.random() * 200,
    conversionRate: 2.8 + Math.sin(i * 0.5) * 0.8 + i * 0.12 + Math.random() * 0.3,
  }));
}

const summaries: Record<TimeRange, AnalyticsSummary> = {
  daily: {
    revenue: { value: 184200, change: 12.4 },
    users: { value: 8420, change: 8.2 },
    conversionRate: { value: 3.42, change: 0.6 },
    mrr: { value: 52400, change: 5.1 },
  },
  weekly: {
    revenue: { value: 892400, change: 18.7 },
    users: { value: 28400, change: 14.3 },
    conversionRate: { value: 3.28, change: -0.4 },
    mrr: { value: 52400, change: 5.1 },
  },
  monthly: {
    revenue: { value: 3240000, change: 24.1 },
    users: { value: 98400, change: 22.8 },
    conversionRate: { value: 3.56, change: 1.2 },
    mrr: { value: 52400, change: 5.1 },
  },
};

const notifications: Notification[] = [
  { id: "1", title: "Revenue milestone", message: "Monthly revenue crossed $3M for the first time.", type: "success", read: false, createdAt: "2025-06-28T10:00:00Z" },
  { id: "2", title: "New team member", message: "Sarah Chen joined your workspace.", type: "info", read: false, createdAt: "2025-06-28T08:30:00Z" },
  { id: "3", title: "Payment received", message: "Pro plan subscription renewed — $99/mo.", type: "billing", read: true, createdAt: "2025-06-27T14:00:00Z" },
  { id: "4", title: "Conversion drop alert", message: "Conversion rate dipped 0.4% in the last 7 days.", type: "warning", read: true, createdAt: "2025-06-26T09:15:00Z" },
  { id: "5", title: "API limit warning", message: "You've used 85% of your monthly API quota.", type: "warning", read: true, createdAt: "2025-06-25T16:45:00Z" },
];

export const mockUser: UserProfile = {
  id: "usr_1",
  name: "Alex Morgan",
  email: "alex@pulseiq.io",
  role: "Admin",
  company: "PulseIQ Inc.",
  avatar: "AM",
  plan: "pro",
};

/** REST-style mock */
export const api = {
  async getAnalytics(range: TimeRange) {
    await delay(600);
    return { summary: summaries[range], data: generateData(range) };
  },

  async getNotifications() {
    await delay(400);
    return [...notifications];
  },

  async markNotificationRead(id: string) {
    await delay(200);
    const n = notifications.find((x) => x.id === id);
    if (n) n.read = true;
    return { success: true };
  },

  async getProfile() {
    await delay(300);
    return { ...mockUser };
  },

  async updateProfile(data: Partial<UserProfile>) {
    await delay(500);
    Object.assign(mockUser, data);
    return { ...mockUser };
  },

  async login(email: string, password?: string) {
    void password;
    await delay(800);
    if (!email.includes("@")) throw new Error("Invalid credentials");
    return { token: "mock_jwt_token", user: mockUser };
  },

  async signup(name: string, email: string, password?: string) {
    void password;
    await delay(900);
    return { token: "mock_jwt_token", user: { ...mockUser, name, email } };
  },

  async resetPassword(email: string) {
    await delay(700);
    if (!email.includes("@")) throw new Error("Email not found");
    return { success: true };
  },
};

/** GraphQL-style mock */
export const graphql = {
  async query<T>(operation: string, variables?: Record<string, unknown>): Promise<T> {
    await delay(500);
    if (operation === "GetDashboard") {
      const range = (variables?.range as TimeRange) || "weekly";
      return {
        analytics: summaries[range],
        chartData: generateData(range),
      } as T;
    }
    if (operation === "GetUser") {
      return { user: mockUser } as T;
    }
    throw new Error(`Unknown operation: ${operation}`);
  },
};
