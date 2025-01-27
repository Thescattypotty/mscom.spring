import type { LoginRequest, UserResponse, UserCreateRequest } from "src/intefaces";

import { useMemo, useState, useEffect, useContext, useCallback, createContext } from "react";

import axiosInstance from "src/interceptor/AxiosInstance";
import { signIn, signUp, signOut, currentUser } from "src/services/auth.service";

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserResponse | undefined;
  login: (credentials: LoginRequest) => Promise<boolean>;
  register: (credentials: UserCreateRequest) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

// eslint-disable-next-line react/prop-types
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserResponse>({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        roles: [],
        birthday: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token && isValidToken(token)) {
            setIsAuthenticated(true);
            fetchUser();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    const login = useCallback(async(credentials: LoginRequest): Promise<boolean> => {
        try {
          const { data } = await signIn(credentials);
          localStorage.setItem('accessToken', data.accessToken);
          axiosInstance.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
          setIsAuthenticated(true);
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const register = useCallback(async (credentials: UserCreateRequest): Promise<boolean> => {
        try {
            await signUp(credentials);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },[]);

    const logout = useCallback(async (): Promise<void> => {
        await signOut();
        localStorage.removeItem('accessToken');
        delete axiosInstance.defaults.headers.Authorization;
        setIsAuthenticated(false);
    },[])



    const fetchUser = useCallback(async (): Promise<void> => {
        const { data } = await currentUser();
        console.log("user Fetched:" ,data);
        setUser(data);
    },[]);
    
    const isValidToken = (token: string): boolean => {
        if(!token) return false;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 > Date.now();
        } catch {
            return false;
        }
    };

    const contextValue = useMemo(
      () => ({
        isAuthenticated,
        user,
        login,
        register,
        logout,
      }),
      [isAuthenticated, user, login, register, logout]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};