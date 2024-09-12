import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: JwtPayload = jwtDecode(token);

    if (!decoded.exp) {
      return true;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime > decoded.exp;
  } catch (error) {
    console.error("Invalid token format:", error);
    return true;
  }
};

export const logout = () => {
  localStorage.removeItem("accesstoken");
  localStorage.removeItem("companyNameKey");
  localStorage.removeItem("role");
  window.location.href = "/login";
};
