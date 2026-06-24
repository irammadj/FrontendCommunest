import { createContext, useContext, useState, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Only stored for demo purposes
  profilePicture?: string;
  isAdmin: boolean;
  isSuperAdmin?: boolean;
  rentedHouseId?: string;
  rentedEstateId?: string;
  listedEstateId?: string;
  emailVerified: boolean;
  verificationCode?: string;
  verificationCodeExpiry?: number; // timestamp
  lastCodeRequestTime?: number; // timestamp
}

interface LoginAttempt {
  email: string;
  timestamp: number;
  failed: boolean;
}

interface Device {
  id: string;
  userAgent: string;
  lastLogin: number;
  trusted: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (
    email: string,
    password: string,
  ) => { success: boolean; message: string };
  register: (
    name: string,
    email: string,
    password: string,
    profilePicture?: string,
  ) => { success: boolean; message: string };
  signOut: () => void;
  updateUser: (updates: Partial<User>) => void;
  updateUserSuperAdmin: (isSuperAdmin: boolean) => void;
  deleteAccount: () => void;
  applyForRent: (houseId: string, estateId: string) => void;
  generateVerificationCode: (email: string) => string;
  verifyEmailCode: (email: string, code: string) => boolean;
  requestNewVerificationCode: (email: string) => {
    success: boolean;
    message: string;
  };
  isAccountLocked: (email: string) => boolean;
  getRemainingLockoutTime: (email: string) => number;
  detectNewDevice: (email: string) => boolean;
  trustDevice: (email: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Helper function to get simple device identifier
  const getDeviceId = (): string => {
    const userAgent = navigator.userAgent;
    const hash = userAgent.split("").reduce((acc, char) => {
      return (acc << 5) - acc + char.charCodeAt(0);
    }, 0);
    return Math.abs(hash).toString(36);
  };

  // Helper function to validate password strength
  const isPasswordStrong = (password: string): boolean => {
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[@!#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    return (
      hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSymbol
    );
  };

  // Generate 4-digit verification code
  const generateVerificationCode = (email: string): string => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();

    // Store code and expiry time (10 minutes)
    const expiryTime = Date.now() + 10 * 60 * 1000;
    const storedUsers = localStorage.getItem("communest_users") || "[]";
    const users = JSON.parse(storedUsers);

    const userIndex = users.findIndex((u: User) => u.email === email);
    if (userIndex !== -1) {
      users[userIndex].verificationCode = code;
      users[userIndex].verificationCodeExpiry = expiryTime;
      users[userIndex].lastCodeRequestTime = Date.now();
      localStorage.setItem("communest_users", JSON.stringify(users));
    }

    console.log(`Verification code for ${email}: ${code}`);
    return code;
  };

  // Verify the code
  const verifyEmailCode = (email: string, code: string): boolean => {
    const storedUsers = localStorage.getItem("communest_users") || "[]";
    const users = JSON.parse(storedUsers);

    const foundUser = users.find((u: User) => u.email === email);
    if (!foundUser) return false;

    // Check if code expired
    if (Date.now() > foundUser.verificationCodeExpiry) {
      return false;
    }

    // Check if code matches
    if (foundUser.verificationCode === code) {
      // Mark as verified
      foundUser.emailVerified = true;
      foundUser.verificationCode = undefined;
      foundUser.verificationCodeExpiry = undefined;
      localStorage.setItem("communest_users", JSON.stringify(users));

      // Update current user if logged in
      if (user?.email === email) {
        setUser({ ...user, emailVerified: true });
      }

      return true;
    }

    return false;
  };

  // Request new verification code (only after 2 minutes)
  const requestNewVerificationCode = (
    email: string,
  ): { success: boolean; message: string } => {
    const storedUsers = localStorage.getItem("communest_users") || "[]";
    const users = JSON.parse(storedUsers);

    const foundUser = users.find((u: User) => u.email === email);
    if (!foundUser) {
      return { success: false, message: "User not found" };
    }

    const lastRequestTime = foundUser.lastCodeRequestTime || 0;
    const twoMinutesAgo = Date.now() - 2 * 60 * 1000;

    if (lastRequestTime > twoMinutesAgo) {
      const remainingTime = Math.ceil(
        (lastRequestTime + 2 * 60 * 1000 - Date.now()) / 1000,
      );
      return {
        success: false,
        message: `Please wait ${remainingTime}s before requesting a new code`,
      };
    }

    // Generate new code
    generateVerificationCode(email);
    return {
      success: true,
      message: "Verification code sent to your email",
    };
  };

  // Check if account is locked due to failed attempts
  const isAccountLocked = (email: string): boolean => {
    const lockoutKey = `communest_lockout_${email}`;
    const lockoutData = localStorage.getItem(lockoutKey);

    if (!lockoutData) return false;

    const { lockoutTime } = JSON.parse(lockoutData);
    const now = Date.now();

    // 2 hours lockout
    if (now < lockoutTime) {
      return true;
    }

    // Lockout expired, remove it
    localStorage.removeItem(lockoutKey);
    return false;
  };

  // Get remaining lockout time in seconds
  const getRemainingLockoutTime = (email: string): number => {
    const lockoutKey = `communest_lockout_${email}`;
    const lockoutData = localStorage.getItem(lockoutKey);

    if (!lockoutData) return 0;

    const { lockoutTime } = JSON.parse(lockoutData);
    const remaining = lockoutTime - Date.now();

    return remaining > 0 ? Math.ceil(remaining / 1000) : 0;
  };

  // Check if device is new
  const detectNewDevice = (email: string): boolean => {
    const currentDeviceId = getDeviceId();
    const devicesKey = `communest_devices_${email}`;
    const storedDevices = localStorage.getItem(devicesKey);

    if (!storedDevices) return true; // First login = new device

    const devices: Device[] = JSON.parse(storedDevices);
    const deviceExists = devices.some(
      (d) => d.id === currentDeviceId && d.trusted,
    );

    return !deviceExists;
  };

  // Trust current device
  const trustDevice = (email: string) => {
    const currentDeviceId = getDeviceId();
    const devicesKey = `communest_devices_${email}`;
    const storedDevices = localStorage.getItem(devicesKey);

    const devices: Device[] = storedDevices ? JSON.parse(storedDevices) : [];

    const existingDevice = devices.find((d) => d.id === currentDeviceId);
    if (existingDevice) {
      existingDevice.trusted = true;
      existingDevice.lastLogin = Date.now();
    } else {
      devices.push({
        id: currentDeviceId,
        userAgent: navigator.userAgent,
        lastLogin: Date.now(),
        trusted: true,
      });
    }

    localStorage.setItem(devicesKey, JSON.stringify(devices));
  };

  // Track login attempts
  const recordLoginAttempt = (email: string, failed: boolean) => {
    const attemptsKey = `communest_login_attempts_${email}`;
    const attemptsData = localStorage.getItem(attemptsKey);
    const attempts: LoginAttempt[] = attemptsData
      ? JSON.parse(attemptsData)
      : [];

    // Add new attempt
    attempts.push({ email, timestamp: Date.now(), failed });

    // Keep only attempts from last 2 hours
    const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000;
    const recentAttempts = attempts.filter((a) => a.timestamp > twoHoursAgo);

    // Count failed attempts in last 2 hours
    const failedCount = recentAttempts.filter((a) => a.failed).length;

    if (failedCount >= 5) {
      // Lock account for 2 hours
      const lockoutKey = `communest_lockout_${email}`;
      const lockoutTime = Date.now() + 2 * 60 * 60 * 1000;
      localStorage.setItem(lockoutKey, JSON.stringify({ lockoutTime }));
    }

    localStorage.setItem(attemptsKey, JSON.stringify(recentAttempts));
  };

  const signIn = (
    email: string,
    password: string,
  ): { success: boolean; message: string } => {
    // Check if account is locked
    if (isAccountLocked(email)) {
      const remaining = getRemainingLockoutTime(email);
      const hours = Math.floor(remaining / 3600);
      const minutes = Math.floor((remaining % 3600) / 60);
      return {
        success: false,
        message: `Account locked due to too many failed attempts. Try again in ${hours}h ${minutes}m`,
      };
    }

    let loginSuccess = false;

    // Super Admin account
    if (
      email === "superadmin@communest.co.ke" &&
      password === "superadmin123"
    ) {
      loginSuccess = true;
      setUser({
        id: "superadmin",
        name: "Communest Admin",
        email: "superadmin@communest.co.ke",
        isAdmin: true,
        isSuperAdmin: true,
        emailVerified: true,
      });
    }
    // Demo accounts
    else if (email === "demo@communest.co.ke" && password === "demo123") {
      loginSuccess = true;
      setUser({
        id: "demo",
        name: "Demo User",
        email: "demo@communest.co.ke",
        isAdmin: false,
        emailVerified: true,
      });
    } else if (email === "admin@communest.co.ke" && password === "admin123") {
      loginSuccess = true;
      setUser({
        id: "admin1",
        name: "Estate Admin",
        email: "admin@communest.co.ke",
        isAdmin: true,
        listedEstateId: "est1",
        emailVerified: true,
      });
    } else if (email === "tenant@communest.co.ke" && password === "tenant123") {
      loginSuccess = true;
      setUser({
        id: "tenant1",
        name: "Demo Tenant",
        email: "tenant@communest.co.ke",
        isAdmin: false,
        rentedHouseId: "h1",
        rentedEstateId: "est1",
        emailVerified: true,
      });
    } else {
      // Check localStorage users
      const storedUsers = localStorage.getItem("communest_users");
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        const foundUser = users.find(
          (u: User) => u.email === email && u.password === password,
        );
        if (foundUser) {
          loginSuccess = true;
          setUser(foundUser);
        }
      }
    }

    if (loginSuccess) {
      recordLoginAttempt(email, false);

      // Check for new device
      const isNewDevice = detectNewDevice(email);
      if (isNewDevice) {
        return {
          success: true,
          message: "new_device",
        };
      }

      return { success: true, message: "Login successful" };
    }

    // Failed attempt
    recordLoginAttempt(email, true);
    return {
      success: false,
      message: "Invalid email or password",
    };
  };

  const register = (
    name: string,
    email: string,
    password: string,
    profilePicture?: string,
  ): { success: boolean; message: string } => {
    // Validate password strength
    if (!isPasswordStrong(password)) {
      return {
        success: false,
        message:
          "Password must be at least 8 characters with uppercase, lowercase, number, and symbol",
      };
    }

    const newUser: User = {
      id: "u" + Date.now(),
      name,
      email,
      password, // Demo only - would be hashed in production
      profilePicture,
      isAdmin: false,
      emailVerified: false,
    };

    // Store in localStorage
    const storedUsers = localStorage.getItem("communest_users") || "[]";
    const users = JSON.parse(storedUsers);

    // Check if email already exists
    if (users.some((u: User) => u.email === email)) {
      return { success: false, message: "Email already registered" };
    }

    users.push(newUser);
    localStorage.setItem("communest_users", JSON.stringify(users));

    // Generate verification code
    generateVerificationCode(email);

    setUser(newUser);
    return {
      success: true,
      message: "Registration successful. Please verify your email.",
    };
  };

  const signOut = () => setUser(null);

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));

    // Update in localStorage too
    if (user?.email) {
      const storedUsers = localStorage.getItem("communest_users") || "[]";
      const users = JSON.parse(storedUsers);
      const userIndex = users.findIndex((u: User) => u.email === user.email);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updates };
        localStorage.setItem("communest_users", JSON.stringify(users));
      }
    }
  };

  const updateUserSuperAdmin = (isSuperAdmin: boolean) => {
    setUser((prev) => (prev ? { ...prev, isSuperAdmin } : null));
  };

  const deleteAccount = () => setUser(null);

  const applyForRent = (houseId: string, estateId: string) => {
    setUser((prev) =>
      prev
        ? { ...prev, rentedHouseId: houseId, rentedEstateId: estateId }
        : null,
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signIn,
        register,
        signOut,
        updateUser,
        updateUserSuperAdmin,
        deleteAccount,
        applyForRent,
        generateVerificationCode,
        verifyEmailCode,
        requestNewVerificationCode,
        isAccountLocked,
        getRemainingLockoutTime,
        detectNewDevice,
        trustDevice,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
