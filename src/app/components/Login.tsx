import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { UserRole } from '@/app/data/users';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Card } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { Users, Crown, Shield } from 'lucide-react';
import { toast } from 'sonner';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState<UserRole>('member');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!identifier || !password) {
      toast.error('Please enter all fields');
      return;
    }

    const success = login(identifier, password, activeTab);

    if (success) {
      toast.success('Login successful!');
    } else {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  const getPlaceholder = () => {
    return activeTab === 'admin' ? 'Username' : 'RID Number';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <Card className="w-full max-w-md p-8 bg-slate-800/90 backdrop-blur border-slate-700">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Rotaract Club</h1>
          <p className="text-slate-400">Coimbatore City</p>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as UserRole)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-700/50">
            <TabsTrigger value="member" className="data-[state=active]:bg-sky-500">
              <Users className="w-4 h-4 mr-2" />
              Member
            </TabsTrigger>
            <TabsTrigger value="bearer" className="data-[state=active]:bg-purple-500">
              <Crown className="w-4 h-4 mr-2" />
              Bearer
            </TabsTrigger>
            <TabsTrigger value="admin" className="data-[state=active]:bg-red-500">
              <Shield className="w-4 h-4 mr-2" />
              Admin
            </TabsTrigger>
          </TabsList>

          <TabsContent value="member">
            <LoginForm
              role="member"
              placeholder={getPlaceholder()}
              identifier={identifier}
              setIdentifier={setIdentifier}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
              accentColor="sky"
            />
          </TabsContent>

          <TabsContent value="bearer">
            <LoginForm
              role="bearer"
              placeholder={getPlaceholder()}
              identifier={identifier}
              setIdentifier={setIdentifier}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
              accentColor="purple"
            />
          </TabsContent>

          <TabsContent value="admin">
            <LoginForm
              role="admin"
              placeholder={getPlaceholder()}
              identifier={identifier}
              setIdentifier={setIdentifier}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
              accentColor="red"
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

interface LoginFormProps {
  role: UserRole;
  placeholder: string;
  identifier: string;
  setIdentifier: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  handleLogin: (e: React.FormEvent) => void;
  accentColor: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  role,
  placeholder,
  identifier,
  setIdentifier,
  password,
  setPassword,
  handleLogin,
  accentColor,
}) => {
  const buttonClass = `w-full bg-${accentColor}-500 hover:bg-${accentColor}-600 text-white`;

  return (
    <form onSubmit={handleLogin} className="space-y-4 mt-6">
      <div className="space-y-2">
        <Label htmlFor={`${role}-identifier`} className="text-slate-200">
          {placeholder}
        </Label>
        <Input
          id={`${role}-identifier`}
          type="text"
          placeholder={placeholder}
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${role}-password`} className="text-slate-200">
          Password
        </Label>
        <Input
          id={`${role}-password`}
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
        />
      </div>

      <Button type="submit" className={buttonClass}>
        Login as {role.charAt(0).toUpperCase() + role.slice(1)}
      </Button>

      <div className="mt-4 p-3 bg-slate-700/30 rounded text-xs text-slate-400">
        <p className="font-semibold mb-1">Test Credentials:</p>
        {role === 'member' && <p>RID: 834573401 | Password: member2024</p>}
        {role === 'bearer' && <p>RID: 834570001 | Password: president2024</p>}
        {role === 'admin' && <p>Username: admin | Password: Admin@2024</p>}
      </div>
    </form>
  );
};
